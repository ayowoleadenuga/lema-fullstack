import { DeleteIcon } from "@/assets/icons/delete-icon";
import { Post } from "@/types";

export function PostCard({
  post,
  deletePost,
}: {
  post: Post;
  deletePost: (id: string) => void;
}) {
  return (
    <div
      role="article"
      id={post.id}
      className="border rounded-lg border-border-gray px-8 pt-2 pb-6 shadow-md hover:shadow-thick transition-shadow h-[290px] w-full"
    >
      <div className="w-full flex justify-end">
        <button
          className="block"
          onClick={() => deletePost(post.id)}
          aria-label="Delete post"
        >
          <DeleteIcon
            className="w-6 h-6 cursor-pointer"
            data-testid="delete-icon"
          />
        </button>
      </div>

      <div className="text-custom-gray">
        <h2 className="font-inter font-medium text-sm-medium leading-6 mb-2">
          {post.title}
        </h2>
        <p className="text-sm leading-5 font-normal line-clamp-10">
          {post.body}
        </p>
      </div>
    </div>
  );
}
