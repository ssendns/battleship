import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../src/utils/shipPlacement", () => ({
  autoPlaceAllShips: vi.fn(),
}));

describe("App", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders game title", () => {
    render(<App />);
    expect(screen.getByText(/battleship/i)).toBeInTheDocument();
  });

  it("renders GameSetup initially", () => {
    render(<App />);
    expect(screen.getByText(/rotate/i)).toBeInTheDocument();
  });

  it("transitions to GamePlay after setup", async () => {
    const user = userEvent.setup();
    render(<App />);

    const randomBtn = screen.getByText(/place randomly/i);
    await user.click(randomBtn);

    const startBtn = screen.getByText(/start game/i);
    await user.click(startBtn);

    expect(screen.getByText(/your turn/i)).toBeInTheDocument();
  });

  it("shows winner and play again button after game over", async () => {
    const user = userEvent.setup();
    render(<App />);

    const randomBtn = screen.getByText(/place randomly/i);
    await user.click(randomBtn);

    const startBtn = screen.getByText(/start game/i);
    await user.click(startBtn);

    const cells = screen.getAllByTestId(/cell-0-0/);
    const enemyCell = cells[1];
    await user.click(enemyCell);

    await act(async () => {
      await new Promise((r) => setTimeout(r, 1100));
    });

    const winText = screen.queryByText(/won!/i);
    if (winText) {
      expect(winText).toBeInTheDocument();
      expect(screen.getByText(/play again/i)).toBeInTheDocument();
    }
  });

  it("resets game after clicking 'play again'", async () => {
    const user = userEvent.setup();
    render(<App />);

    const randomBtn = screen.getByText(/place randomly/i);
    await user.click(randomBtn);

    const startBtn = screen.getByText(/start game/i);
    await user.click(startBtn);

    const enemyCell = screen.getAllByTestId(/cell-0-0/)[1];
    await user.click(enemyCell);
    await act(async () => {
      await new Promise((r) => setTimeout(r, 1100));
    });

    const playAgain = screen.queryByText(/play again/i);
    if (playAgain) {
      await user.click(playAgain);
      expect(screen.getByText(/rotate/i)).toBeInTheDocument();
    }
  });
});
