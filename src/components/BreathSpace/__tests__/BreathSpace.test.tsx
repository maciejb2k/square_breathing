import React from "react";
import {screen} from "@testing-library/dom";
import {render} from "@testing-library/react";

import BreathSpace from "components/BreathSpace";

describe("Home.tsx", () => {
  it("should render start button", () => {
    render(<BreathSpace />);
  });
});
