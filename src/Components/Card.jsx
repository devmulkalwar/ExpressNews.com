import React from "react";

const Card = (props) => {
  const openNews = () => {
    window.open(props.url, "_blank");
  };

  const publishedDate = new Date(props.publishedAt).toLocaleString();
  return (
    <article className="news-card" onClick={openNews}>
      <img id="newsImg" src={props.urlToImage} alt="News" />
      <div className="content-div">
        <h1 id="title">{props.title}</h1>
        <p id="description">{props.description}</p>
      </div>
      <div className="bottom">
        <span id="timeDate">{publishedDate}</span>
        <span id="source">{props.source}</span>
      </div>
    </article>
  );
};

export default Card;
