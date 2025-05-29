import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import PetCard from "./PetCard";

describe("PetCard Component", () => {
  const mockPet = {
    id: "1",
    name: "Test Pet",
    species: "Dog",
    city: "Test City",
    photoUrl: "https://placehold.co/400x300?text=Dog",
    status: "available",
  };

  const mockOnBook = jest.fn(() => Promise.resolve());

  it("renders correctly with available pet", () => {
    const { getByText } = render(<PetCard pet={mockPet} onBook={mockOnBook} />);

    expect(getByText("Test Pet")).toBeTruthy();
    expect(getByText("Dog • Test City")).toBeTruthy();
    expect(getByText("Available")).toBeTruthy();
    expect(getByText("Book Now")).toBeTruthy();
  });

  it("disables book button when booking is in progress", async () => {
    let bookResolver: any;
    const longBookPromise = new Promise((resolve) => {
      bookResolver = resolve;
    });

    const slowMockOnBook = jest.fn(() => longBookPromise);

    const { getByText } = render(
      <PetCard pet={mockPet} onBook={slowMockOnBook} />
    );

    fireEvent.press(getByText("Book Now"));

    // Button text should change to "Booking..."
    expect(getByText("Booking...")).toBeTruthy();

    // Resolve the booking promise
    bookResolver();
  });
});
