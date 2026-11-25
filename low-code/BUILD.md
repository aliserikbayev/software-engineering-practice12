# Low-code implementation build sheet (Appsmith or Budibase)

## Screen and data

Create one page named **Room Availability**. Use a static JSON data source (no connector, credentials, or database):

```json
{
  "room": { "name": "Engineering Hall — Room 204", "building": "Engineering Block B", "capacity": 40 },
  "blocked": false,
  "bookings": [
    { "id": "b1", "title": "Data Structures Lecture", "start": "09:00", "end": "10:00" },
    { "id": "b2", "title": "Faculty Meeting", "start": "12:00", "end": "13:00" },
    { "id": "b3", "title": "Robotics Lab Prep", "start": "15:00", "end": "16:00" },
    { "id": "b4", "title": "Guest Seminar: AI Ethics", "start": "18:00", "end": "19:00" }
  ]
}
```

## Controls

1. Time input `startTime` (24-hour format, required).
2. Number input `durationMinutes` (integer, minimum 1, maximum 120, required).
3. Switch `roomBlocked` (default false; clearly label as a simulation control).
4. Button `Check availability`.
5. Result panel with `available`, `reasonCode`, and `message`.
6. Read-only list/table of the four fixed bookings.

## Shared decision expression

Implement the following logic as a small JS transformer (Appsmith) or equivalent low-code expression. Keep it pure: do not update the booking array.

```javascript
export default {
  check(start, duration, now, blocked, bookings) {
    const validTime = /^(?:([01]\\d|2[0-3])):([0-5]\\d)$/.exec(start || "");
    const fail = (reasonCode, message) => ({ available: false, reasonCode, message });
    if (!validTime) return fail("INVALID_START", "Enter a valid start time.");
    if (!Number.isInteger(Number(duration)) || Number(duration) <= 0)
      return fail("INVALID_DURATION", "Duration must be a positive whole number of minutes.");
    if (Number(duration) > 120)
      return fail("DURATION_TOO_LONG", "A booking cannot be longer than 120 minutes.");
    const startMinute = Number(validTime[1]) * 60 + Number(validTime[2]);
    const currentMinute = now.getHours() * 60 + now.getMinutes();
    if (startMinute <= currentMinute)
      return fail("START_NOT_FUTURE", "Choose a start time later than the current time.");
    const endMinute = startMinute + Number(duration);
    if (endMinute > 1440) return fail("INVALID_START", "The requested interval must finish before midnight.");
    const end = String(Math.floor(endMinute / 60)).padStart(2, "0") + ":" + String(endMinute % 60).padStart(2, "0");
    if (blocked) return { ...fail("ROOM_BLOCKED", "This room is currently marked as unavailable."), requestedEnd: end };
    const toMin = t => Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5));
    const overlap = bookings.some(b => startMinute < toMin(b.end) && toMin(b.start) < endMinute);
    if (overlap) return { ...fail("BOOKING_CONFLICT", "The requested time overlaps an existing booking."), requestedEnd: end };
    return { available: true, reasonCode: "AVAILABLE", message: `Room available from ${start} to ${end}.`, requestedEnd: end };
  }
};
```

## Binding and behavior

- Bind the button action to the transformer using the four controls, current local time, and static bookings.
- Bind the result panel to the returned object. Show success/failure text and reason code, not only color.
- Do not add create/update/delete booking actions. The schedule remains read-only.
- Use the same eight tests from ../docs/TEST-CASES.md.

## Evidence still required from a real platform session

Capture the page in the builder, the result for T1, a rejection for T2 or T3, and the eight-case test table. Export the app if the platform supports it. Add the real app URL/export and screenshots to the report. Record actual setup, implementation, debugging, and test time separately. If the selected free tier does not support export or public publishing, record that limitation rather than claiming it does.
