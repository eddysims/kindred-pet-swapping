"use client";

import { useEffect, useState } from "react";
import PetCard from "@/components/PetCard";
import { PageTitle } from "@/components/ui/PageTitle";
import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/skeleton";

import type { Pet } from "@types";

export default function Home() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch("/api/pets");
        if (!response.ok) {
          throw new Error("Failed to fetch pets");
        }
        const data = await response.json();
        setPets(data);
      } catch (error) {
        console.error("Error fetching pets:", error);
        setError("Failed to load pets. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  const handleBookPet = async (petId: string) => {
    // In a real app, this would send a POST request to the server
    // For this demo, we'll just update the UI
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Update local state
      setPets((prevPets) =>
        prevPets.map((pet) =>
          pet.id === petId ? { ...pet, status: "booked" } : pet
        )
      );

      return true;
    } catch (error) {
      console.error("Error booking pet:", error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div>
        <PageTitle
          title="Pet Swap"
          description="Find pets available for swapping or book your next pet-sitting adventure!"
        />
        <Container className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-18">
            {[...Array(6)].map((_, index) => (
              <div className="bg-background" key={index}>
                <Skeleton
                  className="aspect-[4/3] rounded-xl"
                  role="presentation"
                />
                <div className="py-6 px-2 flex gap-4 items-center">
                  <Skeleton className="size-12 rounded-full" />
                  <div className="space-y-0.5 flex-1">
                    <Skeleton className="h-6  w-1/2" />
                    <Skeleton className="h-4 w-1/3 " />
                  </div>
                </div>
                <div className="border-t pt-6">
                  <Skeleton className="h-12 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <PageTitle
          title="Pet Swap"
          description="Find pets available for swapping or book your next pet-sitting adventure!"
        />
        <Container className="container mx-auto">
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <PageTitle
        title="Kindred pets in all cities"
        description="Find pets available for swapping or book your next pet-sitting adventure!"
      />
      <Container className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-18">
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} onBook={handleBookPet} />
          ))}
        </div>
      </Container>
    </div>
  );
}
