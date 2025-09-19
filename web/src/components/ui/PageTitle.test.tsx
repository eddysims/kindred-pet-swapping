import React from "react";
import { render } from "@testing-library/react";
import { PageTitle } from "./PageTitle";

it("renders the title", () => {
  const { getByText } = render(<PageTitle title="Pet Swap" />);
  expect(getByText("Pet Swap")).toBeInstanceOf(HTMLHeadingElement);
});

it("renders the description", () => {
  const { getByText } = render(
    <PageTitle title="Pet Swap" description="Find Pets" />
  );
  expect(getByText("Find Pets")).toBeInstanceOf(HTMLParagraphElement);
});
