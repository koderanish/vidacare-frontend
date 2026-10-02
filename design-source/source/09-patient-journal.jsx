<!-- screenType: "desktop-large" width: "1920" height: "1080" name: "Screen 9" colorTheme: "green" screenId: "eb7519d9-d640-4b5b-9906-112a6988fd7b" -->
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
      <nav className="flex mt-10 flex-col flex-1">
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
          Patient journal
        </h1>
        <div className="flex items-center gap-6">
          <div className="relative w-72">
            <Search className="-translate-y-1/2 pointer-events-none text-muted-foreground absolute top-1/2 left-3 size-4" />
            <input
              aria-label="Global search"
              className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-xl bg-card text-foreground text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border outline-none pr-4 pl-10 w-full h-10"
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
        <div className="text-muted-foreground text-sm flex items-center gap-2">
          <span>Patients</span>
          <ChevronRight className="size-4" />
          <span className="text-foreground">Olivia Bennett</span>
        </div>
        <div className="flex mt-6 justify-between items-start">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="font-semibold text-2xl tracking-tight">
                Olivia Bennett
              </h2>
              <span className="font-medium rounded-full bg-accent text-primary text-xs pt-1 pr-3 pb-1 pl-3">
                Monitoring
              </span>
            </div>
            <p className="text-muted-foreground text-sm mt-2">ID VC-10482</p>
          </div>
        </div>
        <div className="border-t-border border-r-border border-b border-b-border border-l-border flex mt-6 gap-8">
          <button type="button">Overview</button>
          <button type="button">Vitals</button>
          <button type="button">Journal</button>
          <button type="button">Treatment</button>
          <button type="button">Care Team</button>
        </div>
        <div className="grid mt-8 gap-6 grid-cols-[1fr_280px]">
          <section>
            <h3 className="font-semibold text-xl">Journal history</h3>
            <p className="text-muted-foreground text-sm mt-2">
              Review patient-submitted entries for care coordination.
            </p>
            <div className="rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border flex mt-6 pt-4 pr-4 pb-4 pl-4 items-center gap-3">
              <select
                aria-label="Date range"
                className="rounded-xl bg-background text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border outline-none pr-3 pl-3 h-10"
                defaultValue="Last 30 days"
              >
                <option>Last 30 days</option>
                <option>Last 7 days</option>
                <option>Last 90 days</option>
              </select>
              <select
                aria-label="Mood"
                className="rounded-xl bg-background text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border outline-none pr-3 pl-3 h-10"
                defaultValue="All moods"
              >
                <option>All moods</option>
                <option>Calm</option>
                <option>Good</option>
                <option>Anxious</option>
              </select>
              <div className="relative flex-1">
                <Search className="-translate-y-1/2 pointer-events-none text-muted-foreground absolute top-1/2 left-3 size-4" />
                <input
                  placeholder="Search notes or symptoms"
                  aria-label="Search notes or symptoms"
                  className="rounded-xl bg-background text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border outline-none pr-3 pl-10 w-full h-10"
                  defaultValue=""
                />
              </div>
            </div>
            <div className="rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border mt-6 overflow-hidden">
              <div className="font-semibold uppercase bg-muted/40 text-muted-foreground text-xs tracking-wide border-t-border border-r-border border-b border-b-border border-l-border grid pt-4 pr-5 pb-4 pl-5 gap-4 grid-cols-[120px_110px_110px_150px_1fr_130px_40px]">
                <span>Date</span>
                <span>Mood</span>
                <span>Pain level</span>
                <span>Symptoms</span>
                <span>Notes</span>
                <span>Source</span>
                <span />
              </div>
              <div className="text-sm border-t-border border-r-border border-b border-b-border border-l-border grid pt-5 pr-5 pb-5 pl-5 items-center gap-4 grid-cols-[120px_110px_110px_150px_1fr_130px_40px]">
                <span>Jun 12, 2025</span>
                <span className="font-medium text-primary">Calm</span>
                <span>2/10</span>
                <span>Mild fatigue</span>
                <span>"Rested after morning walk."</span>
                <span className="text-muted-foreground">Manual entry</span>
                <button type="button" aria-label="Expand Jun 12 journal entry">
                  <ChevronDown className="text-muted-foreground size-4" />
                </button>
              </div>
              <div className="bg-muted/30 text-muted-foreground text-sm border-t-border border-r-border border-b border-b-border border-l-border hidden pt-3 pr-5 pb-3 pl-5">
                Journal entry details for Jun 12, 2025.
              </div>
              <div className="text-sm border-t-border border-r-border border-b border-b-border border-l-border grid pt-5 pr-5 pb-5 pl-5 items-center gap-4 grid-cols-[120px_110px_110px_150px_1fr_130px_40px]">
                <span>Jun 10, 2025</span>
                <span className="font-medium text-primary">Good</span>
                <span>1/10</span>
                <span>None reported</span>
                <span>"Completed medication check-in."</span>
                <span className="text-muted-foreground">Manual entry</span>
                <button type="button" aria-label="Expand Jun 10 journal entry">
                  <ChevronDown className="text-muted-foreground size-4" />
                </button>
              </div>
              <div className="bg-muted/30 text-muted-foreground text-sm border-t-border border-r-border border-b border-b-border border-l-border hidden pt-3 pr-5 pb-3 pl-5">
                Journal entry details for Jun 10, 2025.
              </div>
              <div className="text-sm border-t-border border-r-border border-b border-b-border border-l-border grid pt-5 pr-5 pb-5 pl-5 items-center gap-4 grid-cols-[120px_110px_110px_150px_1fr_130px_40px]">
                <span>Jun 07, 2025</span>
                <span className="font-medium text-amber-600">Anxious</span>
                <span>4/10</span>
                <span>Headache</span>
                <span>"Noted mild headache in afternoon."</span>
                <span className="text-muted-foreground">Manual entry</span>
                <button type="button" aria-label="Expand Jun 07 journal entry">
                  <ChevronDown className="text-muted-foreground size-4" />
                </button>
              </div>
              <div className="bg-muted/30 text-muted-foreground text-sm border-t-border border-r-border border-b border-b-border border-l-border hidden pt-3 pr-5 pb-3 pl-5">
                Journal entry details for Jun 07, 2025.
              </div>
              <div className="text-sm grid pt-5 pr-5 pb-5 pl-5 items-center gap-4 grid-cols-[120px_110px_110px_150px_1fr_130px_40px]">
                <span>Jun 02, 2025</span>
                <span className="font-medium text-primary">Calm</span>
                <span>2/10</span>
                <span>Stiffness</span>
                <span>"Stretching helped."</span>
                <span className="text-muted-foreground">Manual entry</span>
                <button type="button" aria-label="Expand Jun 02 journal entry">
                  <ChevronDown className="text-muted-foreground size-4" />
                </button>
              </div>
              <div className="bg-muted/30 text-muted-foreground text-sm hidden pt-3 pr-5 pb-3 pl-5">
                Journal entry details for Jun 02, 2025.
              </div>
            </div>
            <div className="text-center rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border mt-6 pt-6 pr-6 pb-6 pl-6">
              <NotebookPen className="text-muted-foreground mr-auto ml-auto size-5" />
              <p className="font-medium text-sm mt-3">
                No journal entries in this date range.
              </p>
            </div>
            <p className="text-muted-foreground text-xs mt-4">
              DEMO DATA · Entries are sample records.
            </p>
          </section>
          <aside className="rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-6 pr-6 pb-6 pl-6 h-fit">
            <h3 className="font-semibold text-base">Latest check-in</h3>
            <div className="flex mt-6 justify-between items-center">
              <span className="text-muted-foreground text-sm">Mood</span>
              <span className="font-medium text-primary text-sm">Calm</span>
            </div>
            <div className="flex mt-4 justify-between items-center">
              <span className="text-muted-foreground text-sm">Pain</span>
              <span className="font-medium text-sm">2/10</span>
            </div>
            <div className="flex mt-4 justify-between items-center">
              <span className="text-muted-foreground text-sm">Updated</span>
              <span className="font-medium text-sm">Jun 12 at 9:18 AM</span>
            </div>
          </aside>
        </div>
      </main>
    </div>
  </div>
</div>;
