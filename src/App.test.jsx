import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders headline", () => {
    render(<App title="React" />);
    const heading = screen.getByText("React");
    expect(heading).toBeInTheDocument();
  });
});
