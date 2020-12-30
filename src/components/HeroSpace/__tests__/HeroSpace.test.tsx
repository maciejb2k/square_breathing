import React from "react";
import {screen} from "@testing-library/dom";
import {render} from "@testing-library/react";

import HeroSpace from "components/HeroSpace";

describe("HeroSpace.tsx", () => {
  it("should render start button", () => {
    render(<HeroSpace />);
    const beginButton = screen.getByText(/Begin Breathing/i);
    expect(beginButton).toBeInTheDocument();
  });
});
