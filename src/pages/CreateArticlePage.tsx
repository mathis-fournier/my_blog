import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateArticlePage.css";
export default function CreateArticlePage() {
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
    createdAt: new Date().toLocaleDateString(),
    image: "",
    likeCount: 0,
    isPublished: true,
    categoryName: "",
    isLiked: false,
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  var x = document.getElementById("snackbar")!;
  function handleSubmit(event: any) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    if (x) x.className = "show";
    if (newArticle.title !== "") {
      fetch("http://localhost:3001/articles", {
        method: "POST",
        body: JSON.stringify(newArticle),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) x.textContent = "Article crée avec succes";
          if (!res.ok) throw new Error("Erreur serveur");
          return res.json();
        })
        .then((data) => {
          console.log("Article créé :", data);
          setTimeout(function () {
            (x.className = x.className.replace("show", "")),
              navigate("/articles");
          }, 2000);
        })
        .catch((err) => setError(err.message))
        .finally(() => setIsLoading(false));
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titre"
          value={newArticle.title}
          onChange={(e) =>
            setNewArticle({ ...newArticle, title: e.target.value })
          }
        />
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/png, image/jpeg"
          onChange={(e) =>
            // AJOUTER UPLOAD IMAGE DANS FICHIER ASSETS/IMAGES
            setNewArticle({
              ...newArticle,
              image:
                "src/assets/images/" +
                e.target.value.replace("C:\\fakepath\\", ""),
            })
          }
        />
        <input
          type="text"
          placeholder="Image link"
          value={newArticle.image}
          onChange={(e) =>
            setNewArticle({ ...newArticle, image: e.target.value })
          }
        />
        <textarea
          placeholder="Contenu"
          value={newArticle.content}
          onChange={(e) =>
            setNewArticle({ ...newArticle, content: e.target.value })
          }
        />
        <select
          name="select_category"
          defaultValue={""}
          onChange={(e) =>
            setNewArticle({ ...newArticle, categoryName: e.target.value })
          }
        >
          <option value={""} disabled>
            Categories
          </option>
          <option value={"JavaScript"}>JavaScript</option>
          <option value={"Angular"}>Angular</option>
          <option value={"React"}>React</option>
          <option value={"Spring"}>Spring</option>
          <option value={"Base de données"}>Database</option>
          <option value={"API"}>API</option>
          <option value={"Web"}>Web</option>
        </select>

        <button type="submit" onClick={handleSubmit}>
          Créer l'article
        </button>
      </form>
      <div id="snackbar">Article en cours de création. . .</div>
    </>
  );
}
