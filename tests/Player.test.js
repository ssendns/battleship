import Player from "../src/logic/Player";
import Gameboard from "../src/logic/Gameboard";
import Ship from "../src/logic/Ship";

test("player can attack opponent board", () => {
  const player = Player();
  const enemyBoard = Gameboard();
  const ship = Ship(2);

  enemyBoard.placeShip(ship, [
    [0, 0],
    [0, 1],
  ]);

  player.attack(enemyBoard, 0, 0);

  expect(ship.getHits()).toEqual([true, false]);
});

test("throws error if attack is out of bounds", () => {
  const enemyBoard = Gameboard();
  const player = Player();
  expect(() =>
    player.attack(enemyBoard, -1, -1).toThrow("attack out of bounds")
  );
  expect(() =>
    player.attack(enemyBoard, 10, 0).toThrow("attack out of bounds")
  );
});
