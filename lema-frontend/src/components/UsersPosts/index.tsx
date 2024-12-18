import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { GetPostsResponse, Post } from "../../types";
import { ArrowLeft } from "lucide-react";
import { PostCard } from "./components/PostCard";
import { CirclePlusIcon } from "@/assets/icons/circle-plus";
import { NewPostModal } from "./components/NewPostModal";
import LoaderComponent from "../Loader";
import { createPost, deletePost, getPosts } from "@/service";
import { ErrorState } from "../ErrorState";

export const UserPosts = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", body: "" });
  const queryClient = useQueryClient();

  const presentUserId = userId || "";

  const { data, isLoading, error, refetch } = useQuery<GetPostsResponse, Error>(
    {
      queryKey: ["posts", presentUserId],
      queryFn: () => getPosts(presentUserId),
      enabled: !!userId,
    }
  );

  const deleteMutation = useMutation({
    mutationFn: (postId: string) => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", userId] });
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: Omit<Post, "id" | "created_at">) => createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", presentUserId] });
      setIsOpen(false);
      setNewPost({ title: "", body: "" });
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoaderComponent />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto px-2 py-8">
        <ErrorState
          message="Failed to load posts. Please try again."
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full max-w-6xl mx-auto px-2 py-8">
        <ErrorState message="No data available." />
      </div>
    );
  }

  const {
    userDetail: { name, email },
    posts,
  } = data;

  return (
    <div className="w-full max-w-6xl mx-auto px-2 py-8">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/")}
          className="flex text-custom-gray hover:text-gray-700 py-2 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft size={24} />
          <span className="ml-2">Back to Users</span>
        </button>
      </div>
      <div className="mb-6">
        <h1 className="text-lg-medium text-title-black mb-2">{name}</h1>
        <p className="text-custom-gray text-sm-regular">
          {email} • {posts?.length || 0} Posts
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <button
          onClick={() => setIsOpen(true)}
          className="border-4 rounded-lg border-border-gray border-dashed p-6 relative shadow-md hover:shadow-thick transition-shadow h-[290px] w-full"
        >
          <span className="w-full">
            <CirclePlusIcon className="w-6 h-6 mx-auto" />
          </span>
          <span className="text-custom-gray-light text-sm-regular font-semibold leading-5">
            New Post
          </span>
        </button>
        {posts?.length === 0 ? (
          <div className="text-center text-custom-gray">No posts found</div>
        ) : (
          posts?.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              deletePost={deleteMutation.mutate}
            />
          ))
        )}
      </div>

      <NewPostModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={() =>
          createMutation.mutate({
            user_id: presentUserId,
            title: newPost.title,
            body: newPost.body,
          })
        }
        newPost={newPost}
        setNewPost={setNewPost}
      />
    </div>
  );
};
