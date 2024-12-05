import React, { useEffect } from "react";
import { Layout } from "../../components/Layout";
import { Post, useGetPostBySlugQuery } from "../../__generated__/graphql";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { AuthorPart } from "./Parts/AuthorPart";
import { TagsPart } from "./Parts/TagsPart";
import { CustomMarkdown } from "../../components/CustomMarkdown";
import { HorizontalRule } from "../../components/Elements/HorizontalRule";
import { TableOfContents } from "../../components/TableOfContents";

type BlogPageProps = {};

export const BlogPage: React.FC<BlogPageProps> = ({}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { data, loading, error } = useGetPostBySlugQuery({
    variables: {
      slug: location.pathname.split("/").pop() || "",
    },
  });

  useEffect(() => {
    if (!loading && !data?.post) {
      navigate("/404", { replace: true });
    }
  }, [loading, data, navigate]);

  const post = data?.post as Post;

  return (
    <>
      <Layout>
        <article className="mx-5 py-5 overflow-hidden">
          <div className="space-y-5">
            <h2
              className={`dark:text-white text-slate-500 text-center text-xl`}
            >
              {formatDate(post?.createdAt)}
            </h2>
            <h1
              className={`dark:text-white font-bold text-4xl pb-5 text-center`}
            >
              {post?.title}
            </h1>
            <HorizontalRule />
          </div>
          <div className={`dark:text-white space-y-2 xl:grid xl:grid-cols-4`}>
          <TableOfContents className="xl:hidden" content={post?.content}/>
          <HorizontalRule className="xl:hidden" />
            <div className={`xl:col-span-3 p-5`}>
              <CustomMarkdown content={post?.content} />
            </div>
            <HorizontalRule className="xl:hidden" />
            <div className="xl:col-span-1">
              <AuthorPart postItem={post} />
              <HorizontalRule />
              <TagsPart postItem={post} />
              <HorizontalRule />
              <TableOfContents className="hidden xl:block" content={post?.content}/>
              <HorizontalRule className="hidden xl:block" />
              <div className="p-5">
                <Link
                  to="/blog"
                  className={`text-emerald-400 font-bold hover:text-emerald-700`}
                >
                  &larr; Back to the blog
                </Link>
              </div>
            </div>
          </div>
        </article>
      </Layout>
    </>
  );
};
