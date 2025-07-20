import type { TimeSlot } from "../types/booking";
import { mockSpaces } from "./mockData";

// LocalStorage key for booked slots
const BOOKED_SLOTS_KEY = "sharedspace-booked-slots";

// Helper function to create a unique key for a slot
const createSlotKey = (spaceId: string, date: string, startTime: string) => {
  return `${spaceId}-${date}-${startTime}`;
};

// Get booked slots from localStorage
const getBookedSlotsFromStorage = (): Map<string, Set<string>> => {
  try {
    const stored = localStorage.getItem(BOOKED_SLOTS_KEY);
    if (!stored) return new Map();

    const parsed = JSON.parse(stored);
    const bookedSlots = new Map<string, Set<string>>();

    Object.entries(parsed).forEach(([spaceId, slots]) => {
      bookedSlots.set(spaceId, new Set(slots as string[]));
    });

    return bookedSlots;
  } catch (error) {
    console.error("Error reading booked slots from localStorage:", error);
    return new Map();
  }
};

// Save booked slots to localStorage
const saveBookedSlotsToStorage = (
  bookedSlots: Map<string, Set<string>>
): void => {
  try {
    const serialized: Record<string, string[]> = {};
    bookedSlots.forEach((slots, spaceId) => {
      serialized[spaceId] = Array.from(slots);
    });
    localStorage.setItem(BOOKED_SLOTS_KEY, JSON.stringify(serialized));
  } catch (error) {
    console.error("Error saving booked slots to localStorage:", error);
  }
};

// Initialize with some pre-booked slots for demonstration
const initializeDemoBookings = () => {
  const bookedSlots = getBookedSlotsFromStorage();

  // Only initialize if no data exists
  if (bookedSlots.size === 0) {
    // Book some slots for sport-4 (Pickle Ball Paradise) for today
    const today = new Date().toISOString().split("T")[0];
    const spaceId = "sport-4";

    // Book 10:00, 11:00, 14:00, 15:00 slots
    const demoBookings = [
      { date: today, startTime: "10:00" },
      { date: today, startTime: "11:00" },
      { date: today, startTime: "14:00" },
      { date: today, startTime: "15:00" },
    ];

    demoBookings.forEach((booking) => {
      const slotKey = createSlotKey(spaceId, booking.date, booking.startTime);
      if (!bookedSlots.has(spaceId)) {
        bookedSlots.set(spaceId, new Set());
      }
      bookedSlots.get(spaceId)!.add(slotKey);
    });

    // Save to localStorage
    saveBookedSlotsToStorage(bookedSlots);
    console.log("🎯 Demo: Initialized with pre-booked slots for sport-4");
  }
};

// Initialize demo bookings
initializeDemoBookings();

// Helper function to generate base time slots (all available initially)
const generateBaseTimeSlots = (basePrice: number): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const today = new Date();

  for (let day = 0; day < 7; day++) {
    const date = new Date(today);
    date.setDate(today.getDate() + day);
    const dateStr = date.toISOString().split("T")[0];

    // Generate slots from 8 AM to 10 PM (14 hours)
    for (let hour = 8; hour < 22; hour++) {
      const startTime = `${hour.toString().padStart(2, "0")}:00`;
      const endTime = `${(hour + 1).toString().padStart(2, "0")}:00`;

      slots.push({
        date: dateStr,
        startTime,
        endTime,
        isAvailable: true, // All slots start as available
        price: basePrice + (hour >= 18 ? 10 : 0), // Higher price after 6 PM
      });
    }
  }

  return slots;
};

// Get availability for a specific space with booked slots marked as unavailable
export const getSpaceAvailability = (spaceId: string): TimeSlot[] => {
  const space = mockSpaces.find((s) => s.id === spaceId);
  if (!space) return [];

  // Generate base slots (all available)
  const baseSlots = generateBaseTimeSlots(space.pricePerHour);

  // Mark booked slots as unavailable
  const bookedSlots = getBookedSlotsFromStorage();
  const spaceBookedSlots = bookedSlots.get(spaceId) || new Set();

  return baseSlots.map((slot) => {
    const slotKey = createSlotKey(spaceId, slot.date, slot.startTime);
    return {
      ...slot,
      isAvailable: !spaceBookedSlots.has(slotKey),
    };
  });
};

// Book a slot
export const bookSlot = (
  spaceId: string,
  date: string,
  startTime: string
): boolean => {
  const slotKey = createSlotKey(spaceId, date, startTime);

  const bookedSlots = getBookedSlotsFromStorage();
  // Check if slot is already booked
  if (bookedSlots.get(spaceId)?.has(slotKey)) {
    return false; // Slot already booked
  }

  // Add to booked slots
  if (!bookedSlots.has(spaceId)) {
    bookedSlots.set(spaceId, new Set());
  }
  bookedSlots.get(spaceId)!.add(slotKey);

  // Save to localStorage
  saveBookedSlotsToStorage(bookedSlots);
  return true;
};

// Cancel a booking
export const cancelBooking = (
  spaceId: string,
  date: string,
  startTime: string
): boolean => {
  const slotKey = createSlotKey(spaceId, date, startTime);

  const bookedSlots = getBookedSlotsFromStorage();
  const spaceBookedSlots = bookedSlots.get(spaceId);
  if (!spaceBookedSlots?.has(slotKey)) {
    return false; // Slot not booked
  }

  spaceBookedSlots.delete(slotKey);
  // Save to localStorage
  saveBookedSlotsToStorage(bookedSlots);
  return true;
};

// Check if a slot is available
export const isSlotAvailable = (
  spaceId: string,
  date: string,
  startTime: string
): boolean => {
  const slotKey = createSlotKey(spaceId, date, startTime);
  const bookedSlots = getBookedSlotsFromStorage();
  return !bookedSlots.get(spaceId)?.has(slotKey);
};

// Get all booked slots for a space
export const getBookedSlots = (spaceId: string): string[] => {
  const bookedSlots = getBookedSlotsFromStorage();
  const spaceBookedSlots = bookedSlots.get(spaceId);
  return spaceBookedSlots ? Array.from(spaceBookedSlots) : [];
};

// Clear all bookings (for testing purposes)
export const clearAllBookings = () => {
  localStorage.removeItem(BOOKED_SLOTS_KEY);
};
