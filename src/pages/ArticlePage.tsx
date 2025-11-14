import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Article from "../components/Article";
export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState([
    { id: 0, title: "", description: "" },
  ]);

  useEffect(() => {
    fetch("http://localhost:3001/articles?id=" + id)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erreur Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setArticle(data));
  }, []);
  return (
    <>
      {article?.map((article: any) => (
        <Article
          key={article?.id}
          title={article?.title || "Chargement. . ."}
          category={article?.categoryName || ""}
          likeCount={article.likeCount || ""}
          createdAt={article.createdAt || ""}
          image={article?.image || "https://placehold.co/150x150"}
          content={article.content || ""}
        />
      ))}
    </>
  );
}
