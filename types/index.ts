// Basic pet types
export type PetStatus = "available" | "booked";

export interface Pet {
  id: string;
  name: string;
  species: string;
  city: string;
  photoUrl: string;
  status: PetStatus;
}
