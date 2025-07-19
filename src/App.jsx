import { useState } from "react";
import GameController from "./logic/GameController";
import GamePlay from "./components/GamePlay";
import GameSetup from "./components/GameSetup";
import { autoPlaceAllShips } from "./utils/shipPlacement";

function App() {
  const [game, setGame] = useState(() => GameController());
  const [hasStarted, setHasStarted] = useState(false);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [winner, setWinner] = useState(null);
  const [_, forceRender] = useState(0);

  const handleGameOver = (winnerName) => {
    setWinner(winnerName);
  };

  const { playerBoard, computerBoard } = game.getBoards();

  const handleStart = () => {
    setHasStarted(true);
  };

  const handleSetupComplete = () => {
    autoPlaceAllShips(computerBoard);
    setIsSetupComplete(true);
  };

  const restartGame = () => {
    const newGame = GameController();
    setGame(newGame);
    setWinner(null);
    setHasStarted(false);
    setIsSetupComplete(false);
    forceRender((n) => n + 1);
  };

  return (
    <div>
      <h1>battleship</h1>

      {winner && (
        <div>
          <h2>{winner} won!</h2>
          <button onClick={restartGame}>play again</button>
        </div>
      )}

      {!winner && !isSetupComplete && (
        <GameSetup playerBoard={playerBoard} onComplete={handleSetupComplete} />
      )}

      {!winner && isSetupComplete && !hasStarted && (
        <button onClick={handleStart}>start game</button>
      )}

      {!winner && isSetupComplete && hasStarted && (
        <GamePlay
          game={game}
          onGameOver={handleGameOver}
          forceRender={forceRender}
        />
      )}
    </div>
  );
}

export default App;
