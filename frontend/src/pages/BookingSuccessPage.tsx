import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "../components/shared/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/shared/ui/card";
import { Badge } from "../components/shared/ui/badge";
import {
  CheckCircle,
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  QrCode,
} from "lucide-react";
import { toast } from "sonner";
import QRCode from "qrcode";

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
  transactionHash?: string;
  stripePaymentIntentId?: string;
}

const BookingSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");

  const generateQRCode = useCallback(async (booking: BookingDetails) => {
    try {
      const bookingData = {
        bookingId: booking.id,
        spaceName: booking.spaceName,
        date: booking.date,
        time: booking.time,
        amount: booking.totalAmount,
        paymentMethod: booking.paymentMethod,
        transactionHash: booking.transactionHash,
        stripePaymentIntentId: booking.stripePaymentIntentId,
        status: booking.paymentStatus,
        verified: true,
        timestamp: new Date().toISOString(),
      };

      const qrData = JSON.stringify(bookingData);
      const qrCodeUrl = await QRCode.toDataURL(qrData, {
        width: 200,
        margin: 2,
        color: {
          dark: "#1E40AF", // Blue color for better visibility
          light: "#FFFFFF",
        },
      });

      setQrCodeDataUrl(qrCodeUrl);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  }, []);

  const verifyPaymentAndGetBookingDetails = useCallback(
    async (
      paymentId: string,
      isDemo: boolean = false,
      isRealStripe: boolean = false,
      paymentMethod?: string | null
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
          paymentMethod: paymentMethod === "iota" ? "iota_wallet" : "stripe",
          paymentStatus: "completed",
          spaceLocation: "Kuala Lumpur, Malaysia",
          amenities: ["Projector", "Whiteboard", "Coffee Service"],
          transactionHash: paymentMethod === "iota" ? paymentId : undefined,
          stripePaymentIntentId:
            paymentMethod !== "iota" ? paymentId : undefined,
        };

        setBookingDetails(mockBookingDetails);

        // Generate QR code for IOTA transactions
        if (paymentMethod === "iota") {
          await generateQRCode(mockBookingDetails);
        }

        if (paymentMethod === "iota") {
          console.log("🎯 IOTA: Payment completed via IOTA wallet");
          toast.success("IOTA payment completed! Your booking is confirmed.");
        } else if (isRealStripe) {
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
    },
    [generateQRCode]
  );

  useEffect(() => {
    // Get payment details from URL params
    const paymentIntentId = searchParams.get("payment_intent");
    const transactionHash = searchParams.get("transaction_hash");
    const paymentMethod = searchParams.get("payment_method");
    const isDemo = searchParams.get("demo") === "true";
    const isRealStripe = searchParams.get("real_stripe") === "true";

    if (paymentIntentId || transactionHash) {
      // In a real app, you would verify the payment with your backend
      // and retrieve booking details
      verifyPaymentAndGetBookingDetails(
        paymentIntentId || transactionHash || "",
        isDemo,
        isRealStripe,
        paymentMethod
      );
    } else {
      setIsLoading(false);
    }
  }, [searchParams, verifyPaymentAndGetBookingDetails]);

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
                {searchParams.get("payment_method") === "iota"
                  ? "IOTA WALLET SUCCESS"
                  : searchParams.get("real_stripe") === "true"
                  ? "STRIPE SANDBOX SUCCESS"
                  : "DEMO SUCCESS"}
              </span>
            </div>
            <p className="text-sm text-green-700">
              {searchParams.get("payment_method") === "iota"
                ? "Payment completed via IOTA wallet - transaction confirmed on IOTA network"
                : searchParams.get("real_stripe") === "true"
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

        {/* QR Code for IOTA Transactions */}
        {bookingDetails?.paymentMethod === "iota_wallet" && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-blue-600" />
                Booking Verification QR Code
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <p className="text-sm text-gray-600">
                  Scan this QR code to verify your booking details and IOTA
                  transaction
                </p>
                {qrCodeDataUrl ? (
                  <div className="flex justify-center">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <img
                        src={qrCodeDataUrl}
                        alt="Booking QR Code"
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-48 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <QrCode className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">
                        Generating QR code...
                      </p>
                    </div>
                  </div>
                )}
                <div className="text-xs text-gray-500 space-y-1">
                  <p>
                    This QR code contains encrypted booking information for
                    verification purposes
                  </p>
                  {bookingDetails.transactionHash && (
                    <p className="font-mono text-xs bg-gray-100 p-2 rounded">
                      TX Hash: {bookingDetails.transactionHash.slice(0, 8)}...
                      {bookingDetails.transactionHash.slice(-8)}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

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
