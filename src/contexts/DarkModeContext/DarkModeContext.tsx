import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type DarkModeContextType = {
  darkMode: boolean;
  setIsDarkMode: (darkMode: boolean) => void;
};

const DarkModeContextDefaultValues: DarkModeContextType = {
  darkMode: false,
  setIsDarkMode: () => {},
};

type DarkModeProviderProps = {
  children: ReactNode;
};

const DarkModeContext = createContext<DarkModeContextType>(
  DarkModeContextDefaultValues
);

export const useDarkModeContext = () => useContext(DarkModeContext);

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({
  children,
}) => {
  const [darkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem("THEME");
    if (savedTheme) {
      return savedTheme === "DARK";
    } else {
      return (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    }
  });

  useEffect(() => {
    const theme = darkMode ? "DARK" : "LIGHT";
    localStorage.setItem("THEME", theme);
  }, [darkMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const value = { darkMode, setIsDarkMode };

  return (
    <>
      <DarkModeContext.Provider value={value}>
        {children}
      </DarkModeContext.Provider>
    </>
  );
};
