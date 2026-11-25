# Software Engineering Practice 12 — comparison report

> The assignment PDF names this Practice #12, but its submission instruction refers to Practice #13. Confirm the expected email subject with the instructor.

## Student and submission metadata

- Student name: **Ali Serikbayev** (verify spelling before submission)
- Student ID: **24B031103** (verify before submission)
- Class time/day: **[fill in]**
- AI tool: **ChatGPT, GPT-6** (verify model label in the session)
- Code repository: https://github.com/aliserikbayev/software-engineering-practice12
- Published low-code app URL: **Not published — complete low-code/BUILD.md in Appsmith or Budibase if required**
- Low-code export: **Not available yet**

## 1. Baseline and scope

The baseline is the fictional Smart Campus Room Availability Checker scenario: one room, a fixed schedule, no personal data, no login, no payment, and no production database. The prior Practice 10 codebase was inspected as read-only reference material. The implementation here uses a shared decision contract and does not modify that source repository.

Room: Engineering Hall — Room 204, Engineering Block B, capacity 40.

Fixed bookings: Data Structures Lecture (09:00–10:00), Faculty Meeting (12:00–13:00), Robotics Lab Prep (15:00–16:00), Guest Seminar: AI Ethics (18:00–19:00).

## 2. Common requirements

See [ACCEPTANCE-CRITERIA.md](./ACCEPTANCE-CRITERIA.md) and [TEST-CASES.md](./TEST-CASES.md). Both implementations are required to take start time, duration, blocked status, and the same fixed bookings, and return availability, reason code, and visible message.

## 3. Code-based solution

The React + TypeScript + Vite implementation separates the pure decision engine (`src/domain/availability.ts`), fixed fixtures (`src/domain/fixtures.ts`), interface (`src/App.tsx`), and tests (`src/domain/availability.test.ts`). The layout adapts to narrow screens. Booking intervals use half-open overlap semantics, so adjacent reservations do not conflict. The schedule is read-only.

Run `npm install`, `npm test`, and `npm run build`. Paste the actual command output and add screenshots after running locally. Do not report a pass count until execution succeeds.

## 4. Low-code solution

The repository contains an Appsmith/Budibase build specification in `low-code/BUILD.md`, including the same static data, controls, pure decision logic, bindings, and test expectations. It is a reproducible implementation plan, not a claim that an app has been created or published on a third-party platform. Add the actual platform URL, export, screenshots, and any platform limitations after completing that work.

## 5. Engineering effort and comparison

Record measured time with a stopwatch. Separate setup, implementation, debugging, and testing. Do not substitute estimates for measurements.

| Measure | Code-based | Low-code |
|---|---|---|
| Setup time | [measure] | [measure] |
| Implementation time | [measure] | [measure] |
| Debugging time | [measure] | [measure] |
| Testing time | [measure] | [measure] |
| Passing tests | [record /8] | [record /8] |
| Unresolved defects | [record] | [record] |
| Customization | [evidence-based note] | [evidence-based note] |
| Versioning/portability | Git source and dependency manifest; add lockfile | Depends on platform export and workspace plan; verify |
| Ongoing cost | Static hosting may be free; verify chosen host | Verify platform tier, limits, and publishing/export costs |

### Recommendation

[Complete after implementing and measuring both solutions. Base the recommendation on observed test results, measured effort, customization needs, security controls, portability, and ongoing cost.]

## 6. Security review

See [SECURITY-REVIEW.md](./SECURITY-REVIEW.md). Complete pending dependency, runtime, and platform checks before submission.

## 7. AI-use reflection

AI assistance was used to help structure the implementation, write the rule engine/tests, draft documentation, and prepare a low-code build specification. The student must review the code, run the tests, verify the requirements against the assignment PDF, complete the low-code platform work, and replace all pending placeholders with observed evidence. AI-generated output is not a substitute for validating the implementation.

## 8. Evidence checklist

- [ ] Screenshot of the code-based app before checking.
- [ ] Screenshot of a successful availability result.
- [ ] Screenshot of an unavailable result with a clear reason.
- [ ] Automated test output showing T1–T8.
- [ ] Low-code builder screenshot and running result.
- [ ] Low-code export and published URL, if supported/required.
- [ ] Eight-case expected/observed table completed for both approaches.
- [ ] Measured setup, implementation, debugging, and testing times.
- [ ] Comparison matrix and evidence-based recommendation.
- [ ] Security checklist completed.
- [ ] Confirm Practice #12/#13 submission naming with instructor.

The assignment handout requests sending screenshots to b.azimkhanov@kbtu.kz, with an email subject indicating AI-Driven Software Engineering Practice #13, the student's full name and ID, class time/day, AI tool/model, project link, and export. Confirm the apparent Practice #12 vs Practice #13 mismatch before sending.
