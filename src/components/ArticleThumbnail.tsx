import { useState } from "react";

function ArticleThumbnail(props: any) {
  let [isLiked, setLiked] = useState(false);
  const [buttonText, setButtonText] = useState("♡");
  const [status, setStatus] = useState("hidden");

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

  return (
    <>
      <div className="article-card">
        <img src={props.image} alt="" />
        <h2>{props.title}</h2>
        <p>{props.author}</p>
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
        <p>{props.author}</p>
        <p>{props.content}</p>
        <button className="close-modal" onClick={handleDetails}>
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
