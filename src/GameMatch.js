import React, { useState, useEffect } from "react";
import "./GameMatch.css";
import countryCapitalData from "./country-list.js";

export default function GameMatch({ num = 5 }) {
  // num stores number of countries in each game; gameStart and gameEnd store the status of the game;
  const [gameStart, setGameStart] = useState(false);
  const [gameEnd, setGameEnd] = useState(true);
  // data stores all the countries and capitals in each game;
  const [data, setData] = useState([]);
  // matchedKey stored "country" or "capital" and key(key is the same if country and capital are a pair)
  const [matchedKey, setMatchedKey] = useState([]);

  // start a game by selecting num country-capital pairs
  function handleStart() {
    let ind = [],
      dataTemp = [];
    // select five country-caiptal pairs randomly
    while (ind.length < num) {
      let randNum = Math.floor(Math.random() * countryCapitalData.length);
      if (ind.includes(randNum) === false) {
        //make sure there is no duplicate
        ind.push(randNum);
        let key = Math.floor(Math.random() * 10000);
        // console.log(countryCapitalData[randNum].country, countryCapitalData[randNum].capital)
        dataTemp.push(
          [countryCapitalData[randNum].country, "country", key],
          [countryCapitalData[randNum].capital, "capital", key]
        );
      }
    }
    setGameEnd(false);
    setGameStart(true);
    // randomize matched buttons data
    let curr = dataTemp.length,
      rand;
    while (curr !== 0) {
      rand = Math.floor(Math.random() * curr);
      curr -= 1;
      [dataTemp[curr], dataTemp[rand]] = [dataTemp[rand], dataTemp[curr]];
    }
    setData(dataTemp);
  }
  // when to end the game
  useEffect(() => {
    if (data.length === 0) {
      setGameEnd(true);
    }
  }, [data]);

  // map each button
  function handleMatchButton(eachItem) {
    return (
      <div>
        <button
          key={Math.random()}
          style={{
            backgroundColor:
              matchedKey.length === 2 &&
              matchedKey[1] === eachItem[2] &&
              matchedKey[0] === eachItem[1]
                ? "#0000ff"
                : matchedKey.length === 4 &&
                  ((matchedKey[1] === eachItem[2] &&
                    matchedKey[0] === eachItem[1]) ||
                    (matchedKey[3] === eachItem[2] &&
                      matchedKey[2] === eachItem[1]))
                ? "#ff0000"
                : "none"
          }}
          className="matchBtn"
          onClick={(e) => handleClick(e, eachItem)}>
          {eachItem[0]}
        </button>
      </div>
    );
  }
  // handle click of each match button
  function handleClick(e, inputItem) {
    if (matchedKey.length === 2) {
      console.log(matchedKey, inputItem);
      if (inputItem[2] === matchedKey[1]) {
        let newdata = data.filter((i) => {
          if (i[2] !== matchedKey[1] && i[2] !== inputItem[2]) {
            return i;
          } else {
            return null;
          }
        });
        setData(newdata);
        setMatchedKey([]);
      } else {
        setMatchedKey(matchedKey.concat(inputItem[1], inputItem[2]));
      }
    } else {
      // console.log(matchedKey, inputItem);
      setMatchedKey([inputItem[1], inputItem[2]]);
    }

    e.preventDefault();
  }
  return (
    <div>
      <h1>Country Capital Matching Game!</h1>
      {/* start and start over button */}
      <button
        className="startBtn"
        onClick={() => handleStart()}
        style={{ display: gameStart === false ? "block" : "none" }}>
        Start
      </button>
      <button
        className="startBtn"
        onClick={() => handleStart()}
        style={{ display: gameStart === true ? "block" : "none" }}>
        Start Over
      </button>
      {/* show matched buttons */}
      <div
        style={{ display: gameEnd === false ? "grid" : "none" }}
        className="container">
        {data.map((item) => handleMatchButton(item))}
      </div>
      <div
        className="Ending"
        style={{
          display: gameStart === true && gameEnd === true ? "block" : "none"
        }}>
        Congratulations!
      </div>
    </div>
  );
}
