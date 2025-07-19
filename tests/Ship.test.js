import Ship from "../src/logic/Ship.js";

describe("Ship", () => {
  it("registers a hit at the correct position", () => {
    const ship = Ship(3);
    ship.hit(1);
    expect(ship.hits).toEqual([false, true, false]);
  });

  it("knows when it is sunk", () => {
    const ship = Ship(2);
    ship.hit(0);
    ship.hit(1);
    expect(ship.isSunk()).toBe(true);
  });

  it("is not sunk if not all positions are hit", () => {
    const ship = Ship(2);
    ship.hit(0);
    expect(ship.isSunk()).toBe(false);
  });

  it("ignores invalid hit positions (negative index)", () => {
    const ship = Ship(3);
    ship.hit(-1);
    expect(ship.hits).toEqual([false, false, false]);
  });

  it("ignores invalid hit positions (index too large)", () => {
    const ship = Ship(3);
    ship.hit(5);
    expect(ship.hits).toEqual([false, false, false]);
  });
});
