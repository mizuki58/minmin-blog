import React from "react";
import { Link } from "react-router-dom";
import { Post } from "../../../__generated__/graphql";

type TagsPartProps = {
  postItem: Post;
};

export const TagsPart: React.FC<TagsPartProps> = ({ postItem }) => {
  return (
    <>
      <div className={`p-5 space-y-5`}>
        <h2 className="dark:text-white text-xl font-semibold">Tags</h2>
        <div className="flex flex-wrap">
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
      </div>
    </>
  );
};
