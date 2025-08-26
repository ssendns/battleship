import userEvent from "@testing-library/user-event";
import Board from "../src/components/Board";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("Board", () => {
  const mockClick = vi.fn();

  const createMockBoardView = () =>
    Array.from({ length: 10 }, (_, y) =>
      Array.from({ length: 10 }, (_, x) => ({
        isHit: false,
        isMiss: false,
        hasShip: false,
      }))
    );

  const playerBoardMock = {
    getBoardView: vi.fn(createMockBoardView),
  };

  beforeEach(() => {
    mockClick.mockClear();
  });

  it("renders 10x10 board", () => {
    render(
      <Board
        boardState={playerBoardMock}
        onCellClick={mockClick}
        isPlayerBoard={true}
      />
    );
    const cells = screen.getAllByTestId(/cell-/);
    expect(cells).toHaveLength(100);
  });

  it("calls onCellClick when a cell is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Board
        boardState={playerBoardMock}
        onCellClick={mockClick}
        isPlayerBoard={true}
      />
    );
    const cell = screen.getByTestId("cell-0-0");
    await user.click(cell);
    expect(mockClick).toHaveBeenCalledWith(0, 0);
  });

  it("does not call onCellClick if isDisabled is true", async () => {
    const user = userEvent.setup();
    render(
      <Board
        boardState={playerBoardMock}
        onCellClick={mockClick}
        isPlayerBoard={true}
        isDisabled={true}
      />
    );
    const cell = screen.getByTestId("cell-0-0");
    await user.click(cell);
    expect(mockClick).not.toHaveBeenCalled();
  });
});
