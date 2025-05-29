import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Pet } from "@types";

interface PetCardProps {
  pet: Pet;
  onBook: (petId: string) => Promise<void>;
}

const PetCard: React.FC<PetCardProps> = ({ pet, onBook }) => {
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBook = async () => {
    if (isBooking) return;

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
    <View style={styles.card}>
      <Image
        source={{ uri: pet.photoUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.name}>{pet.name}</Text>
        <Text style={styles.details}>
          {pet.species} • {pet.city}
        </Text>

        <View style={styles.statusContainer}>
          <Text
            style={[
              styles.statusText,
              pet.status === "available"
                ? styles.availableStatus
                : styles.bookedStatus,
            ]}
          >
            {pet.status === "available" ? "Available" : "Booked"}
          </Text>
        </View>

        {pet.status === "available" && !bookingSuccess && (
          <TouchableOpacity
            onPress={handleBook}
            disabled={isBooking}
            style={[styles.button, isBooking && styles.buttonDisabled]}
          >
            <Text style={styles.buttonText}>
              {isBooking ? "Booking..." : "Book Now"}
            </Text>
          </TouchableOpacity>
        )}

        {bookingSuccess && (
          <Text style={styles.successText}>Booking successful! 🎉</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    height: 180,
    width: "100%",
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  statusContainer: {
    marginVertical: 8,
  },
  statusText: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    overflow: "hidden",
    alignSelf: "flex-start",
  },
  availableStatus: {
    backgroundColor: "#e6f7ee",
    color: "#0d8a41",
  },
  bookedStatus: {
    backgroundColor: "#ffebee",
    color: "#d32f2f",
  },
  button: {
    backgroundColor: "#2196F3",
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 12,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
  successText: {
    color: "#0d8a41",
    fontWeight: "600",
    marginTop: 12,
    fontSize: 14,
  },
});

export default PetCard;
