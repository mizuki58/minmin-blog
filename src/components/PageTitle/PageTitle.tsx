import React from "react";

type PageTitleProps = {
  pageTitle: string;
  className?: string;
};

export const PageTitle: React.FC<PageTitleProps> = ({
  pageTitle,
  className = "",
}) => {
  return (
    <>
      <h2
        className={`${className} dark:text-white text-slate-700 font-bold text-4xl pb-7 overflow-hidden`}
      >
        {pageTitle}
      </h2>
    </>
  );
};
