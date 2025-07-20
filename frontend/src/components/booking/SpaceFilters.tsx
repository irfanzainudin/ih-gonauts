import { useState, useEffect } from "react";
import type { BookingFilters, SpaceType } from "../../types/booking";
import { Button } from "../shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../shared/ui/card";
import { Input } from "../shared/ui/input";
import { Label } from "../shared/ui/label";
import { Checkbox } from "../shared/ui/checkbox";
import { Slider } from "../shared/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shared/ui/select";
import { Dribbble, Briefcase, Monitor, Ticket, Search } from "lucide-react";

interface SpaceFiltersProps {
  filters: BookingFilters;
  onFiltersChange: (filters: BookingFilters) => void;
  inSheetComponent?: boolean;
}

const SpaceFilters = ({
  filters,
  onFiltersChange,
  inSheetComponent = false,
}: SpaceFiltersProps) => {
  const spaceTypes: {
    value: SpaceType;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      value: "sport",
      label: "Sport Venues",
      icon: <Dribbble className="w-5 h-5" />,
    },
    {
      value: "meeting",
      label: "Meeting Rooms",
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      value: "coworking",
      label: "Coworking",
      icon: <Monitor className="w-5 h-5" />,
    },
    {
      value: "event",
      label: "Event Halls",
      icon: <Ticket className="w-5 h-5" />,
    },
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

  const handlePriceRangeChange = (values: number[]) => {
    if (values.length === 2) {
      handleFilterChange("priceRange", { min: values[0], max: values[1] });
    }
  };

  const clearFilters = () => {
    const emptyFilters: BookingFilters = {
      types: spaceTypes.map((type) => type.value), // Reset to all types selected
    };
    setLocalFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  // Get current date and next 7 days for date filter
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (dateStr === today.toISOString().split("T")[0]) return "Today";
    if (dateStr === tomorrow.toISOString().split("T")[0]) return "Tomorrow";
    return date.toLocaleDateString("en-MY", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      {inSheetComponent ? (
        // Render without Card wrapper for sheet component
        <div className="space-y-6 p-4">
          {/* Search by Name */}
          <div>
            <Label
              htmlFor="search-filter"
              className="font-semibold text-gray-900 mb-3 block"
            >
              Search by Name
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="search-filter"
                type="text"
                placeholder="Search spaces..."
                value={localFilters.searchQuery || ""}
                onChange={(e) =>
                  handleFilterChange("searchQuery", e.target.value)
                }
                className="pl-10"
              />
            </div>
          </div>

          {/* Date Filter */}
          <div>
            <Label
              htmlFor="date-filter"
              className="font-semibold text-gray-900 mb-3 block"
            >
              Select Date
            </Label>
            <Select
              value={localFilters.date || "any"}
              onValueChange={(value) =>
                handleFilterChange("date", value === "any" ? undefined : value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any date</SelectItem>
                {getAvailableDates().map((date) => (
                  <SelectItem key={date} value={date}>
                    {formatDate(date)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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

          {/* Price Range Filter with Dual-Knob Slider */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              Price Range (RM/hour)
            </h3>
            <div className="space-y-4">
              {/* Price Range Display */}
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">Min Price</div>
                  <div className="text-lg font-bold text-blue-600">
                    RM{localFilters.priceRange?.min || 0}
                  </div>
                </div>
                <div className="text-gray-400">—</div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">Max Price</div>
                  <div className="text-lg font-bold text-blue-600">
                    RM{localFilters.priceRange?.max || 500}
                  </div>
                </div>
              </div>

              {/* Dual-Knob Slider */}
              <div className="px-2">
                <Slider
                  value={[
                    localFilters.priceRange?.min || 0,
                    localFilters.priceRange?.max || 500,
                  ]}
                  onValueChange={handlePriceRangeChange}
                  max={500}
                  min={0}
                  step={10}
                  className="w-full"
                />
              </div>

              {/* Price Range Labels */}
              <div className="flex justify-between text-xs text-gray-500">
                <span>RM0</span>
                <span>RM500</span>
              </div>

              {/* Quick Price Presets */}
              <div className="space-y-2">
                <div className="text-xs text-gray-500 font-medium">
                  Quick Presets:
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleFilterChange("priceRange", { min: 0, max: 50 })
                    }
                    className="text-xs"
                  >
                    Budget (RM0-50)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleFilterChange("priceRange", { min: 50, max: 120 })
                    }
                    className="text-xs"
                  >
                    Mid (RM50-120)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleFilterChange("priceRange", { min: 120, max: 500 })
                    }
                    className="text-xs"
                  >
                    Premium (RM120+)
                  </Button>
                </div>
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
        </div>
      ) : (
        // Render with Card wrapper for desktop sidebar
        <Card className="sticky top-24">
          <CardHeader className="hidden lg:block">
            <CardTitle className="text-lg">Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Search by Name */}
            <div>
              <Label
                htmlFor="search-filter"
                className="font-semibold text-gray-900 mb-3 block"
              >
                Search by Name
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="search-filter"
                  type="text"
                  placeholder="Search spaces..."
                  value={localFilters.searchQuery || ""}
                  onChange={(e) =>
                    handleFilterChange("searchQuery", e.target.value)
                  }
                  className="pl-10"
                />
              </div>
            </div>

            {/* Date Filter */}
            <div>
              <Label
                htmlFor="date-filter"
                className="font-semibold text-gray-900 mb-3 block"
              >
                Select Date
              </Label>
              <Select
                value={localFilters.date || "any"}
                onValueChange={(value) =>
                  handleFilterChange(
                    "date",
                    value === "any" ? undefined : value
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any date</SelectItem>
                  {getAvailableDates().map((date) => (
                    <SelectItem key={date} value={date}>
                      {formatDate(date)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

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
                      checked={
                        localFilters.types?.includes(type.value) || false
                      }
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

            {/* Price Range Filter with Dual-Knob Slider */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Price Range (RM/hour)
              </h3>
              <div className="space-y-4">
                {/* Price Range Display */}
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">Min Price</div>
                    <div className="text-lg font-bold text-blue-600">
                      RM{localFilters.priceRange?.min || 0}
                    </div>
                  </div>
                  <div className="text-gray-400">—</div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">Max Price</div>
                    <div className="text-lg font-bold text-blue-600">
                      RM{localFilters.priceRange?.max || 500}
                    </div>
                  </div>
                </div>

                {/* Dual-Knob Slider */}
                <div className="px-2">
                  <Slider
                    value={[
                      localFilters.priceRange?.min || 0,
                      localFilters.priceRange?.max || 500,
                    ]}
                    onValueChange={handlePriceRangeChange}
                    max={500}
                    min={0}
                    step={10}
                    className="w-full"
                  />
                </div>

                {/* Price Range Labels */}
                <div className="flex justify-between text-xs text-gray-500">
                  <span>RM0</span>
                  <span>RM500</span>
                </div>

                {/* Quick Price Presets */}
                <div className="space-y-2">
                  <div className="text-xs text-gray-500 font-medium">
                    Quick Presets:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleFilterChange("priceRange", { min: 0, max: 50 })
                      }
                      className="text-xs"
                    >
                      Budget (RM0-50)
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleFilterChange("priceRange", { min: 50, max: 120 })
                      }
                      className="text-xs"
                    >
                      Mid (RM50-120)
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleFilterChange("priceRange", { min: 120, max: 500 })
                      }
                      className="text-xs"
                    >
                      Premium (RM120+)
                    </Button>
                  </div>
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
      )}
    </>
  );
};

export default SpaceFilters;
