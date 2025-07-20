import { useMemo } from "react";
import type { BookingHistory } from "../types/booking";
import {
  calculateLoyaltyProgress,
  formatLoyaltyTokens,
  getLoyaltyRewardDescription,
} from "../lib/loyaltyService";

export const useLoyalty = (bookings: BookingHistory[]) => {
  const loyaltyProgress = useMemo(
    () => calculateLoyaltyProgress(bookings),
    [bookings]
  );

  const canRedeemTokens = useMemo(() => {
    return (
      loyaltyProgress.availableRewardTokens >=
      loyaltyProgress.currentTier.rewardTokens
    );
  }, [loyaltyProgress]);

  const nextTierProgress = useMemo(() => {
    if (!loyaltyProgress.nextTier) return null;

    const currentTierBookings = loyaltyProgress.currentTier.minBookings;
    const nextTierBookings = loyaltyProgress.nextTier.minBookings;
    const progress = loyaltyProgress.currentBookings - currentTierBookings;
    const totalNeeded = nextTierBookings - currentTierBookings;

    return {
      current: loyaltyProgress.currentBookings,
      required: nextTierBookings,
      remaining: nextTierBookings - loyaltyProgress.currentBookings,
      percentage: Math.min((progress / totalNeeded) * 100, 100),
    };
  }, [loyaltyProgress]);

  const getTierBenefits = (tierId: string) => {
    switch (tierId) {
      case "bronze":
        return {
          tokensPerBooking: 0,
          discountPercentage: 0,
          description: "Start booking to earn rewards!",
        };
      case "silver":
        return {
          tokensPerBooking: 5,
          discountPercentage: 5,
          description:
            "Earn 5 SHRD tokens per booking and get 5% discount on future bookings.",
        };
      case "gold":
        return {
          tokensPerBooking: 15,
          discountPercentage: 10,
          description:
            "Earn 15 SHRD tokens per booking and get 10% discount on future bookings.",
        };
      case "platinum":
        return {
          tokensPerBooking: 30,
          discountPercentage: 15,
          description:
            "Earn 30 SHRD tokens per booking and get 15% discount on future bookings.",
        };
      case "diamond":
        return {
          tokensPerBooking: 50,
          discountPercentage: 20,
          description:
            "Earn 50 SHRD tokens per booking and get 20% discount on future bookings.",
        };
      default:
        return {
          tokensPerBooking: 0,
          discountPercentage: 0,
          description: "No benefits available.",
        };
    }
  };

  const formatTokens = (tokens: number) => formatLoyaltyTokens(tokens);

  const getRewardDescription = () =>
    getLoyaltyRewardDescription(loyaltyProgress.currentTier);

  return {
    loyaltyProgress,
    canRedeemTokens,
    nextTierProgress,
    getTierBenefits,
    formatTokens,
    getRewardDescription,
  };
};
