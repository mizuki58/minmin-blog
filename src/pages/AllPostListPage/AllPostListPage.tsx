import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { InputField } from "../../components/Elements/InputField";
import { PostListItem } from "../../components/PostListItem";
import { Post, useGetPostsWithSearchQuery } from "../../__generated__/graphql";
import { PageTitle } from "../../components/PageTitle";
import { Pagination } from "../../components/Pagination";
import { useNavigate, useParams } from "react-router-dom";
import { HorizontalRule } from "../../components/Elements/HorizontalRule";

type AllPostListPageProps = {};

export const AllPostListPage: React.FC<AllPostListPageProps> = ({}) => {
  const POSTS_PER_PAGE = 5;
  const [searchTerm, setSearchTerm] = useState("");
  const { currentPage } = useParams<{ currentPage: string }>();
  const navigate = useNavigate();
  const currentPageNumber =
    currentPage === undefined ? 1 : parseInt(currentPage as string);

  const { data, loading, error } = useGetPostsWithSearchQuery({
    variables: {
      ...(searchTerm === "" && {
        skip: (currentPageNumber - 1) * POSTS_PER_PAGE,
        first: POSTS_PER_PAGE,
      }),
      searchTerm: searchTerm,
    },
  });
  const totalPosts = data?.postsConnection?.aggregate?.count as number;
  const totalPages = totalPosts ? Math.ceil(totalPosts / POSTS_PER_PAGE) : 1;

  useEffect(() => {
    if (currentPage === undefined) {
      return;
    } else if (
      !/^[0-9]+$/.test(currentPage as string) ||
      currentPageNumber <= 0 ||
      (!loading && totalPages < currentPageNumber)
    ) {
      navigate("/404", { replace: true });
    }
  }, [loading, totalPages, currentPage, currentPageNumber, error, navigate]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setSearchTerm(value);
  };

  return (
    <>
      <Layout>
        <div className="mx-5">
          <div className={`p-7`}>
            <PageTitle pageTitle="All Posts" />
            <div>
              <InputField
                placeholder="search"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
          <HorizontalRule />
          {data?.posts?.map((postItem) => (
            <PostListItem
              key={postItem.id}
              postItem={postItem as Partial<Post>}
            />
          ))}
          {searchTerm === "" && (
            <Pagination
              className={``}
              currentPage={currentPageNumber}
              totalPages={totalPages}
            />
          )}
        </div>
      </Layout>
    </>
  );
};
