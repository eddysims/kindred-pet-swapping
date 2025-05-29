import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PetCard from "../../components/PetCard";
import { petService } from "../../services/api";
import { Pet } from "../../types";

export default function HomeScreen() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPets = async () => {
    try {
      setError(null);
      const petsData = await petService.getAllPets();
      setPets(petsData);
    } catch (error) {
      console.error("Error fetching pets:", error);
      setError("Failed to load pets. Please try again later.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleBookPet = async (petId: string) => {
    try {
      const updatedPet = await petService.bookPet(petId);
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

  const onRefresh = () => {
    setRefreshing(true);
    fetchPets();
  };

  const renderPet = ({ item }: { item: Pet }) => (
    <PetCard pet={item} onBook={handleBookPet} />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateText}>No pets available</Text>
      <Text style={styles.emptyStateSubtext}>Pull to refresh</Text>
    </View>
  );

  const renderErrorState = () => (
    <View style={styles.errorState}>
      <Text style={styles.errorText}>{error}</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Pet Swap</Text>
          <Text style={styles.subtitle}>Find pets available for swapping!</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading pets...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pet Swap</Text>
        <Text style={styles.subtitle}>Find pets available for swapping!</Text>
      </View>

      {error ? (
        renderErrorState()
      ) : (
        <FlatList
          data={pets}
          renderItem={renderPet}
          keyExtractor={(item) => item.id}
          numColumns={1}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={renderEmptyState}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  listContainer: {
    padding: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#999",
  },
  errorState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#FF3B30",
    textAlign: "center",
    lineHeight: 24,
  },
});
