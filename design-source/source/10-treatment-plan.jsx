<!-- screenType: "desktop-large" width: "1920" height: "1080" name: "Screen 10" colorTheme: "green" screenId: "7f6f88b8-4fbe-4b12-9c05-da37c5270988" -->
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
          Treatment plan
        </h1>
        <div className="flex items-center gap-6">
          <div className="relative w-72">
            <Search className="-translate-y-1/2 pointer-events-none text-muted-foreground absolute top-1/2 left-3 size-4" />
            <input
              aria-label="Global search"
              className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-xl bg-card text-foreground text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border outline-none pr-4 pl-10 w-full h-10"
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
      <main className="flex pt-7 pr-8 pb-7 pl-8 flex-col gap-6">
        <div className="text-muted-foreground text-sm flex items-center gap-2">
          <span>Patients</span>
          <ChevronRight className="size-4" />
          <span>Olivia Bennett</span>
        </div>
        <div className="flex justify-between items-end">
          <div className="flex items-center gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="font-semibold text-foreground text-2xl tracking-tight">
                  Olivia Bennett
                </h2>
                <span className="font-medium rounded-full bg-muted text-muted-foreground text-xs pt-1 pr-3 pb-1 pl-3">
                  VC-10482
                </span>
                <span className="font-medium rounded-full bg-primary/10 text-primary text-xs pt-1 pr-3 pb-1 pl-3">
                  Monitoring
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="font-medium shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-xl bg-card text-foreground text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-2.5 pr-4 pb-2.5 pl-4"
            >
              View details
            </button>
            <button
              type="button"
              className="font-medium shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-xl bg-card text-foreground text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border flex pt-2.5 pr-4 pb-2.5 pl-4 items-center gap-2"
            >
              <Download className="size-4" />
              Export summary
            </button>
          </div>
        </div>
        <div className="border-t-border border-r-border border-b border-b-border border-l-border flex items-center gap-1">
          <button type="button">Overview</button>
          <button type="button">Vitals</button>
          <button type="button">Journal</button>
          <button type="button">Treatment</button>
          <button type="button">Care Team</button>
        </div>
        <div className="rounded-xl bg-sky-50 text-sky-800 text-sm border-t border-t-sky-200 border-r border-r-sky-200 border-b border-b-sky-200 border-l border-l-sky-200 pt-3 pr-4 pb-3 pl-4">
          <span className="font-semibold">DEMO DATA</span>
          <span className="mr-2 ml-2">·</span>
          <span>
            Treatment information is shown for administrative review only.
          </span>
        </div>
        <section className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-6 pr-6 pb-6 pl-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-foreground text-lg">
                Current treatment plan
              </h3>
              <p className="text-muted-foreground text-sm mt-1">
                Olivia Bennett's active treatment information
              </p>
            </div>
            <span className="font-medium rounded-full bg-primary/10 text-primary text-xs pt-1 pr-3 pb-1 pl-3">
              Active
            </span>
          </div>
          <div className="border-t-border border-r-border border-b border-b-border border-l-border grid mt-6 pb-6 gap-6 grid-cols-4">
            <div>
              <p className="font-medium uppercase text-muted-foreground text-xs tracking-wide">
                Doctor
              </p>
              <p className="font-medium text-foreground text-sm mt-2">
                Dr. Lucas Martin
              </p>
            </div>
            <div>
              <p className="font-medium uppercase text-muted-foreground text-xs tracking-wide">
                Start date
              </p>
              <p className="font-medium text-foreground text-sm mt-2">
                May 18, 2025
              </p>
            </div>
            <div>
              <p className="font-medium uppercase text-muted-foreground text-xs tracking-wide">
                End date
              </p>
              <p className="font-medium text-foreground text-sm mt-2">
                Aug 18, 2025
              </p>
            </div>
            <div>
              <p className="font-medium uppercase text-muted-foreground text-xs tracking-wide">
                Last reviewed
              </p>
              <p className="font-medium text-foreground text-sm mt-2">
                Jun 10, 2025
              </p>
            </div>
          </div>
          <div className="rounded-xl bg-muted/50 text-muted-foreground text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border mt-6 pt-3 pr-4 pb-3 pl-4">
            Admins can view treatment information but do not make clinical
            decisions.
          </div>
          <div className="rounded-xl border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border mt-6 overflow-hidden">
            <div className="font-semibold uppercase bg-muted/50 text-muted-foreground text-xs tracking-wide border-t-border border-r-border border-b border-b-border border-l-border grid pt-3 pr-4 pb-3 pl-4 gap-4 grid-cols-[1.4fr_1fr_1fr_1fr_2fr]">
              <span>Medication</span>
              <span>Dosage</span>
              <span>Frequency</span>
              <span>Duration</span>
              <span>Instructions</span>
            </div>
            <div className="text-foreground text-sm border-t-border border-r-border border-b border-b-border border-l-border grid pt-4 pr-4 pb-4 pl-4 gap-4 grid-cols-[1.4fr_1fr_1fr_1fr_2fr]">
              <span className="font-medium">Lisinopril</span>
              <span>10 mg</span>
              <span>Once daily</span>
              <span>90 days</span>
              <span>Take in the morning</span>
            </div>
            <div className="text-foreground text-sm border-t-border border-r-border border-b border-b-border border-l-border grid pt-4 pr-4 pb-4 pl-4 gap-4 grid-cols-[1.4fr_1fr_1fr_1fr_2fr]">
              <span className="font-medium">Metformin</span>
              <span>500 mg</span>
              <span>Twice daily</span>
              <span>90 days</span>
              <span>Take with meals</span>
            </div>
            <div className="text-foreground text-sm grid pt-4 pr-4 pb-4 pl-4 gap-4 grid-cols-[1.4fr_1fr_1fr_1fr_2fr]">
              <span className="font-medium">Vitamin D3</span>
              <span>1,000 IU</span>
              <span>Once daily</span>
              <span>Ongoing</span>
              <span>Take with breakfast</span>
            </div>
          </div>
          <div className="flex mt-6 items-center gap-8">
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="font-medium text-foreground text-sm">
                  Plan adherence
                </span>
                <span className="font-semibold text-primary text-sm">86%</span>
              </div>
              <div className="rounded-full bg-muted mt-3 h-2 overflow-hidden">
                <div className="rounded-full bg-primary w-[86%] h-full" />
              </div>
            </div>
            <p className="whitespace-nowrap text-muted-foreground text-sm">
              Last check-in Jun 12, 2025
            </p>
          </div>
        </section>
        <div className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border overflow-hidden">
          <button
            type="button"
            className="text-left flex pt-5 pr-6 pb-5 pl-6 justify-between items-center w-full"
          >
            <span className="font-semibold text-foreground text-base">
              Care instructions
            </span>
            <ChevronDown />
          </button>
          <div className="text-muted-foreground text-sm border-x-border border-t border-t-border border-b-border hidden pt-4 pr-6 pb-4 pl-6">
            Care instructions
          </div>
        </div>
        <div className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border overflow-hidden">
          <button
            type="button"
            className="text-left flex pt-5 pr-6 pb-5 pl-6 justify-between items-center w-full"
          >
            <span className="font-semibold text-foreground text-base">
              Plan history
            </span>
            <ChevronDown />
          </button>
          <div className="border-x-border border-t border-t-border border-b-border hidden pt-4 pr-6 pb-4 pl-6">
            <p className="font-medium text-foreground text-sm">May 18, 2025</p>
            <p className="text-muted-foreground text-sm mt-1">
              Plan created by Dr. Lucas Martin
            </p>
          </div>
        </div>
      </main>
    </div>
  </div>
</div>;
