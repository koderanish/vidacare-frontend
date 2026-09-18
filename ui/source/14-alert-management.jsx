<!-- screenType: "desktop-large" width: "1920" height: "1080" name: "Screen 14" colorTheme: "green" screenId: "f65bf1f2-bfd9-48fe-be05-4a20c35036d3" -->
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
          Alerts
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
        <section className="flex mb-6 justify-between items-end">
          <div>
            <h2 className="font-semibold text-2xl tracking-tight">Alerts</h2>
            <p className="text-muted-foreground text-sm mt-2">
              Review monitoring and system alerts using demo data.
            </p>
          </div>
        </section>
        <div className="rounded-xl bg-blue-50 text-blue-900 text-sm border-t border-t-blue-200 border-r border-r-blue-200 border-b border-b-blue-200 border-l border-l-blue-200 flex mb-6 pt-3 pr-4 pb-3 pl-4 items-center gap-3">
          <span className="font-semibold tracking-wide">DEMO DATA</span>
          <span className="text-blue-300">·</span>
          <span>
            Alerts are simulated monitoring events for prototype demonstration
            only; not medical diagnoses.
          </span>
        </div>
        <section className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border mb-6 pt-4 pr-4 pb-4 pl-4">
          <div className="grid items-center gap-3 grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
            <div className="relative">
              <Search className="-translate-y-1/2 pointer-events-none text-muted-foreground absolute top-1/2 left-3 size-4" />
              <input
                aria-label="Search alerts"
                placeholder="Search alerts"
                className="ring-ring rounded-xl bg-background text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border outline-none pr-3 pl-10 w-full h-10"
                defaultValue=""
              />
            </div>
            <select
              aria-label="Status"
              className="ring-ring rounded-xl bg-background text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border outline-none pr-3 pl-3 h-10"
              defaultValue="All statuses"
            >
              <option>All statuses</option>
              <option>Open</option>
              <option>Reviewed</option>
              <option>Resolved</option>
            </select>
            <select
              aria-label="Severity"
              className="ring-ring rounded-xl bg-background text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border outline-none pr-3 pl-3 h-10"
              defaultValue="All severities"
            >
              <option>All severities</option>
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <select
              aria-label="Patient"
              className="ring-ring rounded-xl bg-background text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border outline-none pr-3 pl-3 h-10"
              defaultValue="All patients"
            >
              <option>All patients</option>
              <option>Olivia Bennett</option>
              <option>Samuel Ortiz</option>
              <option>Ethan Cole</option>
              <option>Grace Kim</option>
            </select>
            <button
              type="button"
              className="font-medium whitespace-nowrap text-muted-foreground text-sm pr-2 pl-2"
            >
              Reset filters
            </button>
          </div>
        </section>
        <section className="grid mb-6 gap-4 grid-cols-4">
          <div className="rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-5 pr-5 pb-5 pl-5">
            <p className="text-muted-foreground text-sm">Open alerts</p>
            <p className="font-semibold text-2xl mt-3">12</p>
          </div>
          <div className="rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-5 pr-5 pb-5 pl-5">
            <p className="text-muted-foreground text-sm">High priority</p>
            <p className="font-semibold text-2xl mt-3">3</p>
          </div>
          <div className="rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-5 pr-5 pb-5 pl-5">
            <p className="text-muted-foreground text-sm">Reviewed today</p>
            <p className="font-semibold text-2xl mt-3">7</p>
          </div>
          <div className="rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-5 pr-5 pb-5 pl-5">
            <p className="text-muted-foreground text-sm">Awaiting assignment</p>
            <p className="font-semibold text-2xl mt-3">2</p>
          </div>
        </section>
        <section className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border mb-6 overflow-hidden">
          <table className="text-left border-collapse text-sm w-full">
            <thead className="uppercase bg-muted/50 text-muted-foreground text-xs tracking-wide">
              <tr>
                <th className="font-medium pt-4 pr-5 pb-4 pl-5">Patient</th>
                <th className="font-medium pt-4 pr-4 pb-4 pl-4">Alert type</th>
                <th className="font-medium pt-4 pr-4 pb-4 pl-4">Value</th>
                <th className="font-medium pt-4 pr-4 pb-4 pl-4">Severity</th>
                <th className="font-medium pt-4 pr-4 pb-4 pl-4">
                  Generated at
                </th>
                <th className="font-medium pt-4 pr-4 pb-4 pl-4">
                  Assigned doctor
                </th>
                <th className="font-medium pt-4 pr-4 pb-4 pl-4">Caregiver</th>
                <th className="font-medium pt-4 pr-4 pb-4 pl-4">Status</th>
                <th className="font-medium text-right pt-4 pr-5 pb-4 pl-5">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-x-border border-t border-t-border border-b-border">
                <td className="font-medium whitespace-nowrap pt-4 pr-5 pb-4 pl-5">
                  Olivia Bennett
                </td>
                <td className="pt-4 pr-4 pb-4 pl-4">High Blood Pressure</td>
                <td className="whitespace-nowrap text-muted-foreground pt-4 pr-4 pb-4 pl-4">
                  148/92 mmHg
                </td>
                <td className="pt-4 pr-4 pb-4 pl-4">
                  <span>High</span>
                </td>
                <td className="whitespace-nowrap text-muted-foreground pt-4 pr-4 pb-4 pl-4">
                  Jun 12, 2025, 9:42 AM
                </td>
                <td className="whitespace-nowrap pt-4 pr-4 pb-4 pl-4">
                  Dr. Lucas Martin
                </td>
                <td className="whitespace-nowrap text-muted-foreground pt-4 pr-4 pb-4 pl-4">
                  Nora Williams
                </td>
                <td className="pt-4 pr-4 pb-4 pl-4">
                  <span>Open</span>
                </td>
                <td className="pt-4 pr-5 pb-4 pl-5">
                  <div className="flex justify-end items-center gap-3">
                    <button
                      type="button"
                      aria-label="More alert actions"
                      className="rounded-lg text-muted-foreground pt-1.5 pr-1.5 pb-1.5 pl-1.5"
                    >
                      <MoreHorizontal className="size-4" />
                    </button>
                    <button
                      type="button"
                      className="font-medium text-primary text-sm"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="border-x-border border-t border-t-border border-b-border">
                <td className="font-medium whitespace-nowrap pt-4 pr-5 pb-4 pl-5">
                  Samuel Ortiz
                </td>
                <td className="pt-4 pr-4 pb-4 pl-4">Low SpO2</td>
                <td className="whitespace-nowrap text-muted-foreground pt-4 pr-4 pb-4 pl-4">
                  93%
                </td>
                <td className="pt-4 pr-4 pb-4 pl-4">
                  <span>High</span>
                </td>
                <td className="whitespace-nowrap text-muted-foreground pt-4 pr-4 pb-4 pl-4">
                  Jun 12, 2025, 8:17 AM
                </td>
                <td className="whitespace-nowrap pt-4 pr-4 pb-4 pl-4">
                  Dr. Priya Shah
                </td>
                <td className="whitespace-nowrap text-muted-foreground pt-4 pr-4 pb-4 pl-4">
                  Unassigned
                </td>
                <td className="pt-4 pr-4 pb-4 pl-4">
                  <span>Open</span>
                </td>
                <td className="pt-4 pr-5 pb-4 pl-5">
                  <div className="flex justify-end items-center gap-3">
                    <button
                      type="button"
                      aria-label="More alert actions"
                      className="rounded-lg text-muted-foreground pt-1.5 pr-1.5 pb-1.5 pl-1.5"
                    >
                      <MoreHorizontal className="size-4" />
                    </button>
                    <button
                      type="button"
                      className="font-medium text-primary text-sm"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="border-x-border border-t border-t-border border-b-border">
                <td className="font-medium whitespace-nowrap pt-4 pr-5 pb-4 pl-5">
                  Ethan Cole
                </td>
                <td className="pt-4 pr-4 pb-4 pl-4">Missed Health Reading</td>
                <td className="whitespace-nowrap text-muted-foreground pt-4 pr-4 pb-4 pl-4">
                  No reading for 24h
                </td>
                <td className="pt-4 pr-4 pb-4 pl-4">
                  <span>Medium</span>
                </td>
                <td className="whitespace-nowrap text-muted-foreground pt-4 pr-4 pb-4 pl-4">
                  Jun 11, 2025, 4:10 PM
                </td>
                <td className="whitespace-nowrap pt-4 pr-4 pb-4 pl-4">
                  Dr. Priya Shah
                </td>
                <td className="whitespace-nowrap text-muted-foreground pt-4 pr-4 pb-4 pl-4">
                  Marcus Lee
                </td>
                <td className="pt-4 pr-4 pb-4 pl-4">
                  <span>Reviewed</span>
                </td>
                <td className="pt-4 pr-5 pb-4 pl-5">
                  <div className="flex justify-end items-center gap-3">
                    <button
                      type="button"
                      aria-label="More alert actions"
                      className="rounded-lg text-muted-foreground pt-1.5 pr-1.5 pb-1.5 pl-1.5"
                    >
                      <MoreHorizontal className="size-4" />
                    </button>
                    <button
                      type="button"
                      className="font-medium text-primary text-sm"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="border-x-border border-t border-t-border border-b-border">
                <td className="font-medium whitespace-nowrap pt-4 pr-5 pb-4 pl-5">
                  Grace Kim
                </td>
                <td className="pt-4 pr-4 pb-4 pl-4">Treatment Reminder</td>
                <td className="whitespace-nowrap text-muted-foreground pt-4 pr-4 pb-4 pl-4">
                  Lisinopril, 8:00 AM
                </td>
                <td className="pt-4 pr-4 pb-4 pl-4">
                  <span>Low</span>
                </td>
                <td className="whitespace-nowrap text-muted-foreground pt-4 pr-4 pb-4 pl-4">
                  Jun 11, 2025, 8:02 AM
                </td>
                <td className="whitespace-nowrap pt-4 pr-4 pb-4 pl-4">
                  Dr. Priya Shah
                </td>
                <td className="whitespace-nowrap text-muted-foreground pt-4 pr-4 pb-4 pl-4">
                  Nora Williams
                </td>
                <td className="pt-4 pr-4 pb-4 pl-4">
                  <span>Resolved</span>
                </td>
                <td className="pt-4 pr-5 pb-4 pl-5">
                  <div className="flex justify-end items-center gap-3">
                    <button
                      type="button"
                      aria-label="More alert actions"
                      className="rounded-lg text-muted-foreground pt-1.5 pr-1.5 pb-1.5 pl-1.5"
                    >
                      <MoreHorizontal className="size-4" />
                    </button>
                    <button
                      type="button"
                      className="font-medium text-primary text-sm"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="border-x-border border-t border-t-border border-b-border">
                <td className="font-medium whitespace-nowrap pt-4 pr-5 pb-4 pl-5">
                  Olivia Bennett
                </td>
                <td className="pt-4 pr-4 pb-4 pl-4">Elevated Blood Sugar</td>
                <td className="whitespace-nowrap text-muted-foreground pt-4 pr-4 pb-4 pl-4">
                  168 mg/dL
                </td>
                <td className="pt-4 pr-4 pb-4 pl-4">
                  <span>Medium</span>
                </td>
                <td className="whitespace-nowrap text-muted-foreground pt-4 pr-4 pb-4 pl-4">
                  Jun 10, 2025, 7:45 PM
                </td>
                <td className="whitespace-nowrap pt-4 pr-4 pb-4 pl-4">
                  Dr. Lucas Martin
                </td>
                <td className="whitespace-nowrap text-muted-foreground pt-4 pr-4 pb-4 pl-4">
                  Nora Williams
                </td>
                <td className="pt-4 pr-4 pb-4 pl-4">
                  <span>Reviewed</span>
                </td>
                <td className="pt-4 pr-5 pb-4 pl-5">
                  <div className="flex justify-end items-center gap-3">
                    <button
                      type="button"
                      aria-label="More alert actions"
                      className="rounded-lg text-muted-foreground pt-1.5 pr-1.5 pb-1.5 pl-1.5"
                    >
                      <MoreHorizontal className="size-4" />
                    </button>
                    <button
                      type="button"
                      className="font-medium text-primary text-sm"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="text-muted-foreground text-sm border-x-border border-t border-t-border border-b-border flex pt-4 pr-5 pb-4 pl-5 justify-between items-center">
            <span>Showing 1–5 of 12 alerts</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Previous page"
                className="rounded-lg pt-2 pr-2 pb-2 pl-2"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button type="button">1</button>
              <button type="button">2</button>
              <button type="button">3</button>
              <button
                type="button"
                aria-label="Next page"
                className="rounded-lg pt-2 pr-2 pb-2 pl-2"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </section>
        <p className="text-center text-muted-foreground text-sm">
          No alerts match these filters.
        </p>
      </main>
      <div className="shadow-[0px_10px_15px_-3px_rgba(0,_0,_0,_0.1),_0px_4px_6px_-4px_rgba(0,_0,_0,_0.1)] rounded-xl bg-card text-sm border-t border-t-emerald-100 border-r border-r-emerald-100 border-b border-b-emerald-100 border-l border-l-emerald-100 flex fixed right-8 bottom-6 pt-3 pr-4 pb-3 pl-4 items-center gap-3">
        <div className="rounded-full bg-emerald-50 text-primary flex justify-center items-center size-7">
          <Check className="size-4" />
        </div>
        <span>Alert marked as reviewed.</span>
      </div>
    </div>
  </div>
</div>;
