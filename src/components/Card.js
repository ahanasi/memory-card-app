import React from "react";

export default function Card(props) {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-square">
          <img src={props.url} alt={props.alt} />
        </figure>
      </div>
      <div className="card-content">
        <div className="content">{props.name}</div>
      </div>
    </div>
  );
}
