import { render } from "@testing-library/react";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Board from "../src/components/Board";

describe("Board", () => {
  const mockClick = vi.fn();

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

  it("renders 10x10 board", () => {
    const { container } = render(
      <Board boardState={playerBoardMock} onCellClick={mockClick} />
    );
    const cells = container.querySelectorAll("[data-testid^='cell-']");
    expect(cells).toHaveLength(100);
  });

  it("calls onCellClick when a cell is clicked", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Board boardState={playerBoardMock} onCellClick={mockClick} />
    );
    const cell = container.querySelector("[data-testid^='cell-']");
    await user.click(cell);
    expect(mockClick).toHaveBeenCalled();
  });
});
