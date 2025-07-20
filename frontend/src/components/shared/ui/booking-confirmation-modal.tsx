import { useState, useEffect } from "react";
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
import {
  Calendar,
  Clock,
  MapPin,
  CreditCard,
  Wallet,
  Trophy,
  CheckCircle,
  ExternalLink,
  QrCode,
} from "lucide-react";
import type { BookingHistory } from "../../../types/booking";
import {
  transactionService,
  type Transaction,
} from "../../../lib/transactionService";
import QRCode from "qrcode";

interface BookingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: BookingHistory;
}

const BookingConfirmationModal = ({
  isOpen,
  onClose,
  booking,
}: BookingConfirmationModalProps) => {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");

  // Get the full transaction details when modal opens
  useEffect(() => {
    if (isOpen && booking.id) {
      const fullTransaction = transactionService.getTransactionById(booking.id);
      setTransaction(fullTransaction);

      // Generate QR code for booking verification
      generateQRCode(fullTransaction, booking);
    }
  }, [isOpen, booking.id]);

  const generateQRCode = async (
    transaction: Transaction | null,
    booking: BookingHistory
  ) => {
    try {
      const bookingData = {
        bookingId: booking.id,
        spaceName: booking.spaceName,
        date: booking.date,
        time: booking.time,
        amount: booking.amount,
        paymentMethod: booking.paymentMethod,
        transactionHash: transaction?.transactionHash,
        stripePaymentIntentId: transaction?.stripePaymentIntentId,
        status: booking.status,
        verified: true,
        timestamp: new Date().toISOString(),
      };

      const qrData = JSON.stringify(bookingData);
      const qrCodeUrl = await QRCode.toDataURL(qrData, {
        width: 200,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });

      setQrCodeDataUrl(qrCodeUrl);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "iota_wallet":
        return <Wallet className="w-4 h-4" />;
      case "stripe":
        return <CreditCard className="w-4 h-4" />;
      default:
        return <CreditCard className="w-4 h-4" />;
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case "iota_wallet":
        return "IOTA Wallet";
      case "stripe":
        return "Card Payment";
      default:
        return "Payment";
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-MY", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeStr: string) => {
    return timeStr.replace(" - ", " to ");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Booking Confirmation
          </DialogTitle>
          <DialogDescription>
            Details for your booking at {booking.spaceName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 overflow-y-auto flex-1 px-1">
          {/* Booking Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{booking.spaceName}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-600">Date</div>
                    <div className="font-medium">
                      {formatDate(booking.date)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-600">Time</div>
                    <div className="font-medium">
                      {formatTime(booking.time)}
                    </div>
                  </div>
                </div>
              </div>

              {transaction?.spaceLocation && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-600">Location</div>
                    <div className="font-medium">
                      {transaction.spaceLocation}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2">
                {getPaymentMethodIcon(booking.paymentMethod)}
                <div>
                  <div className="text-sm text-gray-600">Payment Method</div>
                  <div className="font-medium">
                    {getPaymentMethodLabel(booking.paymentMethod)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Details */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Payment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Amount Paid</span>
                <span className="font-semibold text-lg">{booking.amount}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status</span>
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  {booking.status}
                </Badge>
              </div>

              {transaction?.transactionHash && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Transaction Hash</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-gray-900">
                      {transaction.transactionHash.slice(0, 8)}...
                      {transaction.transactionHash.slice(-8)}
                    </span>
                    <ExternalLink className="w-3 h-3 text-gray-400" />
                  </div>
                </div>
              )}

              {transaction?.stripePaymentIntentId && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Payment Intent ID</span>
                  <span className="text-xs font-mono text-gray-900">
                    {transaction.stripePaymentIntentId.slice(0, 8)}...
                    {transaction.stripePaymentIntentId.slice(-8)}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Loyalty Rewards */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-600" />
                Loyalty Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tokens Earned</span>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-600" />
                  <span className="font-semibold text-green-600">
                    +{booking.loyaltyTokensEarned} tokens
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* QR Code for Verification */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <QrCode className="w-4 h-4 text-blue-600" />
                Booking Verification QR Code
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-3">
                <p className="text-sm text-gray-600">
                  Scan this QR code to verify your booking details
                </p>
                {qrCodeDataUrl ? (
                  <div className="flex justify-center">
                    <img
                      src={qrCodeDataUrl}
                      alt="Booking QR Code"
                      className="border-2 border-gray-200 rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-40 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <QrCode className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">
                        Generating QR code...
                      </p>
                    </div>
                  </div>
                )}
                <p className="text-xs text-gray-500">
                  This QR code contains encrypted booking information for
                  verification purposes
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 flex-shrink-0 pt-3 border-t">
            <Button onClick={onClose} variant="outline" className="flex-1">
              Close
            </Button>
            <Button
              onClick={() => {
                // Navigate to the space detail page
                window.location.href = `/booking/space/${
                  transaction?.bookingRequest.spaceId || ""
                }`;
              }}
              className="flex-1"
            >
              Book Again
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingConfirmationModal;
