import {
  isPlacementValid,
  placeShipRandomly,
} from "../src/utils/shipPlacement.js";
import Gameboard from "../src/logic/Gameboard";
import Ship from "../src/logic/Ship";

describe("shipPlacement", () => {
  test("rejects placement that goes out of bounds", () => {
    const board = Gameboard();
    const coords = [
      [9, 9],
      [9, 10],
    ];
    const isValid = isPlacementValid(board, coords, 2);
    expect(isValid).toBe(false);
  });

  test("rejects overlapping placement", () => {
    const board = Gameboard();
    const ship1 = Ship(2);
    board.placeShip(ship1, [
      [3, 3],
      [3, 4],
    ]);
    const coords = [
      [3, 3],
      [3, 2],
    ];
    const isValid = isPlacementValid(board, coords, 2);
    expect(isValid).toBe(false);
  });

  test("rejects adjacent ship placement", () => {
    const board = Gameboard();
    const ship1 = Ship(1);
    board.placeShip(ship1, [[5, 5]]);
    const coords = [[5, 6]];
    const isValid = isPlacementValid(board, coords, 1);
    expect(isValid).toBe(false);
  });

  test("accepts valid placement", () => {
    const board = Gameboard();
    const coords = [
      [1, 1],
      [1, 2],
    ];
    const isValid = isPlacementValid(board, coords, 2);
    expect(isValid).toBe(true);
  });

  test("placeShipRandomly places ship of correct length", () => {
    const board = Gameboard();
    placeShipRandomly(board, 3);
    const ships = board.getShips();
    expect(ships.length).toBe(1);
    expect(ships[0].coordinates.length).toBe(3);
  });
});
