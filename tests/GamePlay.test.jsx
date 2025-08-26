import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import GamePlay from "../src/components/GamePlay";

describe("GamePlay", () => {
  let mockGame;
  let forceRender;
  let onGameOver;

  beforeEach(() => {
    onGameOver = vi.fn();
    forceRender = vi.fn();
    const playerBoardMock = {
      board: Array.from({ length: 10 }, () =>
        Array.from({ length: 10 }, () => ({
          isHit: false,
          isMiss: false,
          hasShip: false,
        }))
      ),
      placeShip: vi.fn(),
      getBoardView: vi.fn(() =>
        Array.from({ length: 10 }, () =>
          Array.from({ length: 10 }, () => ({
            isHit: false,
            isMiss: false,
            hasShip: false,
          }))
        )
      ),
    };

    const computerBoardMock = {
      board: Array.from({ length: 10 }, () =>
        Array.from({ length: 10 }, () => ({
          isHit: false,
          isMiss: false,
          hasShip: false,
        }))
      ),
      placeShip: vi.fn(),
      getBoardView: vi.fn(() =>
        Array.from({ length: 10 }, () =>
          Array.from({ length: 10 }, () => ({
            isHit: false,
            isMiss: false,
            hasShip: false,
          }))
        )
      ),
    };

    mockGame = {
      getBoards: () => ({
        playerBoard: playerBoardMock,
        computerBoard: computerBoardMock,
      }),
      getCurrentPlayer: () => "human",
      isGameOver: () => false,
      humanMove: vi.fn().mockReturnValue(false),
      computerMove: vi.fn().mockReturnValue(false),
    };
  });

  it("displays initial message", () => {
    render(
      <GamePlay
        game={mockGame}
        onGameOver={onGameOver}
        forceRender={forceRender}
      />
    );
    expect(screen.getByText("your turn")).toBeInTheDocument();
  });

  it("makes human move on click and sets result message 'hit' if sucsessful", async () => {
    const user = userEvent.setup();
    mockGame.humanMove.mockReturnValue(true);
    render(
      <GamePlay
        game={mockGame}
        onGameOver={onGameOver}
        forceRender={forceRender}
      />
    );

    const cells = screen.getAllByTestId("cell-0-0");
    const enemyCell = cells[1];
    await user.click(enemyCell);

    expect(mockGame.humanMove).toHaveBeenCalledWith(0, 0);
    expect(forceRender).toHaveBeenCalled();
    expect(screen.getByTestId("result-msg").textContent).toBe("hit!");
  });

  it("makes human move on click and clear result message if not hit", async () => {
    const user = userEvent.setup();
    mockGame.humanMove.mockReturnValue(false);
    render(
      <GamePlay
        game={mockGame}
        onGameOver={onGameOver}
        forceRender={forceRender}
      />
    );

    const cells = screen.getAllByTestId("cell-0-0");
    const enemyCell = cells[1];
    await user.click(enemyCell);

    expect(mockGame.humanMove).toHaveBeenCalledWith(0, 0);
    expect(forceRender).toHaveBeenCalled();
    expect(screen.getByTestId("result-msg").textContent).toBe("");
  });

  it("shows 'you win!' and calls onGameOver when human wins", async () => {
    mockGame.humanMove.mockReturnValue("human wins");

    const user = userEvent.setup();
    render(
      <GamePlay
        game={mockGame}
        onGameOver={onGameOver}
        forceRender={forceRender}
      />
    );

    const cells = screen.getAllByTestId("cell-0-0");
    const enemyCell = cells[1];
    await user.click(enemyCell);

    expect(screen.getByText("you win!")).toBeInTheDocument();
    expect(onGameOver).toHaveBeenCalledWith("player");
  });

  it("automatically makes computer move after human miss", async () => {
    let currentPlayer = "human";
    mockGame.getCurrentPlayer = () => currentPlayer;

    mockGame.humanMove.mockImplementation(() => {
      currentPlayer = "computer";
      return false;
    });

    mockGame.computerMove.mockImplementation(() => {
      currentPlayer = "human";
      return true;
    });

    const user = userEvent.setup();
    render(
      <GamePlay
        game={mockGame}
        onGameOver={onGameOver}
        forceRender={forceRender}
      />
    );

    const cells = screen.getAllByTestId("cell-0-0");
    const enemyCell = cells[1];
    await user.click(enemyCell);

    await act(async () => {
      await new Promise((r) => setTimeout(r, 1100));
    });

    expect(mockGame.computerMove).toHaveBeenCalled();
    expect(forceRender).toHaveBeenCalledTimes(2);
  });

  it("shows 'computer wins!' and calls onGameOver", async () => {
    let currentPlayer = "human";
    mockGame.getCurrentPlayer = () => currentPlayer;

    mockGame.humanMove.mockImplementation(() => {
      currentPlayer = "computer";
      return false;
    });

    mockGame.computerMove.mockImplementation(() => {
      return "computer wins";
    });

    const user = userEvent.setup();
    render(
      <GamePlay
        game={mockGame}
        onGameOver={onGameOver}
        forceRender={forceRender}
      />
    );

    const cells = screen.getAllByTestId("cell-0-0");
    const enemyCell = cells[1];
    await user.click(enemyCell);

    await act(async () => {
      await new Promise((r) => setTimeout(r, 1100));
    });

    expect(screen.getByText("computer wins!")).toBeInTheDocument();
    expect(onGameOver).toHaveBeenCalledWith("computer");
  });

  it("does not allow clicking when game is over", async () => {
    mockGame.isGameOver = () => true;
    const user = userEvent.setup();

    render(
      <GamePlay
        game={mockGame}
        onGameOver={onGameOver}
        forceRender={forceRender}
      />
    );
    const cells = screen.getAllByTestId("cell-0-0");
    const enemyCell = cells[1];
    await user.click(enemyCell);

    expect(mockGame.humanMove).not.toHaveBeenCalled();
  });

  it("does not allow clicking when it's not human turn", async () => {
    mockGame.getCurrentPlayer = () => "computer";
    const user = userEvent.setup();

    render(
      <GamePlay
        game={mockGame}
        onGameOver={onGameOver}
        forceRender={forceRender}
      />
    );

    const cells = screen.getAllByTestId("cell-0-0");
    const enemyCell = cells[1];
    await user.click(enemyCell);

    expect(mockGame.humanMove).not.toHaveBeenCalled();
  });
});
