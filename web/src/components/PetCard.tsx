import type { Pet } from "@types";
import type React from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Cat, Dog, MapPin, PawPrint } from "lucide-react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

  const isAvailable = pet.status === "available";
  const isDog = pet.species.toLowerCase() === "dog";
  const isCat = pet.species.toLowerCase() === "cat";

  return (
    <Card>
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
        <Image
          src={pet.photoUrl}
          alt={`${pet.name} - ${pet.species}`}
          fill
          className="object-cover"
        />
        <Badge
          variant="secondary"
          className="absolute bottom-1 left-1 inline-flex gap-2 rounded-full"
        >
          <MapPin className="size-4" />
          {pet.city}
        </Badge>
      </div>

      <CardHeader className="px-2 my-6 flex items-center gap-4">
        <div
          aria-label={pet.species}
          className="size-12 rounded-full bg-muted inline-flex items-center justify-center text-muted-foreground"
        >
          {isDog && <Dog className="size-6" data-testid="pet-icon" />}
          {isCat && <Cat className="size-6" data-testid="pet-icon" />}
          {!isDog && !isCat && (
            <PawPrint className="size-6" data-testid="pet-icon" />
          )}
        </div>
        <div className="space-y-px">
          <CardTitle>{pet.name}</CardTitle>
          <CardDescription>
            <div
              className={cn(
                "flex items-center gap-2",
                isAvailable ? "text-green-600" : "text-muted-foreground"
              )}
            >
              <span className="relative flex size-2">
                {isAvailable && (
                  <span className="absolute size-full animate-ping rounded-full bg-current opacity-75" />
                )}
                <span
                  className={cn(
                    "size-2 rounded-full",
                    isAvailable ? "bg-current" : "bg-muted-foreground"
                  )}
                />
              </span>
              {pet.status === "available" ? "Available" : "Booked"}
            </div>
          </CardDescription>
        </div>
      </CardHeader>
      <CardFooter className="grid mt-auto border-t pt-6">
        <Button onClick={handleBook} disabled={pet.status !== "available"}>
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PetCard;
