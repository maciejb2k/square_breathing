import React from "react";
import {render} from "@testing-library/react";

import App from "containers/App";

describe("App.tsx", () => {
  it("should render component", () => {
    const {container} = render(<App />);
    expect(container.querySelector(".App")).toBeInTheDocument();
  });
});
