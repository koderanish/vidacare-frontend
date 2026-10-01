<!-- screenType: "desktop-large" width: "1920" height: "1080" name: "Screen 7" colorTheme: "green" screenId: "18274e89-5966-42c0-88de-a89768802e3e" -->
<div className="bg-background text-foreground w-full h-fit">
  <aside className="bg-sidebar border-y-border border-r border-r-border border-l-border flex fixed z-20 top-0 bottom-0 left-0 pt-6 pr-4 pb-6 pl-4 flex-col w-[248px]">
    <div className="flex pr-3 pl-3 items-center gap-2.5">
      <div className="rounded-full bg-primary text-primary-foreground flex justify-center items-center size-8">
        <HeartPulse className="size-4" />
      </div>
      <span className="font-semibold text-foreground text-lg tracking-tight">
        VidaCare
      </span>
    </div>
    <nav className="flex mt-10 flex-col flex-1" aria-label="Primary navigation">
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
        Patients
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
    <main className="flex pt-8 pr-8 pb-8 pl-8 flex-col gap-6">
      <section className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-2xl tracking-tight">Patients</h2>
          <p className="text-muted-foreground text-sm">
            Review demo patient records and care assignments.
          </p>
        </div>
        <button
          type="button"
          className="font-medium shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-xl bg-primary text-primary-foreground text-sm inline-flex pt-2.5 pr-4 pb-2.5 pl-4 items-center gap-2"
        >
          <Plus className="size-4" />
          Add patient
        </button>
      </section>
      <section className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border flex pt-4 pr-4 pb-4 pl-4 flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 min-w-0">
            <Search className="-translate-y-1/2 pointer-events-none text-muted-foreground absolute top-1/2 left-3 size-4" />
            <input
              aria-label="Patient search"
              placeholder="Search patients by name or ID"
              className="rounded-xl bg-background text-sm border-t border-t-input border-r border-r-input border-b border-b-input border-l border-l-input outline-none pr-4 pl-10 w-full h-10"
              defaultValue=""
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="rounded-xl w-44 h-10">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="monitoring">Monitoring</SelectItem>
              <SelectItem value="stable">Stable</SelectItem>
              <SelectItem value="attention">Needs attention</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="rounded-xl w-52 h-10">
              <SelectValue placeholder="All assigned doctors" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All assigned doctors</SelectItem>
              <SelectItem value="lucas">Dr. Lucas Martin</SelectItem>
              <SelectItem value="priya">Dr. Priya Shah</SelectItem>
              <SelectItem value="unassigned">Unassigned</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="rounded-xl w-48 h-10">
              <SelectValue placeholder="All caregivers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All caregivers</SelectItem>
              <SelectItem value="nora">Nora Williams</SelectItem>
              <SelectItem value="marcus">Marcus Lee</SelectItem>
              <SelectItem value="unassigned">Unassigned</SelectItem>
            </SelectContent>
          </Select>
          <button
            type="button"
            className="whitespace-nowrap rounded-xl text-muted-foreground text-sm pt-2 pr-3 pb-2 pl-3"
          >
            Reset filters
          </button>
        </div>
      </section>
      <div className="rounded-xl bg-blue-50 text-blue-700 text-sm border-t border-t-blue-100 border-r border-r-blue-100 border-b border-b-blue-100 border-l border-l-blue-100 pt-3 pr-4 pb-3 pl-4">
        <span className="font-semibold tracking-wide">DEMO DATA</span>
        <span className="text-blue-300 mr-2 ml-2">·</span>This workspace
        contains sample patient records for product demonstration only.
      </div>
      <section className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="text-left border-collapse w-full min-w-[1450px]">
            <thead className="bg-muted/50">
              <tr className="border-t-border border-r-border border-b border-b-border border-l-border">
                <th className="font-semibold uppercase text-muted-foreground text-xs tracking-wide pt-4 pr-5 pb-4 pl-5">
                  Patient Name
                </th>
                <th className="font-semibold uppercase text-muted-foreground text-xs tracking-wide pt-4 pr-4 pb-4 pl-4">
                  Age
                </th>
                <th className="font-semibold uppercase text-muted-foreground text-xs tracking-wide pt-4 pr-4 pb-4 pl-4">
                  Gender
                </th>
                <th className="font-semibold uppercase text-muted-foreground text-xs tracking-wide pt-4 pr-4 pb-4 pl-4">
                  Assigned Doctor
                </th>
                <th className="font-semibold uppercase text-muted-foreground text-xs tracking-wide pt-4 pr-4 pb-4 pl-4">
                  Assigned Caregiver
                </th>
                <th className="font-semibold uppercase text-muted-foreground text-xs tracking-wide pt-4 pr-4 pb-4 pl-4">
                  Latest BP
                </th>
                <th className="font-semibold uppercase text-muted-foreground text-xs tracking-wide pt-4 pr-4 pb-4 pl-4">
                  Heart Rate
                </th>
                <th className="font-semibold uppercase text-muted-foreground text-xs tracking-wide pt-4 pr-4 pb-4 pl-4">
                  SpO2
                </th>
                <th className="font-semibold uppercase text-muted-foreground text-xs tracking-wide pt-4 pr-4 pb-4 pl-4">
                  Last Reading
                </th>
                <th className="font-semibold uppercase text-muted-foreground text-xs tracking-wide pt-4 pr-4 pb-4 pl-4">
                  Status
                </th>
                <th className="font-semibold uppercase text-muted-foreground text-xs tracking-wide pt-4 pr-5 pb-4 pl-5">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t-border border-r-border border-b border-b-border border-l-border">
                <td className="pt-5 pr-5 pb-5 pl-5">
                  <div className="flex items-center gap-3">
                    <div className="font-semibold rounded-full bg-primary/10 text-primary text-xs flex justify-center items-center size-9">
                      OB
                    </div>
                    <span className="font-medium">Olivia Bennett</span>
                  </div>
                </td>
                <td className="text-sm pt-5 pr-4 pb-5 pl-4">68</td>
                <td className="text-sm pt-5 pr-4 pb-5 pl-4">Female</td>
                <td className="text-sm pt-5 pr-4 pb-5 pl-4">
                  Dr. Lucas Martin
                </td>
                <td className="text-sm pt-5 pr-4 pb-5 pl-4">Nora Williams</td>
                <td className="text-sm pt-5 pr-4 pb-5 pl-4">128/82 mmHg</td>
                <td className="text-sm pt-5 pr-4 pb-5 pl-4">72 bpm</td>
                <td className="text-sm pt-5 pr-4 pb-5 pl-4">98%</td>
                <td className="text-muted-foreground text-sm pt-5 pr-4 pb-5 pl-4">
                  Today 9:42 AM
                </td>
                <td className="pt-5 pr-4 pb-5 pl-4">
                  <span className="font-medium rounded-full bg-primary/10 text-primary text-xs inline-flex pt-1 pr-2.5 pb-1 pl-2.5 items-center gap-2">
                    <span className="rounded-full bg-primary size-1.5" />
                    Monitoring
                  </span>
                </td>
                <td className="pt-5 pr-5 pb-5 pl-5">
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
                <td className="pt-5 pr-5 pb-5 pl-5">
                  <div className="flex items-center gap-3">
                    <div className="font-semibold rounded-full bg-primary/10 text-primary text-xs flex justify-center items-center size-9">
                      EC
                    </div>
                    <span className="font-medium">Ethan Cole</span>
                  </div>
                </td>
                <td className="text-sm pt-5 pr-4 pb-5 pl-4">54</td>
                <td className="text-sm pt-5 pr-4 pb-5 pl-4">Male</td>
                <td className="text-sm pt-5 pr-4 pb-5 pl-4">Dr. Priya Shah</td>
                <td className="text-sm pt-5 pr-4 pb-5 pl-4">Marcus Lee</td>
                <td className="text-sm pt-5 pr-4 pb-5 pl-4">135/86 mmHg</td>
                <td className="text-sm pt-5 pr-4 pb-5 pl-4">81 bpm</td>
                <td className="text-sm pt-5 pr-4 pb-5 pl-4">97%</td>
                <td className="text-muted-foreground text-sm pt-5 pr-4 pb-5 pl-4">
                  Today 8:17 AM
                </td>
                <td className="pt-5 pr-4 pb-5 pl-4">
                  <span className="font-medium rounded-full bg-muted text-foreground text-xs inline-flex pt-1 pr-2.5 pb-1 pl-2.5 items-center gap-2">
                    <span className="rounded-full bg-primary size-1.5" />
                    Stable
                  </span>
                </td>
                <td className="pt-5 pr-5 pb-5 pl-5">
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
                <td className="pt-5 pr-5 pb-5 pl-5">
                  <div className="flex items-center gap-3">
                    <div className="font-semibold rounded-full bg-orange-100 text-orange-700 text-xs flex justify-center items-center size-9">
                      SO
                    </div>
                    <span className="font-medium">Samuel Ortiz</span>
                  </div>
                </td>
                <td className="text-sm pt-5 pr-4 pb-5 pl-4">73</td>
                <td className="text-sm pt-5 pr-4 pb-5 pl-4">Male</td>
                <td className="text-sm pt-5 pr-4 pb-5 pl-4">
                  Dr. Lucas Martin
                </td>
                <td className="text-muted-foreground text-sm pt-5 pr-4 pb-5 pl-4">
                  Unassigned
                </td>
                <td className="text-sm pt-5 pr-4 pb-5 pl-4">142/90 mmHg</td>
                <td className="text-sm pt-5 pr-4 pb-5 pl-4">88 bpm</td>
                <td className="text-sm pt-5 pr-4 pb-5 pl-4">95%</td>
                <td className="text-muted-foreground text-sm pt-5 pr-4 pb-5 pl-4">
                  Jun 08, 2025
                </td>
                <td className="pt-5 pr-4 pb-5 pl-4">
                  <span className="font-medium rounded-full bg-orange-100 text-orange-700 text-xs inline-flex pt-1 pr-2.5 pb-1 pl-2.5 items-center gap-2">
                    <span className="rounded-full bg-orange-500 size-1.5" />
                    Needs attention
                  </span>
                </td>
                <td className="pt-5 pr-5 pb-5 pl-5">
                  <button
                    type="button"
                    aria-label="Actions for Samuel Ortiz"
                    className="rounded-lg text-muted-foreground pt-2 pr-2 pb-2 pl-2"
                  >
                    <MoreHorizontal className="size-4" />
                  </button>
                </td>
              </tr>
              <tr className="border-t-border border-r-border border-b border-b-border border-l-border">
                <td className="pt-5 pr-5 pb-5 pl-5">
                  <div className="flex items-center gap-3">
                    <div className="font-semibold rounded-full bg-primary/10 text-primary text-xs flex justify-center items-center size-9">
                      GK
                    </div>
                    <span className="font-medium">Grace Kim</span>
                  </div>
                </td>
                <td className="text-sm pt-5 pr-4 pb-5 pl-4">61</td>
                <td className="text-sm pt-5 pr-4 pb-5 pl-4">Female</td>
                <td className="text-sm pt-5 pr-4 pb-5 pl-4">Dr. Priya Shah</td>
                <td className="text-sm pt-5 pr-4 pb-5 pl-4">Nora Williams</td>
                <td className="text-sm pt-5 pr-4 pb-5 pl-4">122/78 mmHg</td>
                <td className="text-sm pt-5 pr-4 pb-5 pl-4">69 bpm</td>
                <td className="text-sm pt-5 pr-4 pb-5 pl-4">99%</td>
                <td className="text-muted-foreground text-sm pt-5 pr-4 pb-5 pl-4">
                  Yesterday 4:32 PM
                </td>
                <td className="pt-5 pr-4 pb-5 pl-4">
                  <span className="font-medium rounded-full bg-muted text-foreground text-xs inline-flex pt-1 pr-2.5 pb-1 pl-2.5 items-center gap-2">
                    <span className="rounded-full bg-primary size-1.5" />
                    Stable
                  </span>
                </td>
                <td className="pt-5 pr-5 pb-5 pl-5">
                  <button
                    type="button"
                    aria-label="Actions for Grace Kim"
                    className="rounded-lg text-muted-foreground pt-2 pr-2 pb-2 pl-2"
                  >
                    <MoreHorizontal className="size-4" />
                  </button>
                </td>
              </tr>
              <tr>
                <td className="pt-5 pr-5 pb-5 pl-5">
                  <div className="flex items-center gap-3">
                    <div className="font-semibold rounded-full bg-muted text-muted-foreground text-xs flex justify-center items-center size-9">
                      AJ
                    </div>
                    <span className="font-medium">Amara Johnson</span>
                  </div>
                </td>
                <td className="text-sm pt-5 pr-4 pb-5 pl-4">47</td>
                <td className="text-sm pt-5 pr-4 pb-5 pl-4">Female</td>
                <td className="text-muted-foreground text-sm pt-5 pr-4 pb-5 pl-4">
                  Unassigned
                </td>
                <td className="text-sm pt-5 pr-4 pb-5 pl-4">Marcus Lee</td>
                <td className="text-muted-foreground text-sm pt-5 pr-4 pb-5 pl-4">
                  —
                </td>
                <td className="text-muted-foreground text-sm pt-5 pr-4 pb-5 pl-4">
                  —
                </td>
                <td className="text-muted-foreground text-sm pt-5 pr-4 pb-5 pl-4">
                  —
                </td>
                <td className="text-muted-foreground text-sm pt-5 pr-4 pb-5 pl-4">
                  No reading
                </td>
                <td className="pt-5 pr-4 pb-5 pl-4">
                  <span className="font-medium rounded-full bg-muted text-muted-foreground text-xs inline-flex pt-1 pr-2.5 pb-1 pl-2.5 items-center gap-2">
                    <span className="rounded-full bg-muted-foreground size-1.5" />
                    Pending
                  </span>
                </td>
                <td className="pt-5 pr-5 pb-5 pl-5">
                  <button
                    type="button"
                    aria-label="Actions for Amara Johnson"
                    className="rounded-lg text-muted-foreground pt-2 pr-2 pb-2 pl-2"
                  >
                    <MoreHorizontal className="size-4" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="border-x-border border-t border-t-border border-b-border flex pt-4 pr-5 pb-4 pl-5 justify-between items-center">
          <span className="text-muted-foreground text-sm">
            Showing 1–5 of 248 patients
          </span>
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
              className="rounded-lg text-sm pt-1.5 pr-3 pb-1.5 pl-3"
            >
              1
            </button>
            <button
              type="button"
              className="rounded-lg text-sm pt-1.5 pr-3 pb-1.5 pl-3"
            >
              2
            </button>
            <button
              type="button"
              className="rounded-lg text-sm pt-1.5 pr-3 pb-1.5 pl-3"
            >
              3
            </button>
            <span className="text-muted-foreground text-sm pr-2 pl-2">…</span>
            <button
              type="button"
              className="rounded-lg text-sm pt-1.5 pr-3 pb-1.5 pl-3"
            >
              50
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
      </section>
      <p className="text-center text-muted-foreground text-xs">
        No patient records match these filters.
      </p>
    </main>
  </div>
</div>;
