import { Card, CardContent, CardHeader, CardTitle } from "../shared/ui/card";
import { Badge } from "../shared/ui/badge";
import { Button } from "../shared/ui/button";
import { MapPin, Users, Star } from "lucide-react";
import type { Space } from "../../types/booking";

interface SpaceCardProps {
  space: Space;
  onBook: (space: Space) => void;
}

const SpaceCard = ({ space, onBook }: SpaceCardProps) => {
  const handleBookClick = () => {
    onBook(space);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "sport":
        return "bg-blue-100 text-blue-800";
      case "meeting":
        return "bg-purple-100 text-purple-800";
      case "coworking":
        return "bg-green-100 text-green-800";
      case "event":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "sport":
        return "Sports";
      case "meeting":
        return "Meeting";
      case "coworking":
        return "Coworking";
      case "event":
        return "Event";
      default:
        return type;
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
              {space.name}
            </CardTitle>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">
                {space.location.address}, {space.location.city}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                <span>Up to {space.capacity} people</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 text-yellow-500" />
                <span>
                  {space.rating} ({space.reviews} reviews)
                </span>
              </div>
            </div>
          </div>
          <Badge
            className={`${getTypeColor(space.type)} ml-3 flex-shrink-0 -mt-2`}
          >
            {getTypeLabel(space.type)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">
          {space.description}
        </p>

        <div className="space-y-3">
          <div className="flex flex-wrap gap-1 min-h-[24px]">
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

          <div className="flex items-center justify-between pt-2">
            <div className="text-2xl font-bold text-blue-600">
              RM{space.pricePerHour}/hour
            </div>
            <Button
              onClick={handleBookClick}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Book Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpaceCard;
