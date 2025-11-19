import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ArticleEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    fetch("http://localhost:3001/articles/" + id)
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur Status: ${res.status}`);
        return res.json();
      })
      .then((data) => setData(data));
  }, []);

  function handleSubmit(event: any) {
    event?.preventDefault();
    fetch("http://localhost:3001/articles/" + id, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok: " + res.statusText);
        }
        return res.json();
      })
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("error:", error);
      });

    navigate("/articles");
  }

  function handleInput(event: any) {
    const { name, value } = event.target;
    setData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <>
      {data ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Titre</label>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleInput}
          />
          <label htmlFor="content">Contenu</label>
          <textarea
            name="content"
            value={data.content}
            onChange={handleInput}
          />
          <label htmlFor="categoryName">Categorie</label>
          <input
            type="text"
            name="categoryName"
            value={data.categoryName}
            onChange={handleInput}
          />
          <button type="submit">Valider</button>
        </form>
      ) : (
        <h1>Loading. . .</h1>
      )}
    </>
  );
}
