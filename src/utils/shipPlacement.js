import Ship from "../logic/Ship.js";

export function isPlacementValid(board, coordinates, length) {
  if (coordinates.length !== length) return false;

  for (let i = 0; i < coordinates.length; i++) {
    const [x, y] = coordinates[i];

    if (x < 0 || x >= 10 || y < 0 || y >= 10) {
      return false;
    }

    for (const { coordinates: curShipCoordinates } of board.getShips()) {
      for (const [curX, curY] of curShipCoordinates) {
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            if (curX + dx === x && curY + dy === y) {
              return false;
            }
          }
        }
      }
    }
  }

  return true;
}

export function placeShipRandomly(board, length) {
  const rnd = Math.random();
  let orientation = "vertical";
  if (rnd < 0.5) {
    orientation = "horizontal";
  }
  let x, y;
  let coordinates;

  let isValid = false;
  while (!isValid) {
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);

    coordinates = [];
    for (let i = 0; i < length; i++) {
      let newX,
        newY = 0;
      if (orientation === "horizontal") {
        newX = x;
        newY = y + i;
      } else {
        newX = x + i;
        newY = y;
      }
      if (newX >= 10 || newY >= 10) break;
      coordinates.push([newX, newY]);
    }

    isValid = isPlacementValid(board, coordinates, length);
  }

  const ship = Ship(length);
  board.placeShip(ship, coordinates);
}
