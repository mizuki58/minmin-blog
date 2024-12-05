import React from "react";
import { getStyleForPath } from "../../../types/ColorStyles";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  className = "",
  ...props
}) => {
  const shadowColor = getStyleForPath(location.pathname)["shadow"];
  return (
    <>
      <input
        {...props}
        type="text"
        className={`dark:bg-zinc-900 shadow-md border py-2 px-3 rounded-lg focus:outline-none w-full dark:text-white dark:shadow-emerald-300 ${className}`}
      />
    </>
  );
};
