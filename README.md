# Smart Campus Room Availability Checker

A small, fictional Smart Campus room-availability checker built for the Software Engineering Practice 12 assignment.

## Scope

- One fictional room: Engineering Hall — Room 204 (capacity 40).
- Fixed fictional bookings; no personal data, login, payments, backend, or production database.
- A user supplies a future start time and a duration from 1 to 120 minutes.
- The checker returns an availability decision, a reason code, and a readable explanation.
- Existing booking data is immutable from the checker.

## Run locally

```bash
npm install
npm run dev
```

Run the automated test suite:

```bash
npm test
npm run build
```

## Project structure

- `src/domain/availability.ts` — pure decision engine and reason codes.
- `src/domain/fixtures.ts` — fictional room and fixed bookings.
- `src/domain/availability.test.ts` — eight assignment acceptance scenarios.
- `src/App.tsx` — responsive browser interface.
- `low-code/` — low-code implementation blueprint and platform limitations.
- `docs/` — acceptance criteria, test evidence, comparison, security review, and AI-use reflection.

## Assignment evidence and honesty notes

The repository contains the code-based implementation and a reproducible low-code build specification. It does **not** claim that an Appsmith/Budibase cloud app has been published or that platform screenshots have been captured. Complete the platform-specific steps in `low-code/BUILD.md` if the instructor requires a live low-code app. Measured build/debug times and observed test results must be filled in after running the project; no timings or screenshots are fabricated.

The assignment PDF labels the work Practice #12, while its submission instruction refers to Practice #13. Confirm the required email subject with the instructor before submission.

## Source project

The existing Smart Campus Practice 10 repository was used as read-only reference material for the fictional scenario and validation concepts. This repository is an independent implementation; the source repository was not modified.

## Student submission details

Fill in your full name, student ID, class time/day, AI tool/model, measured results, and screenshots in `docs/REPORT.md` before submission.
