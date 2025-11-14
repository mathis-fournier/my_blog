import { useState } from "react";
import { useNavigate } from "react-router";
function ArticleThumbnail(props: any) {
  let [isLiked, setLiked] = useState(false);
  const [buttonText, setButtonText] = useState("♡");
  const [status, setStatus] = useState("hidden");
  const navigate = useNavigate();

  function handleClick() {
    if (isLiked === false) {
      setLiked((isLiked = true));
      console.log(isLiked);
      setButtonText("❤️");
    } else {
      setLiked((isLiked = false));
      console.log(isLiked);
      setButtonText("♡");
    }
  }
  function handleDetails() {
    if (status !== "shown") {
      setStatus("shown");
    } else {
      setStatus("hidden");
    }
  }

  function handleOpenDetails() {
    console.log(props.id);
    navigate("/article/" + props.id);
  }

  return (
    <>
      <div className="article-card">
        <img src={props.image} alt="" />
        <h2>{props.title}</h2>
        <button className="details" onClick={handleDetails}>
          Details
        </button>
        <button className="like" onClick={handleClick}>
          {buttonText}
        </button>
      </div>
      <div className={status}>
        <img src={props.image} className="modal-image" alt="" />
        <h2>{props.title}</h2>
        <p>Nombre de like : {props.likeCount}</p>
        <p>Categorie : {props.category}</p>
        <button className="" onClick={handleOpenDetails}>
          Acceder à l'article
        </button>
        <button className="close-modal" onClick={handleDetails}>
          Fermer
        </button>
      </div>
    </>
  );
}

export default ArticleThumbnail;
