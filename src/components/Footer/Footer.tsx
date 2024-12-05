import React from "react";

type FooterProps = {};

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <>
      <footer className="text-center py-3">
        <p className="dark:text-white">© 2023 Minmin Blog.</p>
      </footer>
    </>
  );
};
