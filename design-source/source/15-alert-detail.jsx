<!-- screenType: "desktop-large" width: "1920" height: "1080" name: "Screen 15" colorTheme: "green" screenId: "346a8da4-ff87-49ad-a784-35560f7706b0" -->
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
            className="font-medium rounded-xl bg-accent text-primary text-sm flex relative pt-2.5 pr-3 pb-2.5 pl-3 items-center gap-3"
          >
            <span className="rounded-r-full bg-primary absolute -left-4 w-1 h-5" />
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
          Alert detail
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
      <main className="flex mr-auto ml-auto pt-8 pr-8 pb-8 pl-8 flex-col gap-6 max-w-[1120px]">
        <div className="text-muted-foreground text-sm flex items-center gap-2">
          <span>Alerts</span>
          <ChevronRight className="size-4" />
          <span className="text-foreground">Alert detail</span>
        </div>
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <h2 className="font-semibold text-foreground text-3xl tracking-tight">
                Monitoring alert
              </h2>
              <span className="font-medium rounded-full bg-primary/10 text-primary text-xs pt-1 pr-3 pb-1 pl-3">
                Open
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              This is a simulated system alert for administrative review, not a
              medical diagnosis.
            </p>
          </div>
        </div>
        <div className="rounded-xl bg-blue-50 text-blue-900 text-sm border-t border-t-blue-200 border-r border-r-blue-200 border-b border-b-blue-200 border-l border-l-blue-200 flex pt-3 pr-4 pb-3 pl-4 items-center gap-3">
          <Info className="text-blue-700 size-4" />
          <span className="font-semibold tracking-wide">DEMO DATA</span>
          <span className="text-blue-800">
            This alert is generated from simulated device readings for
            administrative review.
          </span>
        </div>
        <div className="grid gap-6 grid-cols-2">
          <section className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border flex pt-6 pr-6 pb-6 pl-6 flex-col gap-6">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Alert summary</h3>
              <span className="font-medium rounded-full bg-amber-100 text-amber-800 text-xs pt-1 pr-3 pb-1 pl-3">
                High severity
              </span>
            </div>
            <div className="grid gap-6 grid-cols-2">
              <div>
                <p className="text-muted-foreground text-xs">Patient</p>
                <p className="font-medium text-sm mt-2">Olivia Bennett</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Patient ID</p>
                <p className="font-medium text-sm mt-2">VC-10482</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Vital value</p>
                <p className="font-medium text-sm mt-2">148/92 mmHg</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Threshold</p>
                <p className="font-medium text-sm mt-2">Above 140/90 mmHg</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Generated</p>
                <p className="font-medium text-sm mt-2">
                  Jun 12, 2025 at 9:42 AM
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Source</p>
                <p className="font-medium text-sm mt-2">Demo Device Data</p>
              </div>
            </div>
            <div className="border-x-border border-t border-t-border border-b-border pt-5">
              <p className="text-muted-foreground text-xs">Alert reason</p>
              <p className="text-foreground text-sm mt-2">
                Reading exceeded the configured demonstration threshold.
              </p>
            </div>
          </section>
          <section className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border flex pt-6 pr-6 pb-6 pl-6 flex-col gap-6">
            <h3 className="font-semibold text-lg">Care team</h3>
            <div className="flex flex-col gap-5">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-muted-foreground text-xs">
                    Assigned doctor
                  </p>
                  <p className="font-medium text-sm mt-2">Dr. Lucas Martin</p>
                </div>
                <Stethoscope className="text-muted-foreground size-5" />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-muted-foreground text-xs">
                    Assigned caregiver
                  </p>
                  <p className="font-medium text-sm mt-2">Nora Williams</p>
                </div>
                <HeartHandshake className="text-muted-foreground size-5" />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-muted-foreground text-xs">
                    Assignment status
                  </p>
                  <p className="font-medium text-primary text-sm mt-2">
                    Both assigned
                  </p>
                </div>
                <CheckCircle2 className="text-primary size-5" />
              </div>
            </div>
            <div className="border-x-border border-t border-t-border border-b-border pt-5">
              <button
                type="button"
                className="font-medium rounded-xl text-foreground text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border inline-flex pt-2.5 pr-4 pb-2.5 pl-4 items-center gap-2"
              >
                View patient
                <ArrowUpRight className="size-4" />
              </button>
            </div>
          </section>
        </div>
        <div className="rounded-xl bg-blue-50/70 text-blue-900 text-sm border-t border-t-blue-200 border-r border-r-blue-200 border-b border-b-blue-200 border-l border-l-blue-200 flex pt-4 pr-4 pb-4 pl-4 items-center gap-3">
          <Info className="text-blue-700 shrink-0 size-4" />
          <span>
            Admins review and route monitoring alerts; clinical decisions remain
            with the care team.
          </span>
        </div>
        <div className="border-x-border border-t border-t-border border-b-border flex pt-6 justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="font-medium rounded-xl text-primary text-sm border-t border-t-primary border-r border-r-primary border-b border-b-primary border-l border-l-primary pt-2.5 pr-4 pb-2.5 pl-4"
            />
            <button
              type="button"
              className="font-medium rounded-xl bg-primary text-primary-foreground text-sm pt-2.5 pr-5 pb-2.5 pl-5"
            >
              Resolve
            </button>
            <button
              type="button"
              className="font-medium rounded-xl bg-secondary text-secondary-foreground text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-2.5 pr-4 pb-2.5 pl-4"
            >
              View patient
            </button>
          </div>
          <div className="relative">
            <button
              type="button"
              aria-label="More actions"
              className="rounded-xl text-muted-foreground border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-2.5 pr-2.5 pb-2.5 pl-2.5"
            >
              <MoreHorizontal className="size-5" />
            </button>
            <div className="shadow-[0px_10px_15px_-3px_rgba(0,_0,_0,_0.1),_0px_4px_6px_-4px_rgba(0,_0,_0,_0.1)] rounded-xl bg-card text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border hidden absolute right-0 bottom-12 pt-2 pr-2 pb-2 pl-2 w-40">
              <button
                type="button"
                className="text-left rounded-lg text-foreground pt-2 pr-3 pb-2 pl-3 w-full"
              >
                Close menu
              </button>
            </div>
          </div>
        </div>
      </main>
      <div className="bg-foreground/30 flex fixed z-40 top-0 right-0 bottom-0 left-0 justify-center items-center">
        <div className="shadow-[0px_20px_25px_-5px_rgba(0,_0,_0,_0.1),_0px_8px_10px_-6px_rgba(0,_0,_0,_0.1)] rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-6 pr-6 pb-6 pl-6 w-[420px]">
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-lg">Resolve this alert?</h3>
            <p className="text-muted-foreground text-sm leading-6">
              This will mark the monitoring alert as resolved in the demo
              workspace.
            </p>
          </div>
          <div className="flex mt-6 justify-end gap-3">
            <button
              type="button"
              className="font-medium rounded-xl text-foreground text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-2.5 pr-4 pb-2.5 pl-4"
            >
              Cancel
            </button>
            <button
              type="button"
              className="font-medium rounded-xl bg-primary text-primary-foreground text-sm pt-2.5 pr-4 pb-2.5 pl-4"
            >
              Resolve alert
            </button>
          </div>
        </div>
      </div>
      <div className="font-medium shadow-[0px_10px_15px_-3px_rgba(0,_0,_0,_0.1),_0px_4px_6px_-4px_rgba(0,_0,_0,_0.1)] rounded-xl bg-card text-foreground text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border flex fixed right-8 bottom-6 pt-3 pr-4 pb-3 pl-4 items-center gap-3">
        <span className="rounded-full bg-primary/10 flex justify-center items-center size-6">
          <Check className="text-primary size-4" />
        </span>
        Alert review status saved
      </div>
    </div>
  </div>
</div>;
