import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import type { BookingFilters, SpaceType } from "../types/booking";
import { mockSpaces } from "../lib/mockData";
import SpaceFilters from "../components/booking/SpaceFilters";
import SpaceCard from "../components/booking/SpaceCard";

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<BookingFilters>({});

  // Initialize filters based on URL parameters
  useEffect(() => {
    const typeParam = searchParams.get("type") as SpaceType;
    if (
      typeParam &&
      ["sport", "meeting", "coworking", "event"].includes(typeParam)
    ) {
      setFilters({ types: [typeParam] });
    } else {
      // Default: all types selected
      setFilters({ types: ["sport", "meeting", "coworking", "event"] });
    }
  }, [searchParams]);

  // Filter spaces based on current filters
  const filteredSpaces = useMemo(() => {
    let filtered = mockSpaces;

    if (filters.types && filters.types.length > 0) {
      filtered = filtered.filter((space) =>
        filters.types!.includes(space.type)
      );
    }

    if (filters.location) {
      filtered = filtered.filter(
        (space) =>
          space.location.city
            .toLowerCase()
            .includes(filters.location!.toLowerCase()) ||
          space.location.address
            .toLowerCase()
            .includes(filters.location!.toLowerCase())
      );
    }

    if (filters.priceRange) {
      filtered = filtered.filter(
        (space) =>
          space.pricePerHour >= filters.priceRange!.min &&
          space.pricePerHour <= filters.priceRange!.max
      );
    }

    if (filters.capacity) {
      filtered = filtered.filter(
        (space) => space.capacity >= filters.capacity!
      );
    }

    return filtered;
  }, [filters]);

  const handleFilterChange = (newFilters: BookingFilters) => {
    setFilters(newFilters);
  };

  const getFilteredTypeLabel = () => {
    if (!filters.types || filters.types.length === 4) {
      return "All Spaces";
    }
    if (filters.types.length === 1) {
      const typeLabels = {
        sport: "Sport Venues",
        meeting: "Meeting Rooms",
        coworking: "Coworking Spaces",
        event: "Event Halls",
      };
      return typeLabels[filters.types[0]];
    }
    return `${filters.types.length} Space Types`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Book Your Space
          </h1>
          <p className="text-gray-600">
            Find and reserve the perfect space for your needs across Malaysia
          </p>
          {filters.types && filters.types.length < 4 && (
            <div className="mt-2">
              <span className="text-sm text-blue-600 font-medium">
                Showing: {getFilteredTypeLabel()}
              </span>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <SpaceFilters
              filters={filters}
              onFiltersChange={handleFilterChange}
            />
          </div>

          {/* Space Listings */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                {filteredSpaces.length} space
                {filteredSpaces.length !== 1 ? "s" : ""} found
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredSpaces.map((space) => (
                <SpaceCard key={space.id} space={space} />
              ))}
            </div>

            {filteredSpaces.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No spaces found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your filters to find more options
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
