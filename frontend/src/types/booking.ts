export type SpaceType = "sport" | "meeting" | "coworking" | "event";

export type PaymentMethod = "iota_wallet" | "stripe";
export type PaymentStatus = "pending" | "completed" | "failed" | "cancelled";

export interface Space {
  id: string;
  name: string;
  type: SpaceType;
  description: string;
  images: string[];
  location: {
    address: string;
    city: string;
    state: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  amenities: string[];
  capacity: number;
  pricePerHour: number;
  rating: number;
  reviews: number;
  availability: TimeSlot[];
}

export interface TimeSlot {
  date: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  price: number;
}

export interface BookingRequest {
  spaceId: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  totalPrice: number;
  userWallet?: string;
  paymentMethod?: PaymentMethod;
  paymentStatus?: PaymentStatus;
  stripePaymentIntentId?: string;
}

export interface StripePaymentData {
  paymentIntentId: string;
  clientSecret: string;
  amount: number;
  currency: string;
}

export interface BookingFilters {
  types?: SpaceType[];
  location?: string;
  date?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  capacity?: number;
  amenities?: string[];
  searchQuery?: string;
}

// Loyalty System Types
export interface LoyaltyTier {
  id: string;
  name: string;
  minBookings: number;
  rewardTokens: number;
  discountPercentage: number;
  color: string;
  icon: string;
}

export interface LoyaltyProgress {
  currentBookings: number;
  currentTier: LoyaltyTier;
  nextTier?: LoyaltyTier;
  progressToNextTier: number;
  totalRewardTokens: number;
  availableRewardTokens: number;
  usedRewardTokens: number;
}

export interface BookingHistory {
  id: string;
  spaceName: string;
  date: string;
  time: string;
  status: PaymentStatus;
  amount: string;
  paymentMethod: PaymentMethod;
  loyaltyTokensEarned: number;
  loyaltyTokensUsed: number;
  createdAt: string;
}
