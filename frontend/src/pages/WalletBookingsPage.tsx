import { useCurrentAccount } from "@iota/dapp-kit";
import { Button } from "@/components/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shared/ui/card";
import { ArrowLeft, Calendar, MapPin, Clock, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoyaltyDashboard from "@/components/wallet/LoyaltyDashboard";
import BookingConfirmationModal from "@/components/shared/ui/booking-confirmation-modal";
import { transactionService } from "@/lib/transactionService";
import type { BookingHistory } from "@/types/booking";

const WalletBookingsPage = () => {
  const currentAccount = useCurrentAccount();
  const navigate = useNavigate();
  const [selectedBooking, setSelectedBooking] = useState<BookingHistory | null>(
    null
  );
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Use the real booking history from transaction service
  const bookings: BookingHistory[] =
    transactionService.getBookingHistoryForUser();

  const handleBookingClick = (booking: BookingHistory) => {
    setSelectedBooking(booking);
    setShowBookingModal(true);
  };

  const handleCloseModal = () => {
    setShowBookingModal(false);
    setSelectedBooking(null);
  };

  if (!currentAccount) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Wallet Not Connected
          </h1>
          <p className="text-gray-600 mb-6">
            Please connect your wallet to view your bookings.
          </p>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                My Wallet Dashboard
              </h1>
              <p className="text-gray-600">
                Bookings for wallet: {currentAccount.address.slice(0, 8)}...
                {currentAccount.address.slice(-8)}
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Loyalty Dashboard */}
          <div className="lg:col-span-2">
            <LoyaltyDashboard
              bookings={bookings}
              onBookingClick={handleBookingClick}
            />
          </div>

          {/* Right Column - Recent Bookings */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Recent Bookings
                </CardTitle>
                <CardDescription>Your latest booking activity</CardDescription>
              </CardHeader>
              <CardContent>
                {bookings.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No Bookings Found
                    </h3>
                    <p className="text-gray-600 mb-4">
                      You haven't made any bookings yet.
                    </p>
                    <Button onClick={() => navigate("/booking")}>
                      Browse Spaces
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings
                      .filter((booking) => booking.status === "completed")
                      .slice(0, 5)
                      .map((booking) => (
                        <div
                          key={booking.id}
                          className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => handleBookingClick(booking)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-medium text-sm">
                              {booking.spaceName}
                            </div>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                booking.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {booking.status}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-gray-600 mb-2">
                            <MapPin className="w-3 h-3" />
                            <span>{booking.date}</span>
                            <Clock className="w-3 h-3" />
                            <span>{booking.time}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900">
                              {booking.amount}
                            </span>
                            <div className="flex items-center gap-1 text-green-600 text-xs">
                              <Trophy className="w-3 h-3" />+
                              {booking.loyaltyTokensEarned}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      {selectedBooking && (
        <BookingConfirmationModal
          isOpen={showBookingModal}
          onClose={handleCloseModal}
          booking={selectedBooking}
        />
      )}
    </div>
  );
};

export default WalletBookingsPage;
