export default function Gameboard() {
  const ships = [];
  const missedAttacks = [];
  const boardSize = 10;

  function getBoardView() {
    const board = [];

    for (let y = 0; y < boardSize; y++) {
      const row = [];
      for (let x = 0; x < boardSize; x++) {
        let isHit = false;
        let isMiss = false;
        let hasShip = false;
        let isSunk = false;

        for (let i = 0; i < ships.length; i++) {
          const curShip = ships[i];
          const index = curShip.coordinates.findIndex(
            ([curX, curY]) => curX === x && curY === y
          );
          if (index !== -1) {
            hasShip = true;
            const ship = curShip.ship;
            const wasHit = ship.getHits()[index];

            if (wasHit) {
              isHit = true;
              if (ship.isSunk()) {
                isSunk = true;
              }
            }
          }
        }

        for (let i = 0; i < missedAttacks.length; i++) {
          let [curX, curY] = missedAttacks[i];
          if (curX === x && curY === y) {
            isMiss = true;
          }
        }

        row.push({ isHit, isMiss, hasShip, isSunk });
      }
      board.push(row);
    }

    return board;
  }

  function getShips() {
    return ships;
  }

  function getMissedAttacks() {
    return missedAttacks;
  }

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
        return true;
      }
    }
    missedAttacks.push([x, y]);
    return false;
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

  function reset() {
    ships.length = 0;
    missedAttacks.length = 0;
  }

  return {
    placeShip,
    receiveAttack,
    allShipsSunk,
    getShips,
    getMissedAttacks,
    reset,
    getBoardView,
  };
}
