import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
};

const LanguageContextDefaultValues: LanguageContextType = {
  language: "en-US",
  setLanguage: () => {},
};

const LanguageContext = createContext<LanguageContextType>(
  LanguageContextDefaultValues
);

export const useLanguageContext = () => useContext(LanguageContext);

type LanguageProviderProps = {
  children: ReactNode;
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState<string>(() => {
    const savedLanguage = localStorage.getItem("LANGUAGE");
    return savedLanguage || navigator.language;
  });

  useEffect(() => {
    localStorage.setItem("LANGUAGE", language);
  }, [language]);

  const value = { language, setLanguage };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
