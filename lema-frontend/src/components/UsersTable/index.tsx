import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { RightArrowIcon } from "@/assets/icons/right-arrow";
import { LeftArrowIcon } from "@/assets/icons/left-arrow";
import { User, UserResponse } from "../../types";
import LoaderComponent from "../Loader";
import { getUsers } from "@/service";

export const UsersTable = () => {
  const [page, setPage] = React.useState(0);
  const pageSize = 4;
  const navigate = useNavigate();

  const { data, isLoading: isLoadingUsers } = useQuery<UserResponse>({
    queryKey: ["users", page],
    queryFn: () => getUsers(page, pageSize),
  });

  const { data: users = [], pageCounts } = data || {};

  const totalPages = pageCounts || 1;

  const getPaginationButtons = () => {
    const buttons = [];
    if (totalPages && totalPages <= 6) {
      for (let i = 0; i < totalPages; i++) {
        buttons.push(renderPageButton(i));
      }
    } else {
      buttons.push(renderPageButton(0));
      if (page > 2) {
        buttons.push(
          <span key="start-ellipsis" className="px-3 py-1 text-custom-gray">
            ...
          </span>
        );
      }
      const start = Math.max(1, page - 1);
      const end = Math.min(totalPages - 2, page + 1);
      for (let i = start; i <= end; i++) {
        buttons.push(renderPageButton(i));
      }
      if (page < totalPages - 3) {
        buttons.push(
          <span key="end-ellipsis" className="px-3 py-1 text-custom-gray">
            ...
          </span>
        );
      }
      buttons.push(renderPageButton(totalPages - 1));
    }
    return buttons;
  };

  const renderPageButton = (index: number) => (
    <button
      key={index}
      className={`px-3 py-1 rounded text-custom-gray ${
        page === index ? "bg-custom-purple-light" : ""
      }`}
      onClick={() => setPage(index)}
    >
      {index + 1}
    </button>
  );
  const handleClick = ({ id }: { id: string }) => {
    navigate(`/users/${id}`);
  };
  return (
    <div className="w-full max-w-4xl lg:max-w-2xl mx-auto grid gap-y-10 px-2">
      <h1 className="text-xl-medium leading-[72px] tracking-[-0.02em] font-medium text-title-black">
        Users
      </h1>
      <div className="w-full">
        <table className="w-full text-custom-gray rounded-lg shadow">
          <thead>
            <tr>
              <th className="text-left font-medium text-xs-medium p-4 leading-5">
                Full Name
              </th>
              <th className="text-left font-medium text-xs-medium p-4 leading-5">
                Email Address
              </th>
              <th className="text-left font-medium text-xs-medium p-4 leading-5 w-[392px]">
                Address
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoadingUsers ? (
              <tr>
                <td colSpan={3} className="p-20 text-center">
                  <LoaderComponent />
                </td>
              </tr>
            ) : (
              users?.map((user: User) => (
                <tr
                  key={user.id}
                  className="border-b border-b-border-gray text-sm-regular hover:bg-custom-purple-light cursor-pointer"
                  onClick={() => handleClick(user)}
                >
                  <td className="p-4 font-semibold">{user.name}</td>
                  <td className="p-4 text-sm">{user.email}</td>
                  <td className="p-4 truncate max-w-[392px]">
                    {user.full_address}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex items-center justify-center py-4 gap-2 float-right">
          <button
            className="flex pr-6 py-1 rounded disabled:opacity-50"
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
          >
            <LeftArrowIcon className="mr-2 my-auto" />
            <span>Previous</span>
          </button>
          {getPaginationButtons()}
          <button
            className="flex pl-6 py-1 rounded text-custom-gray disabled:opacity-50"
            disabled={page === totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
          >
            <span>Next</span>
            <RightArrowIcon className="ml-2 my-auto" />
          </button>
        </div>
      </div>
    </div>
  );
};
