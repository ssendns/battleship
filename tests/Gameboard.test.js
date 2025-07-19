import Gameboard from "../src/logic/Gameboard";
import Ship from "../src/logic/Ship";

describe("Gameboard", () => {
  test("places a ship correctly", () => {
    const board = Gameboard();
    const ship = Ship(2);
    board.placeShip(ship, [
      [0, 0],
      [0, 1],
    ]);
    expect(board.ships).toHaveLength(1);
    expect(board.ships[0].coordinates).toEqual([
      [0, 0],
      [0, 1],
    ]);
  });

  test("throws error if ship is out of bounds", () => {
    const board = Gameboard();
    const ship = Ship(2);
    expect(() =>
      board.placeShip(ship, [
        [0, 0],
        [10, 1],
      ])
    ).toThrow("ship coordinates out of board bounds");
  });

  test("registers a hit", () => {
    const board = Gameboard();
    const ship = Ship(2);
    board.placeShip(ship, [
      [0, 0],
      [0, 1],
    ]);
    board.receiveAttack(0, 1);
    expect(ship.getHits()).toEqual([false, true]);
  });

  test("registers a missed attack", () => {
    const board = Gameboard();
    const ship = Ship(2);
    board.placeShip(ship, [
      [0, 0],
      [0, 1],
    ]);
    board.receiveAttack(1, 1);
    expect(board.missedAttacks).toContainEqual([1, 1]);
  });

  test("throws error if attack is out of bounds", () => {
    const board = Gameboard();
    expect(() => board.receiveAttack(10, 1)).toThrow("attack out of bounds");
  });

  test("detects all ships sunk", () => {
    const board = Gameboard();
    const ship = Ship(1);
    board.placeShip(ship, [[0, 0]]);
    board.receiveAttack(0, 0);
    expect(board.allShipsSunk()).toBe(true);
  });
});
