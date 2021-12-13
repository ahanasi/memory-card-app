import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import _ from "lodash";
import "./App.css";
import "bulma/css/bulma.min.css";
import Card from "./components/Card";
import images from "./assets/images/index";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

const App = function () {
  const [score, setScore] = useState(0);
  const [hiScore, setHiScore] = useState(0);
  const [cards, setCards] = useState(shuffleArray([...images]));

  const rows = cards.reduce(
    (rows, key, index) =>
      (index % 9 === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) &&
      rows,
    []
  );

  const resetGame = () => {
    setScore(0);
    setCards([...images]);
  };

  const handleClick = (row, col) => {
    const newMatrix = _.clone(rows);
    if (!newMatrix[row][col].isClicked) {
      newMatrix[row][col] = { ...newMatrix[row][col], isClicked: true };
      setCards(shuffleArray(newMatrix.flat()));
      setScore((prevScore) => prevScore + 1);
    } else {
      document.querySelector(".lost-msg").classList.remove("is-hidden");
    }
  };

  useEffect(() => {
    document.querySelector(".close-lost").addEventListener("click", () => {
      document.querySelector(".lost-msg").classList.add("is-hidden");
      resetGame();
    });

    document.querySelector(".close-win").addEventListener("click", () => {
      document.querySelector(".win-msg").classList.add("is-hidden");
      resetGame();
    });
  }, []);

  useEffect(() => {
    if (score === 18) {
      setHiScore(score);
      document.querySelector(".is-success").classList.remove("is-hidden");
    } else if (score > hiScore) {
      setHiScore(score);
    }
  }, [score]);

  return (
    <div className="App">
      <article className="message win-msg is-success is-hidden">
        <div className="message-header">
          <p>You win!</p>
          <button className="delete close-win" aria-label="delete" />
        </div>
      </article>
      <article className="message lost-msg is-warning is-hidden">
        <div className="message-header">
          <p>You lose!</p>
          <button className="delete close-lost" aria-label="delete" />
        </div>
      </article>
      <header className="my-3">
        <h1 className="title">Memory Card Game</h1>
        <h2 className="subtitle">
          This application puts your memory to the test. You CAN NOT click on
          any image more than once or else your score resets to zero!
        </h2>
        <div className="scores columns is-justify-content-center">
          <p className="column is-2 is-size-5	">Score: {score}</p>
          <p className="column is-2 is-size-5	">Hi-Score: {hiScore}</p>
        </div>
      </header>
      <main className="mx-3 pt-6 columns is-flex-direction-column is-align-items-center">
        {rows.map((row, i) => (
          <section className="tile column is-12 is-ancestor" key={uniqid()}>
            {row.map((card, j) => (
              <div className="tile is-parent" key={uniqid()}>
                <Card
                  url={card.url}
                  alt={card.alt}
                  name={card.name}
                  isClicked={card.isClicked}
                  row={i}
                  col={j}
                  onClick={handleClick}
                />
              </div>
            ))}
          </section>
        ))}
      </main>
    </div>
  );
};

export default App;
