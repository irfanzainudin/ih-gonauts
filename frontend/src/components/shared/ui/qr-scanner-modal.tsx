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
import { QrCode, CheckCircle, Camera, AlertCircle } from "lucide-react";

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess?: (bookingData: BookingVerificationData) => void;
}

interface BookingVerificationData {
  bookingId: string;
  spaceName: string;
  date: string;
  time: string;
  amount: string;
  paymentMethod: string;
  transactionHash?: string;
  stripePaymentIntentId?: string;
  status: string;
  verified: boolean;
  timestamp: string;
}

const QRScannerModal = ({
  isOpen,
  onClose,
  onScanSuccess,
}: QRScannerModalProps) => {
  const [scannedData, setScannedData] =
    useState<BookingVerificationData | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string>("");

  const handleScan = (qrData: string) => {
    try {
      const parsedData = JSON.parse(qrData) as BookingVerificationData;

      // Validate the booking data
      if (!parsedData.bookingId || !parsedData.spaceName) {
        throw new Error("Invalid booking data");
      }

      setScannedData(parsedData);
      setError("");
      onScanSuccess?.(parsedData);
    } catch {
      setError("Invalid QR code format");
      setScannedData(null);
    }
  };

  const simulateScan = () => {
    setIsScanning(true);
    setError("");

    // Simulate scanning process
    setTimeout(() => {
      const mockBookingData = {
        bookingId: "booking_123456789",
        spaceName: "Elite Futsal Center",
        date: "2024-01-15",
        time: "14:00 - 16:00",
        amount: "MYR 160",
        paymentMethod: "iota_wallet",
        transactionHash:
          "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
        status: "completed",
        verified: true,
        timestamp: new Date().toISOString(),
      };

      handleScan(JSON.stringify(mockBookingData));
      setIsScanning(false);
    }, 2000);
  };

  const resetScanner = () => {
    setScannedData(null);
    setError("");
    setIsScanning(false);
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-blue-600" />
            Booking Verification Scanner
          </DialogTitle>
          <DialogDescription>
            Scan a booking QR code to verify booking details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {!scannedData ? (
            /* Scanner Interface */
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Scan QR Code</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-4">
                  <div className="flex justify-center items-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">
                        {isScanning
                          ? "Scanning..."
                          : "Point camera at booking QR code"}
                      </p>
                      {isScanning && (
                        <div className="animate-pulse">
                          <div className="w-32 h-32 border-4 border-blue-500 border-dashed mx-auto rounded-lg"></div>
                        </div>
                      )}
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">{error}</span>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button
                      onClick={simulateScan}
                      disabled={isScanning}
                      className="flex-1"
                    >
                      {isScanning ? "Scanning..." : "Simulate Scan"}
                    </Button>
                    <Button
                      onClick={resetScanner}
                      variant="outline"
                      className="flex-1"
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            /* Verification Results */
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Booking Verified
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Space</div>
                      <div className="font-medium">{scannedData.spaceName}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Date</div>
                      <div className="font-medium">
                        {formatDate(scannedData.date)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Time</div>
                      <div className="font-medium">
                        {formatTime(scannedData.time)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Amount</div>
                      <div className="font-medium">{scannedData.amount}</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Payment Method</span>
                    <span className="font-medium">
                      {getPaymentMethodLabel(scannedData.paymentMethod)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status</span>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      {scannedData.status}
                    </Badge>
                  </div>

                  {scannedData.transactionHash && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Transaction Hash</span>
                      <span className="text-xs font-mono text-gray-900">
                        {scannedData.transactionHash.slice(0, 8)}...
                        {scannedData.transactionHash.slice(-8)}
                      </span>
                    </div>
                  )}

                  {scannedData.stripePaymentIntentId && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Payment Intent ID</span>
                      <span className="text-xs font-mono text-gray-900">
                        {scannedData.stripePaymentIntentId.slice(0, 8)}...
                        {scannedData.stripePaymentIntentId.slice(-8)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Verified At</span>
                    <span className="text-sm text-gray-900">
                      {new Date(scannedData.timestamp).toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button
                  onClick={resetScanner}
                  variant="outline"
                  className="flex-1"
                >
                  Scan Another
                </Button>
                <Button onClick={onClose} className="flex-1">
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRScannerModal;
