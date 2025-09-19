import type { Pet } from "@types";
import type React from "react";

import { toast } from "sonner";

interface PetCardProps {
  pet: Pet;
  onBook: (petId: string) => Promise<boolean>;
}

const PetCard: React.FC<PetCardProps> = ({ pet, onBook }) => {
  const handleBook = async () => {
    const response = await onBook(pet.id);

    if (response) {
      toast.success("Booking successful! 🎉");
    } else {
      toast.error("Failed to book pet");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={pet.photoUrl}
        alt={`${pet.name} - ${pet.species}`}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{pet.name}</h2>
        <p className="text-gray-600">
          {pet.species} • {pet.city}
        </p>

        <div className="mt-2">
          {pet.status === "available" ? (
            <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
              Available
            </span>
          ) : (
            <span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
              Booked
            </span>
          )}
        </div>

        {pet.status === "available" && (
          <button
            type="button"
            onClick={handleBook}
            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md disabled:opacity-50"
          >
            Book Now
          </button>
        )}
      </div>
    </div>
  );
};

export default PetCard;
