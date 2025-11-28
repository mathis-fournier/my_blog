import { useEffect, useMemo, useState } from "react";
import ArticleThumbnail from "./ArticleThumbnail";
import { useSearchParams } from "react-router";

function debounce(fn: Function, delay: number) {
  let timer: any;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export default function ArticleList() {
  const [data, setData] = useState<any[]>([]);
  const [category, setCategory] = useState("");
  const [filter, setFilter] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const query = "http://localhost:3001/articles?" + searchParams.toString();

  // FETCH ARTICLES
  useEffect(() => {
    fetch(query)
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur Status: ${res.status}`);

        return res.json();
      })
      .then((data) => setData(data));
  }, [searchParams]);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchParams("title_like=" + value);
      }, 1),
    [],
  );

  function handleSearchInput(e: any) {
    debouncedSearch(e.target.value);
  }

  function handleCategory(e: any) {
    setCategory(e.target.value);
  }

  function handleFilter(e: any) {
    setFilter(e.target.value);
  }

  const filteredData = useMemo(() => {
    let results = [...data];

    // Filter by category
    if (category) {
      results = results.filter((item) => item.categoryName === category);
    }

    // Sort
    if (filter === "liked") {
      results.sort((a, b) => b.likeCount - a.likeCount);
    }
    if (filter === "asc") {
      results.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    }
    if (filter === "desc") {
      results.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
    }

    return results.filter((res) => res.isPublished !== "false");
  }, [data, category, filter]);

  return (
    <>
      <div className="search_div">
        <label htmlFor="recherche" className="hidden">
          Recherche
        </label>
        <input
          name="recherche"
          onChange={handleSearchInput}
          placeholder="Rechercher"
          id="searchbar"
        />

        <label htmlFor="select_category" className="hidden">
          Categories
        </label>
        <select
          defaultValue=""
          name="select_category"
          onChange={handleCategory}
          className="select_category"
        >
          <option value="" disabled>
            Categories
          </option>
          <option value="">Tous</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Angular">Angular</option>
          <option value="React">React</option>
          <option value="Spring">Spring</option>
          <option value="Base de données">Database</option>
          <option value="API">API</option>
          <option value="Web">Web</option>
        </select>

        <label htmlFor="filtrer" className="hidden">
          Filtrer
        </label>
        <select
          name="filtrer"
          defaultValue=""
          onChange={handleFilter}
          className="filter_by"
        >
          <option value="" disabled>
            Trier
          </option>
          <option value="asc">Le plus recent</option>
          <option value="desc">Le plus ancien</option>
          <option value="liked">Le plus aimé</option>
        </select>
      </div>

      <div className="article-list">
        {filteredData.length > 0 ? (
          filteredData.map((article) => (
            <ArticleThumbnail key={article.id} {...article} />
          ))
        ) : (
          <ArticleThumbnail title="Loading . . ." />
        )}
      </div>
    </>
  );
}
