import { useEffect, useState } from "react";
import ArticleThumbnail from "./ArticleThumbnail";

export default function ArticleList() {
  const [data, setData] = useState([{ id: 0, title: "", description: "" }]);
  const [searchTerm, setSearchTerm] = useState("");
  const query = "http://localhost:3001/articles?q=" + searchTerm;

  function handleChange(event: any) {
    setSearchTerm(event.target.value);
  }

  useEffect(() => {
    fetch(query)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erreur Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setData(data));
  }, [searchTerm]);

  return (
    <>
      <div className="search_div">
        <input
          onChange={handleChange}
          type="text"
          name=""
          id="searchbar"
          placeholder="search"
        />
      </div>
      <div className="article-list">
        {data?.map((article: any) => (
          <ArticleThumbnail
            key={article?.id}
            title={article?.title || "Chargement. . ."}
            // category={article?.category}
            image={article?.image || "https://placehold.co/150x150"}
            content={article.content || ""}
          />
        ))}
      </div>
    </>
  );
}
