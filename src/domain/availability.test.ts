import { describe, expect, it } from "vitest";
import { checkAvailability } from "./availability";
import { INITIAL_BOOKINGS } from "./fixtures";

const now = new Date(2026, 10, 25, 8, 0, 0);

describe("Practice 12 shared test cases", () => {
  it("T1: allows a valid free future interval", () => {
    const result = checkAvailability({ start: "10:30", durationMinutes: 60, now, blocked: false, bookings: INITIAL_BOOKINGS });
    expect(result.available).toBe(true);
    expect(result.reasonCode).toBe("AVAILABLE");
  });

  it("T2: rejects an interval overlapping an existing booking", () => {
    const result = checkAvailability({ start: "09:30", durationMinutes: 45, now, blocked: false, bookings: INITIAL_BOOKINGS });
    expect(result.available).toBe(false);
    expect(result.reasonCode).toBe("BOOKING_CONFLICT");
  });

  it("T3: rejects a blocked room", () => {
    const result = checkAvailability({ start: "10:30", durationMinutes: 30, now, blocked: true, bookings: INITIAL_BOOKINGS });
    expect(result.available).toBe(false);
    expect(result.reasonCode).toBe("ROOM_BLOCKED");
  });

  it("T4: rejects duration zero", () => {
    const result = checkAvailability({ start: "10:30", durationMinutes: 0, now, blocked: false, bookings: INITIAL_BOOKINGS });
    expect(result.reasonCode).toBe("INVALID_DURATION");
  });

  it("T5: rejects duration greater than 120 minutes", () => {
    const result = checkAvailability({ start: "10:30", durationMinutes: 121, now, blocked: false, bookings: INITIAL_BOOKINGS });
    expect(result.reasonCode).toBe("DURATION_TOO_LONG");
  });

  it("T6: rejects a start time in the past", () => {
    const result = checkAvailability({ start: "07:59", durationMinutes: 30, now, blocked: false, bookings: INITIAL_BOOKINGS });
    expect(result.reasonCode).toBe("START_NOT_FUTURE");
  });

  it("T7: allows an interval adjacent to an existing booking", () => {
    const result = checkAvailability({ start: "10:00", durationMinutes: 120, now, blocked: false, bookings: INITIAL_BOOKINGS });
    expect(result.available).toBe(true);
    expect(result.requestedEnd).toBe("12:00");
  });

  it("T8: leaves fixed booking data unchanged after checks", () => {
    const before = JSON.stringify(INITIAL_BOOKINGS);
    checkAvailability({ start: "10:30", durationMinutes: 30, now, blocked: false, bookings: INITIAL_BOOKINGS });
    checkAvailability({ start: "09:30", durationMinutes: 30, now, blocked: false, bookings: INITIAL_BOOKINGS });
    expect(JSON.stringify(INITIAL_BOOKINGS)).toBe(before);
  });
});
