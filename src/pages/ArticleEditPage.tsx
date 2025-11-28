import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ArticleEdit.css";
export default function ArticleEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");
  const x = document.getElementById("snackbar")!;
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
          throw new Error("erreur reseau  : " + res.statusText);
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

  function deleteArticle() {
    let text = "";
    if (confirm("Supprimer l'article") == true) {
      text = "confirm";
    } else {
      text = "cancel";
    }
    if (text === "confirm") {
      if (x) x.className = "show";
      fetch("http://localhost:3001/articles/" + id, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            x.textContent = "Article supprimé avec succes";
            setTimeout(function () {
              (x.className = x.className.replace("show", "")),
                navigate("/articles");
            }, 2000);
          } else {
            throw new Error("Impossible de supprimer l'article");
          }
        })
        .catch((err) => {
          setError(
            err.message || "Une erreur est survenue lors de la suppression",
          );

          console.log(error);
        });
    } else if (text === "cancel") {
      console.log("supression annulée");
    }
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
      {error ? <h2>{error}</h2> : ""}
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
          <select name="categoryName" defaultValue={""} onChange={handleInput}>
            <option value={"JavaScript"}>JavaScript</option>
            <option value={"Angular"}>Angular</option>
            <option value={"React"}>React</option>
            <option value={"Spring"}>Spring</option>
            <option value={"Base de données"}>Database</option>
            <option value={"API"}>API</option>
            <option value={"Web"}>Web</option>
          </select>
          <button type="submit">Valider</button>
          <button type="button" onClick={deleteArticle} className="delete">
            Supprimer
          </button>
        </form>
      ) : (
        <h1>Loading. . .</h1>
      )}

      <div id="snackbar">Article en cours de création. . .</div>
    </>
  );
}
