import { NavLink } from "react-router-dom";
import "./Header.css";
function Header() {
  return (
    <>
      <header>
        <nav className="">
          <NavLink to="/">Accueil</NavLink>
          <NavLink to="/articles">Articles</NavLink>
          <div className="dropdown">
            <button className="dropbtn">
              Gérer les articles
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <NavLink to="/articles/new">Ajouter un article</NavLink>
              <a href="#">Supprimer un article</a>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
export default Header;
