import { useParams, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import type { TimeSlot, BookingRequest } from "../types/booking";
import { mockSpaces } from "../lib/mockData";
import { Button } from "../components/shared/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/shared/ui/card";
import { Badge } from "../components/shared/ui/badge";
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
} from "lucide-react";
import { useWalletConnection } from "../hooks/useWalletConnection";
import WalletRequiredModal from "../components/shared/ui/wallet-required-modal";
import StripePaymentModal from "../components/shared/ui/stripe-payment-modal";
import { useWallets, useConnectWallet } from "@iota/dapp-kit";
import { toast } from "sonner";

const SpaceDetailPage = () => {
  const { spaceId } = useParams<{ spaceId: string }>();
  const navigate = useNavigate();
  const { isConnected } = useWalletConnection();
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showStripeModal, setShowStripeModal] = useState(false);
  const wallets = useWallets();
  const { mutate: connect, isPending } = useConnectWallet();

  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlot[]>([]);

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
    return space.availability.filter(
      (slot) => slot.date === selectedDate && slot.isAvailable
    );
  }, [space, selectedDate]);

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
    if (selectedTimeSlots.length === 0 || !space) return;

    if (!isConnected) {
      setShowWalletModal(true);
      return;
    }

    try {
      const bookingRequest = createBookingRequest();
      bookingRequest.paymentMethod = "iota_wallet";
      bookingRequest.paymentStatus = "pending";

      console.log("IOTA Wallet booking request:", bookingRequest);

      // Here you would integrate with IOTA smart contract
      // For now, we'll simulate the transaction
      await simulateIotaTransaction(bookingRequest);

      toast.success(
        `Booking confirmed for ${space.name}! Total: RM${bookingSummary.totalPrice}`
      );
      navigate("/booking");
    } catch {
      toast.error("Failed to process IOTA wallet payment");
    }
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

  // Simulate IOTA transaction
  const simulateIotaTransaction = async (bookingRequest: BookingRequest) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // In a real implementation, this would:
    // 1. Sign the transaction with the connected wallet
    // 2. Submit to IOTA network
    // 3. Wait for confirmation
    // 4. Update booking status

    console.log("IOTA transaction simulated:", bookingRequest);
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
                <CardTitle>
                  Available Time Slots ({formatDate(selectedDate)})
                </CardTitle>
              </CardHeader>
              <CardContent>
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

                    <div className="space-y-3">
                      <Button
                        onClick={handleIotaWalletBooking}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                      >
                        <Wallet className="w-4 h-4 mr-2" />
                        Book with IOTA Wallet
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
        />
      )}
    </div>
  );
};

export default SpaceDetailPage;
