import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Pet } from "../types";

interface PetCardProps {
  pet: Pet;
  onBook: (petId: string) => Promise<void>;
}

const PetCard: React.FC<PetCardProps> = ({ pet, onBook }) => {
  const handleBookPress = async () => {
    if (pet.status === "booked") {
      Alert.alert("Already Booked", "This pet is already booked!");
      return;
    }

    Alert.alert("Book Pet", `Would you like to book ${pet.name} for a swap?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Book",
        onPress: async () => {
          try {
            await onBook(pet.id);
            Alert.alert("Success", `${pet.name} has been booked!`);
          } catch (error) {
            Alert.alert("Error", "Failed to book pet. Please try again.");
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: pet.photoUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{pet.name}</Text>
        <Text style={styles.species}>{pet.species}</Text>
        <Text style={styles.city}>{pet.city}</Text>

        <TouchableOpacity
          style={[
            styles.bookButton,
            pet.status === "booked" && styles.bookedButton,
          ]}
          onPress={handleBookPress}
          disabled={pet.status === "booked"}
        >
          <Text
            style={[
              styles.bookButtonText,
              pet.status === "booked" && styles.bookedButtonText,
            ]}
          >
            {pet.status === "booked" ? "Booked" : "Book Swap"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin: 8,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  species: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  city: {
    fontSize: 14,
    color: "#888",
    marginBottom: 16,
  },
  bookButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  bookedButton: {
    backgroundColor: "#E0E0E0",
  },
  bookButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  bookedButtonText: {
    color: "#666",
  },
});

export default PetCard;
