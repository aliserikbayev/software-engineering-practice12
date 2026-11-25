# Shared user story and acceptance criteria

## User story

As a campus user, I want to enter a future start time and a duration for a fictional room so that I can see whether the room is available and understand why it is unavailable.

## Shared inputs and outputs

Inputs: start time, duration in minutes, room blocked flag, and the fixed fictional booking list.

Outputs: availability boolean, reason code, and a visible explanatory message. Both implementations must use the same fixtures and rules.

## Acceptance criteria

- **AC1 — Future start:** Start time must be in the future relative to the current local time.
- **AC2 — Duration:** Duration must be greater than 0 and no more than 120 minutes.
- **AC3 — Conflict:** Any overlap with an existing booking makes the requested interval unavailable.
- **AC4 — Blocked room:** A blocked room is unavailable.
- **AC5 — Read-only schedule:** The system displays a clear decision and does not change existing bookings.
- **AC6 — Input feedback:** Invalid input receives understandable feedback.

Intervals use half-open semantics [start, end): an interval ending exactly when another begins is adjacent, not overlapping.
