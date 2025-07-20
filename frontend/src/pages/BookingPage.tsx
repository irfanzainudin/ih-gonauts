import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import type { BookingFilters, SpaceType } from "../types/booking";
import { mockSpaces } from "../lib/mockData";
import SpaceFilters from "../components/booking/SpaceFilters";
import SpaceCard from "../components/booking/SpaceCard";
import { Button } from "../components/shared/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import { Search, Calendar, Filter } from "lucide-react";

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<BookingFilters>({});

  // Initialize filters based on URL parameters
  useEffect(() => {
    const typeParam = searchParams.get("type") as SpaceType;
    const dateParam = searchParams.get("date");
    const searchParam = searchParams.get("search");

    const newFilters: BookingFilters = {
      types:
        typeParam &&
        ["sport", "meeting", "coworking", "event"].includes(typeParam)
          ? [typeParam]
          : ["sport", "meeting", "coworking", "event"],
      date: dateParam || undefined,
      searchQuery: searchParam || undefined,
    };

    setFilters(newFilters);
  }, [searchParams]);

  // Filter spaces based on current filters
  const filteredSpaces = useMemo(() => {
    let filtered = mockSpaces;

    // Filter by space type
    if (filters.types && filters.types.length > 0) {
      filtered = filtered.filter((space) =>
        filters.types!.includes(space.type)
      );
    }

    // Filter by search query (name)
    if (filters.searchQuery) {
      filtered = filtered.filter((space) =>
        space.name.toLowerCase().includes(filters.searchQuery!.toLowerCase())
      );
    }

    // Filter by location
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

    // Filter by price range
    if (filters.priceRange) {
      filtered = filtered.filter(
        (space) =>
          space.pricePerHour >= filters.priceRange!.min &&
          space.pricePerHour <= filters.priceRange!.max
      );
    }

    // Filter by capacity
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header - Moved above the grid */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Book Your Space
          </h1>
          <p className="text-gray-600">
            Find and reserve the perfect space for your needs across Malaysia
          </p>
          {filters.date && (
            <div className="mt-2 flex items-center gap-2 text-sm text-blue-600">
              <Calendar className="w-4 h-4" />
              <span>
                Filtering for:{" "}
                {new Date(filters.date).toLocaleDateString("en-MY", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          )}

          {/* Results Count - Moved to header area */}
          <div className="mt-4 flex justify-between items-center">
            <p className="text-gray-600">
              {filteredSpaces.length} space
              {filteredSpaces.length !== 1 ? "s" : ""} found
            </p>

            {/* Mobile Filter Button */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Customize your search to find the perfect space
                    </SheetDescription>
                  </SheetHeader>
                  <div className="overflow-y-auto max-h-[calc(100vh-120px)]">
                    <SpaceFilters
                      filters={filters}
                      onFiltersChange={handleFilterChange}
                      inSheetComponent={true}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Back Button and Filters Only (Desktop Only) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-20">
              {/* Back Button */}
              <div className="mb-6">
                <Button
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="w-full"
                >
                  ← Back to Home
                </Button>
              </div>

              {/* Filters */}
              <SpaceFilters
                filters={filters}
                onFiltersChange={handleFilterChange}
              />
            </div>
          </div>

          {/* Right Side - Search Results */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 gap-6">
              {filteredSpaces.map((space) => (
                <SpaceCard
                  key={space.id}
                  space={space}
                  onBook={(space) => navigate(`/booking/space/${space.id}`)}
                />
              ))}
            </div>

            {filteredSpaces.length === 0 && (
              <div className="text-center py-12">
                <div className="flex justify-center mb-4">
                  <Search className="w-16 h-16 text-gray-400" />
                </div>
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
