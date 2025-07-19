import { useNavigate } from "react-router-dom";
import type { Space } from "../../types/booking";
import { Button } from "../shared/ui/button";
import { Card, CardContent, CardHeader } from "../shared/ui/card";
import { Badge } from "../shared/ui/badge";

interface SpaceCardProps {
  space: Space;
  onBook?: () => void;
}

const SpaceCard = ({ space }: SpaceCardProps) => {
  const navigate = useNavigate();

  const getSpaceTypeIcon = (type: string) => {
    switch (type) {
      case "sport":
        return "🏀";
      case "meeting":
        return "💼";
      case "coworking":
        return "💻";
      case "event":
        return "🎟️";
      default:
        return "🏢";
    }
  };

  const getSpaceTypeLabel = (type: string) => {
    switch (type) {
      case "sport":
        return "Sport Venue";
      case "meeting":
        return "Meeting Room";
      case "coworking":
        return "Coworking Space";
      case "event":
        return "Event Hall";
      default:
        return "Space";
    }
  };

  const availableToday = space.availability.filter(
    (slot) =>
      slot.date === new Date().toISOString().split("T")[0] && slot.isAvailable
  ).length;

  const handleBookClick = () => {
    navigate(`/booking/space/${space.id}`);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        {/* Image Placeholder */}
        <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">
                {getSpaceTypeIcon(space.type)}
              </div>
              <div className="text-sm text-gray-600">Photo coming soon</div>
            </div>
          </div>
          <Badge className="absolute top-3 left-3 bg-white text-gray-800 hover:bg-white">
            {getSpaceTypeLabel(space.type)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {space.name}
            </h3>
            <p className="text-sm text-gray-600">
              📍 {space.location.address}, {space.location.city}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-700 line-clamp-2 mt-4">
            {space.description}
          </p>

          {/* Rating and Reviews */}
          <div className="flex items-center space-x-2 mt-4">
            <div className="flex items-center">
              <span className="text-yellow-400">⭐</span>
              <span className="text-sm font-medium text-gray-900 ml-1">
                {space.rating}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              ({space.reviews} reviews)
            </span>
          </div>

          {/* Amenities */}
          <div className="mt-4 min-h-[48px]">
            <div className="flex flex-wrap gap-1">
              {space.amenities.slice(0, 3).map((amenity) => (
                <Badge key={amenity} variant="secondary" className="text-xs">
                  {amenity}
                </Badge>
              ))}
              {space.amenities.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{space.amenities.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          {/* Pricing and Availability */}
          <div className="flex justify-between items-start pt-2 border-t mt-4 min-h-[60px]">
            <div className="flex flex-col">
              <div className="text-lg font-bold text-gray-900">
                RM{space.pricePerHour}
                <span className="text-sm font-normal text-gray-600">/hour</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Capacity: {space.capacity}{" "}
                {space.capacity === 1 ? "person" : "people"}
              </div>
            </div>
            <div className="text-right flex flex-col">
              <div className="text-sm text-green-600 font-medium">
                {availableToday} slots today
              </div>
            </div>
          </div>

          {/* Book Button - pushed to bottom */}
          <div className="mt-auto pt-4">
            <Button
              onClick={handleBookClick}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              View & Book
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpaceCard;
