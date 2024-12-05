import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { InputField } from "../../components/Elements/InputField";
import { PostListItem } from "../../components/PostListItem";
import { Post, useGetPostsByTagSlugQuery } from "../../__generated__/graphql";
import { useNavigate, useParams } from "react-router-dom";
import { PageTitle } from "../../components/PageTitle";
import { HorizontalRule } from "../../components/Elements/HorizontalRule";

type PostListByTagPageProps = {};

export const PostListByTagPage: React.FC<PostListByTagPageProps> = ({}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const { data, loading, error } = useGetPostsByTagSlugQuery({
    variables: {
      slug: slug || "",
    },
  });

  useEffect(() => {
    if (!loading && data?.posts.length == 0) {
      navigate("/404", { replace: true });
    }
  }, [loading, data, navigate]);

  const tagName = data?.tag?.name;

  const filteredPosts = searchTerm
    ? data?.posts?.filter(
        (post) =>
          post?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post?.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data?.posts;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setSearchTerm(value);
  };

  return (
    <>
      <Layout>
        <div className="mx-5">
          <div className={`p-7`}>
            <PageTitle pageTitle={tagName as string} />
            <div>
              <InputField
                placeholder="search"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
          <HorizontalRule />
          {filteredPosts?.map((postItem) => (
            <PostListItem
              key={postItem.id}
              postItem={postItem as Partial<Post>}
            />
          ))}
        </div>
      </Layout>
    </>
  );
};
