# Security and safety review

This is a local, fictional demonstration. It intentionally has no authentication, personal data, payment flow, network connector, backend, or production database.

| Area | Review / control | Status |
|---|---|---|
| Input validation | Strict 24-hour HH:MM parsing; duration must be a positive integer no greater than 120; reject past starts and intervals crossing midnight | Implemented in code |
| Output handling | User-controlled values are rendered through React text nodes, not injected as HTML; no `dangerouslySetInnerHTML` | Implemented in code |
| Data integrity | Fixed booking fixtures are read-only; checker does not mutate them; immutability test T8 | Implemented in code |
| Permissions | No user accounts or authorization roles exist in this demo; do not expose as a real booking service | Scope limitation |
| Public sharing | If deploying a static demo, publish only fictional data and no secrets | Deployment checklist |
| Secrets/connectors | No API keys, environment secrets, or third-party connectors required | Not applicable |
| Dependency/SCA | Review npm audit and dependency update notices before any public deployment; lock dependency versions with a generated package-lock.json | Run before submission |
| Runtime/DAST | Manually test malformed times, blank values, negative/decimal/oversized duration, and narrow-screen behavior; only test systems you own or are authorized to test | Manual checks pending |
| Platform responsibility | For Appsmith/Budibase, review workspace access, public-app permissions, export, and platform security/update responsibilities | Platform review pending |

## Manual negative checks

- Try malformed time values and blank values.
- Try duration -1, 0, 1.5, 120, and 121.
- Try a start at the current time and a start in the past.
- Try a booking that crosses midnight.
- Confirm no control can edit the fixed schedule.
- If deployed, verify the public page contains no tokens, secrets, personal data, or private connector configuration.
