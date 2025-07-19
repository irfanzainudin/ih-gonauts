import { useState, useEffect } from "react";
import type { BookingFilters, SpaceType } from "../../types/booking";
import { Button } from "../shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../shared/ui/card";
import { Input } from "../shared/ui/input";
import { Label } from "../shared/ui/label";
import { Checkbox } from "../shared/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shared/ui/select";

interface SpaceFiltersProps {
  filters: BookingFilters;
  onFiltersChange: (filters: BookingFilters) => void;
}

const SpaceFilters = ({ filters, onFiltersChange }: SpaceFiltersProps) => {
  const spaceTypes: { value: SpaceType; label: string; icon: string }[] = [
    { value: "sport", label: "Sport Venues", icon: "🏀" },
    { value: "meeting", label: "Meeting Rooms", icon: "💼" },
    { value: "coworking", label: "Coworking", icon: "💻" },
    { value: "event", label: "Event Halls", icon: "🎟️" },
  ];

  // Initialize with all types selected if no filters are provided
  const [localFilters, setLocalFilters] = useState<BookingFilters>(() => ({
    ...filters,
    types: filters.types || spaceTypes.map((type) => type.value),
  }));

  // Update local filters when external filters change
  useEffect(() => {
    setLocalFilters((prev) => ({
      ...filters,
      types: filters.types || prev.types,
    }));
  }, [filters]);

  const handleFilterChange = (key: keyof BookingFilters, value: unknown) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleSpaceTypeToggle = (type: SpaceType) => {
    const currentTypes = localFilters.types || [];
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter((t) => t !== type)
      : [...currentTypes, type];

    handleFilterChange("types", newTypes);
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    handleFilterChange("priceRange", { min, max });
  };

  const clearFilters = () => {
    const emptyFilters: BookingFilters = {
      types: spaceTypes.map((type) => type.value), // Reset to all types selected
    };
    setLocalFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="text-lg">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Space Type Filter */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Space Type</h3>
          <div className="space-y-2">
            {spaceTypes.map((type) => (
              <label
                key={type.value}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <Checkbox
                  checked={localFilters.types?.includes(type.value) || false}
                  onCheckedChange={() => handleSpaceTypeToggle(type.value)}
                />
                <span className="text-lg">{type.icon}</span>
                <span className="text-sm text-gray-700">{type.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Location Filter */}
        <div>
          <Label
            htmlFor="location-filter"
            className="font-semibold text-gray-900 mb-3 block"
          >
            Location
          </Label>
          <Input
            id="location-filter"
            type="text"
            placeholder="Enter city or area"
            value={localFilters.location || ""}
            onChange={(e) => handleFilterChange("location", e.target.value)}
          />
        </div>

        {/* Price Range Filter */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">
            Price Range (RM/hour)
          </h3>
          <div className="space-y-3">
            <div className="flex space-x-2">
              <Input
                type="number"
                placeholder="Min"
                value={localFilters.priceRange?.min || ""}
                onChange={(e) =>
                  handlePriceRangeChange(
                    parseInt(e.target.value) || 0,
                    localFilters.priceRange?.max || 1000
                  )
                }
              />
              <Input
                type="number"
                placeholder="Max"
                value={localFilters.priceRange?.max || ""}
                onChange={(e) =>
                  handlePriceRangeChange(
                    localFilters.priceRange?.min || 0,
                    parseInt(e.target.value) || 1000
                  )
                }
              />
            </div>
            <div className="text-xs text-gray-500">
              Common ranges: RM15-50 (Coworking), RM45-80 (Sports), RM120+
              (Meetings)
            </div>
          </div>
        </div>

        {/* Capacity Filter */}
        <div>
          <Label
            htmlFor="capacity-filter"
            className="font-semibold text-gray-900 mb-3 block"
          >
            Min Capacity
          </Label>
          <Select
            value={localFilters.capacity?.toString() || "any"}
            onValueChange={(value) =>
              handleFilterChange(
                "capacity",
                value === "any" ? undefined : parseInt(value)
              )
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Any capacity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any capacity</SelectItem>
              <SelectItem value="1">1+ people</SelectItem>
              <SelectItem value="5">5+ people</SelectItem>
              <SelectItem value="10">10+ people</SelectItem>
              <SelectItem value="20">20+ people</SelectItem>
              <SelectItem value="50">50+ people</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters */}
        <Button variant="outline" onClick={clearFilters} className="w-full">
          Clear All Filters
        </Button>
      </CardContent>
    </Card>
  );
};

export default SpaceFilters;
