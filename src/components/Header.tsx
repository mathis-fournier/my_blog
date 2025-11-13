import { NavLink } from "react-router-dom";
function Header() {
  const title = "";

  return (
    <>
      <header>
        <nav>
          <NavLink to="/">Accueil</NavLink>
          <NavLink to="/articles">Articles</NavLink>
        </nav>
      </header>

      <h1>{title}</h1>
    </>
  );
}
export default Header;
