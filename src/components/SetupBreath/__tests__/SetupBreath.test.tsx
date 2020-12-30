import React from "react";
import {render} from "@testing-library/react";

import SetupBreath from "components/SetupBreath";

describe("SetupBreath.tsx", () => {
  it("should render start button", () => {
    render(<SetupBreath isConfigOpen={false} />);
  });
});
