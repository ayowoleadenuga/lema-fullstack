import React from "react";
import { X } from "lucide-react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  newPost: { title: string; body: string };
  setNewPost: React.Dispatch<
    React.SetStateAction<{ title: string; body: string }>
  >;
};

export const NewPostModal = ({
  isOpen,
  onClose,
  onSubmit,
  newPost,
  setNewPost,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl shadow-lg">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-lg-medium font-medium text-title-black">
            New Post
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-custom-gray hover:text-custom-gray rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <form
          className="px-6 py-4 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="space-y-2">
            <label className="block text-sm-medium font-medium text-custom-gray">
              Post title
            </label>
            <input
              type="text"
              value={newPost.title}
              onChange={(e) =>
                setNewPost((p) => ({ ...p, title: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 placeholder:font-normal rounded focus:outline-none focus:ring-2 focus:ring-custom-purple-light placeholder-custom-gray-lighter focus:border-transparent"
              placeholder="Give your post a title"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-custom-gray">
              Post content
            </label>
            <textarea
              value={newPost.body}
              onChange={(e) =>
                setNewPost((p) => ({ ...p, body: e.target.value }))
              }
              className="w-full px-3 py-2 border border-border-gray placeholder:font-normal rounded h-32 resize-none placeholder-custom-gray-lighter focus:outline-none focus:ring-2 focus:ring-custom-purple-light focus:border-transparent"
              placeholder="Write something mind-blowing"
            />
          </div>
          <div className="flex justify-end gap-3 py-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm border rounded border-gray-200 text-custom-gray hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-custom-button-gray rounded  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
