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
    expect(board.getShips()).toHaveLength(1);
    expect(board.getShips()[0].coordinates).toEqual([
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
    const result = board.receiveAttack(0, 1);
    expect(result).toEqual(true);
    expect(ship.getHits()).toEqual([false, true]);
  });

  test("registers a missed attack", () => {
    const board = Gameboard();
    const ship = Ship(2);
    board.placeShip(ship, [
      [0, 0],
      [0, 1],
    ]);
    const result = board.receiveAttack(1, 1);
    expect(result).toEqual(false);
    expect(board.getMissedAttacks()).toContainEqual([1, 1]);
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

  test("resets the board correctly", () => {
    const board = Gameboard();
    const ship = Ship(1);
    board.placeShip(ship, [[0, 0]]);
    board.receiveAttack(0, 0);
    board.reset();
    expect(board.getShips().length).toBe(0);
    expect(board.getMissedAttacks().length).toBe(0);
  });

  test("board view correctly reflects ship placement", () => {
    const board = Gameboard();
    const ship = Ship(2);
    board.placeShip(ship, [
      [2, 3],
      [2, 4],
    ]);

    const view = board.getBoardView();

    expect(view[3][2].hasShip).toBe(true);
    expect(view[4][2].hasShip).toBe(true);
    expect(view[0][0].hasShip).toBe(false);
  });

  test("board view shows isHit and isMiss", () => {
    const board = Gameboard();
    const ship = Ship(2);
    board.placeShip(ship, [
      [1, 1],
      [1, 2],
    ]);

    board.receiveAttack(1, 2);
    board.receiveAttack(5, 5);

    const view = board.getBoardView();
    expect(view[2][1].isHit).toBe(true);
    expect(view[5][5].isMiss).toBe(true);
  });
});
