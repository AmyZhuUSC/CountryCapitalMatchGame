import React, { useEffect, useState } from "react";
import "./puzzles.css"

export default function Puzzles({ initialConfiguration, onSolveCallback }) {
  const startConfig = randomize(initialConfiguration);
  const [randomSquares, setRandmoSquares] = useState(startConfig);

  function randomize(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }
  // onclick event handler
  function moveSquare(val) {
    let zeroIndex = randomSquares.indexOf(0);
    let valIndex = randomSquares.indexOf(val);
    let temp = randomSquares.slice();
    if (valIndex + 4 === zeroIndex || valIndex - 4 === zeroIndex) {
      [temp[valIndex], temp[zeroIndex]] = [temp[zeroIndex], temp[valIndex]];
    } else if (valIndex + 1 === zeroIndex && zeroIndex % 4 !== 0) {
      [temp[valIndex], temp[zeroIndex]] = [temp[zeroIndex], temp[valIndex]];
    } else if (valIndex - 1 === zeroIndex && (zeroIndex + 1) % 4 !== 0) {
      [temp[valIndex], temp[zeroIndex]] = [temp[zeroIndex], temp[valIndex]];
    }
    setRandmoSquares(temp);
  }
  // if clicked, check if game is over
  useEffect(() => {
    let sameLength = 0;
    for (let i in randomSquares) {
      if (randomSquares[i] !== initialConfiguration[i]) {
        break;
      } else {
        sameLength++;
      }
    }
    if (sameLength === 16) {
      onSolveCallback(true);
    }
  }, [randomSquares]);

  return (
    <div className="board">
      {randomSquares.map((item, index) => {
        return (
          <div
            key={item}
            className={item === 0 ? "empty" : "tile"}
            onClick={() => moveSquare(item)}>
            {item}
          </div>
        );
      })}
    </div>
  );
}
