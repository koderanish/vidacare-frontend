<!-- screenType: "desktop-large" width: "1920" height: "1080" name: "Screen 8" colorTheme: "green" screenId: "e2de8562-aab2-49f1-99bf-c69a91b4ed56" -->
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
          Patient profile
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
      <main className="mr-auto ml-auto pt-8 pr-10 pb-8 pl-10 max-w-[1480px]">
        <div className="text-muted-foreground text-sm flex mb-6 items-center gap-2">
          <span>Patients</span>
          <ChevronRight className="size-4" />
          <span className="text-foreground">Olivia Bennett</span>
        </div>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="font-semibold rounded-full bg-primary/10 text-primary text-xl flex justify-center items-center size-16">
              OB
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="font-semibold text-3xl tracking-tight">
                  Olivia Bennett
                </h2>
                <span className="font-medium rounded-full bg-primary/10 text-primary text-xs pt-1 pr-3 pb-1 pl-3">
                  Monitoring
                </span>
              </div>
              <div className="text-muted-foreground text-sm flex mt-2 items-center gap-4">
                <span>68 years</span>
                <span>Female</span>
                <span>Patient ID: VC-10482</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              className="font-medium shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-xl bg-card text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-2.5 pr-4 pb-2.5 pl-4"
            >
              Edit profile
            </button>
            <button
              type="button"
              className="font-medium shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-xl bg-card text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border flex pt-2.5 pr-4 pb-2.5 pl-4 items-center gap-2"
            >
              More
              <ChevronDown className="size-4" />
            </button>
          </div>
        </div>
        <div className="rounded-xl bg-sky-50 text-sky-800 text-sm border-t border-t-sky-200 border-r border-r-sky-200 border-b border-b-sky-200 border-l border-l-sky-200 flex mt-6 pt-3 pr-4 pb-3 pl-4 items-center gap-3">
          <Info className="size-4" />
          <span>
            <strong>DEMO DATA</strong>· Device readings shown here are simulated
            for prototype review.
          </span>
        </div>
        <Tabs className="mt-6" defaultValue="Overview">
          <TabsList className="rounded-none bg-transparent border-t-border border-r-border border-b border-b-border border-l-border pt-0 pr-0 pb-0 pl-0 justify-start gap-8 w-full h-12">
            <TabsTrigger
              value="Overview"
              className="rounded-none text-sm border-t-transparent border-r-transparent border-b-2 border-b-transparent border-l-transparent pr-1 pl-1 h-12"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="Vitals"
              className="rounded-none text-sm border-t-transparent border-r-transparent border-b-2 border-b-transparent border-l-transparent pr-1 pl-1 h-12"
            >
              Vitals
            </TabsTrigger>
            <TabsTrigger
              value="Journal"
              className="rounded-none text-sm border-t-transparent border-r-transparent border-b-2 border-b-transparent border-l-transparent pr-1 pl-1 h-12"
            >
              Journal
            </TabsTrigger>
            <TabsTrigger
              value="Treatment"
              className="rounded-none text-sm border-t-transparent border-r-transparent border-b-2 border-b-transparent border-l-transparent pr-1 pl-1 h-12"
            >
              Treatment
            </TabsTrigger>
            <TabsTrigger
              value="Care Team"
              className="rounded-none text-sm border-t-transparent border-r-transparent border-b-2 border-b-transparent border-l-transparent pr-1 pl-1 h-12"
            >
              Care Team
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Overview" className="mt-6">
            <div className="grid mb-6 gap-4 grid-cols-5">
              <div className="rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-5 pr-5 pb-5 pl-5">
                <p className="text-muted-foreground text-sm">Blood Pressure</p>
                <p className="font-semibold text-2xl mt-3">
                  128/82
                  <span className="font-normal text-muted-foreground text-sm">
                    mmHg
                  </span>
                </p>
                <p className="text-muted-foreground text-xs mt-4">
                  Today, 9:42 AM
                </p>
                <span className="rounded-full bg-muted text-muted-foreground text-[11px] inline-flex mt-3 pt-1 pr-2 pb-1 pl-2">
                  Demo device data
                </span>
              </div>
              <div className="rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-5 pr-5 pb-5 pl-5">
                <p className="text-muted-foreground text-sm">Heart Rate</p>
                <p className="font-semibold text-2xl mt-3">
                  72
                  <span className="font-normal text-muted-foreground text-sm">
                    bpm
                  </span>
                </p>
                <p className="text-muted-foreground text-xs mt-4">
                  Today, 9:42 AM
                </p>
                <span className="rounded-full bg-muted text-muted-foreground text-[11px] inline-flex mt-3 pt-1 pr-2 pb-1 pl-2">
                  Demo device data
                </span>
              </div>
              <div className="rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-5 pr-5 pb-5 pl-5">
                <p className="text-muted-foreground text-sm">SpO2</p>
                <p className="font-semibold text-2xl mt-3">
                  98
                  <span className="font-normal text-muted-foreground text-sm">
                    %
                  </span>
                </p>
                <p className="text-muted-foreground text-xs mt-4">
                  Today, 9:42 AM
                </p>
                <span className="rounded-full bg-muted text-muted-foreground text-[11px] inline-flex mt-3 pt-1 pr-2 pb-1 pl-2">
                  Demo device data
                </span>
              </div>
              <div className="rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-5 pr-5 pb-5 pl-5">
                <p className="text-muted-foreground text-sm">Blood Sugar</p>
                <p className="font-semibold text-2xl mt-3">
                  104
                  <span className="font-normal text-muted-foreground text-sm">
                    mg/dL
                  </span>
                </p>
                <p className="text-muted-foreground text-xs mt-4">
                  Today, 8:15 AM
                </p>
                <span className="rounded-full bg-muted text-muted-foreground text-[11px] inline-flex mt-3 pt-1 pr-2 pb-1 pl-2">
                  Demo device data
                </span>
              </div>
              <div className="rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-5 pr-5 pb-5 pl-5">
                <p className="text-muted-foreground text-sm">Weight</p>
                <p className="font-semibold text-2xl mt-3">
                  71.4
                  <span className="font-normal text-muted-foreground text-sm">
                    kg
                  </span>
                </p>
                <p className="text-muted-foreground text-xs mt-4">
                  Jun 12, 2025
                </p>
              </div>
            </div>
            <div className="flex mb-6 justify-between items-center">
              <div>
                <h3 className="font-semibold text-xl">Health trends</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  7-day sample readings for administrative review
                </p>
              </div>
              <span className="text-muted-foreground text-xs">
                Jun 6–12, 2025
              </span>
            </div>
            <div className="grid mb-6 gap-6 grid-cols-2">
              <div className="rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-6 pr-6 pb-6 pl-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">Blood pressure</h4>
                    <p className="text-muted-foreground text-xs mt-1">mmHg</p>
                  </div>
                  <div className="text-muted-foreground text-xs flex gap-4">
                    <span className="flex items-center gap-1">
                      <i className="rounded-full bg-primary size-2" />
                      Systolic
                    </span>
                    <span className="flex items-center gap-1">
                      <i className="rounded-full bg-sky-500 size-2" />
                      Diastolic
                    </span>
                  </div>
                </div>
                <svg viewBox="0 0 620 170" className="mt-5 w-full h-40">
                  <path
                    d="M10 130H610M10 90H610M10 50H610"
                    stroke="oklch(0.92 0.004 286.32)"
                  />
                  <polyline
                    points="10,58 110,67 210,75 310,64 410,90 510,98 610,82"
                    fill="none"
                    stroke="oklch(0.723 0.219 149.579)"
                    strokeWidth="3"
                  />
                  <polyline
                    points="10,112 110,116 210,120 310,108 410,124 510,128 610,120"
                    fill="none"
                    stroke="oklch(0.6 0.118 184.704)"
                    strokeWidth="3"
                  />
                  <text
                    x="10"
                    y="160"
                    fontSize="11"
                    fill="oklch(0.552 0.016 285.938)"
                  >
                    Jun 6
                  </text>
                  <text
                    x="300"
                    y="160"
                    fontSize="11"
                    fill="oklch(0.552 0.016 285.938)"
                  >
                    Jun 9
                  </text>
                  <text
                    x="580"
                    y="160"
                    fontSize="11"
                    fill="oklch(0.552 0.016 285.938)"
                  >
                    Jun 12
                  </text>
                </svg>
              </div>
              <div className="rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-6 pr-6 pb-6 pl-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">Heart rate</h4>
                    <p className="text-muted-foreground text-xs mt-1">bpm</p>
                  </div>
                  <span className="text-muted-foreground text-xs flex items-center gap-1">
                    <i className="rounded-full bg-primary size-2" />
                    Heart rate
                  </span>
                </div>
                <svg viewBox="0 0 620 170" className="mt-5 w-full h-40">
                  <path
                    d="M10 130H610M10 90H610M10 50H610"
                    stroke="oklch(0.92 0.004 286.32)"
                  />
                  <polyline
                    points="10,58 110,72 210,82 310,66 410,108 510,98 610,90"
                    fill="none"
                    stroke="oklch(0.723 0.219 149.579)"
                    strokeWidth="3"
                  />
                  <text
                    x="10"
                    y="160"
                    fontSize="11"
                    fill="oklch(0.552 0.016 285.938)"
                  >
                    Jun 6
                  </text>
                  <text
                    x="300"
                    y="160"
                    fontSize="11"
                    fill="oklch(0.552 0.016 285.938)"
                  >
                    Jun 9
                  </text>
                  <text
                    x="580"
                    y="160"
                    fontSize="11"
                    fill="oklch(0.552 0.016 285.938)"
                  >
                    Jun 12
                  </text>
                </svg>
              </div>
              <div className="rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-6 pr-6 pb-6 pl-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">SpO2</h4>
                    <p className="text-muted-foreground text-xs mt-1">
                      percent
                    </p>
                  </div>
                  <span className="text-muted-foreground text-xs flex items-center gap-1">
                    <i className="rounded-full bg-sky-500 size-2" />
                    SpO2
                  </span>
                </div>
                <svg viewBox="0 0 620 170" className="mt-5 w-full h-40">
                  <path
                    d="M10 130H610M10 90H610M10 50H610"
                    stroke="oklch(0.92 0.004 286.32)"
                  />
                  <polyline
                    points="10,116 110,100 210,100 310,84 410,84 510,68 610,84"
                    fill="none"
                    stroke="oklch(0.6 0.118 184.704)"
                    strokeWidth="3"
                  />
                  <text
                    x="10"
                    y="160"
                    fontSize="11"
                    fill="oklch(0.552 0.016 285.938)"
                  >
                    Jun 6
                  </text>
                  <text
                    x="300"
                    y="160"
                    fontSize="11"
                    fill="oklch(0.552 0.016 285.938)"
                  >
                    Jun 9
                  </text>
                  <text
                    x="580"
                    y="160"
                    fontSize="11"
                    fill="oklch(0.552 0.016 285.938)"
                  >
                    Jun 12
                  </text>
                </svg>
              </div>
              <div className="rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-6 pr-6 pb-6 pl-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">Blood sugar trend</h4>
                    <p className="text-muted-foreground text-xs mt-1">mg/dL</p>
                  </div>
                  <span className="text-muted-foreground text-xs flex items-center gap-1">
                    <i className="rounded-full bg-primary size-2" />
                    Glucose
                  </span>
                </div>
                <svg viewBox="0 0 620 170" className="mt-5 w-full h-40">
                  <path
                    d="M10 130H610M10 90H610M10 50H610"
                    stroke="oklch(0.92 0.004 286.32)"
                  />
                  <polyline
                    points="10,52 110,70 210,82 310,68 410,104 510,96 610,90"
                    fill="none"
                    stroke="oklch(0.723 0.219 149.579)"
                    strokeWidth="3"
                  />
                  <text
                    x="10"
                    y="160"
                    fontSize="11"
                    fill="oklch(0.552 0.016 285.938)"
                  >
                    Jun 6
                  </text>
                  <text
                    x="300"
                    y="160"
                    fontSize="11"
                    fill="oklch(0.552 0.016 285.938)"
                  >
                    Jun 9
                  </text>
                  <text
                    x="580"
                    y="160"
                    fontSize="11"
                    fill="oklch(0.552 0.016 285.938)"
                  >
                    Jun 12
                  </text>
                </svg>
              </div>
            </div>
            <div className="grid mb-6 gap-6 grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-6 pr-6 pb-6 pl-6">
                <h3 className="font-semibold">Recent journal entry</h3>
                <div className="grid mt-5 gap-4 grid-cols-4">
                  <div>
                    <p className="text-muted-foreground text-xs">Mood</p>
                    <p className="font-medium text-sm mt-2">Calm</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Pain</p>
                    <p className="font-medium text-sm mt-2">2/10</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Symptom</p>
                    <p className="font-medium text-sm mt-2">Mild fatigue</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Date</p>
                    <p className="font-medium text-sm mt-2">Jun 12, 2025</p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-6 pr-6 pb-6 pl-6">
                <h3 className="font-semibold">Data sources</h3>
                <div className="text-sm mt-4">
                  <div className="flex mb-3 justify-between items-center">
                    <span>Demo Device Data</span>
                    <span className="text-primary">
                      Connected for prototype
                    </span>
                  </div>
                  <div className="flex mb-3 justify-between items-center">
                    <span>Manual Entry</span>
                    <span className="text-muted-foreground">
                      None this week
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Imported Data</span>
                    <span className="text-muted-foreground">None</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-xs leading-5 border-x-border border-t border-t-border border-b-border mt-5 pt-4">
                  No Apple Watch, Fitbit, Garmin, or medical-device integration
                  is implemented.
                </p>
              </div>
            </div>
            <p className="text-muted-foreground text-xs">
              Admin review only. This prototype does not provide diagnosis or
              treatment decisions.
            </p>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  </div>
</div>;
