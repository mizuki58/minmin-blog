import React from "react";
import { Post } from "../../__generated__/graphql";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { HorizontalRule } from "../Elements/HorizontalRule";

type PostListItemProps = {
  postItem: Partial<Post>;
};

export const PostListItem: React.FC<PostListItemProps> = ({ postItem }) => {
  const pathToPost = postItem?.slug ? `/blog/${postItem?.slug}` : "#";

  return (
    <>
      <article
        className={`space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0 p-4`}
      >
        <div className="dark:text-white text-lg text-slate-500 xl:col-span-1">
          {formatDate(postItem?.createdAt)}
        </div>
        <div className="xl:col-span-3">
          <h2 className="font-bold dark:text-white text-slate-700 text-2xl mb-4 cursor-pointer">
            <Link to={pathToPost}>{postItem?.title}</Link>
          </h2>
          <div className="flex flex-wrap mb-5">
            {postItem?.tags?.map((tagItem) => (
              <Link
                to={`/tags/${tagItem?.slug}`}
                key={tagItem?.id}
                className={`text-emerald-400 font-bold hover:text-emerald-700 pr-3`}
              >
                {tagItem?.name}
              </Link>
            ))}
          </div>
          <div className="mb-4 dark:text-white">{postItem?.excerpt}</div>
          <Link
            to={pathToPost}
            className={`text-emerald-400 font-bold hover:text-emerald-700 mb-2`}
          >
            Read more &#8594;
          </Link>
        </div>
      </article>
      <HorizontalRule />
    </>
  );
};
