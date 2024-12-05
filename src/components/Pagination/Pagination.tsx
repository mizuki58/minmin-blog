import React from "react";
import { useNavigate } from "react-router-dom";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  className?: string;
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  className = "",
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className={`${className} p-7 flex justify-between`}>
        <button
          onClick={() => navigate(`/blog/page/${currentPage - 1}`)}
          disabled={currentPage <= 1}
          className="text-emerald-400 font-bold hover:text-emerald-700"
        >
          <span className={currentPage <= 1 ? `opacity-0` : ``}>Previous</span>
        </button>
        <span className="dark:text-white">
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => navigate(`/blog/page/${currentPage + 1}`)}
          disabled={currentPage >= totalPages}
          className="text-emerald-400 font-bold hover:text-emerald-700"
        >
          <span className={currentPage >= totalPages ? `opacity-0` : ``}>Next</span>
        </button>
      </div>
    </>
  );
};
