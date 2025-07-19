export default function Player(name = "player") {
  function attack(opponentBoard, x, y) {
    opponentBoard.receiveAttack(x, y);
  }

  return { name, attack };
}
