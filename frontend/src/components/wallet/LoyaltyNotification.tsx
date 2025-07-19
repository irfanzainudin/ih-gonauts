import { useEffect, useState } from "react";
import { Button } from "@/components/shared/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shared/ui/card";
import { Badge } from "@/components/shared/ui/badge";
import { X, Trophy, Sparkles, Gift } from "lucide-react";
import type { LoyaltyProgress } from "../../types/booking";

interface LoyaltyNotificationProps {
  loyaltyProgress: LoyaltyProgress;
  onClose: () => void;
}

const LoyaltyNotification = ({
  loyaltyProgress,
  onClose,
}: LoyaltyNotificationProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show notification after a short delay for animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

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

  const getTierMessage = (tierId: string) => {
    switch (tierId) {
      case "silver":
        return "Congratulations! You've reached Silver tier!";
      case "gold":
        return "Amazing! You've unlocked Gold tier!";
      case "platinum":
        return "Incredible! You've achieved Platinum status!";
      case "diamond":
        return "Legendary! You've reached Diamond tier!";
      default:
        return "Welcome to the loyalty program!";
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md transform transition-all duration-300 scale-100">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex justify-center mb-4">
            <div
              className={`w-16 h-16 rounded-full ${getTierColor(
                loyaltyProgress.currentTier.id
              )} flex items-center justify-center text-white text-2xl`}
            >
              {loyaltyProgress.currentTier.icon}
            </div>
          </div>
          <CardTitle className="text-xl font-bold text-gray-900">
            {getTierMessage(loyaltyProgress.currentTier.id)}
          </CardTitle>
          <div className="flex justify-center mt-2">
            <Badge variant="secondary" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              {loyaltyProgress.currentTier.name} Member
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Gift className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-purple-600">
                New Benefits Unlocked!
              </span>
            </div>
            <div className="text-sm text-gray-700 space-y-1">
              <div>
                • {loyaltyProgress.currentTier.rewardTokens} IOTA tokens per
                booking
              </div>
              <div>
                • {loyaltyProgress.currentTier.discountPercentage}% discount on
                all bookings
              </div>
            </div>
          </div>

          {loyaltyProgress.nextTier && (
            <div className="text-sm text-gray-600">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                <span>Next tier: {loyaltyProgress.nextTier.name}</span>
              </div>
              <div>
                {loyaltyProgress.nextTier.minBookings -
                  loyaltyProgress.currentBookings}{" "}
                more bookings to go!
              </div>
            </div>
          )}

          <Button onClick={onClose} className="w-full">
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoyaltyNotification;
