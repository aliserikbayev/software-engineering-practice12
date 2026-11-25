# Common test set (8 cases)

Use this same table for the code-based and low-code implementations. Test fixture: 25 November 2026, demo current time 08:00, room not blocked unless stated, four bookings from src/domain/fixtures.ts.

| ID | Input | Expected result | Reason code |
|---|---|---|---|
| T1 | 10:30, 60 min, room open | Available | AVAILABLE |
| T2 | 09:30, 45 min, room open | Unavailable (overlap with 09:00–10:00) | BOOKING_CONFLICT |
| T3 | 10:30, 30 min, room blocked | Unavailable | ROOM_BLOCKED |
| T4 | 10:30, 0 min, room open | Invalid input | INVALID_DURATION |
| T5 | 10:30, 121 min, room open | Invalid input | DURATION_TOO_LONG |
| T6 | 07:59, 30 min, room open | Invalid input (past start) | START_NOT_FUTURE |
| T7 | 10:00, 120 min, room open | Available; ends exactly at 12:00 | AVAILABLE |
| T8 | Run checks, compare booking list before and after | Booking data unchanged | N/A (immutability check) |

## Observed results

The source code contains automated Vitest assertions for T1–T8. Do not mark observed results as passed until `npm test` has actually been run in the project environment. Record the actual output and date here before submission.

| ID | Code observed | Low-code observed | Evidence |
|---|---|---|---|
| T1–T8 | Pending local/CI execution | Pending platform execution | Add test output and screenshots |
