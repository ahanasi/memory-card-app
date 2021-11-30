import React from "react";

export default function Card(props) {
  const { url, name, alt, isClicked, onClick, row, col } = props;
  let test = isClicked ? "Clicked!" : "Not clicked";
  return (
    <div className="tile is-child card" onClick={() => onClick(row, col)}>
      <div className="card-image">
        <figure className="image is-128x128">
          <img src={url} alt={alt} />
        </figure>
      </div>
      <div className="card-content">
        <div className="content">
          {name}, {test}
        </div>
      </div>
    </div>
  );
}
