export type SpaceType = "sport" | "meeting" | "coworking" | "event";

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
}
