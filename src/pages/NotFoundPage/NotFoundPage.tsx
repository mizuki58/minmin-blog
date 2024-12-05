import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { Button } from "../../components/Elements/Button";

type NotFoundProps = {};

export const NotFoundPage: React.FC<NotFoundProps> = ({}) => {
  return (
    <>
      <Layout>
        <div className="flex flex-col items-center p-7 dark:text-white space-y-7">
          <h1 className="text-6xl font-bold">404</h1>
          <h2 className="text-3xl">Sorry, we couldn't find this page.</h2>
          <p className="">
            But don't worry, you can find plenty of other things on our
            homepage.
          </p>
          <Button>
            <Link to="/">Back to homepage</Link>
          </Button>
        </div>
      </Layout>
    </>
  );
};
