import { useState } from "react";
import Board from "./Board";
import Ship from "../logic/Ship";
import { isPlacementValid, autoPlaceAllShips } from "../utils/shipPlacement.js";

const shipLengths = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

function GameSetup({ playerBoard, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [orientation, setOrientation] = useState("horizontal");
  const [usedCells, setUsedCells] = useState(new Set());

  const handleRotation = (current) => {
    if (current === "horizontal") {
      setOrientation("vertical");
    } else {
      setOrientation("horizontal");
    }
  };

  const handleRandomPlacement = () => {
    autoPlaceAllShips(playerBoard);
    onComplete();
  };

  const handleCellClick = (x, y) => {
    const key = `${x},${y}`;
    if (usedCells.has(key)) return;
    const coordinates = [];

    for (let i = 0; i < shipLengths[currentIndex]; i++) {
      const newX = orientation === "horizontal" ? x : x + i;
      const newY = orientation === "horizontal" ? y + i : y;

      if (newX >= 10 || newY >= 10) return;
      coordinates.push([newX, newY]);
    }

    const isValid = isPlacementValid(
      playerBoard,
      coordinates,
      shipLengths[currentIndex]
    );

    if (isValid) {
      const ship = Ship(shipLengths[currentIndex]);
      playerBoard.placeShip(ship, coordinates);

      if (currentIndex === shipLengths.length - 1) {
        onComplete();
      } else {
        setCurrentIndex(currentIndex + 1);
      }

      const newUsed = new Set(usedCells);
      coordinates.forEach(([x, y]) => newUsed.add(`${x},${y}`));
      setUsedCells(newUsed);
    } else {
      alert("you can not place ship here");
    }
  };

  return (
    <div>
      <Board boardState={playerBoard.board} onCellClick={handleCellClick} />
      <button onClick={() => handleRotation(orientation)}>
        rotate ({orientation})
      </button>
      <button onClick={handleRandomPlacement}>place randomly</button>
    </div>
  );
}

export default GameSetup;
