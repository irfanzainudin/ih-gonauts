import { useCurrentAccount } from "@iota/dapp-kit";
import { Button } from "@/components/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shared/ui/card";
import { ArrowLeft, Calendar, MapPin, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WalletBookingsPage = () => {
  const currentAccount = useCurrentAccount();
  const navigate = useNavigate();

  // Mock bookings data - in a real app, this would come from your backend
  const mockBookings = [
    {
      id: "1",
      spaceName: "Cozy Coffee Shop",
      date: "2024-01-15",
      time: "09:00 - 12:00",
      status: "confirmed",
      amount: "50 MIOTA",
    },
    {
      id: "2",
      spaceName: "Modern Coworking Space",
      date: "2024-01-20",
      time: "14:00 - 18:00",
      status: "pending",
      amount: "75 MIOTA",
    },
  ];

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
      <div className="max-w-4xl mx-auto">
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
              <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
              <p className="text-gray-600">
                Bookings for wallet: {currentAccount.address.slice(0, 8)}...
                {currentAccount.address.slice(-8)}
              </p>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {mockBookings.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
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
              </CardContent>
            </Card>
          ) : (
            mockBookings.map((booking) => (
              <Card
                key={booking.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {booking.spaceName}
                      </CardTitle>
                      <CardDescription className="flex items-center space-x-2 mt-2">
                        <MapPin className="w-4 h-4" />
                        <span>Location details</span>
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {booking.date}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {booking.time}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-gray-900">
                        {booking.amount}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletBookingsPage;
