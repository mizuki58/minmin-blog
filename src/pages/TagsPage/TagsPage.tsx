import React from "react";
import { Layout } from "../../components/Layout";
import { useGetTagsQuery } from "../../__generated__/graphql";
import { Link } from "react-router-dom";
import { PageTitle } from "../../components/PageTitle";
import { HorizontalRule } from "../../components/Elements/HorizontalRule";

type TagsProps = {};

export const TagsPage: React.FC<TagsProps> = ({}) => {
  const { data, loading, error } = useGetTagsQuery();

  return (
    <>
      <Layout>
        <div className="p-7">
          <PageTitle pageTitle="Tags" className={`pb-7`} />
          <HorizontalRule />
          <div className="flex flex-wrap py-7">
            {data?.tags.map((tagItem) => (
              <Link
                to={`/tags/${tagItem?.slug}`}
                key={tagItem?.id}
                className={`text-emerald-400 hover:text-emerald-700 text-2xl font-semibold mt-2 mb-2 mr-5`}
              >
                {tagItem?.name} ({tagItem?.posts?.length})
              </Link>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};
