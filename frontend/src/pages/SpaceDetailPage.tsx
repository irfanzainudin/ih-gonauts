import { useParams, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import type { TimeSlot, BookingRequest } from "../types/booking";
import { mockSpaces } from "../lib/mockData";
import { getSpaceAvailability } from "../lib/bookingService";
import { Button } from "../components/shared/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/shared/ui/card";
import { Badge } from "../components/shared/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/shared/ui/accordion";
import {
  Dribbble,
  Briefcase,
  Monitor,
  Ticket,
  Building2,
  MapPin,
  Star,
  Search,
  Wallet,
  CreditCard,
  Loader2,
} from "lucide-react";
import { useWalletConnection } from "../hooks/useWalletConnection";
import WalletRequiredModal from "../components/shared/ui/wallet-required-modal";
import StripePaymentModal from "../components/shared/ui/stripe-payment-modal";
import IotaPaymentModal from "../components/shared/ui/iota-payment-modal";
import { useWallets, useConnectWallet } from "@iota/dapp-kit";
import { toast } from "sonner";
import { mockBookingHistory } from "../lib/loyaltyService";
import { calculateLoyaltyProgress } from "../lib/loyaltyService";

const SpaceDetailPage = () => {
  const { spaceId } = useParams<{ spaceId: string }>();
  const navigate = useNavigate();
  const { isConnected, isAutoConnecting } = useWalletConnection();
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showStripeModal, setShowStripeModal] = useState(false);
  const [showIotaModal, setShowIotaModal] = useState(false);
  const wallets = useWallets();
  const { mutate: connect, isPending } = useConnectWallet();

  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlot[]>([]);
  const [bookingUpdateTrigger, setBookingUpdateTrigger] = useState(0);

  // Find the space by ID
  const space = useMemo(() => {
    return mockSpaces.find((s) => s.id === spaceId);
  }, [spaceId]);

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
    if (!space) return [];
    const spaceAvailability = getSpaceAvailability(space.id);
    return spaceAvailability.filter((slot) => slot.date === selectedDate);
  }, [space, selectedDate, bookingUpdateTrigger]);

  // Calculate total price and duration
  const bookingSummary = useMemo(() => {
    const totalPrice = selectedTimeSlots.reduce(
      (sum, slot) => sum + slot.price,
      0
    );
    const duration = selectedTimeSlots.length;
    return { totalPrice, duration };
  }, [selectedTimeSlots]);

  // Calculate loyalty progress
  const loyaltyProgress = useMemo(() => {
    return calculateLoyaltyProgress(mockBookingHistory);
  }, []);

  const handleTimeSlotToggle = (slot: TimeSlot) => {
    setSelectedTimeSlots((prev) => {
      const isSelected = prev.some((s) => s.startTime === slot.startTime);
      if (isSelected) {
        return prev.filter((s) => s.startTime !== slot.startTime);
      } else {
        return [...prev, slot].sort((a, b) =>
          a.startTime.localeCompare(b.startTime)
        );
      }
    });
  };

  const createBookingRequest = (): BookingRequest => {
    if (!space) throw new Error("Space not found");
    if (selectedTimeSlots.length === 0)
      throw new Error("No time slots selected");

    return {
      spaceId: space.id,
      date: selectedDate,
      startTime: selectedTimeSlots[0].startTime,
      endTime: selectedTimeSlots[selectedTimeSlots.length - 1].endTime,
      duration: bookingSummary.duration,
      totalPrice: bookingSummary.totalPrice,
    };
  };

  const handleIotaWalletBooking = async () => {
    if (selectedTimeSlots.length === 0 || !space) {
      toast.error("Please select time slots before proceeding with payment");
      return;
    }

    if (!isConnected) {
      setShowWalletModal(true);
      return;
    }

    setShowIotaModal(true);
  };

  const handleBookingCompleted = () => {
    // Trigger re-render to update slot availability
    setBookingUpdateTrigger((prev) => prev + 1);
    // Clear selected slots after booking
    setSelectedTimeSlots([]);
  };

  const handleStripeBooking = () => {
    if (selectedTimeSlots.length === 0 || !space) {
      toast.error("Please select time slots before proceeding with payment");
      return;
    }

    setShowStripeModal(true);
  };

  const handleStripePaymentError = (error: string) => {
    toast.error(`Payment failed: ${error}`);
  };

  const handleIotaPaymentError = (error: string) => {
    toast.error(`IOTA payment failed: ${error}`);
  };

  const handleConnectWallet = () => {
    if (wallets.length === 0) {
      toast.error(
        "No wallets detected. Please install a compatible IOTA wallet like Firefly or Bloom."
      );
      return;
    }

    // Connect to the first available wallet
    connect(
      { wallet: wallets[0] },
      {
        onSuccess: () => {
          console.log("Connected to wallet:", wallets[0].name);
          toast.success(`Successfully connected to ${wallets[0].name}!`);
          setShowWalletModal(false);
        },
        onError: (error) => {
          console.error("Failed to connect to wallet:", error);
          toast.error(`Failed to connect wallet: ${error.message}`);
        },
      }
    );
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

  const getSpaceTypeIcon = (type: string) => {
    switch (type) {
      case "sport":
        return <Dribbble className="w-8 h-8 text-blue-600" />;
      case "meeting":
        return <Briefcase className="w-8 h-8 text-blue-600" />;
      case "coworking":
        return <Monitor className="w-8 h-8 text-blue-600" />;
      case "event":
        return <Ticket className="w-8 h-8 text-blue-600" />;
      default:
        return <Building2 className="w-8 h-8 text-blue-600" />;
    }
  };

  const getSpaceImages = (): string[] => {
    // Return array of 6 items for consistent layout
    return Array(6).fill("");
  };

  if (!space) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Search className="w-16 h-16 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Space not found
          </h2>
          <p className="text-gray-600 mb-6">
            The space you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate("/booking")}>
            ← Back to Booking
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => navigate("/booking")}
          className="mb-6"
        >
          ← Back to Booking
        </Button>

        {/* Space Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{getSpaceTypeIcon(space.type)}</div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {space.name}
                </h1>
                <p className="text-gray-600 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {space.location.address}, {space.location.city}
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 font-medium">{space.rating}</span>
                    <span className="ml-1 text-gray-500">
                      ({space.reviews} reviews)
                    </span>
                  </div>
                  <Badge variant="secondary">
                    {space.type.charAt(0).toUpperCase() + space.type.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                RM{space.pricePerHour}
                <span className="text-lg text-gray-600">/hour</span>
              </div>
              <div className="text-sm text-gray-500">
                Capacity: {space.capacity}{" "}
                {space.capacity === 1 ? "person" : "people"}
              </div>
            </div>
          </div>
        </div>

        {/* Space Images */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="gallery" className="border-none">
              <AccordionTrigger className="text-xl font-semibold text-gray-900 hover:no-underline py-0">
                Gallery
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getSpaceImages().map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="w-full h-48 rounded-lg shadow-sm group-hover:shadow-md transition-all duration-200 bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="flex justify-center mb-2">
                              {getSpaceTypeIcon(space.type)}
                            </div>
                            <div className="text-sm text-gray-600">
                              Photo coming soon
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Space Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About this space</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{space.description}</p>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {space.amenities.map((amenity) => (
                    <Badge key={amenity} variant="secondary">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Date Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Date</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {availableDates.map((date) => (
                    <Button
                      key={date}
                      variant={selectedDate === date ? "default" : "outline"}
                      onClick={() => {
                        setSelectedDate(date);
                        setSelectedTimeSlots([]);
                      }}
                    >
                      {formatDate(date)}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Time Slots */}
            <Card>
              <CardHeader>
                <CardTitle>Time Slots ({formatDate(selectedDate)})</CardTitle>
              </CardHeader>
              <CardContent>
                {availableSlots.length > 0 ? (
                  <div className="space-y-4">
                    {/* Legend */}
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
                        <span>Available</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-100 border border-red-300 rounded"></div>
                        <span>Booked</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded"></div>
                        <span>Selected</span>
                      </div>
                    </div>

                    {/* Time Slots Grid */}
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {availableSlots.map((slot) => {
                        const isSelected = selectedTimeSlots.some(
                          (s) => s.startTime === slot.startTime
                        );
                        const isBooked = !slot.isAvailable;

                        return (
                          <Button
                            key={`${slot.date}-${slot.startTime}`}
                            variant={
                              isSelected
                                ? "default"
                                : isBooked
                                ? "outline"
                                : "outline"
                            }
                            onClick={() =>
                              !isBooked && handleTimeSlotToggle(slot)
                            }
                            disabled={isBooked}
                            className={`text-xs p-2 h-auto flex flex-col ${
                              isBooked
                                ? "bg-red-50 border-red-300 text-red-700 hover:bg-red-50 cursor-not-allowed"
                                : isSelected
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "hover:bg-gray-50"
                            }`}
                          >
                            <div className={isBooked ? "line-through" : ""}>
                              {slot.startTime}
                            </div>
                            <div
                              className={`text-xs ${
                                isBooked ? "opacity-50" : "opacity-75"
                              }`}
                            >
                              RM{slot.price}
                            </div>
                            {isBooked && (
                              <div className="text-xs text-red-600 font-medium">
                                Booked
                              </div>
                            )}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">
                    No time slots available for this date
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
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

                    {/* Loyalty Rewards */}
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-3 rounded-lg border border-purple-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">🥇</span>
                          <span className="font-medium text-purple-700">
                            {loyaltyProgress.currentTier.name} Member
                          </span>
                        </div>
                        <span className="text-sm text-purple-600 font-medium">
                          {loyaltyProgress.currentTier.discountPercentage}% off
                        </span>
                      </div>
                      <div className="text-sm text-purple-600">
                        Earn {loyaltyProgress.currentTier.rewardTokens} IOTA
                        tokens with this booking
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button
                        onClick={handleIotaWalletBooking}
                        disabled={isAutoConnecting}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                      >
                        {isAutoConnecting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Reconnecting...
                          </>
                        ) : (
                          <>
                            <Wallet className="w-4 h-4 mr-2" />
                            Book with IOTA Wallet
                          </>
                        )}
                      </Button>

                      <Button
                        onClick={handleStripeBooking}
                        variant="outline"
                        className="w-full border-green-600 text-green-600 hover:bg-green-50"
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Pay with MYR
                      </Button>
                    </div>
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
      </div>

      <WalletRequiredModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onConnectWallet={handleConnectWallet}
        isConnecting={isPending}
      />

      {showStripeModal && selectedTimeSlots.length > 0 && (
        <StripePaymentModal
          isOpen={showStripeModal}
          onClose={() => setShowStripeModal(false)}
          bookingRequest={createBookingRequest()}
          onPaymentError={handleStripePaymentError}
          onPaymentSuccess={handleBookingCompleted}
        />
      )}

      {showIotaModal && selectedTimeSlots.length > 0 && (
        <IotaPaymentModal
          isOpen={showIotaModal}
          onClose={() => setShowIotaModal(false)}
          bookingRequest={createBookingRequest()}
          onPaymentError={handleIotaPaymentError}
          onPaymentSuccess={handleBookingCompleted}
        />
      )}
    </div>
  );
};

export default SpaceDetailPage;
