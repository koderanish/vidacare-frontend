# VidaCare Admin Dashboard — Design Reference (`ui/`)

All 20 screens from the Flowstep design file
([`7ced5eb5-4340-43c2-a51d-51049df323aa`](https://app.flowstep.ai/file?activeFileId=7ced5eb5-4340-43c2-a51d-51049df323aa)),
fetched via the Flowstep MCP `get-screen` tool and saved **verbatim** —
byte-for-byte the JSX Flowstep itself generated, not a re-implementation.
This is the exact-fidelity source of truth for every reference screen.

## Contents

`source/` — one `.jsx` file per screen, in the same order as the design file:

| File | Screen |
|---|---|
| `01-admin-login.jsx` | Admin login |
| `02-dashboard-overview.jsx` | Dashboard overview |
| `03-user-management.jsx` | User management (table view) |
| `04-create-doctor.jsx` | Create doctor form |
| `05-create-caregiver.jsx` | Create caregiver form |
| `06-user-detail-drawer.jsx` | User detail drawer + disable-account dialog |
| `07-patients-list.jsx` | Patients list |
| `08-patient-profile-overview.jsx` | Patient profile — Overview tab |
| `09-patient-journal.jsx` | Patient profile — Journal tab |
| `10-treatment-plan.jsx` | Patient profile — Treatment tab |
| `11-doctor-assignment.jsx` | Doctor assignment |
| `12-caregiver-assignment.jsx` | Caregiver assignment + permissions |
| `13-care-team.jsx` | Care team relationship view |
| `14-alert-management.jsx` | Alert list |
| `15-alert-detail.jsx` | Alert detail |
| `16-resource-management.jsx` | Resource grid |
| `17-create-resource.jsx` | Resource authoring workspace |
| `18-notifications.jsx` | Notification management |
| `19-settings.jsx` | System settings |
| `20-dashboard-polish-states.jsx` | Dashboard states (loading/empty/error) |

Each file starts with the original metadata comment Flowstep attaches to
every screen, e.g.:

```jsx
<!-- screenType: "desktop-large" width: "1920" height: "1080" name: "Screen 1" colorTheme: "green" screenId: "237497fc-..." -->
```

## What these files are (and aren't)

- **Are:** the exact JSX Flowstep's AI design tool produced for each screen —
  full markup, exact Tailwind utility classes, exact copy, exact inline SVG
  paths and `oklch()` color values for illustrations/charts.
- **Assume** a `shadcn/ui` "New York"-style component library (`Card`,
  `Button`, `Input`, `Select`, `Tabs`, `Badge`, `Switch`, etc., all imported
  implicitly) plus `lucide-react` icons and a Tailwind theme with the
  semantic tokens `background`, `foreground`, `primary`, `muted-foreground`,
  `border`, `destructive`, `sidebar`, etc. — the same conventions shadcn's
  own generator uses. They are **not** standalone runnable components; they
  need that library/theme wired up to render (see below).
- **Are not** rendered images. Flowstep's `get-screen-image` tool returns a
  rendered PNG inline to the assistant but does not expose a downloadable
  file or URL, so pixel images could not be bundled here directly.

## Color values confirmed exact

A few `oklch()` values appear as literal numbers inside these files (chart
axis labels, gridlines, illustration strokes) rather than as semantic
classes, which made it possible to confirm — not guess — the underlying
theme:

| Token | Value | Where it's literal in the JSX |
|---|---|---|
| `--primary` (brand green) | `oklch(0.723 0.219 149.579)` | Screen 1 illustration strokes, Screen 2/8/20 chart lines |
| `--border` | `oklch(0.92 0.004 286.32)` | Screen 2/8/20 chart gridlines |
| `--muted-foreground` | `oklch(0.552 0.016 285.938)` | Screen 8/20 axis label `fill` |
| `--foreground` | `oklch(0.141 0.005 285.823)` | shadcn's standard "New York" neutral-theme default |
| `--destructive` | `oklch(0.577 0.245 27.325)` | shadcn's standard default |
| Screen 1 left-panel background | `oklch(0.97 0.015 220)` | literal arbitrary value on the `<aside>` |

`frontend/src/pages/Login.jsx` uses these exact values and is the one
screen in this project rebuilt to be pixel-accurate against its reference
image — see that file for a working example of wiring these tokens into a
real, functioning React page.

## Using these files

To render any of these screens pixel-accurately (beyond Login, which is
already done), the pattern that worked is:
1. Install `lucide-react` for icons.
2. Translate each shadcn semantic class (`bg-primary`, `text-muted-foreground`,
   `border-border`, ...) to the token table above, either as real shadcn/ui
   theme CSS variables or as inline styles/arbitrary Tailwind values.
3. Rebuild the shadcn primitives used (`Card`, `Select`, `Tabs`, etc.) or
   swap in the project's existing equivalents in `frontend/src/components/ui/`.

Say the word if you'd like any specific screen from this set built out as a
real, functioning page the same way Login.jsx was.
