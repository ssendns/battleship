import { useState } from "react";
import Board from "./Board";

function GamePlay({ game, onGameOver, forceRender }) {
  const [turnMessage, setTurnMessage] = useState("your turn");
  const [resultMessage, setResultMessage] = useState("");
  const { playerBoard, computerBoard } = game.getBoards();

  const handleHumanClick = (x, y) => {
    if (game.isGameOver() || game.getCurrentPlayer() !== "human") return;

    const result = game.humanMove(x, y);
    forceRender((v) => v + 1);

    if (result === "human wins") {
      setTurnMessage("you win!");
      setResultMessage("");
      onGameOver("player");
      return;
    }

    setResultMessage(result ? "hit!" : "");

    if (game.getCurrentPlayer() === "computer") {
      setResultMessage("");
      setTurnMessage("computer turn");
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
      setTurnMessage("computer wins!");
      setResultMessage("");
      onGameOver("computer");
      return;
    }

    setResultMessage(result ? "" : "hit!");

    if (game.getCurrentPlayer() === "human") {
      setResultMessage("");
      setTurnMessage("your turn");
    } else {
      setTimeout(() => {
        handleComputerTurn();
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <h2 className="text-2xl font-semibold text-blue-800">{turnMessage}</h2>
      <div className="text-lg font-semibold mt-4 min-h-[2rem]">
        {resultMessage}
      </div>

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
            computer board
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
