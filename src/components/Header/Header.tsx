import React, { useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import { TfiAlignRight, TfiAlignLeft } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { useDarkModeContext } from "../../contexts/DarkModeContext";
import { HorizontalRule } from "../Elements/HorizontalRule";

type HeaderProps = {};

export const Header: React.FC<HeaderProps> = ({}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { darkMode, setIsDarkMode } = useDarkModeContext();

  return (
    <>
      <header
        className={`p-6 z-50 text-xl font-semibold dark:text-white`}
      >
        <div className="flex justify-between items-center">
          <div>
            <Link to="/" className={`text-slate-700 font-bold dark:text-white`}>
              Minmin Blog
            </Link>
          </div>
          <nav className="">
            <ul className={`flex justify-end space-x-7`}>
              <li className="">
                <Link to="/blog" className={`hidden sm:inline-block`}>
                  blog
                </Link>
              </li>
              <li className="">
                <Link to="/about" className={`hidden sm:inline-block`}>
                  about
                </Link>
              </li>
              <li className="">
                <Link to="/tags" className={`hidden sm:inline-block`}>
                  Tags
                </Link>
              </li>
              <li className="">
                <button className="" onClick={() => setIsDarkMode(!darkMode)}>
                  {darkMode ? <BsSun /> : <BsMoon />}
                </button>
              </li>
              <li className="sm:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? <TfiAlignRight /> : <TfiAlignLeft />}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <HorizontalRule className="sm:border-none" weight="semiBold" />
      <div
        className={`sm:hidden fixed top-20 right-0 opacity-90 h-full w-full z-30 shadow-md dark:bg-zinc-900 bg-white p-5 transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="">
          <ul className="flex flex-col space-y-6 text-4xl pl-10 text-slate-600 font-semibold dark:text-white">
            <li>
              <Link to="/blog" onClick={() => setIsMenuOpen(false)}>
                Blog
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link to="/tags" onClick={() => setIsMenuOpen(false)}>
                Tags
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
