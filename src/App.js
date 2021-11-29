import React, { useState, useEffect } from "react";
import "./App.css";
import "bulma/css/bulma.min.css";
import Card from "./components/Card";
import images from "./assets/images/index";

const App = () => {
  const [cards, setCards] = useState(images);

  let rows = cards.reduce(function (rows, key, index) {
    return (index % 4 == 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows;
  }, []);

  return (
    <div className="App">
      <header>
        <h1 className="title">Memory Card Game</h1>
        <h2 className="subtitle">This application puts your memory to the test. You CAN NOT click on any image more than once or else your score resets to zero!</h2>
      </header>
      <main className="m-2">
        {cards.map((card, i) => {
          let ancestorTagOpen, ancestorTagClose, infoTile;

          if ([1, 5, 9].includes(i)) {
            ancestorTagOpen = '<section className="tile is-ancestor">';
            ancestorTagClose = "</section>";
          }

          infoTile = (
            <div className="tile is-parent">
              <div className="tile is-child">
                <Card url={card.url} alt={card.alt} name={card.name} />
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default App;
