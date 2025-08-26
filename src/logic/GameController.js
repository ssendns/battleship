import Player from "./Player";
import ComputerPlayer from "./ComputerPlayer";
import Gameboard from "./Gameboard";

export default function GameController({ computerPlayer } = {}) {
  const human = Player("you");
  const computer = computerPlayer ?? ComputerPlayer();

  const playerBoard = Gameboard();
  const computerBoard = Gameboard();

  let currentPlayer = "human";
  let gameOver = false;

  function getCurrentPlayer() {
    return currentPlayer;
  }

  function isGameOver() {
    return gameOver;
  }

  function getBoards() {
    return {
      playerBoard,
      computerBoard,
    };
  }

  function humanMove(x, y) {
    if (gameOver) return;
    const result = human.attack(computerBoard, x, y);

    if (computerBoard.allShipsSunk()) {
      gameOver = true;
      return "human wins";
    }

    if (!result) {
      currentPlayer = "computer";
    }

    return result;
  }

  function computerMove() {
    if (gameOver) return;
    const result = computer.makeMove(playerBoard);

    if (playerBoard.allShipsSunk()) {
      gameOver = true;
      return "computer wins";
    }

    if (!result) {
      currentPlayer = "human";
    }
  }

  function reset() {
    currentPlayer = "human";
    gameOver = false;

    playerBoard.reset();
    computerBoard.reset();
  }

  return {
    getCurrentPlayer,
    isGameOver,
    computerMove,
    humanMove,
    getBoards,
    reset,
  };
}
