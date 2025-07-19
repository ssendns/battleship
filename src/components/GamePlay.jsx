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
    <div>
      <h2>{message}</h2>
      <div>
        <div>
          <h3>your board</h3>
          <Board boardState={playerBoard} isDisabled={true} />
        </div>
        <div>
          <h3>enemy board</h3>
          <Board
            boardState={computerBoard}
            onCellClick={handleHumanClick}
            isDisabled={
              game.getCurrentPlayer() == "computer" || game.isGameOver()
            }
          />
        </div>
      </div>
    </div>
  );
}

export default GamePlay;
