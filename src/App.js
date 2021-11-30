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

const App = () => {
  const [score, setScore] = useState(0);
  const [hiScore, setHiScore] = useState(0);
  const [cards, setCards] = useState(shuffleArray(_.cloneDeep(images)));

  let rows = cards.reduce(function (rows, key, index) {
    return (index % 9 === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows;
  }, []);

  const resetGame = () => {
    setScore(0);
    setCards([]);
    setCards(_.cloneDeep([...images]));
  };

  const handleClick = (row, col) => {
    const newMatrix = rows.map((a) => [...a]);

    if (!newMatrix[row][col].isClicked) {
      newMatrix[row][col].isClicked = true;
      setCards(shuffleArray(newMatrix.flat()));
      setScore((prevScore) => prevScore + 1);
    } else {
      resetGame();
    }
  };

  useEffect(() => {
    if (score === 18) {
      setHiScore(score);
      resetGame();
    } else if (score > hiScore) {
      setHiScore(score);
    }
  }, [score]);

  return (
    <div className="App">
      <header className="my-3">
        <h1 className="title">Memory Card Game</h1>
        <h2 className="subtitle">This application puts your memory to the test. You CAN NOT click on any image more than once or else your score resets to zero!</h2>
        <div className="scores columns is-justify-content-center">
          <p className="column is-2 is-size-5	">Score: {score}</p>
          <p className="column is-2 is-size-5	">Hi-Score: {hiScore}</p>
        </div>
      </header>
      <main className="mx-3 pt-6 columns is-flex-direction-column is-align-items-center">
        {rows.map((row, i) => {
          return (
            <section className="tile column is-12 is-ancestor" key={uniqid()}>
              {row.map((card, j) => {
                return (
                  <div className="tile is-parent" key={uniqid()}>
                    <Card url={card.url} alt={card.alt} name={card.name} isClicked={card.isClicked} row={i} col={j} onClick={handleClick} />
                  </div>
                );
              })}
            </section>
          );
        })}
      </main>
    </div>
  );
};

export default App;
