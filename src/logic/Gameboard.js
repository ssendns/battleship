export default function Gameboard() {
  const ships = [];
  const missedAttacks = [];
  const boardSize = 10;

  function placeShip(ship, coordinates) {
    for (let i = 0; i < coordinates.length; i++) {
      const x = coordinates[i][0];
      const y = coordinates[i][1];
      if (x < 0 || y < 0 || x >= boardSize || y >= boardSize) {
        throw new Error("ship coordinates out of board bounds");
      }
    }
    ships.push({ ship, coordinates });
  }

  function receiveAttack(x, y) {
    if (x < 0 || y < 0 || x >= boardSize || y >= boardSize) {
      throw new Error("attack out of bounds");
    }
    for (let i = 0; i < ships.length; i++) {
      const cur = ships[i];
      const index = cur.coordinates.findIndex(
        ([curX, curY]) => curX === x && curY === y
      );

      if (index !== -1) {
        cur.ship.hit(index);
        return;
      }
    }
    missedAttacks.push([x, y]);
  }

  function allShipsSunk() {
    let flag = true;
    for (let i = 0; i < ships.length; i++) {
      const cur = ships[i];
      if (!cur.ship.isSunk()) {
        flag = false;
      }
    }
    return flag;
  }

  return { placeShip, receiveAttack, allShipsSunk, ships, missedAttacks };
}
