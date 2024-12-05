import React from "react";
import { Layout } from "../../components/Layout";
import { useGetAuthorByIdQuery } from "../../__generated__/graphql";
import { useLocation } from "react-router-dom";
import { PageTitle } from "../../components/PageTitle";
import { CustomMarkdown } from "../../components/CustomMarkdown";
import { HorizontalRule } from "../../components/Elements/HorizontalRule";

type AboutProps = {};

export const AboutPage: React.FC<AboutProps> = ({}) => {
  const location = useLocation();
  console.log(location.pathname);
  const { data, loading, error } = useGetAuthorByIdQuery({
    variables: {
      id: "clpe6ucn25yvp0a15hvmul45j",
    },
  });

  const author = data?.author;

  return (
    <>
      <Layout>
        <div className="p-7 dark:text-white">
          <PageTitle pageTitle="About" />
          <HorizontalRule />
          <div className="flex flex-col justify-center items-center space-y-10 py-7">
            <h2 className={`text-2xl font-semibold`}>{author?.name}</h2>
            <img
              src={author?.photo?.url}
              alt="author photo"
              className={`rounded-full w-48 h-48 object-cover dark:shadow-emerald-300 shadow-lg`}
            />
            <div className="px-7 md:px-10 md:mx-20">
              <CustomMarkdown content={author?.bio as string} />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
