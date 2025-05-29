import { Pet } from "@types";
import React, { useState } from "react";

interface PetCardProps {
  pet: Pet;
  onBook: (petId: string) => void;
}

const PetCard: React.FC<PetCardProps> = ({ pet, onBook }) => {
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBook = async () => {
    setIsBooking(true);
    try {
      await onBook(pet.id);
      setBookingSuccess(true);
    } catch (error) {
      console.error("Failed to book pet:", error);
    } finally {
      setIsBooking(false);
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

        {pet.status === "available" && !bookingSuccess && (
          <button
            onClick={handleBook}
            disabled={isBooking}
            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md disabled:opacity-50"
          >
            {isBooking ? "Booking..." : "Book Now"}
          </button>
        )}

        {bookingSuccess && (
          <div className="mt-4 text-green-600 font-medium">
            Booking successful! 🎉
          </div>
        )}
      </div>
    </div>
  );
};

export default PetCard;
