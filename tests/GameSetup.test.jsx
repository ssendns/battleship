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

vi.mock("../src/utils/shipPlacement", () => ({
  isPlacementValid: vi.fn(),
  autoPlaceAllShips: vi.fn(),
}));

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

vi.mock("../src/utils/shipPlacement", () => ({
  isPlacementValid: vi.fn(),
  autoPlaceAllShips: vi.fn(),
}));

describe("GameSetup", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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
    isPlacementValid.mockReturnValue(true);
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

  it("calls onComplete after placing last ship", async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    isPlacementValid.mockReturnValue(true);

    render(<GameSetup playerBoard={playerBoardMock} onComplete={onComplete} />);

    for (let i = 0; i < 10; i++) {
      const cell = screen.getByTestId(`cell-0-${i}`);
      await user.click(cell);
    }

    expect(onComplete).toHaveBeenCalled();
  });

  it("does not call onComplete before placing all ships", async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    isPlacementValid.mockReturnValue(true);

    render(<GameSetup playerBoard={playerBoardMock} onComplete={onComplete} />);

    for (let i = 0; i < 3; i++) {
      const cell = screen.getByTestId(`cell-0-${i}`);
      await user.click(cell);
    }

    expect(onComplete).not.toHaveBeenCalled();
  });

  it("does not place ship if placement is invalid", async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    isPlacementValid.mockReturnValue(false);
    window.alert = vi.fn();

    render(<GameSetup playerBoard={playerBoardMock} onComplete={onComplete} />);

    const cell = screen.getByTestId("cell-0-0");
    await user.click(cell);

    expect(playerBoardMock.placeShip).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalled();
  });

  it("does not place ship on same cell twice if already used", async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    isPlacementValid.mockReturnValue(true);

    render(<GameSetup playerBoard={playerBoardMock} onComplete={onComplete} />);

    const cell = screen.getByTestId("cell-0-0");

    await user.click(cell);
    await user.click(cell);

    expect(playerBoardMock.placeShip).toHaveBeenCalledTimes(1);
  });

  it("creates ships with correct lengths in order", async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    isPlacementValid.mockReturnValue(true);

    render(<GameSetup playerBoard={playerBoardMock} onComplete={onComplete} />);

    for (let i = 0; i < 10; i++) {
      const cell = screen.getByTestId(`cell-0-${i}`);
      await user.click(cell);
    }

    expect(Ship).toHaveBeenNthCalledWith(1, 4);
    expect(Ship).toHaveBeenNthCalledWith(2, 3);
    expect(Ship).toHaveBeenNthCalledWith(3, 3);
    expect(Ship).toHaveBeenNthCalledWith(4, 2);
    expect(Ship).toHaveBeenNthCalledWith(5, 2);
    expect(Ship).toHaveBeenNthCalledWith(6, 2);
    expect(Ship).toHaveBeenNthCalledWith(7, 1);
    expect(Ship).toHaveBeenNthCalledWith(8, 1);
    expect(Ship).toHaveBeenNthCalledWith(9, 1);
    expect(Ship).toHaveBeenNthCalledWith(10, 1);
  });
});
