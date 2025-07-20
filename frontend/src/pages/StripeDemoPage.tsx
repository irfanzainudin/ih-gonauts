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
import { CheckCircle, ArrowLeft, DollarSign, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { transactionService } from "../lib/transactionService";
import type { BookingRequest } from "../types/booking";

const StripeDemoPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const paymentIntentId = searchParams.get("payment_intent");
  const amount = searchParams.get("amount") || "120";
  const currency = searchParams.get("currency") || "MYR";

  useEffect(() => {
    if (paymentIntentId && !isProcessing && !isSuccess) {
      handlePaymentProcessing();
    }
  }, [paymentIntentId]);

  const handlePaymentProcessing = async () => {
    setIsProcessing(true);
    try {
      // Simulate payment processing delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Create a mock booking request
      const bookingRequest: BookingRequest = {
        spaceId: "demo-space",
        date: new Date().toISOString().split("T")[0],
        startTime: "09:00",
        endTime: "11:00",
        duration: 2,
        totalPrice: parseInt(amount),
      };

      // Store the transaction using the transaction service
      await transactionService.simulateStripeTransaction(
        bookingRequest,
        paymentIntentId || "demo-payment-intent"
      );

      console.log("🎯 DEMO: Stripe payment completed successfully");
      setIsSuccess(true);
      toast.success("Payment completed successfully!");

      // Navigate to success page after a short delay
      setTimeout(() => {
        navigate(
          `/booking/success?payment_intent=${paymentIntentId}&demo=true&real_stripe=false`
        );
      }, 2000);
    } catch (error) {
      console.error("❌ DEMO: Payment failed:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-6">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <DollarSign className="w-6 h-6 text-blue-600" />
              Stripe Payment Demo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Demo Indicator */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2 justify-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-yellow-800">
                  DEMO MODE
                </span>
              </div>
              <p className="text-xs text-yellow-700">
                This is a simulated Stripe payment page for demo purposes
              </p>
            </div>

            {!isProcessing && !isSuccess ? (
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Payment Details
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Amount: {currency} {amount}
                  </p>
                  <p className="text-sm text-gray-500">
                    Payment Intent ID: {paymentIntentId}
                  </p>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handlePaymentProcessing}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Complete Payment
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => navigate("/")}
                    className="w-full"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Cancel Payment
                  </Button>
                </div>
              </div>
            ) : isProcessing ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Processing Payment
                  </h3>
                  <p className="text-gray-600">
                    Please wait while we process your payment...
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Payment Successful!
                  </h3>
                  <p className="text-gray-600">
                    Your payment has been processed successfully.
                  </p>
                  <Badge className="mt-2" variant="secondary">
                    Payment Confirmed
                  </Badge>
                </div>
              </div>
            )}

            <div className="text-center text-xs text-gray-500">
              <p>🔒 Secure payment processing by Stripe</p>
              <p>💳 Supports cards, digital wallets, and more</p>
              <p>📱 Responsive design for all devices</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StripeDemoPage;
