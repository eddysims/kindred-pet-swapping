"use client";

import { Filter } from "lucide-react";
import { useQueryState, parseAsString, parseAsBoolean } from "nuqs";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export function PetFilter() {
  const [filterBy, setFilterBy] = useQueryState(
    "filterBy",
    parseAsString.withDefault("")
  );
  const [showAvailable, setShowAvailable] = useQueryState(
    "showAvailable",
    parseAsBoolean.withDefault(false)
  );

  const handleFilterBy = (value: string) => {
    if (value === "all") {
      setFilterBy(null);
      return;
    }

    setFilterBy(value);
  };

  return (
    <div>
      <div className="flex items-center gap-2 text-muted-foreground mb-4">
        <Filter className="size-4" />
        Filter Results
      </div>

      <div className="grid sm:flex items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-1 order-2 sm:order-1">
          <Label>Filter by</Label>
          <Select defaultValue={filterBy} onValueChange={handleFilterBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a pet type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cat">Cats</SelectItem>
              <SelectItem value="dog">Dogs</SelectItem>
              <SelectItem value="all">Show All</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Label className="flex items-center gap-1 order-1">
          <Checkbox
            onCheckedChange={(checked) =>
              setShowAvailable(checked === "indeterminate" ? false : checked)
            }
            checked={showAvailable}
          />
          Only show available pets
        </Label>
      </div>
    </div>
  );
}
