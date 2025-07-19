import type { Space, TimeSlot } from "../types/booking";

// Generate time slots for the next 7 days
const generateTimeSlots = (basePrice: number): TimeSlot[] => {
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
        isAvailable: Math.random() > 0.3, // 70% availability
        price: basePrice + (hour >= 18 ? 10 : 0), // Higher price after 6 PM
      });
    }
  }

  return slots;
};

export const mockSpaces: Space[] = [
  {
    id: "1",
    name: "KL Badminton Arena",
    type: "sport",
    description:
      "Professional badminton court with premium flooring and lighting. Perfect for tournaments and casual games.",
    images: ["/placeholder-badminton.jpg"],
    location: {
      address: "Jalan Ampang, Kuala Lumpur",
      city: "Kuala Lumpur",
      state: "Selangor",
      coordinates: { lat: 3.139, lng: 101.6869 },
    },
    amenities: [
      "Air Conditioning",
      "Changing Rooms",
      "Equipment Rental",
      "Parking",
      "Shower Facilities",
    ],
    capacity: 4,
    pricePerHour: 45,
    rating: 4.8,
    reviews: 124,
    availability: generateTimeSlots(45),
  },
  {
    id: "2",
    name: "Elite Futsal Center",
    type: "sport",
    description:
      "Indoor futsal court with FIFA-approved artificial turf and professional goal posts.",
    images: ["/placeholder-futsal.jpg"],
    location: {
      address: "Petaling Jaya, Selangor",
      city: "Petaling Jaya",
      state: "Selangor",
      coordinates: { lat: 3.1073, lng: 101.6421 },
    },
    amenities: [
      "Artificial Turf",
      "Changing Rooms",
      "Ball Rental",
      "Parking",
      "Canteen",
    ],
    capacity: 12,
    pricePerHour: 80,
    rating: 4.7,
    reviews: 89,
    availability: generateTimeSlots(80),
  },
  {
    id: "3",
    name: "TechHub Conference Room",
    type: "meeting",
    description:
      "Modern conference room with state-of-the-art AV equipment and video conferencing capabilities.",
    images: ["/placeholder-meeting.jpg"],
    location: {
      address: "KLCC, Kuala Lumpur",
      city: "Kuala Lumpur",
      state: "Selangor",
      coordinates: { lat: 3.1478, lng: 101.6953 },
    },
    amenities: [
      "Video Conferencing",
      "Projector",
      "Whiteboard",
      "WiFi",
      "Coffee Service",
      "Parking",
    ],
    capacity: 16,
    pricePerHour: 120,
    rating: 4.9,
    reviews: 156,
    availability: generateTimeSlots(120),
  },
  {
    id: "4",
    name: "Creative Coworking Space",
    type: "coworking",
    description:
      "Inspiring coworking environment with hot desks, private pods, and collaborative areas.",
    images: ["/placeholder-coworking.jpg"],
    location: {
      address: "Bangsar, Kuala Lumpur",
      city: "Kuala Lumpur",
      state: "Selangor",
      coordinates: { lat: 3.1285, lng: 101.6671 },
    },
    amenities: [
      "High-Speed WiFi",
      "Printing Services",
      "Coffee Bar",
      "Phone Booths",
      "Networking Events",
    ],
    capacity: 1,
    pricePerHour: 15,
    rating: 4.6,
    reviews: 203,
    availability: generateTimeSlots(15),
  },
  {
    id: "5",
    name: "Grand Event Hall",
    type: "event",
    description:
      "Spacious event venue perfect for conferences, workshops, and corporate events.",
    images: ["/placeholder-event.jpg"],
    location: {
      address: "Mont Kiara, Kuala Lumpur",
      city: "Kuala Lumpur",
      state: "Selangor",
      coordinates: { lat: 3.1726, lng: 101.6507 },
    },
    amenities: [
      "Stage Setup",
      "Sound System",
      "Lighting",
      "Catering Service",
      "Parking",
      "Security",
    ],
    capacity: 200,
    pricePerHour: 300,
    rating: 4.8,
    reviews: 67,
    availability: generateTimeSlots(300),
  },
  {
    id: "6",
    name: "Basketball Court Pro",
    type: "sport",
    description:
      "Full-size basketball court with professional hoops and wooden flooring.",
    images: ["/placeholder-basketball.jpg"],
    location: {
      address: "Subang Jaya, Selangor",
      city: "Subang Jaya",
      state: "Selangor",
      coordinates: { lat: 3.0456, lng: 101.5851 },
    },
    amenities: [
      "Professional Court",
      "Ball Rental",
      "Scoreboard",
      "Changing Rooms",
      "Parking",
    ],
    capacity: 10,
    pricePerHour: 60,
    rating: 4.5,
    reviews: 94,
    availability: generateTimeSlots(60),
  },
];
