<!-- screenType: "desktop-large" width: "1920" height: "1080" name: "Screen 20" colorTheme: "green" screenId: "2aee0974-1e87-498b-aabb-924b31135f44" -->
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
            className="font-medium rounded-xl bg-accent text-primary text-sm flex relative mb-1 pt-2.5 pr-3 pb-2.5 pl-3 items-center gap-3"
          >
            <span className="rounded-r-full bg-primary absolute -left-4 w-1 h-5" />
            <LayoutDashboard className="size-5" />
            <span>Dashboard</span>
          </a>
          <a
            href="#"
            className="font-medium rounded-xl text-muted-foreground text-sm flex mb-1 pt-2.5 pr-3 pb-2.5 pl-3 items-center gap-3"
          >
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
          Dashboard overview
        </h1>
        <div className="flex items-center gap-6">
          <div className="relative w-72">
            <Search className="-translate-y-1/2 pointer-events-none text-muted-foreground absolute top-1/2 left-3 size-4" />
            <input
              aria-label="Global search"
              className="ring-ring shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-xl bg-card text-foreground text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border outline-none pr-4 pl-10 w-full h-10"
              defaultValue=""
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
        <div className="flex mb-6 justify-between items-end">
          <div>
            <h2 className="font-semibold text-2xl tracking-tight">
              Dashboard overview
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Operational snapshot for the VidaCare demo workspace.
            </p>
          </div>
          <div className="rounded-lg bg-blue-50 text-blue-800 text-sm border-t border-t-blue-200 border-r border-r-blue-200 border-b border-b-blue-200 border-l border-l-blue-200 pt-2 pr-4 pb-2 pl-4">
            <span className="font-semibold">DEMO DATA</span>
            <span className="text-blue-300 mr-2 ml-2">·</span>Sample workspace
            metrics for prototype review.
          </div>
        </div>
        <div className="grid mb-6 gap-4 grid-cols-6">
          <div className="rounded-xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-4 pr-4 pb-4 pl-4">
            <p className="text-muted-foreground text-sm">Total patients</p>
            <p className="font-semibold text-2xl mt-2">248</p>
            <p className="text-muted-foreground text-xs mt-1">
              Across the workspace
            </p>
          </div>
          <div className="rounded-xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-4 pr-4 pb-4 pl-4">
            <p className="text-muted-foreground text-sm">Total doctors</p>
            <p className="font-semibold text-2xl mt-2">32</p>
            <p className="text-muted-foreground text-xs mt-1">
              Verified care professionals
            </p>
          </div>
          <div className="rounded-xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-4 pr-4 pb-4 pl-4">
            <p className="text-muted-foreground text-sm">Total caregivers</p>
            <p className="font-semibold text-2xl mt-2">86</p>
            <p className="text-muted-foreground text-xs mt-1">
              Active support network
            </p>
          </div>
          <div className="rounded-xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-4 pr-4 pb-4 pl-4">
            <p className="text-muted-foreground text-sm">Active alerts</p>
            <p className="font-semibold text-amber-600 text-2xl mt-2">12</p>
            <p className="text-muted-foreground text-xs mt-1">Require review</p>
          </div>
          <div className="rounded-xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-4 pr-4 pb-4 pl-4">
            <p className="text-muted-foreground text-sm">
              Active treatment plans
            </p>
            <p className="font-semibold text-2xl mt-2">174</p>
            <p className="text-muted-foreground text-xs mt-1">
              Currently in progress
            </p>
          </div>
          <div className="rounded-xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-4 pr-4 pb-4 pl-4">
            <p className="text-muted-foreground text-sm">New users</p>
            <p className="font-semibold text-primary text-2xl mt-2">18</p>
            <p className="text-muted-foreground text-xs mt-1">
              Added this week
            </p>
          </div>
        </div>
        <div className="grid mb-6 gap-6 grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <div className="grid mb-6 gap-6 grid-cols-2">
              <div className="rounded-xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-6 pr-6 pb-6 pl-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">Patient activity</h3>
                    <p className="text-muted-foreground text-xs mt-1">
                      Last 7 days
                    </p>
                  </div>
                  <span className="text-muted-foreground text-xs flex items-center gap-2">
                    <span className="rounded-full bg-teal-500 size-2" />
                    Activity
                  </span>
                </div>
                <svg
                  viewBox="0 0 520 150"
                  className="mt-6 w-full h-36"
                  role="img"
                  aria-label="Teal 7-day patient activity line chart"
                >
                  <path
                    d="M10 116H510M10 76H510M10 36H510"
                    stroke="oklch(0.92 0.004 286.32)"
                    strokeWidth="1"
                  />
                  <path
                    d="M10 105 L92 92 L174 101 L256 62 L338 78 L420 42 L510 58"
                    fill="none"
                    stroke="oklch(0.6 0.118 184.704)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="510"
                    cy="58"
                    r="4"
                    fill="oklch(0.6 0.118 184.704)"
                  />
                  <text
                    x="10"
                    y="143"
                    fontSize="11"
                    fill="oklch(0.552 0.016 285.938)"
                  >
                    Jun 6
                  </text>
                  <text
                    x="246"
                    y="143"
                    fontSize="11"
                    fill="oklch(0.552 0.016 285.938)"
                  >
                    Jun 9
                  </text>
                  <text
                    x="478"
                    y="143"
                    fontSize="11"
                    fill="oklch(0.552 0.016 285.938)"
                  >
                    Jun 12
                  </text>
                </svg>
              </div>
              <div className="rounded-xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-6 pr-6 pb-6 pl-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">User registrations</h3>
                    <p className="text-muted-foreground text-xs mt-1">
                      New users by day
                    </p>
                  </div>
                  <div className="text-muted-foreground text-xs flex gap-4">
                    <span className="flex items-center gap-2">
                      <span className="rounded-full bg-blue-500 size-2" />
                      Patients
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="rounded-full bg-teal-500 size-2" />
                      Care team
                    </span>
                  </div>
                </div>
                <svg
                  viewBox="0 0 520 150"
                  className="mt-6 w-full h-36"
                  role="img"
                  aria-label="Blue and teal user registration trend lines"
                >
                  <path
                    d="M10 116H510M10 76H510M10 36H510"
                    stroke="oklch(0.92 0.004 286.32)"
                    strokeWidth="1"
                  />
                  <path
                    d="M10 110 L92 88 L174 98 L256 54 L338 72 L420 48 L510 62"
                    fill="none"
                    stroke="oklch(0.65 0.18 250)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 126 L92 116 L174 120 L256 94 L338 104 L420 82 L510 90"
                    fill="none"
                    stroke="oklch(0.6 0.118 184.704)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <text
                    x="10"
                    y="143"
                    fontSize="11"
                    fill="oklch(0.552 0.016 285.938)"
                  >
                    Jun 6
                  </text>
                  <text
                    x="246"
                    y="143"
                    fontSize="11"
                    fill="oklch(0.552 0.016 285.938)"
                  >
                    Jun 9
                  </text>
                  <text
                    x="478"
                    y="143"
                    fontSize="11"
                    fill="oklch(0.552 0.016 285.938)"
                  >
                    Jun 12
                  </text>
                </svg>
              </div>
            </div>
            <div className="rounded-xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-6 pr-6 pb-6 pl-6">
              <h3 className="font-semibold">Recent system activity</h3>
              <div className="mt-4" />
            </div>
          </div>
          <div className="rounded-xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-6 pr-6 pb-6 pl-6">
            <h3 className="font-semibold">System status</h3>
            <div className="mt-5">
              <div className="flex mb-5 justify-between items-center">
                <span className="text-muted-foreground text-sm">
                  Demo data mode
                </span>
                <span className="font-medium text-primary text-sm flex items-center gap-2">
                  <span className="rounded-full bg-primary size-2" />
                  Enabled
                </span>
              </div>
              <div className="flex mb-5 justify-between items-center">
                <span className="text-muted-foreground text-sm">
                  Notifications
                </span>
                <span className="font-medium text-primary text-sm flex items-center gap-2">
                  <span className="rounded-full bg-primary size-2" />
                  Operational
                </span>
              </div>
              <div className="flex mb-5 justify-between items-center">
                <span className="text-muted-foreground text-sm">
                  Resource service
                </span>
                <span className="font-medium text-primary text-sm flex items-center gap-2">
                  <span className="rounded-full bg-primary size-2" />
                  Operational
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">
                  Device integrations
                </span>
                <span className="font-medium text-muted-foreground text-sm">
                  Not implemented
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid mb-6 gap-6 grid-cols-[minmax(0,1fr)_320px]">
          <div className="rounded-xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-6 pr-6 pb-6 pl-6">
            <h3 className="font-semibold">Loading state</h3>
            <div className="mt-4">
              <div className="animate-pulse rounded-lg bg-muted mb-3 h-12">
                <span className="whitespace-nowrap [clip:rect(0,_0,_0,_0)] border-t-0 border-r-0 border-b-0 border-l-0 absolute -mt-px -mr-px -mb-px -ml-px pt-0 pr-0 pb-0 pl-0 size-px overflow-hidden">
                  Loading recent activity
                </span>
              </div>
              <div className="animate-pulse rounded-lg bg-muted mb-3 h-12">
                <span className="whitespace-nowrap [clip:rect(0,_0,_0,_0)] border-t-0 border-r-0 border-b-0 border-l-0 absolute -mt-px -mr-px -mb-px -ml-px pt-0 pr-0 pb-0 pl-0 size-px overflow-hidden">
                  Loading recent activity
                </span>
              </div>
              <div className="animate-pulse rounded-lg bg-muted h-12">
                <span className="whitespace-nowrap [clip:rect(0,_0,_0,_0)] border-t-0 border-r-0 border-b-0 border-l-0 absolute -mt-px -mr-px -mb-px -ml-px pt-0 pr-0 pb-0 pl-0 size-px overflow-hidden">
                  Loading recent activity
                </span>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-card border-t border-t-dashed border-t-border border-r border-r-dashed border-r-border border-b border-b-dashed border-b-border border-l border-l-dashed border-l-border pt-6 pr-6 pb-6 pl-6">
            <Inbox className="text-muted-foreground size-5" />
            <h3 className="font-semibold mt-4">
              No activity in this time range
            </h3>
            <p className="text-muted-foreground text-sm mt-1">
              Try another date range to see system activity.
            </p>
            <button
              type="button"
              className="font-medium rounded-lg text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border mt-5 pt-2 pr-3 pb-2 pl-3"
            >
              Reset date range
            </button>
          </div>
        </div>
        <div className="rounded-xl bg-red-50 text-red-800 text-sm border-t border-t-red-200 border-r border-r-red-200 border-b border-b-red-200 border-l border-l-red-200 flex pt-3 pr-4 pb-3 pl-4 justify-between items-center">
          <div className="flex items-center gap-3">
            <TriangleAlert className="size-4" />
            <span>Unable to refresh demo metrics. Try again.</span>
          </div>
          <button
            type="button"
            className="font-medium rounded-lg bg-primary text-primary-foreground text-sm pt-2 pr-3 pb-2 pl-3"
          >
            Try again
          </button>
        </div>
      </main>
      <div className="shadow-[0px_10px_15px_-3px_rgba(0,_0,_0,_0.1),_0px_4px_6px_-4px_rgba(0,_0,_0,_0.1)] rounded-xl bg-card text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border flex fixed right-8 bottom-6 pt-3 pr-4 pb-3 pl-4 items-center gap-3">
        <div className="rounded-full bg-primary/10 text-primary flex justify-center items-center size-6">
          <Check className="size-4" />
        </div>
        <span>Dashboard refreshed</span>
      </div>
    </div>
  </div>
</div>;
