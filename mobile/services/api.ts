import { Pet } from "../types";

const API_BASE_URL = "http://localhost:3001/api";

export const petService = {
  async getAllPets(): Promise<Pet[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/pets`);
      if (!response.ok) {
        throw new Error("Failed to fetch pets");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching pets:", error);
      throw error;
    }
  },

  async bookPet(petId: string): Promise<Pet> {
    try {
      const response = await fetch(`${API_BASE_URL}/book/${petId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "booked" }),
      });

      if (!response.ok) {
        throw new Error("Failed to book pet");
      }

      return await response.json();
    } catch (error) {
      console.error("Error booking pet:", error);
      throw error;
    }
  },
};
