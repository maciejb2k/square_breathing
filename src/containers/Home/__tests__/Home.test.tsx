import React from "react";
import {screen} from "@testing-library/dom";
import {render} from "@testing-library/react";

import Home from "containers/Home";

describe("Home.tsx", () => {
  it("should render start button", () => {
    render(<Home />);
    const beginButton = screen.getByText(/Begin Breathing/i);
    expect(beginButton).toBeInTheDocument();
  });
});
