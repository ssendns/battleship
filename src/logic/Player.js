export default function Player(name = "player") {
  function getName() {
    return name;
  }
  function attack(opponentBoard, x, y) {
    return opponentBoard.receiveAttack(x, y);
  }

  return { getName, attack };
}
