import GameController from "../src/logic/GameController";
import Ship from "../src/logic/Ship";

describe("GameController", () => {
  test("human player does not switch when hit", () => {
    const game = GameController();
    const boards = game.getBoards();
    const computerBoard = boards.computerBoard;
    const ship = Ship(2);
    computerBoard.placeShip(ship, [
      [0, 0],
      [0, 1],
    ]);

    game.humanMove(0, 0);
    expect(game.getCurrentPlayer()).toBe("human");
  });

  test("human player switches to computer when miss", () => {
    const game = GameController();
    const boards = game.getBoards();
    const computerBoard = boards.computerBoard;
    const ship = Ship(2);
    computerBoard.placeShip(ship, [
      [0, 0],
      [0, 1],
    ]);

    game.humanMove(9, 9);
    expect(game.getCurrentPlayer()).toBe("computer");
  });

  test("computer player switches when miss", () => {
    const fakeComputer = {
      makeMove: (board) => {
        const result = board.receiveAttack(9, 9);
        return result;
      },
    };

    const game = GameController({ computerPlayer: fakeComputer });
    const boards = game.getBoards();
    const playerBoard = boards.playerBoard;
    const ship = Ship(2);
    playerBoard.placeShip(ship, [
      [0, 0],
      [0, 1],
    ]);

    game.computerMove();
    expect(game.getCurrentPlayer()).toBe("human");
  });

  test("human can attack computer and win", () => {
    const game = GameController();
    const boards = game.getBoards();
    const computerBoard = boards.computerBoard;

    const ship = Ship(1);
    computerBoard.placeShip(ship, [[0, 0]]);

    const result = game.humanMove(0, 0);

    expect(result).toBe("human wins");
    expect(game.isGameOver()).toBe(true);
  });

  test("computer can attack and win", () => {
    const fakeComputer = {
      makeMove: (board) => {
        const result = board.receiveAttack(1, 1);
        return result;
      },
    };
    const game = GameController({ computerPlayer: fakeComputer });
    const boards = game.getBoards();
    const playerBoard = boards.playerBoard;

    const ship = Ship(1);
    playerBoard.placeShip(ship, [[1, 1]]);

    const result = game.computerMove();

    expect(result).toBe("computer wins");
    expect(game.isGameOver()).toBe(true);
  });

  test("reset clears state", () => {
    const game = GameController();
    const boards = game.getBoards();
    const computerBoard = boards.computerBoard;

    const ship = Ship(1);
    computerBoard.placeShip(ship, [[0, 0]]);
    game.humanMove(0, 0);

    expect(game.isGameOver()).toBe(true);

    if (typeof game.reset === "function") {
      game.reset();
      expect(game.isGameOver()).toBe(false);
      expect(game.getCurrentPlayer()).toBe("human");
      expect(game.getBoards().playerBoard.getShips().length).toBe(0);
      expect(game.getBoards().computerBoard.getShips().length).toBe(0);
    }
  });
});
