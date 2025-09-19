import React from "react";
import { render } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import "@testing-library/jest-dom";
import PetCard from "./PetCard";
import type { Pet, PetStatus } from "@types";
import { Toaster } from "@/components/ui/sonner";

describe("PetCard Component", () => {
  const mockPet: Pet = {
    id: "1",
    name: "Test Pet",
    species: "Dog",
    city: "Test City",
    photoUrl: "https://placehold.co/400x300?text=Dog",
    status: "available" as PetStatus,
  };

  const mockOnBook = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    render(<Toaster />);
  });

  it("renders pet information correctly", () => {
    const { getByText } = render(<PetCard pet={mockPet} onBook={mockOnBook} />);

    expect(getByText("Test Pet")).toBeInTheDocument();
    expect(getByText("Dog • Test City")).toBeInTheDocument();
    expect(getByText("Available")).toBeInTheDocument();
    expect(getByText("Book Now")).toBeInTheDocument();
  });

  it("calls onBook when the book button is clicked", async () => {
    const { getByText } = render(<PetCard pet={mockPet} onBook={mockOnBook} />);

    fireEvent.click(getByText("Book Now"));

    expect(mockOnBook).toHaveBeenCalledWith("1");
  });

  it("shows booking success message after booking", async () => {
    mockOnBook.mockResolvedValueOnce(true);

    const { getByText, findByText } = render(
      <PetCard pet={mockPet} onBook={mockOnBook} />
    );

    fireEvent.click(getByText("Book Now"));

    // Wait for the success message to appear
    expect(await findByText("Booking successful! 🎉")).toBeInTheDocument();
  });

  it("does not show book button if pet is already booked", () => {
    const bookedPet: Pet = {
      ...mockPet,
      status: "booked",
    };

    const { getByText, queryByText } = render(
      <PetCard pet={bookedPet} onBook={mockOnBook} />
    );

    expect(getByText("Booked")).toBeInTheDocument();
    expect(queryByText("Book Now")).not.toBeInTheDocument();
  });
});
