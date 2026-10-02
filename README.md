# VidaCare Admin Dashboard (Frontend)

React (Vite) admin dashboard for the VidaCare backend. Visual language
follows the Flowstep design reference: white/light background, teal primary
accent, rounded cards, soft shadows, generous spacing.

## Stack

- **React 18** + **Vite** — no CRA, fast HMR.
- **React Router v6** — client-side routing, `ProtectedRoute` gates every
  admin page on `status === ACTIVE` and `role === ADMIN`.
- **TanStack Query** — all server state (no Redux/Context duplication of
  API data); handles loading/error states, caching, and refetch-on-mutation.
- **Axios** — `src/api/client.js` attaches the bearer token to every
  request and does one silent refresh-token retry on a 401 before forcing
  re-login.
- **Tailwind CSS** — utility-first, VidaCare teal palette in
  `tailwind.config.js`.
- **Recharts** — all charts (dashboard trends, per-patient vitals).
- **react-hot-toast** — success/error toasts on every mutation.

## Run it

```bash
npm install
cp .env.example .env   # VITE_API_URL, defaults to http://localhost:3000/api
npm run dev             # http://localhost:5173
```

Requires the backend running and seeded (`../README.md`).

## Structure

```
src/
  api/            One file per resource (auth, admin, patients, vitals, ...),
                   thin wrappers returning res.data.data — no fetch calls
                   anywhere else in the codebase.
  context/         AuthContext — bootstraps from a stored token, exposes
                    login/logout/user.
  routes/          ProtectedRoute — auth + status + role gate.
  components/
    layout/        AdminShell, Sidebar, Topbar
    ui/            Card, Badge, Button, StatCard, Pagination, ConfirmDialog,
                    LoadingState/ErrorState/EmptyState, Skeleton
  pages/           One file per route; patient/ holds the five tab
                    components rendered inside PatientDetails.
```

## What's wired to the real API (nothing here is static/fake data)

**Module 1 — Overview + User Management (complete)**
- Login, session bootstrap, protected routing, PENDING/REJECTED/SUSPENDED
  status screen.
- Dashboard: live stat cards, patient-activity + registration charts
  (Recharts, real data), recent-activity feed.
- User Management: search, role/status filters, pagination, user detail
  page with suspend/reactivate (confirm dialog + toast).
- Verifications: pending/approved/rejected tabs, approve, reject-with-reason
  dialog — both call the real approve/reject endpoints and invalidate the
  list + dashboard stats on success.

**Module 2 — Patient Care + Monitoring (complete)**
- Patient list: search, pagination, assigned-doctor/caregiver columns with
  an "Unassigned" badge.
- Patient detail, five live tabs: **Overview** (latest vitals per type),
  **Vitals** (14-day trend charts per vital type, real data from
  `/vitals/.../trends`), **Journal** (entries table), **Treatment** (active
  plan, adherence bar, medications table, or a real empty state), **Care
  Team** (current doctor/caregiver + permissions, with an admin-only
  assign/change flow that calls the real assignment endpoints).

**Module 3 — Resources + Alerts + System (complete)**
- Alerts: status/severity filters, mark-reviewed / resolve actions (real
  mutations, toast + list refresh).
- Resources: category/search filters, create-resource modal, publish/
  unpublish toggle.
- Notifications: mark-read, mark-all-read, delete.
- Settings: live alert-threshold form (reads/writes `/admin/alert-settings`).

## States implemented on every data page

Loading (spinner or skeleton), error (message + retry), empty (contextual
message, matching the Flowstep empty-state copy where applicable), and
success feedback via toast on every mutation. Destructive/impactful actions
(suspend account, reject application) go through a confirm dialog.

## Verified end-to-end

A scripted headless-Chrome walkthrough (login → dashboard → search users →
open a patient → all five tabs → verifications → approve a doctor → alerts
→ resources → notifications → settings) ran with **zero console errors,
zero page errors, and zero failed/5xx API requests**. See the parent
`docs/TESTING.md` for the full backend test coverage this frontend consumes.

## Known gaps (time-boxed build)

- No client-side form validation library (relies on `required`/`type`
  HTML attributes + backend Zod validation surfacing as toasts) — acceptable
  for a prototype, but a library like `react-hook-form` + `zod` would be the
  next step for production.
- Resource edit (vs. create) and treatment-plan creation/medication editing
  UIs are not built — the backend endpoints exist and are exercised by the
  Postman collection, but no admin form calls them yet.
- No dark mode (Flowstep reference is light-only).
- Bundle isn't code-split (single ~700KB JS chunk) — fine for a prototype
  demo, would want route-based `lazy()` splitting before production.
