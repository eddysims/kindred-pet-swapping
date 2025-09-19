import React from "react";
import { render } from "@testing-library/react";
import { Container } from "./Container";

it("renders the children", () => {
  const { getByText } = render(<Container>Hello</Container>);

  expect(getByText("Hello")).toBeInTheDocument();
});

it("always contains the required classnames", () => {
  const { container } = render(
    <Container className="px-12 mx-0">Hello</Container>
  );

  expect(container.firstChild).toHaveClass("container mx-auto px-6 md:px-8");
});

it("can render a child element", () => {
  const { getByText } = render(
    <Container asChild>
      <button type="button">Hello</button>
    </Container>
  );
  expect(getByText("Hello")).toBeInstanceOf(HTMLButtonElement);
});
