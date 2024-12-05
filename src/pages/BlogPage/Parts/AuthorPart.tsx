import React from "react";
import { Post } from "../../../__generated__/graphql";

type AuthorPartProps = {
  postItem: Post;
};

export const AuthorPart: React.FC<AuthorPartProps> = ({ postItem }) => {
  return (
    <>
      <div className={`p-5`}>
        <div
          className={`flex sm:flex-col justify-center sm:space-y-8 sm:space-x-0 space-x-8 items-center py-2`}
        >
          <img
            src={postItem?.author?.photo?.url}
            alt="author photo"
            className={`rounded-full w-16 h-16 sm:w-24 sm:h-24 object-cover dark:shadow-emerald-300 shadow-lg`}
          />
          <h2 className="dark:text-white text-xl font-semibold">
            {postItem?.author?.name}
          </h2>
        </div>
      </div>
    </>
  );
};
