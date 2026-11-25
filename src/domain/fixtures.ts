export type Booking = Readonly<{
  id: string;
  title: string;
  start: string;
  end: string;
}>;

export const ROOM = Object.freeze({
  name: "Engineering Hall — Room 204",
  building: "Engineering Block B",
  capacity: 40,
});

export const INITIAL_BOOKINGS: readonly Booking[] = Object.freeze([
  Object.freeze({ id: "b1", title: "Data Structures Lecture", start: "09:00", end: "10:00" }),
  Object.freeze({ id: "b2", title: "Faculty Meeting", start: "12:00", end: "13:00" }),
  Object.freeze({ id: "b3", title: "Robotics Lab Prep", start: "15:00", end: "16:00" }),
  Object.freeze({ id: "b4", title: "Guest Seminar: AI Ethics", start: "18:00", end: "19:00" }),
]);
