export type FoodTag = "signature" | "vegan" | "gluten_free" | "hot" | "cold" | "must_try";

export interface MenuItem {
  id: string;
  name: string;
  hindiName?: string;
  description: string;
  price: number;
  category: "brews" | "bites" | "sweets" | "mountain_specials";
  tags: FoodTag[];
  image: string;
}

export type TableType = "garden_seating" | "cozy_benches" | "glasshouse" | "mountain_view_balcony";

export interface Booking {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  guests: number;
  tableType: TableType;
  userName: string;
  userEmail: string;
  userPhone: string;
  notes?: string;
  tableNumber: number;
  reservationCode: string;
  createdAt: string;
}

export interface Review {
  id: string;
  stars: number;
  name: string;
  text: string;
  date: string;
  verified: boolean;
  avatarColor?: string;
  origin?: string; // town / city
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  price: number; // 0 for free
  seatsTotal: number;
  seatsLeft: number;
  image: string;
}
