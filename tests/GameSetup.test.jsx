import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import GameSetup from "../src/components/GameSetup";
import {
  autoPlaceAllShips,
  isPlacementValid,
} from "../src/utils/shipPlacement";
import Ship from "../src/logic/Ship";

vi.mock("../src/utils/shipPlacement", () => ({
  autoPlaceAllShips: vi.fn(),
  isPlacementValid: vi.fn(() => true),
}));

vi.mock("../src/logic/Ship", () => ({
  default: vi.fn((length) => ({
    length,
    hit: vi.fn(),
    isSunk: vi.fn(() => false),
    getHits: vi.fn(() => []),
  })),
}));

const playerBoardMock = {
  board: Array.from({ length: 10 }, () =>
    Array.from({ length: 10 }, () => ({ isHit: false, isMiss: false }))
  ),
  placeShip: vi.fn(),
};

describe("GameSetup", () => {
  it("toggles orientation when rotate button is clicked", async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    render(<GameSetup playerBoard={playerBoardMock} onComplete={onComplete} />);

    const rotateButton = screen.getByText(/rotate/i);
    expect(rotateButton).toHaveTextContent("horizontal");

    await user.click(rotateButton);
    expect(rotateButton).toHaveTextContent("vertical");

    await user.click(rotateButton);
    expect(rotateButton).toHaveTextContent("horizontal");
  });

  it("calls autoPlaceAllShips and onComplete when place randomly is clicked", async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();

    render(<GameSetup playerBoard={playerBoardMock} onComplete={onComplete} />);
    const randomButton = screen.getByText("place randomly");

    await user.click(randomButton);

    expect(autoPlaceAllShips).toHaveBeenCalledWith(playerBoardMock);
    expect(onComplete).toHaveBeenCalled();
  });

  it("places ship if placement is valid", async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    render(<GameSetup playerBoard={playerBoardMock} onComplete={onComplete} />);

    const cell = screen.getByTestId("cell-0-0");
    await user.click(cell);

    expect(playerBoardMock.placeShip).toHaveBeenCalled();
  });

  it("shows alert if placement is invalid", async () => {
    const user = userEvent.setup();
    isPlacementValid.mockReturnValue(false);
    window.alert = vi.fn();

    render(<GameSetup playerBoard={playerBoardMock} onComplete={vi.fn()} />);
    const cell = screen.getByTestId("cell-0-0");

    await user.click(cell);

    expect(window.alert).toHaveBeenCalledWith("you can not place ship here");
  });
});
