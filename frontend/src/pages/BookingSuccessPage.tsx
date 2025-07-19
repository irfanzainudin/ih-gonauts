import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "../components/shared/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/shared/ui/card";
import { Badge } from "../components/shared/ui/badge";
import { CheckCircle, ArrowLeft, Calendar, Clock, MapPin } from "lucide-react";
import { toast } from "sonner";

interface BookingDetails {
  id: string;
  spaceName: string;
  date: string;
  time: string;
  duration: number;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  spaceLocation: string;
  amenities: string[];
}

const BookingSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get payment intent ID from URL params
    const paymentIntentId = searchParams.get("payment_intent");
    const isDemo = searchParams.get("demo") === "true";
    const isRealStripe = searchParams.get("real_stripe") === "true";

    if (paymentIntentId) {
      // In a real app, you would verify the payment with your backend
      // and retrieve booking details
      verifyPaymentAndGetBookingDetails(paymentIntentId, isDemo, isRealStripe);
    } else {
      setIsLoading(false);
    }
  }, [searchParams]);

  const verifyPaymentAndGetBookingDetails = async (
    paymentIntentId: string,
    isDemo: boolean = false,
    isRealStripe: boolean = false
  ) => {
    try {
      // Simulate API call to verify payment and get booking details
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock booking details - in real app, this would come from your backend
      const mockBookingDetails: BookingDetails = {
        id: `booking_${Math.random().toString(36).substr(2, 9)}`,
        spaceName: "Premium Meeting Room",
        date: new Date().toLocaleDateString("en-MY"),
        time: "09:00 - 11:00",
        duration: 2,
        totalAmount: 120,
        paymentMethod: "stripe",
        paymentStatus: "completed",
        spaceLocation: "Kuala Lumpur, Malaysia",
        amenities: ["Projector", "Whiteboard", "Coffee Service"],
      };

      setBookingDetails(mockBookingDetails);

      if (isRealStripe) {
        console.log("🎯 REAL STRIPE: Payment completed via Stripe sandbox");
        toast.success("Payment completed via Stripe sandbox!");
      } else if (isDemo) {
        console.log("🎯 DEMO: Payment completed successfully via redirect");
        toast.success("Demo payment completed successfully!");
      }
    } catch {
      toast.error("Failed to verify payment");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (!bookingDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Your payment has been processed successfully.
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
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-gray-600">
            Your payment has been processed and your booking is confirmed.
          </p>

          {/* Demo Success Indicator */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 mt-4">
            <div className="flex items-center gap-2 mb-2 justify-center">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-800">
                {searchParams.get("real_stripe") === "true"
                  ? "STRIPE SANDBOX SUCCESS"
                  : "DEMO SUCCESS"}
              </span>
            </div>
            <p className="text-sm text-green-700">
              {searchParams.get("real_stripe") === "true"
                ? "Payment completed via Stripe test environment - no real charges were made"
                : "Demo payment completed successfully - this was a simulated transaction"}
            </p>
          </div>
        </div>

        {/* Booking Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Booking Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {bookingDetails.spaceName}
                </h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  {bookingDetails.spaceLocation}
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  {bookingDetails.date}
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  {bookingDetails.time} ({bookingDetails.duration} hours)
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  RM{bookingDetails.totalAmount}
                </div>
                <Badge variant="secondary" className="mb-2">
                  {bookingDetails.paymentMethod === "stripe"
                    ? "Card Payment"
                    : "IOTA Wallet"}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  {bookingDetails.paymentStatus}
                </Badge>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                Amenities Included
              </h4>
              <div className="flex flex-wrap gap-2">
                {bookingDetails.amenities.map((amenity: string) => (
                  <Badge key={amenity} variant="secondary">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-semibold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Check Your Email
                  </h4>
                  <p className="text-gray-600 text-sm">
                    You'll receive a confirmation email with all the details.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-semibold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Arrive on Time
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Please arrive 5 minutes before your scheduled time.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-semibold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Enjoy Your Space
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Your space will be ready and waiting for you.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => navigate("/booking")}
            variant="outline"
            className="flex-1"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Book Another Space
          </Button>

          <Button
            onClick={() => navigate("/wallet/bookings")}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            View My Bookings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessPage;
