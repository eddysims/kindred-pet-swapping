import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import PetCard from "./components/PetCard";
import { Pet } from "@types";

// In a real app, we would use a proper API client or environment variables
const API_URL =
  Platform.OS === "ios"
    ? "http://localhost:3001/api"
    : "http://10.0.2.2:3001/api";

export default function App() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPets = async () => {
    try {
      // In a real app, this would use proper error handling and retry logic
      const response = await fetch(`${API_URL}/pets`);
      if (!response.ok) {
        throw new Error("Failed to fetch pets");
      }
      const data = await response.json();
      setPets(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching pets:", err);
      setError("Failed to load pets. Pull down to try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchPets();
  };

  const handleBookPet = async (petId: string) => {
    // In a real app, this would send the request to the server
    // For this demo, we'll just update the UI
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Update local state
      setPets((prevPets) =>
        prevPets.map((pet) =>
          pet.id === petId ? { ...pet, status: "booked" } : pet
        )
      );
    } catch (error) {
      console.error("Error booking pet:", error);
      throw error;
    }
  };

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Loading pets...</Text>
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pet Swap</Text>
        <Text style={styles.subtitle}>Find your next pet-sitting buddy!</Text>
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} onBook={handleBookPet} />
        ))}
      </ScrollView>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  header: {
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  scrollContent: {
    padding: 16,
  },
  errorContainer: {
    margin: 16,
    padding: 12,
    backgroundColor: "#ffebee",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ffcdd2",
  },
  errorText: {
    color: "#c62828",
    fontSize: 14,
  },
});
