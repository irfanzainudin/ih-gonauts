import { useState } from "react";
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
import { Dribbble, Briefcase, Monitor, Ticket } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string>("all");
  const [location, setLocation] = useState<string>("");
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (selectedType && selectedType !== "all") {
      params.append("type", selectedType);
    }

    if (location.trim()) {
      params.append("location", location.trim());
    }

    if (date) {
      params.append("date", date);
    }

    const queryString = params.toString();
    navigate(`/booking${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <section id="home" className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Discover & Book Spaces,
            <span className="block text-blue-600">Seamlessly</span>
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            From futsal courts to conference rooms — search, book, and access
            shared spaces in seconds. Earn rewards every time you book.
          </p>

          {/* Quick Search/CTA */}
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mb-8">
            <div className="grid md:grid-cols-4 gap-4 items-end">
              <div className="text-left">
                <Label
                  htmlFor="space-type"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Choose a space type
                </Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
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
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
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
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <Button
                size="lg"
                className="bg-blue-600 text-white hover:bg-blue-700 px-8"
                onClick={handleSearch}
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
              <Dribbble className="w-5 h-5" />
              <span>Sport Venues</span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center space-x-2"
              onClick={() => navigate("/booking?type=meeting")}
            >
              <Briefcase className="w-5 h-5" />
              <span>Meeting Rooms</span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center space-x-2"
              onClick={() => navigate("/booking?type=coworking")}
            >
              <Monitor className="w-5 h-5" />
              <span>Coworking</span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center space-x-2"
              onClick={() => navigate("/booking?type=event")}
            >
              <Ticket className="w-5 h-5" />
              <span>Events</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
