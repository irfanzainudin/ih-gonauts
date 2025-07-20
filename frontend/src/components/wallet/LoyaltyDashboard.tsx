import { useState } from "react";
import { Button } from "@/components/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shared/ui/card";
import { Badge } from "@/components/shared/ui/badge";
import { Progress } from "@/components/shared/ui/progress";
import {
  Trophy,
  Gift,
  TrendingUp,
  Star,
  Coins,
  Calendar,
  Award,
  Sparkles,
} from "lucide-react";
import type { BookingHistory } from "../../types/booking";
import {
  calculateLoyaltyProgress,
  getLoyaltyRewardDescription,
  formatLoyaltyTokens,
  LOYALTY_TIERS,
} from "../../lib/loyaltyService";
import { transactionService } from "../../lib/transactionService";
import { useCurrentAccount } from "@iota/dapp-kit";

interface LoyaltyDashboardProps {
  bookings: BookingHistory[];
  onBookingClick?: (booking: BookingHistory) => void;
}

const LoyaltyDashboard = ({
  bookings,
  onBookingClick,
}: LoyaltyDashboardProps) => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "history" | "rewards"
  >("overview");
  const currentAccount = useCurrentAccount();

  // Get real loyalty data from transaction service
  const totalTokensEarned = transactionService.getTotalLoyaltyTokensEarned(
    currentAccount?.address
  );
  const totalTokensUsed = transactionService.getTotalLoyaltyTokensUsed(
    currentAccount?.address
  );
  const availableTokens = transactionService.getAvailableLoyaltyTokens(
    currentAccount?.address
  );

  const loyaltyProgress = calculateLoyaltyProgress(bookings);

  const getTierColor = (tierId: string) => {
    switch (tierId) {
      case "bronze":
        return "bg-amber-500";
      case "silver":
        return "bg-gray-400";
      case "gold":
        return "bg-yellow-500";
      case "platinum":
        return "bg-purple-500";
      case "diamond":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Loyalty Program</h2>
          <p className="text-gray-600">Earn rewards with every booking</p>
        </div>
        <Badge variant="secondary" className="flex items-center gap-2">
          <Trophy className="w-4 h-4" />
          {loyaltyProgress.currentTier.name} Member
        </Badge>
      </div>

      {/* Current Tier Card */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">
                  {loyaltyProgress.currentTier.icon}
                </span>
                {loyaltyProgress.currentTier.name} Tier
              </CardTitle>
              <CardDescription className="text-gray-700">
                {getLoyaltyRewardDescription(loyaltyProgress.currentTier)}
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-purple-600">
                {loyaltyProgress.currentBookings}
              </div>
              <div className="text-sm text-gray-600">Total Bookings</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loyaltyProgress.nextTier && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Progress to {loyaltyProgress.nextTier.name}</span>
                <span className="font-medium">
                  {loyaltyProgress.currentBookings}/
                  {loyaltyProgress.nextTier.minBookings}
                </span>
              </div>
              <Progress
                value={loyaltyProgress.progressToNextTier}
                className="h-2"
              />
              <p className="text-xs text-gray-600">
                {loyaltyProgress.nextTier.minBookings -
                  loyaltyProgress.currentBookings}{" "}
                more bookings to reach {loyaltyProgress.nextTier.name}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Available Tokens
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-yellow-500" />
              <span className="text-2xl font-bold text-gray-900">
                {formatLoyaltyTokens(availableTokens)}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Ready to use</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Earned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="text-2xl font-bold text-gray-900">
                {formatLoyaltyTokens(totalTokensEarned)}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Used Tokens
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-purple-500" />
              <span className="text-2xl font-bold text-gray-900">
                {formatLoyaltyTokens(totalTokensUsed)}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Redeemed</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <Button
          variant={activeTab === "overview" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("overview")}
          className="flex-1"
        >
          Overview
        </Button>
        <Button
          variant={activeTab === "history" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("history")}
          className="flex-1"
        >
          History
        </Button>
        <Button
          variant={activeTab === "rewards" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("rewards")}
          className="flex-1"
        >
          Rewards
        </Button>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                All Tiers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {LOYALTY_TIERS.map((tier) => {
                  const isCurrentTier =
                    loyaltyProgress.currentTier.id === tier.id;
                  const isUnlocked =
                    loyaltyProgress.currentBookings >= tier.minBookings;

                  return (
                    <div
                      key={tier.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isCurrentTier
                          ? "border-purple-500 bg-purple-50"
                          : isUnlocked
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full ${getTierColor(
                              tier.id
                            )} flex items-center justify-center text-white font-bold`}
                          >
                            {tier.icon}
                          </div>
                          <div>
                            <div className="font-semibold">{tier.name}</div>
                            <div className="text-sm text-gray-600">
                              {tier.minBookings} bookings required
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {tier.rewardTokens} tokens/booking
                          </div>
                          <div className="text-sm text-gray-600">
                            {tier.discountPercentage}% discount
                          </div>
                        </div>
                      </div>
                      {isCurrentTier && (
                        <div className="mt-2 flex items-center gap-2 text-purple-600">
                          <Sparkles className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            Current Tier
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "history" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Booking History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {bookings
                .filter((booking) => booking.status === "completed")
                .slice(0, 5)
                .map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => onBookingClick?.(booking)}
                  >
                    <div>
                      <div className="font-medium">{booking.spaceName}</div>
                      <div className="text-sm text-gray-600">
                        {booking.date} • {booking.time}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{booking.amount}</div>
                      <div className="text-sm text-green-600">
                        +{booking.loyaltyTokensEarned} tokens earned
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "rewards" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="w-5 h-5" />
              Available Rewards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Coins className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">Free Booking</div>
                    <div className="text-sm text-gray-600">
                      Use {loyaltyProgress.currentTier.rewardTokens} tokens for
                      a free hour
                    </div>
                  </div>
                  <Button
                    size="sm"
                    disabled={
                      loyaltyProgress.availableRewardTokens <
                      loyaltyProgress.currentTier.rewardTokens
                    }
                  >
                    Redeem
                  </Button>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">
                      {loyaltyProgress.currentTier.discountPercentage}% Discount
                    </div>
                    <div className="text-sm text-gray-600">
                      Automatic discount on all bookings
                    </div>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LoyaltyDashboard;
