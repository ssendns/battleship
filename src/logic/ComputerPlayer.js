import Player from "./Player";

export default function ComputerPlayer() {
  const player = Player("computer");
  const attemptedAttacks = [];

  function getAttemptedAttacks() {
    return attemptedAttacks;
  }

  function getRandomCoordinates() {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    while (attemptedAttacks.some((coord) => coord[0] === x && coord[1] === y)) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    }
    attemptedAttacks.push([x, y]);
    return [x, y];
  }

  function makeMove(enemyBoard) {
    const [x, y] = getRandomCoordinates();
    return player.attack(enemyBoard, x, y);
  }

  return { makeMove, getAttemptedAttacks };
}
