import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Cell from "../src/components/Cell";

describe("Cell", () => {
  it("applies 'hit' class if cell isHit is true", () => {
    const { container } = render(
      <Cell
        x={0}
        y={0}
        cell={{ isHit: true, isMiss: false }}
        onClick={() => {}}
      />
    );
    expect(container.firstChild.className).toContain("bg-red-500");
  });

  it("applies 'miss' class if cell isMiss is true", () => {
    const { container } = render(
      <Cell
        x={1}
        y={1}
        cell={{ isHit: false, isMiss: true }}
        onClick={() => {}}
      />
    );
    expect(container.firstChild.className).toContain("bg-white");
  });

  it("applies 'sunk' class if cell isSunk is true", () => {
    const { container } = render(
      <Cell
        x={0}
        y={0}
        cell={{ isHit: true, isMiss: false, isSunk: true }}
        onClick={() => {}}
      />
    );
    expect(container.firstChild.className).toContain("bg-red-800");
  });

  it("calls onClick with correct coordinates if not disabled", async () => {
    const mockClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Cell
        x={2}
        y={3}
        cell={{ isHit: false, isMiss: false }}
        onClick={mockClick}
        isDisabled={false}
      />
    );
    const cell = screen.getByTestId("cell-2-3");
    await user.click(cell);

    expect(mockClick).toHaveBeenCalledWith(2, 3);
  });

  it("does not call onClick if isDisabled is true", async () => {
    const mockClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Cell
        x={4}
        y={5}
        cell={{ isHit: false, isMiss: false }}
        onClick={mockClick}
        isDisabled={true}
      />
    );
    const cell = screen.getByTestId("cell-4-5");
    await user.click(cell);

    expect(mockClick).not.toHaveBeenCalled();
  });

  it("applies 'sunk' class if cell isSunk is true", () => {
    const { container } = render(
      <Cell
        x={0}
        y={0}
        cell={{ isHit: true, isMiss: false, isSunk: true }}
        onClick={() => {}}
      />
    );
    expect(container.firstChild.className).toContain("bg-red-800");
  });
});
