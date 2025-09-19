import React from "react";
import { render } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";

import { Navigation } from "./Navigation";

it("links the logo to the home page", () => {
  const { getByAltText } = render(<Navigation />);

  fireEvent.click(getByAltText("Kindred Logo"));

  expect(window.location.pathname).toBe("/");
});
