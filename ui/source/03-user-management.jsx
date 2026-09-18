<!-- screenType: "desktop-large" width: "1920" height: "1080" name: "Screen 3" colorTheme: "green" screenId: "641b9591-f65c-4cd7-b75a-80c57221e6d0" -->
<div className="bg-background text-foreground w-full h-fit">
  <div className="font-sans bg-background text-foreground min-h-screen">
    <aside className="bg-sidebar border-y-border border-r border-r-border border-l-border flex fixed z-20 top-0 bottom-0 left-0 pt-6 pr-4 pb-6 pl-4 flex-col w-[248px]">
      <div className="flex pr-3 pl-3 items-center gap-2.5">
        <div className="rounded-full bg-primary text-primary-foreground flex justify-center items-center size-8">
          <HeartPulse className="size-4" />
        </div>
        <span className="font-semibold text-foreground text-lg tracking-tight">
          VidaCare
        </span>
      </div>
      <nav
        className="flex mt-10 flex-col flex-1"
        aria-label="Primary navigation"
      >
        <div>
          <a
            href="#"
            className="font-medium rounded-xl text-muted-foreground text-sm flex mb-1 pt-2.5 pr-3 pb-2.5 pl-3 items-center gap-3"
          >
            <LayoutDashboard className="size-5" />
            <span>Dashboard</span>
          </a>
          <a
            href="#"
            className="font-medium rounded-xl bg-accent text-primary text-sm flex relative mb-1 pt-2.5 pr-3 pb-2.5 pl-3 items-center gap-3"
          >
            <span className="rounded-r-full bg-primary absolute -left-4 w-1 h-5" />
            <Users className="size-5" />
            <span>Patients</span>
          </a>
          <a
            href="#"
            className="font-medium rounded-xl text-muted-foreground text-sm flex mb-1 pt-2.5 pr-3 pb-2.5 pl-3 items-center gap-3"
          >
            <Stethoscope className="size-5" />
            <span>Doctors</span>
          </a>
          <a
            href="#"
            className="font-medium rounded-xl text-muted-foreground text-sm flex mb-1 pt-2.5 pr-3 pb-2.5 pl-3 items-center gap-3"
          >
            <HeartHandshake className="size-5" />
            <span>Caregivers</span>
          </a>
          <a
            href="#"
            className="font-medium rounded-xl text-muted-foreground text-sm flex mb-1 pt-2.5 pr-3 pb-2.5 pl-3 items-center gap-3"
          >
            <BookOpen className="size-5" />
            <span>Resources</span>
          </a>
          <a
            href="#"
            className="font-medium rounded-xl text-muted-foreground text-sm flex pt-2.5 pr-3 pb-2.5 pl-3 items-center gap-3"
          >
            <TriangleAlert className="size-5" />
            <span>Alerts</span>
          </a>
        </div>
        <div className="mt-auto">
          <a
            href="#"
            className="font-medium rounded-xl text-muted-foreground text-sm flex mb-1 pt-2.5 pr-3 pb-2.5 pl-3 items-center gap-3"
          >
            <Bell className="size-5" />
            <span>Notifications</span>
          </a>
          <a
            href="#"
            className="font-medium rounded-xl text-muted-foreground text-sm flex pt-2.5 pr-3 pb-2.5 pl-3 items-center gap-3"
          >
            <Settings className="size-5" />
            <span>Settings</span>
          </a>
        </div>
      </nav>
    </aside>
    <div className="ml-[248px] min-h-screen">
      <header className="bg-background border-t-border border-r-border border-b border-b-border border-l-border flex pr-8 pl-8 justify-between items-center h-[72px]">
        <h1 className="font-semibold text-foreground text-xl tracking-tight">
          User management
        </h1>
        <div className="flex items-center gap-6">
          <div className="relative w-72">
            <Search className="-translate-y-1/2 pointer-events-none text-muted-foreground absolute top-1/2 left-3 size-4" />
            <input
              aria-label="Global search"
              className="ring-ring shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-xl bg-card text-foreground text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border outline-none pr-4 pl-10 w-full h-10"
            />
          </div>
          <button
            type="button"
            aria-label="Notifications"
            className="rounded-xl text-muted-foreground relative pt-2 pr-2 pb-2 pl-2"
          >
            <Bell className="size-5" />
            <span className="rounded-full bg-primary absolute top-1.5 right-1.5 size-2" />
          </button>
          <div className="flex items-center gap-3">
            <div className="font-semibold rounded-full bg-primary text-primary-foreground text-sm flex justify-center items-center size-10">
              MC
            </div>
            <div className="leading-tight">
              <p className="font-semibold text-foreground text-sm">Maya Chen</p>
              <p className="text-muted-foreground text-xs mt-1">
                System Administrator
              </p>
            </div>
            <ChevronDown className="text-muted-foreground size-4" />
          </div>
        </div>
      </header>
      <main className="pt-8 pr-8 pb-8 pl-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="font-semibold text-2xl tracking-tight mb-2">
              Users
            </h2>
            <p className="text-muted-foreground text-sm">
              Manage access across patients, doctors, and caregivers.
            </p>
          </div>
          <button
            type="button"
            className="font-semibold shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-xl bg-primary text-primary-foreground text-sm flex pt-2.5 pr-4 pb-2.5 pl-4 items-center gap-2"
          >
            <span>+ Add user</span>
            <ChevronDown className="size-4" />
          </button>
        </div>
        <div className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border mt-8 pt-4 pr-4 pb-4 pl-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="-translate-y-1/2 pointer-events-none text-muted-foreground absolute top-1/2 left-3 size-4" />
              <input
                aria-label="Search users"
                placeholder="Search by name or email"
                className="ring-ring rounded-xl bg-background text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border outline-none pr-4 pl-10 w-full h-10"
                defaultValue=""
              />
            </div>
            <select
              aria-label="Filter by role"
              className="ring-ring rounded-xl bg-background text-foreground text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border outline-none pr-3 pl-3 h-10"
              defaultValue="All roles"
            >
              <option>All roles</option>
              <option>Patient</option>
              <option>Doctor</option>
              <option>Caregiver</option>
            </select>
            <select
              aria-label="Filter by status"
              className="ring-ring rounded-xl bg-background text-foreground text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border outline-none pr-3 pl-3 h-10"
              defaultValue="All statuses"
            >
              <option>All statuses</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Disabled</option>
            </select>
            <button
              type="button"
              className="font-medium rounded-xl bg-background text-muted-foreground text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pr-4 pl-4 h-10"
            >
              More filters
            </button>
          </div>
        </div>
        <div className="border-t-border border-r-border border-b border-b-border border-l-border flex mt-8 items-center gap-8">
          <button type="button">
            Patient<span className="text-xs ml-2">12,480</span>
          </button>
          <button type="button">
            Doctor<span className="text-xs ml-2">386</span>
          </button>
          <button type="button">
            Caregiver<span className="text-xs ml-2">1,248</span>
          </button>
        </div>
        <div className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border mt-6 overflow-hidden">
          <table className="text-left border-collapse w-full">
            <thead className="bg-muted/40 border-t-border border-r-border border-b border-b-border border-l-border">
              <tr className="font-semibold uppercase text-muted-foreground text-xs tracking-wide">
                <th className="pt-4 pr-6 pb-4 pl-6">Name</th>
                <th className="pt-4 pr-4 pb-4 pl-4">Email</th>
                <th className="pt-4 pr-4 pb-4 pl-4">Role</th>
                <th className="pt-4 pr-4 pb-4 pl-4">Status</th>
                <th className="pt-4 pr-4 pb-4 pl-4">Assigned Doctor</th>
                <th className="pt-4 pr-4 pb-4 pl-4">Assigned Caregiver</th>
                <th className="pt-4 pr-4 pb-4 pl-4">Last Active</th>
                <th className="pt-4 pr-4 pb-4 pl-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-t-border border-r-border border-b border-b-border border-l-border">
                <td className="font-medium pt-5 pr-6 pb-5 pl-6">
                  Olivia Bennett
                </td>
                <td className="text-muted-foreground pt-5 pr-4 pb-5 pl-4">
                  olivia.bennett@email.com
                </td>
                <td className="pt-5 pr-4 pb-5 pl-4">
                  <span className="font-medium rounded-full bg-secondary text-secondary-foreground text-xs pt-1 pr-2.5 pb-1 pl-2.5">
                    Patient
                  </span>
                </td>
                <td className="pt-5 pr-4 pb-5 pl-4">
                  <span className="flex items-center gap-2">
                    <span className="rounded-full bg-primary size-2" />
                    Active
                  </span>
                </td>
                <td className="pt-5 pr-4 pb-5 pl-4">Dr. Lucas Martin</td>
                <td className="pt-5 pr-4 pb-5 pl-4">Nora Williams</td>
                <td className="text-muted-foreground pt-5 pr-4 pb-5 pl-4">
                  Today, 9:42 AM
                </td>
                <td className="pt-5 pr-4 pb-5 pl-4">
                  <button
                    type="button"
                    aria-label="Actions for Olivia Bennett"
                    className="rounded-lg text-muted-foreground pt-2 pr-2 pb-2 pl-2"
                  >
                    <MoreHorizontal className="size-4" />
                  </button>
                </td>
              </tr>
              <tr className="border-t-border border-r-border border-b border-b-border border-l-border">
                <td className="font-medium pt-5 pr-6 pb-5 pl-6">Ethan Cole</td>
                <td className="text-muted-foreground pt-5 pr-4 pb-5 pl-4">
                  ethan.cole@email.com
                </td>
                <td className="pt-5 pr-4 pb-5 pl-4">
                  <span className="font-medium rounded-full bg-secondary text-secondary-foreground text-xs pt-1 pr-2.5 pb-1 pl-2.5">
                    Patient
                  </span>
                </td>
                <td className="pt-5 pr-4 pb-5 pl-4">
                  <span className="flex items-center gap-2">
                    <span className="rounded-full bg-primary size-2" />
                    Active
                  </span>
                </td>
                <td className="pt-5 pr-4 pb-5 pl-4">Dr. Priya Shah</td>
                <td className="pt-5 pr-4 pb-5 pl-4">Marcus Lee</td>
                <td className="text-muted-foreground pt-5 pr-4 pb-5 pl-4">
                  Today, 8:17 AM
                </td>
                <td className="pt-5 pr-4 pb-5 pl-4">
                  <button
                    type="button"
                    aria-label="Actions for Ethan Cole"
                    className="rounded-lg text-muted-foreground pt-2 pr-2 pb-2 pl-2"
                  >
                    <MoreHorizontal className="size-4" />
                  </button>
                </td>
              </tr>
              <tr className="border-t-border border-r-border border-b border-b-border border-l-border">
                <td className="font-medium pt-5 pr-6 pb-5 pl-6">
                  Dr. Lucas Martin
                </td>
                <td className="text-muted-foreground pt-5 pr-4 pb-5 pl-4">
                  lucas.martin@vidacare.com
                </td>
                <td className="pt-5 pr-4 pb-5 pl-4">
                  <span className="font-medium rounded-full bg-blue-100 text-blue-700 text-xs pt-1 pr-2.5 pb-1 pl-2.5">
                    Doctor
                  </span>
                </td>
                <td className="pt-5 pr-4 pb-5 pl-4">
                  <span className="flex items-center gap-2">
                    <span className="rounded-full bg-primary size-2" />
                    Active
                  </span>
                </td>
                <td className="pt-5 pr-4 pb-5 pl-4">—</td>
                <td className="pt-5 pr-4 pb-5 pl-4">—</td>
                <td className="text-muted-foreground pt-5 pr-4 pb-5 pl-4">
                  Today, 9:18 AM
                </td>
                <td className="pt-5 pr-4 pb-5 pl-4">
                  <button
                    type="button"
                    aria-label="Actions for Dr. Lucas Martin"
                    className="rounded-lg text-muted-foreground pt-2 pr-2 pb-2 pl-2"
                  >
                    <MoreHorizontal className="size-4" />
                  </button>
                </td>
              </tr>
              <tr className="border-t-border border-r-border border-b border-b-border border-l-border">
                <td className="font-medium pt-5 pr-6 pb-5 pl-6">
                  Nora Williams
                </td>
                <td className="text-muted-foreground pt-5 pr-4 pb-5 pl-4">
                  nora.williams@email.com
                </td>
                <td className="pt-5 pr-4 pb-5 pl-4">
                  <span className="font-medium rounded-full bg-violet-100 text-violet-700 text-xs pt-1 pr-2.5 pb-1 pl-2.5">
                    Caregiver
                  </span>
                </td>
                <td className="pt-5 pr-4 pb-5 pl-4">
                  <span className="flex items-center gap-2">
                    <span className="rounded-full bg-amber-500 size-2" />
                    Pending
                  </span>
                </td>
                <td className="pt-5 pr-4 pb-5 pl-4">Dr. Priya Shah</td>
                <td className="pt-5 pr-4 pb-5 pl-4">—</td>
                <td className="text-muted-foreground pt-5 pr-4 pb-5 pl-4">
                  Yesterday, 4:32 PM
                </td>
                <td className="pt-5 pr-4 pb-5 pl-4">
                  <button
                    type="button"
                    aria-label="Actions for Nora Williams"
                    className="rounded-lg text-muted-foreground pt-2 pr-2 pb-2 pl-2"
                  >
                    <MoreHorizontal className="size-4" />
                  </button>
                </td>
              </tr>
              <tr>
                <td className="font-medium pt-5 pr-6 pb-5 pl-6">
                  Samuel Ortiz
                </td>
                <td className="text-muted-foreground pt-5 pr-4 pb-5 pl-4">
                  samuel.ortiz@email.com
                </td>
                <td className="pt-5 pr-4 pb-5 pl-4">
                  <span className="font-medium rounded-full bg-secondary text-secondary-foreground text-xs pt-1 pr-2.5 pb-1 pl-2.5">
                    Patient
                  </span>
                </td>
                <td className="pt-5 pr-4 pb-5 pl-4">
                  <span className="font-medium rounded-full bg-muted text-muted-foreground text-xs pt-1 pr-2.5 pb-1 pl-2.5">
                    Disabled
                  </span>
                </td>
                <td className="pt-5 pr-4 pb-5 pl-4">Dr. Lucas Martin</td>
                <td className="pt-5 pr-4 pb-5 pl-4">—</td>
                <td className="text-muted-foreground pt-5 pr-4 pb-5 pl-4">
                  Jun 08, 2025
                </td>
                <td className="pt-5 pr-4 pb-5 pl-4">
                  <button
                    type="button"
                    aria-label="Actions for Samuel Ortiz"
                    className="rounded-lg text-muted-foreground pt-2 pr-2 pb-2 pl-2"
                  >
                    <MoreHorizontal className="size-4" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="border-x-border border-t border-t-border border-b-border flex pt-4 pr-6 pb-4 pl-6 justify-between items-center">
            <p className="text-muted-foreground text-sm">
              Showing 1–5 of 14,114 users
            </p>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Previous page"
                className="rounded-lg text-muted-foreground pt-2 pr-2 pb-2 pl-2"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                className="font-medium rounded-lg bg-primary text-primary-foreground text-sm size-8"
              >
                1
              </button>
              <button
                type="button"
                className="rounded-lg text-muted-foreground text-sm size-8"
              >
                2
              </button>
              <button
                type="button"
                className="rounded-lg text-muted-foreground text-sm size-8"
              >
                3
              </button>
              <span className="text-muted-foreground text-sm pr-2 pl-2">…</span>
              <button
                type="button"
                className="rounded-lg text-muted-foreground text-sm w-12 h-8"
              >
                2,823
              </button>
              <button
                type="button"
                aria-label="Next page"
                className="rounded-lg text-muted-foreground pt-2 pr-2 pb-2 pl-2"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-muted/30 text-muted-foreground text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border hidden pt-3 pr-4 pb-3 pl-4 items-center gap-2">
          <Users className="size-4" />
          <span>No users match your current filters</span>
        </div>
        <div className="rounded-xl bg-muted/30 border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border hidden pt-4 pr-4 pb-4 pl-4">
          <p className="font-medium text-muted-foreground text-sm mb-3">
            Loading users…
          </p>
          <div>
            <div className="animate-pulse rounded-lg bg-muted mb-2 h-10" />
            <div className="animate-pulse rounded-lg bg-muted mb-2 h-10" />
            <div className="animate-pulse rounded-lg bg-muted h-10" />
          </div>
        </div>
      </main>
      <div className="shadow-[0px_10px_15px_-3px_rgba(0,_0,_0,_0.1),_0px_4px_6px_-4px_rgba(0,_0,_0,_0.1)] rounded-xl bg-card text-foreground text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border flex fixed right-8 bottom-6 pt-3 pr-4 pb-3 pl-4 items-center gap-3">
        <span className="rounded-full bg-primary text-primary-foreground flex justify-center items-center size-5">
          <Check className="size-3" />
        </span>
        <span>User updated successfully</span>
      </div>
    </div>
  </div>
</div>;
