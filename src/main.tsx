import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AboutPage } from "./pages/AboutPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { TagsPage } from "./pages/TagsPage/TagsPage";
import { BlogPage } from "./pages/BlogPage";
import { AllPostListPage } from "./pages/AllPostListPage";
import { PostListByTagPage } from "./pages/PostListByTagPage";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import { LanguageProvider } from "./contexts/LanguageContext";

const apolloClient = new ApolloClient({
  uri: import.meta.env.VITE_HYGRAPH_ENDPOINT,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_HYGRAPH_AUTH_TOKEN}`,
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <LanguageProvider>
          <DarkModeProvider>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/blog" element={<AllPostListPage />} />
              <Route
                path="/blog/page/:currentPage"
                element={<AllPostListPage />}
              />
              <Route path="/blog/:slug" element={<BlogPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/tags" element={<TagsPage />} />
              <Route path="/tags/:slug" element={<PostListByTagPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </DarkModeProvider>
        </LanguageProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
