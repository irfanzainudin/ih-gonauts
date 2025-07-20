import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { DollarSign, Loader2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import type { BookingRequest, StripePaymentData } from "../../../types/booking";
import { stripeService } from "../../../lib/stripeService";

interface StripePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingRequest: BookingRequest;
  onPaymentError: (error: string) => void;
  onPaymentSuccess?: () => void;
}

const StripePaymentModal = ({
  isOpen,
  onClose,
  bookingRequest,
  onPaymentError,
  onPaymentSuccess,
}: StripePaymentModalProps) => {
  const [paymentData, setPaymentData] = useState<StripePaymentData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleInitializePayment = async () => {
    setIsLoading(true);
    try {
      const data = await stripeService.createPaymentIntent(bookingRequest);
      setPaymentData(data);
    } catch {
      onPaymentError("Failed to initialize payment");
      toast.error("Failed to initialize payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedirectToPayment = async () => {
    if (!paymentData) return;

    setIsRedirecting(true);
    try {
      console.log("🎯 DEMO: Starting Stripe redirect flow...");

      // Store booking request in localStorage for retrieval on success
      const bookingKey = `stripe_booking_${paymentData.paymentIntentId}`;
      localStorage.setItem(bookingKey, JSON.stringify(bookingRequest));

      // Actually redirect to Stripe (or simulate it)
      await stripeService.redirectToPayment(paymentData.clientSecret);

      // Call success callback if provided
      onPaymentSuccess?.();
    } catch (error) {
      console.error("❌ DEMO: Redirect failed:", error);
      toast.error("Failed to redirect to payment page");
      setIsRedirecting(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Payment with Stripe</DialogTitle>
          <DialogDescription>
            Complete your booking with secure payment via Stripe
          </DialogDescription>
        </DialogHeader>

        {/* Demo Indicator */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-yellow-800">
              {stripeService.isRealStripeMode()
                ? "STRIPE SANDBOX"
                : "DEMO MODE"}
            </span>
          </div>
          <p className="text-xs text-yellow-700 mt-1">
            {stripeService.isRealStripeMode()
              ? "Using Stripe test environment - no real charges will be made"
              : "This is a demo - you'll be redirected to a simulated Stripe payment page"}
          </p>
        </div>

        {!paymentData ? (
          <div className="space-y-4">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <DollarSign className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Ready to Pay
              </h3>
              <p className="text-gray-600 mb-4">
                Total amount:{" "}
                {stripeService.formatAmount(bookingRequest.totalPrice)}
              </p>
              <p className="text-sm text-gray-500">
                You'll be redirected to Stripe's secure payment page to complete
                your transaction.
              </p>
            </div>

            <Button
              onClick={handleInitializePayment}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Initializing Payment...
                </>
              ) : (
                <>
                  <DollarSign className="w-4 h-4 mr-2" />
                  Proceed to Payment
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <ExternalLink className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Redirect to Stripe
              </h3>
              <p className="text-gray-600 mb-4">
                You're about to be redirected to Stripe's secure payment page.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Amount</span>
                  <span className="font-semibold text-lg">
                    {stripeService.formatAmount(paymentData.amount / 100)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Payment Method</span>
                  <Badge variant="secondary">Stripe Payment</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Currency</span>
                  <span className="text-gray-900">MYR</span>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button
                onClick={handleRedirectToPayment}
                disabled={isRedirecting}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isRedirecting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Redirecting to Stripe...
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Go to Stripe Payment Page
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isRedirecting}
                className="w-full"
              >
                Cancel
              </Button>
            </div>

            <div className="text-center text-xs text-gray-500">
              <p>🔒 Secure payment processing by Stripe</p>
              <p>💳 Supports cards, digital wallets, and more</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default StripePaymentModal;
