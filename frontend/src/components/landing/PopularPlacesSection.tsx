import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/shared/ui/card";
import { Badge } from "../../components/shared/ui/badge";
import { Button } from "../../components/shared/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import { Star, MapPin, Users } from "lucide-react";
import { mockSpaces } from "../../lib/mockData";
import { useNavigate } from "react-router-dom";

const PopularPlacesSection = () => {
  const navigate = useNavigate();

  // Get top 6 places by rating
  const popularPlaces = mockSpaces
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  const handlePlaceClick = (spaceId: string) => {
    navigate(`/booking/space/${spaceId}`);
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
    <section id="spaces" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Popular Places to Book
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the most popular venues and spaces that our community loves
            to book
          </p>
        </div>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 sm:-ml-4">
              {popularPlaces.map((place) => (
                <CarouselItem
                  key={place.id}
                  className="pl-2 sm:pl-4 basis-4/5 sm:basis-1/2 lg:basis-1/3"
                >
                  <Card
                    className="h-full cursor-pointer hover:shadow-lg transition-shadow duration-300"
                    onClick={() => handlePlaceClick(place.id)}
                  >
                    <CardHeader className="pb-2 sm:pb-3">
                      <div className="flex items-start justify-between">
                        <Badge
                          className={`${getTypeColor(
                            place.type
                          )} text-xs sm:text-sm`}
                        >
                          {getTypeLabel(place.type)}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs sm:text-sm font-medium">
                            {place.rating}
                          </span>
                        </div>
                      </div>
                      <CardTitle className="text-sm sm:text-lg leading-tight">
                        {place.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 sm:space-y-3">
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                        {place.description}
                      </p>

                      <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{place.location.city}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500">
                          <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>Up to {place.capacity}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm sm:text-lg font-bold text-green-600">
                            RM{place.pricePerHour}
                          </div>
                          <div className="text-xs text-gray-500">per hour</div>
                        </div>
                      </div>

                      <Button
                        className="w-full mt-2 sm:mt-3 text-xs sm:text-sm py-1 sm:py-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlaceClick(place.id);
                        }}
                      >
                        Book Now
                      </Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-10" />
            <CarouselNext className="hidden sm:flex -right-10" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default PopularPlacesSection;
