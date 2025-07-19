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
import { Wallet, Loader2, CheckCircle, Coins, Sparkles } from "lucide-react";
import { toast } from "sonner";
import type { BookingRequest } from "../../../types/booking";
import { useNavigate } from "react-router-dom";

interface IotaPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingRequest: BookingRequest;
  onPaymentError: (error: string) => void;
}

const IotaPaymentModal = ({
  isOpen,
  onClose,
  bookingRequest,
  onPaymentError,
}: IotaPaymentModalProps) => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string>("");

  const handleProcessPayment = async () => {
    setIsProcessing(true);
    try {
      // Simulate IOTA transaction processing
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Generate mock transaction hash
      const mockHash = `0x${Math.random().toString(16).substr(2, 64)}`;
      setTransactionHash(mockHash);

      console.log("🎯 IOTA: Payment completed successfully");
      setIsSuccess(true);

      // Navigate to success page after a short delay
      setTimeout(() => {
        navigate(
          `/booking/success?payment_method=iota&transaction_hash=${mockHash}&demo=true`
        );
      }, 2000);
    } catch (error) {
      console.error("❌ IOTA: Payment failed:", error);
      toast.error("Failed to process IOTA payment");
      onPaymentError("IOTA payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Payment with IOTA Wallet</DialogTitle>
          <DialogDescription>
            Complete your booking with secure IOTA tokens
          </DialogDescription>
        </DialogHeader>

        {/* Demo Indicator */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-purple-800">
              IOTA DEMO MODE
            </span>
          </div>
          <p className="text-xs text-purple-700 mt-1">
            This is a demo - you'll see a simulated IOTA transaction
          </p>
        </div>

        {!isSuccess ? (
          <div className="space-y-4">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Wallet className="w-12 h-12 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Ready to Pay with IOTA
              </h3>
              <p className="text-gray-600 mb-4">
                Total amount: {bookingRequest.totalPrice} MIOTA
              </p>
              <p className="text-sm text-gray-500">
                Your IOTA wallet will be used to complete this transaction
                securely.
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
                    {bookingRequest.totalPrice} MIOTA
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Payment Method</span>
                  <Badge variant="secondary">IOTA Wallet</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Duration</span>
                  <span className="text-gray-900">
                    {bookingRequest.duration} hour(s)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Date</span>
                  <span className="text-gray-900">{bookingRequest.date}</span>
                </div>
              </CardContent>
            </Card>

            {/* Loyalty Rewards Preview */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <Coins className="w-4 h-4 text-yellow-600" />
                <span className="font-medium text-yellow-800">
                  Loyalty Rewards
                </span>
              </div>
              <div className="text-sm text-yellow-700">
                Earn 15 IOTA tokens with this booking (Gold tier)
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleProcessPayment}
                disabled={isProcessing}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing IOTA Payment...
                  </>
                ) : (
                  <>
                    <Wallet className="w-4 h-4 mr-2" />
                    Pay with IOTA Wallet
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isProcessing}
                className="w-full"
              >
                Cancel
              </Button>
            </div>

            <div className="text-center text-xs text-gray-500">
              <p>🔒 Secure payment processing via IOTA network</p>
              <p>⚡ Fast and feeless transactions</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Payment Successful!
              </h3>
              <p className="text-gray-600 mb-4">
                Your IOTA payment has been processed successfully.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Transaction Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Transaction Hash</span>
                  <span className="text-xs font-mono text-gray-900">
                    {transactionHash.slice(0, 8)}...{transactionHash.slice(-8)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status</span>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    Confirmed
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Network</span>
                  <span className="text-gray-900">IOTA Shimmer</span>
                </div>
              </CardContent>
            </Card>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-800">
                  Loyalty Tokens Earned!
                </span>
              </div>
              <div className="text-sm text-green-700">
                +15 IOTA tokens added to your loyalty balance
              </div>
            </div>

            <div className="text-center">
              <div className="animate-pulse">
                <p className="text-sm text-gray-600">
                  Redirecting to booking confirmation...
                </p>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default IotaPaymentModal;
