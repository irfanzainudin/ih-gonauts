import { useState, useMemo } from "react";
import type { Space, TimeSlot, BookingRequest } from "../../types/booking";
import { Button } from "../shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../shared/ui/card";
import { Badge } from "../shared/ui/badge";
import { MapPin } from "lucide-react";

interface BookingModalProps {
  space: Space;
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal = ({ space, isOpen, onClose }: BookingModalProps) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlot[]>([]);

  // Get available dates (next 7 days)
  const availableDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
  }, []);

  // Get available time slots for selected date
  const availableSlots = useMemo(() => {
    return space.availability.filter(
      (slot) => slot.date === selectedDate && slot.isAvailable
    );
  }, [space.availability, selectedDate]);

  // Calculate total price and duration
  const bookingSummary = useMemo(() => {
    const totalPrice = selectedTimeSlots.reduce(
      (sum, slot) => sum + slot.price,
      0
    );
    const duration = selectedTimeSlots.length;
    return { totalPrice, duration };
  }, [selectedTimeSlots]);

  const handleTimeSlotToggle = (slot: TimeSlot) => {
    setSelectedTimeSlots((prev) => {
      const isSelected = prev.some((s) => s.startTime === slot.startTime);
      if (isSelected) {
        return prev.filter((s) => s.startTime !== slot.startTime);
      } else {
        // Add slot and sort by time
        return [...prev, slot].sort((a, b) =>
          a.startTime.localeCompare(b.startTime)
        );
      }
    });
  };

  const handleBooking = async () => {
    if (selectedTimeSlots.length === 0) return;

    const bookingRequest: BookingRequest = {
      spaceId: space.id,
      date: selectedDate,
      startTime: selectedTimeSlots[0].startTime,
      endTime: selectedTimeSlots[selectedTimeSlots.length - 1].endTime,
      duration: bookingSummary.duration,
      totalPrice: bookingSummary.totalPrice,
    };

    // Here you would integrate with IOTA wallet and booking API
    console.log("Booking request:", bookingRequest);

    // Show success message and close modal
    alert(
      `Booking confirmed! You'll be charged RM${bookingSummary.totalPrice} for ${bookingSummary.duration} hour(s).`
    );
    onClose();
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto">
        <CardHeader className="border-b">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{space.name}</CardTitle>
              <p className="text-gray-600 mt-1 flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {space.location.address}, {space.location.city}
              </p>
            </div>
            <Button variant="outline" onClick={onClose}>
              ✕
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Space Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Space Info */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  About this space
                </h3>
                <p className="text-gray-700 mb-4">{space.description}</p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Capacity:</span>
                    <span className="ml-2 font-medium">
                      {space.capacity} people
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Price:</span>
                    <span className="ml-2 font-medium">
                      RM{space.pricePerHour}/hour
                    </span>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {space.amenities.map((amenity) => (
                    <Badge key={amenity} variant="secondary">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Select Date
                </h3>
                <div className="flex flex-wrap gap-2">
                  {availableDates.map((date) => (
                    <Button
                      key={date}
                      variant={selectedDate === date ? "default" : "outline"}
                      onClick={() => {
                        setSelectedDate(date);
                        setSelectedTimeSlots([]);
                      }}
                      className="text-sm"
                    >
                      {formatDate(date)}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Available Time Slots ({formatDate(selectedDate)})
                </h3>
                {availableSlots.length > 0 ? (
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {availableSlots.map((slot) => {
                      const isSelected = selectedTimeSlots.some(
                        (s) => s.startTime === slot.startTime
                      );
                      return (
                        <Button
                          key={`${slot.date}-${slot.startTime}`}
                          variant={isSelected ? "default" : "outline"}
                          onClick={() => handleTimeSlotToggle(slot)}
                          className="text-xs p-2 h-auto flex flex-col"
                        >
                          <div>{slot.startTime}</div>
                          <div className="text-xs opacity-75">
                            RM{slot.price}
                          </div>
                        </Button>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-gray-500">
                    No available slots for this date
                  </p>
                )}
              </div>
            </div>

            {/* Right Column - Booking Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-lg">Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedTimeSlots.length > 0 ? (
                    <>
                      <div>
                        <div className="text-sm text-gray-600">Date</div>
                        <div className="font-medium">
                          {formatDate(selectedDate)}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-gray-600">Time</div>
                        <div className="font-medium">
                          {selectedTimeSlots[0].startTime} -{" "}
                          {
                            selectedTimeSlots[selectedTimeSlots.length - 1]
                              .endTime
                          }
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-gray-600">Duration</div>
                        <div className="font-medium">
                          {bookingSummary.duration} hour(s)
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Total</span>
                          <span className="text-xl font-bold text-blue-600">
                            RM{bookingSummary.totalPrice}
                          </span>
                        </div>
                      </div>

                      <Button
                        onClick={handleBooking}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        Book with IOTA Wallet
                      </Button>
                    </>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      Select time slots to see pricing
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingModal;
