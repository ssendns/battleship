import ComputerPlayer from "../src/logic/ComputerPlayer";
import Gameboard from "../src/logic/Gameboard";
import Ship from "../src/logic/Ship";

describe("ComputerPlayer", () => {
  test("makes a valid attack", () => {
    const computer = ComputerPlayer();
    const enemyBoard = Gameboard();

    computer.makeMove(enemyBoard);

    const attacks = computer.getAttemptedAttacks();
    expect(attacks.length).toBe(1);

    const [x, y] = attacks[0];
    expect(x).toBeGreaterThanOrEqual(0);
    expect(x).toBeLessThan(10);
    expect(y).toBeGreaterThanOrEqual(0);
    expect(y).toBeLessThan(10);
  });

  test("does not repeat the same move", () => {
    const computer = ComputerPlayer();
    const enemyBoard = Gameboard();

    for (let i = 0; i < 10; i++) {
      computer.makeMove(enemyBoard);
    }

    const attacks = computer.getAttemptedAttacks();
    const uniqueAttacks = new Set(attacks.map(([x, y]) => `${x},${y}`));
    expect(attacks.length).toBe(uniqueAttacks.size);
  });

  test("hits a ship", () => {
    const computer = ComputerPlayer();
    const enemyBoard = Gameboard();
    const ship = Ship(1);

    enemyBoard.placeShip(ship, [[0, 0]]);

    computer.getAttemptedAttacks().push([0, 0]);
    enemyBoard.receiveAttack(0, 0);

    expect(ship.getHits()).toEqual([true]);
  });
});
