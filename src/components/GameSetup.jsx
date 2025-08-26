import { useState } from "react";
import Board from "./Board";
import Ship from "../logic/Ship";
import { isPlacementValid, autoPlaceAllShips } from "../utils/shipPlacement.js";

const shipLengths = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

function GameSetup({ playerBoard, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [orientation, setOrientation] = useState("horizontal");
  const [usedCells, setUsedCells] = useState(new Set());
  const [manualPlacementStarted, setManualPlacementStarted] = useState(false);

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
      const newX = orientation === "horizontal" ? x + i : x;
      const newY = orientation === "horizontal" ? y : y + i;

      if (newX >= 10 || newY >= 10) return;
      coordinates.push([newX, newY]);
    }

    const isValid = isPlacementValid(
      playerBoard,
      coordinates,
      shipLengths[currentIndex]
    );

    if (isValid) {
      if (!manualPlacementStarted) {
        setManualPlacementStarted(true);
      }
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
    <div className="flex flex-col items-center space-y-6">
      <h2 className="text-2xl font-semibold text-blue-700">
        place ship of length: {shipLengths[currentIndex]}
      </h2>

      <Board
        boardState={playerBoard}
        isPlayerBoard={true}
        onCellClick={handleCellClick}
      />

      <div className="flex gap-4">
        <button
          onClick={() => handleRotation(orientation)}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          rotate ({orientation})
        </button>
        <button
          onClick={handleRandomPlacement}
          disabled={manualPlacementStarted}
          className={`px-4 py-2 text-white rounded transition
  ${
    manualPlacementStarted
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-gray-700 hover:bg-gray-800"
  }`}
        >
          place randomly
        </button>
      </div>
    </div>
  );
}

export default GameSetup;
