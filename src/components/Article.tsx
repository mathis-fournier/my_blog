import { useNavigate } from "react-router-dom";
import "./Article.css";
export default function Article(props: any) {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/articles");
  }
  return (
    <>
      <div className="article">
        <h2>{props.title}</h2>
        <p className="date">Crée le : {props.createdAt}</p>
        <p>{props.content}</p>
      </div>
      <button className="retour" onClick={handleClick}>
        Retour
      </button>
    </>
  );
}
