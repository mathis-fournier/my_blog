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
  function handleOpenEdit() {
    console.log(props.id);
    navigate("/article/" + props.id + "/edit");
  }

  return (
    <>
      <button className="article-card" onClick={handleDetails}>
        <div className="">
          <img src={props.image || "error"} alt={props.title} loading="lazy" />
          <h2>{props.title}</h2>
          <button
            type="button"
            className="like"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            {buttonText}
          </button>
        </div>
      </button>

      <div className={status}>
        <img src={props.image || "error"} className="modal-image" alt="" />
        <h2>{props.title}</h2>
        <p>Nombre de like : {props.likeCount}</p>
        <p>Categorie : {props.categoryName}</p>
        <button className="" onClick={handleOpenDetails}>
          Acceder à l'article
        </button>
        <button className="" onClick={handleOpenEdit}>
          Modifier
        </button>
        <br />
        <button className="close-modal" onClick={handleDetails}>
          Fermer
        </button>
      </div>
    </>
  );
}

export default ArticleThumbnail;
