import { useEffect, useState } from "react";
import ArticleThumbnail from "./ArticleThumbnail";

export default function ArticleList() {
  const [data, setData] = useState([{ id: 0, title: "", description: "" }]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [filter, setFilter] = useState("");
  const query = "http://localhost:3001/articles?q=" + searchTerm;

  // FETCH ARTICLES
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

  // HANDLE INPUTS
  function handleChange(event: any) {
    setSearchTerm(event.target.value);
  }
  function handleCategory(event: any) {
    setCategory(event.target.value);
  }
  function handleFilter(event: any) {
    setFilter(event.target.value);
  }

  // FONCTION RECHERCHE (TOUT)
  function search(category: string = "", filterby?: string) {
    if (data) {
      // init array articles (data = fetch deja filtrer par titre / tous si recherche vide)
      let searchres: Array<any> = data?.map((article: any) => (
        <ArticleThumbnail
          key={article?.id}
          title={article?.title || "Chargement. . ."}
          category={article?.categoryName || ""}
          likeCount={article.likeCount || ""}
          createdAt={article.createdAt || ""}
          image={article?.image || "https://placehold.co/150x150"}
          content={article.content || ""}
        />
      ));

      // CATEGORIE
      if (category !== "") {
        searchres = searchres.filter((d) => d.props.category === category);
      }

      // FILTER
      if (filterby === "liked") {
        // + DE LIKE
        searchres = searchres.sort(
          (a, b) => b.props.likeCount - a.props.likeCount,
        );
      }
      if (filterby === "asc") {
        // RECENT
        searchres = searchres.sort(
          (a, b) =>
            Date.parse(b.props.createdAt) - Date.parse(a.props.createdAt),
        );
      }
      if (filterby === "desc") {
        // ANCIEN
        searchres = searchres.sort(
          (a, b) =>
            Date.parse(a.props.createdAt) - Date.parse(b.props.createdAt),
        );
      }
      console.log("search update");
      return searchres;
    }
    return "";
  }

  return (
    <>
      <div className="search_div">
        {/* BARRE RECHERCHE (= TITRE / CONTENT) */}
        <input
          onChange={handleChange}
          type="text"
          name=""
          id="searchbar"
          placeholder="search"
        />

        {/* SELECT CATEGORIES */}
        <select
          name="select_category"
          className="select_category"
          defaultValue={""}
          onChange={handleCategory}
        >
          <option value={""} disabled>
            Categories
          </option>
          <option value={""}>Tous</option>
          <option value={"JavaScript"}>JavaScript</option>
          <option value={"Angular"}>Angular</option>
          <option value={"React"}>React</option>
          <option value={"Spring"}>Spring</option>
          <option value={"Base de données"}>Database</option>
          <option value={"API"}>API</option>
          <option value={"Web"}>Web</option>
        </select>

        {/* SELECT FILTRES (RECENT / LIKE / ANCIEN) */}
        <select
          name="filter_by"
          className="filter_by"
          defaultValue={""}
          onChange={handleFilter}
        >
          <option value={""} disabled>
            Trier
          </option>
          <option value={"asc"}>Le plus recent</option>
          <option value={"desc"}>Le plus ancien</option>
          <option value={"liked"}>Le plus aimé</option>
        </select>
      </div>

      {/* AFFICHAGE RESULT RECHERCHE */}
      <div className="article-list">{search(category, filter)}</div>
    </>
  );
}
