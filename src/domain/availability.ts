import type { Booking } from "./fixtures";

export type ReasonCode =
  | "AVAILABLE"
  | "INVALID_START"
  | "START_NOT_FUTURE"
  | "INVALID_DURATION"
  | "DURATION_TOO_LONG"
  | "ROOM_BLOCKED"
  | "BOOKING_CONFLICT";

export type AvailabilityInput = Readonly<{
  start: string;
  durationMinutes: number;
  now: Date;
  blocked: boolean;
  bookings: readonly Booking[];
}>;

export type AvailabilityResult = Readonly<{
  available: boolean;
  reasonCode: ReasonCode;
  message: string;
  requestedEnd?: string;
}>;

function parseClock(value: string): number | null {
  const match = /^(?:([01]\d|2[0-3])):([0-5]\d)$/.exec(value);
  if (!match) return null;
  return Number(match[1]) * 60 + Number(match[2]);
}

function clockToDate(day: string, minutes: number): Date {
  const result = new Date(day);
  result.setHours(Math.floor(minutes / 60), minutes % 60, 0, 0);
  return result;
}

function formatClock(minutes: number): string {
  const normalized = ((minutes % 1440) + 1440) % 1440;
  return `${String(Math.floor(normalized / 60)).padStart(2, "0")}:${String(normalized % 60).padStart(2, "0")}`;
}

function unavailable(reasonCode: ReasonCode, message: string): AvailabilityResult {
  return { available: false, reasonCode, message };
}

/** Pure availability rule engine. Booking fixtures are only read, never mutated. */
export function checkAvailability(input: AvailabilityInput): AvailabilityResult {
  const startMinutes = parseClock(input.start);
  if (startMinutes === null) {
    return unavailable("INVALID_START", "Enter a valid start time.");
  }

  if (!Number.isInteger(input.durationMinutes) || input.durationMinutes <= 0) {
    return unavailable("INVALID_DURATION", "Duration must be a positive whole number of minutes.");
  }

  if (input.durationMinutes > 120) {
    return unavailable("DURATION_TOO_LONG", "A booking cannot be longer than 120 minutes.");
  }

  const start = clockToDate(input.now.toDateString(), startMinutes);
  if (start.getTime() <= input.now.getTime()) {
    return unavailable("START_NOT_FUTURE", "Choose a start time later than the current time.");
  }

  const endMinutes = startMinutes + input.durationMinutes;
  if (endMinutes > 1440) {
    return unavailable("INVALID_START", "The requested interval must finish before midnight.");
  }
  const requestedEnd = formatClock(endMinutes);

  if (input.blocked) {
    return { ...unavailable("ROOM_BLOCKED", "This room is currently marked as unavailable."), requestedEnd };
  }

  const overlaps = input.bookings.some((booking) => {
    const bookingStart = parseClock(booking.start);
    const bookingEnd = parseClock(booking.end);
    if (bookingStart === null || bookingEnd === null) return false;
    // Half-open intervals [start, end): touching endpoints do not overlap.
    return startMinutes < bookingEnd && bookingStart < endMinutes;
  });

  if (overlaps) {
    return { ...unavailable("BOOKING_CONFLICT", "The requested time overlaps an existing booking."), requestedEnd };
  }

  return {
    available: true,
    reasonCode: "AVAILABLE",
    message: `Room available from ${input.start} to ${requestedEnd}.`,
    requestedEnd,
  };
}
