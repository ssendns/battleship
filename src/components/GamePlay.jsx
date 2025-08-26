import { useState } from "react";
import Board from "./Board";

function GamePlay({ game, onGameOver, forceRender }) {
  const [message, setMessage] = useState("your turn");
  const { playerBoard, computerBoard } = game.getBoards();

  const handleHumanClick = (x, y) => {
    if (game.isGameOver() || game.getCurrentPlayer() !== "human") return;

    const result = game.humanMove(x, y);
    forceRender((v) => v + 1);

    if (result === "human wins") {
      setMessage("you win!");
      onGameOver("player");
      return;
    }

    setMessage(result ? "hit!" : "miss!");

    if (game.getCurrentPlayer() === "computer") {
      setTimeout(() => {
        handleComputerTurn();
      }, 1000);
    }
  };

  const handleComputerTurn = () => {
    if (game.isGameOver() || game.getCurrentPlayer() !== "computer") return;

    const result = game.computerMove();
    forceRender((v) => v + 1);

    if (result === "computer wins") {
      setMessage("computer wins!");
      onGameOver("computer");
      return;
    }

    setMessage(result ? "hit!" : "miss!");

    if (game.getCurrentPlayer() === "computer") {
      setTimeout(() => {
        handleComputerTurn();
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <h2 className="text-2xl font-semibold text-blue-800">{message}</h2>

      <div className="flex flex-col sm:flex-row gap-10">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-700 mb-2">your board</h3>
          <Board
            boardState={playerBoard}
            isPlayerBoard={true}
            isDisabled={true}
          />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            enemy board
          </h3>
          <Board
            boardState={computerBoard}
            isPlayerBoard={false}
            onCellClick={handleHumanClick}
            isDisabled={
              game.getCurrentPlayer() === "computer" || game.isGameOver()
            }
          />
        </div>
      </div>
    </div>
  );
}

export default GamePlay;
