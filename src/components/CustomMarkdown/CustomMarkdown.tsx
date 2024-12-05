import React, { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FaRegCopy } from "react-icons/fa";
import remarkBreaks from "remark-breaks";
import rehypeSlug from "rehype-slug";
import rehypeToc from "rehype-toc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { HorizontalRule } from "../Elements/HorizontalRule";
import { dark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import CopyToClipboard from "react-copy-to-clipboard";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useDarkModeContext } from "../../contexts/DarkModeContext";
import 'rehype-callouts/theme/github'
import rehypeCallouts from "rehype-callouts";

type CustomMarkdownProps = {
  content: string;
};
const sharedStyle = {
  borderRadius: "10px",
  padding: "20px",
  overflow: "hidden",
  marginTop: "10px",
  marginBottom: "10px",
  overflowX: "auto" as "auto",
};

const customDarkStyle = {
  ...dark,
  hljs: {
    ...dark.hljs,
    ...sharedStyle,
    backgroundColor: "#27272a",
  },
};

const customLightStyle = {
  ...oneLight,
  hljs: {
    ...oneLight.hljs,
    ...sharedStyle,
    backgroundColor: "#f5f5f5",
  },
};

export const CustomMarkdown: React.FC<CustomMarkdownProps> = ({ content }) => {
  const { darkMode, setIsDarkMode } = useDarkModeContext();
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <>
      <Markdown
        children={content}
        className={`text-lg`}
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[
          rehypeRaw,
          rehypeSanitize,
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
              properties: {
                className: ["hover:underline"],
              },
            },
          ],
          [rehypeCallouts, { theme: "github", callsouts: {} }],
          // rehypeToc
        ]}
        components={{
          code(props) {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <div className="relative group">
                <SyntaxHighlighter
                  remarkplugins={[remarkGfm]}
                  PreTag="div"
                  children={String(children).replace(/\n$/, "")}
                  language={match[1]}
                  style={darkMode ? customDarkStyle : customLightStyle}
                />
                <CopyToClipboard
                  text={String(children).replace(/\n$/, "")}
                  onCopy={onCopy}
                >
                  <button className="absolute top-0 right-0 mt-3 mr-3 hidden group-hover:block">
                    <FaRegCopy
                      className={`text-2xl cursor-pointer hover:text-emerald-700 ${
                        copied ? "text-orange-400" : "text-emerald-400"
                      }`}
                    />
                  </button>
                </CopyToClipboard>
              </div>
            ) : (
              <code {...rest} className={`text-pink-400`}>
                {children}
              </code>
            );
          },
          p: ({ node, ...props }) => <p className="py-2" {...props} />,
          h1: ({ node, ...props }) => (
            <h1 className="text-4xl py-5 font-bold" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-3xl py-5 font-bold" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-2xl py-5 font-bold" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="text-xl py-5 font-bold" {...props} />
          ),
          h5: ({ node, ...props }) => (
            <h5 className="text-lg py-5 font-bold" {...props} />
          ),
          h6: ({ node, ...props }) => (
            <h6 className="text-base py-5 font-bold" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-5 my-4" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-5 my-4" {...props} />
          ),
          li: ({ node, ...props }) => <li className="mb-2" {...props} />,
          table: ({ node, ...props }) => (
            <table className="min-w-full border-collapse my-4" {...props} />
          ),
          thead: ({ node, ...props }) => <thead className="" {...props} />,
          th: ({ node, ...props }) => (
            <th className="border-b text-left" {...props} />
          ),
          tbody: ({ node, ...props }) => <tbody {...props} />,
          tr: ({ node, ...props }) => <tr className="" {...props} />,
          td: ({ node, ...props }) => <td className="" {...props} />,
          hr: ({ node, ...props }) => (
            <HorizontalRule className="my-5" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a
              className="text-emerald-400 font-bold hover:text-emerald-700"
              {...props}
            />
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-extrabold" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-8 dark:border-emerald-400 dark:bg-zinc-800 bg-gray-100 p-4 my-4 rounded-r-md"
              {...props}
            />
          ),
        }}
      />
    </>
  );
};
