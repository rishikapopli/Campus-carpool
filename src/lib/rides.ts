import { useSyncExternalStore } from "react";

/* ---------------------------------------------------------------------------
 * Campus Ride — Production Reactive Data Store & Backend State Engine
 * ------------------------------------------------------------------------- */

export type LatLng = { lat: number; lng: number };

export type Driver = {
  id: string;
  name: string;
  dept: string;
  initials: string;
  color: string;
  rating: number;
};

export type Vehicle = {
  id: string;
  name: string; // e.g. "Hyundai i20"
  model: string; // e.g. "i20"
  brand?: string; // e.g. "Hyundai"
  color?: string; // e.g. "White"
  registrationNumber: string; // e.g. "PB-11-AK-2205"
  totalSeats: number; // 2 to 7
  isDefault?: boolean;
};

export type RideCategory = "Upcoming" | "Completed" | "Cancelled";
export type RideStatus = "Available" | "Full" | "Completed" | "Cancelled";

export type Ride = {
  id: string;
  driver: Driver;
  from: string;
  to: string;
  fromCoords?: LatLng | null;
  toCoords?: LatLng | null;
  date: string; // ISO yyyy-mm-dd
  time: string; // 24h HH:mm
  totalSeats: number;
  availableSeats: number;
  passengers: string[]; // array of user IDs
  cost: number; // Split Fare (₹ per seat)
  totalFare: number; // Total Fare (₹ base + distance * per_km)
  distanceKm: number;
  preferences: string[];
  status: RideStatus;
  createdAt: number;
  soloFare: number;
  vehicle?: Vehicle | null;
};

export type PaymentTransaction = {
  id: string;
  rideId?: string;
  amount: number;
  type: "paid" | "received";
  description: string;
  date: string;
  upiId: string;
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  initials: string;
  university: string;
  dept: string;
  gradYear: string;
  trustScore: number;
  rating: number;
  totalRides: number;
  isVerified: boolean;
  photoUrl?: string;
  upiId: string;
  paymentHistory: PaymentTransaction[];
  preferences: string[];
  studentIdDoc?: string;
  vehicles: Vehicle[];
  selectedVehicleId?: string | null;
};

export type CampusRideState = {
  user: UserProfile | null;
  rides: Ride[];
};

export interface ImpactMetrics {
  totalRides: number;
  moneySaved: number;
  co2SavedKg: number;
}

const STORAGE_KEY = "campus-ride:v3";
const DRIVER_COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EC4899", "#0EA5E9", "#8B5CF6"];

/* -------------------------------- Fare Math ------------------------------- */

export const BASE_FARE = 30; // ₹
export const PER_KM_RATE = 7; // ₹/km
export const CO2_PER_KM = 0.171;

/** Total Fare = Base Fare + (Distance x Per KM), rounded to nearest rupee. */
export function calculateTotalFare(distanceKmVal: number, baseFare = BASE_FARE, perKm = PER_KM_RATE): number {
  const dist = Math.max(1, distanceKmVal);
  return Math.round(baseFare + dist * perKm);
}

/** Split Fare = Total Fare / Number of Passengers, rounded to nearest rupee. */
export function calculateSplitFare(totalFare: number, passengerCount: number): number {
  const count = Math.max(1, passengerCount);
  return Math.round(totalFare / count);
}

/* ----------------------- Vehicle Validation & Formatting ------------------ */

export function validateRegistrationNumber(regNo: string): boolean {
  if (!regNo) return false;
  const cleaned = regNo.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
  // Indian vehicle registration regex: State code (2 chars) + RTO (1-2 digits) + Series (1-3 chars) + Number (4 digits)
  const indianRegRegex = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{4}$/;
  return indianRegRegex.test(cleaned);
}

export function formatRegistrationNumber(regNo: string): string {
  const cleaned = regNo.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (cleaned.length < 8) return regNo.trim().toUpperCase();
  const match = /^([A-Z]{2})([0-9]{1,2})([A-Z]{1,3})([0-9]{4})$/.exec(cleaned);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}-${match[4]}`;
  }
  return regNo.trim().toUpperCase();
}

/* -------------------------------- Utilities ------------------------------- */

export function makeId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

export function initialsOf(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
}

export function nameFromEmail(email: string): string {
  const local = email.split("@")[0] ?? "";
  return (
    local
      .split(/[._-]+/)
      .filter(Boolean)
      .map((p) => p[0].toUpperCase() + p.slice(1))
      .join(" ") || "Campus Rider"
  );
}

export function todayISO(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  const today = todayISO();
  if (iso === today) return "Today";
  const d = new Date(iso + "T00:00:00");
  const t = new Date(today + "T00:00:00");
  const diffDays = Math.round((d.getTime() - t.getTime()) / 86_400_000);
  if (diffDays === 1) return "Tomorrow";
  return d.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" });
}

export function formatTime(time: string): string {
  if (!time) return "";
  const m = /^(\d{1,2}):(\d{2})$/.exec(time);
  if (!m) return time;
  let h = parseInt(m[1], 10);
  const min = m[2];
  const period = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${min} ${period}`;
}

export function distanceKm(a: LatLng, b: LatLng): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(h)) * 10) / 10;
}

/* -------------------------------- Impact Math ----------------------------- */

export function rideMoneySaved(ride: Ride): number {
  return Math.max(0, ride.soloFare - ride.cost);
}

export function rideCo2Saved(ride: Ride): number {
  const occupants = ride.passengers.length + 1;
  const solo = ride.distanceKm * CO2_PER_KM;
  return solo * (1 - 1 / occupants);
}

export function computeImpact(rides: readonly Ride[]): ImpactMetrics {
  const shared = rides.filter((r) => r.passengers.length > 0 && r.status !== "Cancelled");
  return {
    totalRides: shared.length,
    moneySaved: Math.round(shared.reduce((sum, r) => sum + rideMoneySaved(r), 0)),
    co2SavedKg: Math.round(shared.reduce((sum, r) => sum + rideCo2Saved(r), 0) * 10) / 10,
  };
}

/* ------------------------------ Seed Database ----------------------------- */

function seedDatabase(): CampusRideState {
  const defaultCar: Vehicle = {
    id: "veh_hyundai_i20",
    name: "Hyundai i20",
    model: "i20",
    brand: "Hyundai",
    color: "White",
    registrationNumber: "PB-11-AK-2205",
    totalSeats: 4,
    isDefault: true,
  };

  const defaultUser: UserProfile = {
    id: "user_aditi",
    name: "Aditi Sharma",
    email: "aditi.sharma@chitkara.edu",
    initials: "AS",
    university: "Chitkara University",
    dept: "CSE '26",
    gradYear: "2026",
    trustScore: 98,
    rating: 4.9,
    totalRides: 14,
    isVerified: true,
    upiId: "aditi@okicici",
    preferences: ["Music OK", "AC on", "No smoking"],
    vehicles: [defaultCar],
    selectedVehicleId: defaultCar.id,
    paymentHistory: [
      {
        id: "pay_1",
        amount: 85,
        type: "paid",
        description: "Ride to Chandigarh Sec 17",
        date: todayISO(),
        upiId: "aditi@okicici",
      },
      {
        id: "pay_2",
        amount: 90,
        type: "paid",
        description: "Ride to Elante Mall",
        date: todayISO(),
        upiId: "aditi@okicici",
      },
    ],
  };

  const seedRidesList: Ride[] = [
    {
      id: "ride_rohan_1",
      driver: {
        id: "seed_rohan",
        name: "Rohan Kapoor",
        dept: "CSE '25",
        initials: "RK",
        color: "#4F46E5",
        rating: 4.9,
      },
      from: "Chitkara University, Punjab",
      to: "Sector 17 Plaza, Chandigarh",
      fromCoords: { lat: 30.5161, lng: 76.6596 },
      toCoords: { lat: 30.741, lng: 76.7794 },
      date: todayISO(),
      time: "13:15",
      totalSeats: 3,
      availableSeats: 2,
      passengers: ["user_aditi"],
      distanceKm: 32,
      totalFare: calculateTotalFare(32),
      cost: calculateSplitFare(calculateTotalFare(32), 4),
      soloFare: 320,
      preferences: ["Music OK", "AC on", "No smoking"],
      status: "Available",
      createdAt: Date.now() - 3600000,
      vehicle: defaultCar,
    },
    {
      id: "ride_priya_2",
      driver: {
        id: "seed_priya",
        name: "Priya Malhotra",
        dept: "ECE '26",
        initials: "PM",
        color: "#10B981",
        rating: 4.8,
      },
      from: "Chitkara University Campus",
      to: "Elante Mall, Industrial Area Phase I, Chandigarh",
      fromCoords: { lat: 30.5161, lng: 76.6596 },
      toCoords: { lat: 30.7054, lng: 76.8013 },
      date: todayISO(),
      time: "14:00",
      totalSeats: 3,
      availableSeats: 3,
      passengers: [],
      distanceKm: 28,
      totalFare: calculateTotalFare(28),
      cost: calculateSplitFare(calculateTotalFare(28), 4),
      soloFare: 290,
      preferences: ["AC on", "Quiet ride", "Female-only"],
      status: "Available",
      createdAt: Date.now() - 1800000,
      vehicle: {
        id: "veh_priya_swift",
        name: "Maruti Swift",
        model: "Swift",
        brand: "Maruti Suzuki",
        color: "Red",
        registrationNumber: "CH-01-BV-4412",
        totalSeats: 4,
      },
    },
    {
      id: "ride_arjun_3",
      driver: {
        id: "seed_arjun",
        name: "Arjun Singh",
        dept: "MBA '25",
        initials: "AS",
        color: "#F59E0B",
        rating: 4.7,
      },
      from: "Boys Hostel D, Campus",
      to: "Panchkula Sector 5",
      fromCoords: { lat: 30.5161, lng: 76.6596 },
      toCoords: { lat: 30.6942, lng: 76.8606 },
      date: todayISO(),
      time: "16:30",
      totalSeats: 2,
      availableSeats: 1,
      passengers: ["seed_rider_x"],
      distanceKm: 35,
      totalFare: calculateTotalFare(35),
      cost: calculateSplitFare(calculateTotalFare(35), 3),
      soloFare: 360,
      preferences: ["Music OK"],
      status: "Available",
      createdAt: Date.now() - 900000,
      vehicle: {
        id: "veh_arjun_city",
        name: "Honda City",
        model: "City",
        brand: "Honda",
        color: "Silver",
        registrationNumber: "HR-03-AA-8811",
        totalSeats: 4,
      },
    },
    {
      id: "ride_neha_4",
      driver: {
        id: "seed_neha",
        name: "Neha Verma",
        dept: "Design '27",
        initials: "NV",
        color: "#EC4899",
        rating: 5.0,
      },
      from: "Chitkara University, Punjab",
      to: "Chandigarh International Airport (IXC), Mohali",
      fromCoords: { lat: 30.5161, lng: 76.6596 },
      toCoords: { lat: 30.6735, lng: 76.7885 },
      date: todayISO(),
      time: "18:00",
      totalSeats: 3,
      availableSeats: 3,
      passengers: [],
      distanceKm: 25,
      totalFare: calculateTotalFare(25),
      cost: calculateSplitFare(calculateTotalFare(25), 4),
      soloFare: 270,
      preferences: ["AC on", "Female-only", "Luggage OK"],
      status: "Available",
      createdAt: Date.now() - 300000,
      vehicle: {
        id: "veh_neha_baleno",
        name: "Baleno",
        model: "Baleno",
        brand: "Nexa",
        color: "Blue",
        registrationNumber: "PB-65-CD-1002",
        totalSeats: 4,
      },
    },
  ];

  return { user: defaultUser, rides: seedRidesList };
}

/* -------------------------------- Persistent Store ------------------------ */

function emptyState(): CampusRideState {
  return seedDatabase();
}

function loadState(): CampusRideState {
  if (typeof window === "undefined") return emptyState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw) as CampusRideState;
    if (!parsed || !Array.isArray(parsed.rides)) return emptyState();
    return {
      user: parsed.user ?? emptyState().user,
      rides: parsed.rides.length > 0 ? parsed.rides : emptyState().rides,
    };
  } catch {
    return emptyState();
  }
}

const serverSnapshot: CampusRideState = emptyState();
let state: CampusRideState = emptyState();
let hydrated = false;

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function setState(next: CampusRideState) {
  state = next;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* fallback in memory */
    }
  }
  emit();
}

function hydrateFromStorage() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  state = loadState();
  emit();
}

export const rideStore = {
  subscribe(listener: () => void): () => void {
    hydrateFromStorage();
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot(): CampusRideState {
    return state;
  },
  getServerSnapshot(): CampusRideState {
    return serverSnapshot;
  },

  /* ------------------------------- Actions -------------------------------- */

  login(email: string): UserProfile {
    const name = nameFromEmail(email);
    const existing = state.user;
    const defaultCar: Vehicle = {
      id: "veh_hyundai_i20",
      name: "Hyundai i20",
      model: "i20",
      brand: "Hyundai",
      color: "White",
      registrationNumber: "PB-11-AK-2205",
      totalSeats: 4,
      isDefault: true,
    };

    const user: UserProfile = {
      id: existing?.email === email ? existing.id : makeId("user"),
      name: existing?.email === email ? existing.name : name,
      email,
      initials: initialsOf(name),
      university: "Chitkara University",
      dept: existing?.dept ?? "CSE '26",
      gradYear: existing?.gradYear ?? "2026",
      trustScore: existing?.trustScore ?? 98,
      rating: existing?.rating ?? 4.9,
      totalRides: existing?.totalRides ?? 0,
      isVerified: true,
      upiId: existing?.upiId ?? `${email.split("@")[0]}@upi`,
      paymentHistory: existing?.paymentHistory ?? [],
      preferences: existing?.preferences ?? ["Music OK", "AC on"],
      vehicles: existing?.vehicles && existing.vehicles.length > 0 ? existing.vehicles : [defaultCar],
      selectedVehicleId: existing?.selectedVehicleId ?? defaultCar.id,
    };
    setState({ ...state, user });
    return user;
  },

  logout() {
    setState({ ...state, user: null });
  },

  updateUserProfile(updates: Partial<UserProfile>) {
    if (!state.user) return;
    const user = { ...state.user, ...updates };
    setState({ ...state, user });
  },

  /* ---------------------------- Vehicle Actions --------------------------- */

  addVehicle(input: {
    name: string;
    model: string;
    brand?: string;
    color?: string;
    registrationNumber: string;
    totalSeats: number;
  }): { ok: boolean; error?: string; vehicle?: Vehicle } {
    const user = state.user;
    if (!user) return { ok: false, error: "Please sign in to add a vehicle." };
    if (!input.name.trim()) return { ok: false, error: "Vehicle name is required." };
    if (!input.model.trim()) return { ok: false, error: "Car model is required." };
    if (!input.registrationNumber.trim()) return { ok: false, error: "Registration number is required." };
    if (!validateRegistrationNumber(input.registrationNumber)) {
      return {
        ok: false,
        error: "Please enter a valid Indian vehicle registration number (e.g., PB-11-AK-2205).",
      };
    }
    if (!input.totalSeats || input.totalSeats < 2 || input.totalSeats > 7) {
      return { ok: false, error: "Total seats for a car must be between 2 and 7." };
    }

    const formattedReg = formatRegistrationNumber(input.registrationNumber);
    const vehicle: Vehicle = {
      id: makeId("veh"),
      name: input.name.trim(),
      model: input.model.trim(),
      brand: input.brand?.trim(),
      color: input.color?.trim() || "White",
      registrationNumber: formattedReg,
      totalSeats: input.totalSeats,
    };

    const vehicles = [...(user.vehicles ?? []), vehicle];
    const updatedUser: UserProfile = {
      ...user,
      vehicles,
      selectedVehicleId: vehicle.id,
    };

    setState({ ...state, user: updatedUser });
    return { ok: true, vehicle };
  },

  updateVehicle(id: string, updates: Partial<Vehicle>): { ok: boolean; error?: string } {
    const user = state.user;
    if (!user) return { ok: false, error: "User not logged in." };
    if (updates.registrationNumber && !validateRegistrationNumber(updates.registrationNumber)) {
      return { ok: false, error: "Please enter a valid Indian registration number." };
    }

    const vehicles = (user.vehicles ?? []).map((v) => {
      if (v.id !== id) return v;
      return {
        ...v,
        ...updates,
        registrationNumber: updates.registrationNumber
          ? formatRegistrationNumber(updates.registrationNumber)
          : v.registrationNumber,
      };
    });

    setState({ ...state, user: { ...user, vehicles } });
    return { ok: true };
  },

  deleteVehicle(id: string): { ok: boolean } {
    const user = state.user;
    if (!user) return { ok: false };
    const vehicles = (user.vehicles ?? []).filter((v) => v.id !== id);
    const selectedVehicleId = user.selectedVehicleId === id ? vehicles[0]?.id ?? null : user.selectedVehicleId;
    setState({ ...state, user: { ...user, vehicles, selectedVehicleId } });
    return { ok: true };
  },

  selectVehicle(id: string) {
    const user = state.user;
    if (!user) return;
    setState({ ...state, user: { ...user, selectedVehicleId: id } });
  },

  togglePreference(pref: string) {
    if (!state.user) return;
    const current = state.user.preferences ?? [];
    const preferences = current.includes(pref)
      ? current.filter((p) => p !== pref)
      : [...current, pref];
    setState({ ...state, user: { ...state.user, preferences } });
  },

  saveUpi(upiId: string) {
    if (!state.user) return;
    setState({ ...state, user: { ...state.user, upiId: upiId.trim() } });
  },

  deleteUpi() {
    if (!state.user) return;
    setState({ ...state, user: { ...state.user, upiId: "" } });
  },

  submitVerification(studentIdDoc: string) {
    if (!state.user) return;
    setState({
      ...state,
      user: {
        ...state.user,
        studentIdDoc,
        isVerified: true,
      },
    });
  },

  addRide(input: OfferRideInput): Ride {
    const user = state.user;
    const driver: Driver = user
      ? {
          id: user.id,
          name: user.name,
          dept: user.dept,
          initials: user.initials,
          color: DRIVER_COLORS[state.rides.length % DRIVER_COLORS.length],
          rating: user.rating || 5.0,
        }
      : {
          id: makeId("driver"),
          name: "You",
          dept: "CSE '26",
          initials: "ME",
          color: DRIVER_COLORS[0],
          rating: 5.0,
        };

    const selectedVehicle = user?.vehicles?.find((v) => v.id === (input.vehicleId || user.selectedVehicleId)) ?? user?.vehicles?.[0] ?? null;

    const distKm =
      input.distanceKm && input.distanceKm > 0
        ? input.distanceKm
        : input.fromCoords && input.toCoords
          ? distanceKm(input.fromCoords, input.toCoords)
          : 30;

    const totalFare = calculateTotalFare(distKm);
    const passengerCapacity = input.seats + 1; // driver + available passenger seats
    const costPerSeat = input.cost > 0 ? input.cost : calculateSplitFare(totalFare, passengerCapacity);

    const ride: Ride = {
      id: makeId("ride"),
      driver,
      from: input.from.trim(),
      to: input.to.trim(),
      fromCoords: input.fromCoords ?? null,
      toCoords: input.toCoords ?? null,
      date: input.date,
      time: input.time,
      totalSeats: input.seats,
      availableSeats: input.seats,
      passengers: [],
      totalFare,
      cost: costPerSeat,
      preferences: input.preferences,
      status: "Available",
      createdAt: Date.now(),
      distanceKm: distKm,
      soloFare: Math.round(totalFare * 1.4),
      vehicle: selectedVehicle,
    };

    setState({ ...state, rides: [ride, ...state.rides] });
    return ride;
  },

  joinRide(rideId: string): { ok: boolean; error?: string } {
    const user = state.user;
    if (!user) return { ok: false, error: "Please sign in to join a ride." };
    const ride = state.rides.find((r) => r.id === rideId);
    if (!ride) return { ok: false, error: "This ride is no longer available." };
    if (ride.driver.id === user.id) return { ok: false, error: "You cannot join your own ride." };
    if (ride.passengers.includes(user.id)) return { ok: false, error: "You have already joined this ride." };
    if (ride.availableSeats <= 0) return { ok: false, error: "This ride is currently full." };

    const updatedRides = state.rides.map((r) => {
      if (r.id !== rideId) return r;
      const nextPassengers = [...r.passengers, user.id];
      const availableSeats = r.availableSeats - 1;
      const passengerCount = nextPassengers.length + 1; // driver + passengers
      const cost = calculateSplitFare(r.totalFare, passengerCount);

      return {
        ...r,
        passengers: nextPassengers,
        availableSeats,
        cost,
        status: (availableSeats <= 0 ? "Full" : "Available") as RideStatus,
      };
    });

    const newPayment: PaymentTransaction = {
      id: makeId("pay"),
      rideId,
      amount: ride.cost,
      type: "paid",
      description: `Ride to ${ride.to}`,
      date: todayISO(),
      upiId: user.upiId || "user@upi",
    };

    const updatedUser: UserProfile = {
      ...user,
      totalRides: user.totalRides + 1,
      paymentHistory: [newPayment, ...(user.paymentHistory ?? [])],
    };

    setState({ user: updatedUser, rides: updatedRides });
    return { ok: true };
  },

  cancelRide(rideId: string): { ok: boolean; message: string } {
    const user = state.user;
    if (!user) return { ok: false, message: "User not logged in." };
    const ride = state.rides.find((r) => r.id === rideId);
    if (!ride) return { ok: false, message: "Ride not found." };

    if (ride.driver.id === user.id) {
      // Driver cancels entire ride
      const rides = state.rides.map((r) => (r.id === rideId ? { ...r, status: "Cancelled" as RideStatus } : r));
      setState({ ...state, rides });
      return { ok: true, message: "Ride cancelled successfully." };
    } else if (ride.passengers.includes(user.id)) {
      // Passenger leaves ride
      const rides = state.rides.map((r) => {
        if (r.id !== rideId) return r;
        const nextPassengers = r.passengers.filter((id) => id !== user.id);
        const availableSeats = r.availableSeats + 1;
        const cost = calculateSplitFare(r.totalFare, nextPassengers.length + 1);
        return {
          ...r,
          passengers: nextPassengers,
          availableSeats,
          cost,
          status: "Available" as RideStatus,
        };
      });
      setState({ ...state, rides });
      return { ok: true, message: "Booking cancelled successfully." };
    }

    return { ok: false, message: "You are not part of this ride." };
  },
};

/* ----------------------------- Offer Ride Input --------------------------- */

export type OfferRideInput = {
  from: string;
  to: string;
  fromCoords?: LatLng | null;
  toCoords?: LatLng | null;
  date: string; // ISO yyyy-mm-dd
  time: string; // HH:mm
  seats: number;
  cost: number;
  distanceKm?: number;
  preferences: string[];
  vehicleId?: string | null;
  vehicle?: Vehicle | null;
};

const LOCATION_RE = /[a-zA-Z]/;

export function validateOffer(input: Partial<OfferRideInput>): string | null {
  const from = (input.from ?? "").trim();
  const to = (input.to ?? "").trim();
  if (!from) return "Please select a pickup location.";
  if (from.length < 3 || !LOCATION_RE.test(from)) return "Please enter a valid pickup location in India.";
  if (!to) return "Please select a destination.";
  if (to.length < 3 || !LOCATION_RE.test(to)) return "Please enter a valid destination in India.";
  if (from.toLowerCase() === to.toLowerCase()) return "Pickup and destination must be different.";
  if (!input.date) return "Please choose a departure date.";
  if (input.date < todayISO()) return "Departure date cannot be in the past.";
  if (!input.time) return "Please choose a departure time.";
  if (!input.seats || input.seats <= 0) return "Seats must be at least 1.";
  return null;
}

/* ------------------------------- React Hooks ------------------------------ */

export function useCampusRide(): CampusRideState {
  return useSyncExternalStore(
    rideStore.subscribe,
    rideStore.getSnapshot,
    rideStore.getServerSnapshot,
  );
}

export function subscribeRides(listener: () => void): () => void {
  return rideStore.subscribe(listener);
}

export function getRides(): Ride[] {
  return rideStore.getSnapshot().rides;
}

export const MIN_DATE = todayISO;