import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import ArticlesPage from "./pages/ArticlesPage.tsx";
import ArticlePage from "./pages/ArticlePage.tsx";
import Header from "./components/Header.tsx";
import NotFound from "./pages/NotFound.tsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
