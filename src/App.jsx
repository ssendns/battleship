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
    <div className="min-h-screen p-6 bg-blue-50 text-center">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">battleship</h1>

      {winner && (
        <div className="space-y-4">
          <h2 className="text-2xl text-green-600 font-semibold">
            {winner} won!
          </h2>
          <button
            onClick={restartGame}
            className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            play again
          </button>
        </div>
      )}

      {!winner && !isSetupComplete && (
        <GameSetup playerBoard={playerBoard} onComplete={handleSetupComplete} />
      )}

      {!winner && isSetupComplete && !hasStarted && (
        <button
          onClick={handleStart}
          className="mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          start game
        </button>
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
