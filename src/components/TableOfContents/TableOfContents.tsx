import React from "react";
import rehypeSlug from "rehype-slug";
import rehypeToc from "rehype-toc";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

type TableOfContentsProps = {
  content: string;
  className?: string;
};

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  content,
  className = "",
}) => {
  return (
    <>
      <div className={`${className} p-5 space-y-5`}>
        <h2 className="dark:text-white text-xl font-semibold">
          Table Of Contents
        </h2>
        <Markdown
          allowElement={(element) => {
            const className = element.properties?.className;

            if (typeof className === "string") {
              return className.includes("toc");
            }

            return false;
          }}
          children={content}
          rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeSlug, rehypeToc]}
        />
      </div>
    </>
  );
};
