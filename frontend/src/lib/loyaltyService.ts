import type {
  LoyaltyTier,
  LoyaltyProgress,
  BookingHistory,
} from "../types/booking";

// Define loyalty tiers
export const LOYALTY_TIERS: LoyaltyTier[] = [
  {
    id: "bronze",
    name: "Bronze",
    minBookings: 0,
    rewardTokens: 0,
    discountPercentage: 0,
    color: "bg-amber-500",
    icon: "🥉",
  },
  {
    id: "silver",
    name: "Silver",
    minBookings: 3,
    rewardTokens: 5,
    discountPercentage: 5,
    color: "bg-gray-400",
    icon: "🥈",
  },
  {
    id: "gold",
    name: "Gold",
    minBookings: 7,
    rewardTokens: 15,
    discountPercentage: 10,
    color: "bg-yellow-500",
    icon: "🥇",
  },
  {
    id: "platinum",
    name: "Platinum",
    minBookings: 15,
    rewardTokens: 30,
    discountPercentage: 15,
    color: "bg-purple-500",
    icon: "💎",
  },
  {
    id: "diamond",
    name: "Diamond",
    minBookings: 30,
    rewardTokens: 50,
    discountPercentage: 20,
    color: "bg-blue-500",
    icon: "💎",
  },
];

// Mock booking history data
export const mockBookingHistory: BookingHistory[] = [
  {
    id: "1",
    spaceName: "Cozy Coffee Shop",
    date: "2024-01-15",
    time: "09:00 - 12:00",
    status: "completed",
    amount: "50 MIOTA",
    paymentMethod: "iota_wallet",
    loyaltyTokensEarned: 2,
    loyaltyTokensUsed: 0,
    createdAt: "2024-01-15T09:00:00Z",
  },
  {
    id: "2",
    spaceName: "Modern Coworking Space",
    date: "2024-01-20",
    time: "14:00 - 18:00",
    status: "completed",
    amount: "75 MIOTA",
    paymentMethod: "iota_wallet",
    loyaltyTokensEarned: 3,
    loyaltyTokensUsed: 0,
    createdAt: "2024-01-20T14:00:00Z",
  },
  {
    id: "3",
    spaceName: "Tech Hub Meeting Room",
    date: "2024-01-25",
    time: "10:00 - 12:00",
    status: "completed",
    amount: "40 MIOTA",
    paymentMethod: "iota_wallet",
    loyaltyTokensEarned: 2,
    loyaltyTokensUsed: 0,
    createdAt: "2024-01-25T10:00:00Z",
  },
  {
    id: "4",
    spaceName: "Creative Studio",
    date: "2024-02-01",
    time: "13:00 - 17:00",
    status: "completed",
    amount: "80 MIOTA",
    paymentMethod: "iota_wallet",
    loyaltyTokensEarned: 3,
    loyaltyTokensUsed: 0,
    createdAt: "2024-02-01T13:00:00Z",
  },
  {
    id: "5",
    spaceName: "Sports Complex",
    date: "2024-02-05",
    time: "16:00 - 18:00",
    status: "completed",
    amount: "60 MIOTA",
    paymentMethod: "iota_wallet",
    loyaltyTokensEarned: 2,
    loyaltyTokensUsed: 0,
    createdAt: "2024-02-05T16:00:00Z",
  },
  {
    id: "6",
    spaceName: "Conference Center",
    date: "2024-02-10",
    time: "09:00 - 17:00",
    status: "completed",
    amount: "120 MIOTA",
    paymentMethod: "iota_wallet",
    loyaltyTokensEarned: 4,
    loyaltyTokensUsed: 0,
    createdAt: "2024-02-10T09:00:00Z",
  },
  {
    id: "7",
    spaceName: "Art Gallery Space",
    date: "2024-02-15",
    time: "14:00 - 16:00",
    status: "completed",
    amount: "45 MIOTA",
    paymentMethod: "iota_wallet",
    loyaltyTokensEarned: 2,
    loyaltyTokensUsed: 0,
    createdAt: "2024-02-15T14:00:00Z",
  },
];

export const calculateLoyaltyProgress = (
  bookings: BookingHistory[]
): LoyaltyProgress => {
  const completedBookings = bookings.filter(
    (booking) => booking.status === "completed"
  );
  const currentBookings = completedBookings.length;

  // Calculate total tokens earned and used
  const totalRewardTokens = completedBookings.reduce(
    (sum, booking) => sum + booking.loyaltyTokensEarned,
    0
  );
  const usedRewardTokens = completedBookings.reduce(
    (sum, booking) => sum + booking.loyaltyTokensUsed,
    0
  );
  const availableRewardTokens = totalRewardTokens - usedRewardTokens;

  // Find current tier
  const currentTier = LOYALTY_TIERS.reduce((current, tier) => {
    if (currentBookings >= tier.minBookings) {
      return tier;
    }
    return current;
  });

  // Find next tier
  const nextTier = LOYALTY_TIERS.find(
    (tier) => tier.minBookings > currentBookings
  );

  // Calculate progress to next tier
  let progressToNextTier = 0;
  if (nextTier) {
    const currentTierBookings = currentTier.minBookings;
    const nextTierBookings = nextTier.minBookings;
    const progress = currentBookings - currentTierBookings;
    const totalNeeded = nextTierBookings - currentTierBookings;
    progressToNextTier = Math.min((progress / totalNeeded) * 100, 100);
  }

  return {
    currentBookings,
    currentTier,
    nextTier,
    progressToNextTier,
    totalRewardTokens,
    availableRewardTokens,
    usedRewardTokens,
  };
};

export const getLoyaltyRewardDescription = (tier: LoyaltyTier): string => {
  if (tier.id === "bronze") {
    return "Start booking to earn rewards!";
  }
  return `Earn ${tier.rewardTokens} IOTA tokens per booking and get ${tier.discountPercentage}% discount on future bookings.`;
};

export const formatLoyaltyTokens = (tokens: number): string => {
  return `${tokens} IOTA`;
};
