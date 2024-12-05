import React, { ReactNode } from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { Analytics } from "@vercel/analytics/react";
import { useDarkModeContext } from "../../contexts/DarkModeContext";

type LayoutProps = {
  children: ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { darkMode, setIsDarkMode } = useDarkModeContext();

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className={`flex flex-col min-h-screen dark:bg-zinc-900 overflow-hidden 2xl:px-96`}>
        <Header />
        <main className={`flex-grow`}>{children}</main>
        <Footer />
        <Analytics />
      </div>
    </div>
  );
};
