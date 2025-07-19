import { useNavigate } from "react-router-dom";
import { Button } from "../shared/ui/button";
import { Input } from "../shared/ui/input";
import { Label } from "../shared/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shared/ui/select";

const HeroSection = () => {
  const navigate = useNavigate();

  const trustLogos = [
    "Sport Centers",
    "Coworking Hubs",
    "Meeting Rooms",
    "Event Venues",
  ];

  return (
    <section id="home" className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Find & Book Spaces
            <span className="block text-blue-600">Across Malaysia</span>
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover and instantly book sport venues, meeting rooms, coworking
            spaces, and event halls. From badminton courts to conference rooms -
            find the perfect space for your needs.
          </p>

          {/* Quick Search/CTA */}
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mb-8">
            <div className="grid md:grid-cols-4 gap-4 items-end">
              <div className="text-left">
                <Label
                  htmlFor="space-type"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  What space do you need?
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All Spaces" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Spaces</SelectItem>
                    <SelectItem value="sport">Sport Venues</SelectItem>
                    <SelectItem value="meeting">Meeting Rooms</SelectItem>
                    <SelectItem value="coworking">Coworking Spaces</SelectItem>
                    <SelectItem value="event">Event Halls</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="text-left">
                <Label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Location
                </Label>
                <Input
                  id="location"
                  type="text"
                  placeholder="Kuala Lumpur, Selangor..."
                />
              </div>

              <div className="text-left">
                <Label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  defaultValue={new Date().toISOString().split("T")[0]}
                />
              </div>

              <Button
                size="lg"
                className="bg-blue-600 text-white hover:bg-blue-700 px-8"
                onClick={() => navigate("/booking")}
              >
                Search Spaces
              </Button>
            </div>
          </div>

          {/* Quick Access Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              variant="outline"
              className="flex items-center space-x-2"
              onClick={() => navigate("/booking?type=sport")}
            >
              <span>🏀</span>
              <span>Sport Venues</span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center space-x-2"
              onClick={() => navigate("/booking?type=meeting")}
            >
              <span>💼</span>
              <span>Meeting Rooms</span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center space-x-2"
              onClick={() => navigate("/booking?type=coworking")}
            >
              <span>💻</span>
              <span>Coworking</span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center space-x-2"
              onClick={() => navigate("/booking?type=event")}
            >
              <span>🎟️</span>
              <span>Events</span>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8">
            <p className="text-sm text-gray-500 mb-4">
              TRUSTED BY LEADING SPACES ACROSS MALAYSIA
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 opacity-60">
              {trustLogos.map((logo, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-500 rounded"></div>
                  <span className="text-sm font-medium text-gray-600">
                    {logo}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
