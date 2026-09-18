<!-- screenType: "desktop-large" width: "1920" height: "1080" name: "Screen 2" colorTheme: "green" screenId: "0bc994db-a0a9-45e1-b4d0-43b99ef50237" -->
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
      <main className="flex pt-8 pr-8 pb-8 pl-8 flex-col gap-8">
        <section className="flex justify-between items-end">
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-foreground text-2xl tracking-tight">
              Good morning, Maya
            </h2>
            <p className="text-muted-foreground text-sm">
              Here is what is happening across your care network today.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="font-medium shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-xl bg-card text-foreground text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border flex pt-2.5 pr-4 pb-2.5 pl-4 items-center gap-2"
            >
              <CalendarDays className="text-muted-foreground size-4" />
              Today, Jun 12, 2025
            </button>
            <button
              type="button"
              className="font-medium shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-xl bg-card text-foreground text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border flex pt-2.5 pr-4 pb-2.5 pl-4 items-center gap-2"
            >
              <Download className="text-muted-foreground size-4" />
              Export report
            </button>
          </div>
        </section>
        <section className="grid gap-6 grid-cols-3">
          <Card className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl border-border pt-6 pr-6 pb-6 pl-6 gap-4">
            <CardContent className="flex pt-0 pr-0 pb-0 pl-0 justify-between items-start gap-4">
              <div className="flex flex-col gap-4">
                <p className="text-muted-foreground text-sm">Total Patients</p>
                <p className="font-semibold text-foreground text-3xl tracking-tight">
                  12,480
                </p>
                <p className="font-medium text-primary text-xs">
                  +8.2% vs last month
                </p>
              </div>
              <UsersRound className="text-primary size-5" />
            </CardContent>
          </Card>
          <Card className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl border-border pt-6 pr-6 pb-6 pl-6 gap-4">
            <CardContent className="flex pt-0 pr-0 pb-0 pl-0 justify-between items-start gap-4">
              <div className="flex flex-col gap-4">
                <p className="text-muted-foreground text-sm">Total Doctors</p>
                <p className="font-semibold text-foreground text-3xl tracking-tight">
                  386
                </p>
                <p className="font-medium text-blue-600 text-xs">+4.6%</p>
              </div>
              <Stethoscope className="text-blue-600 size-5" />
            </CardContent>
          </Card>
          <Card className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl border-border pt-6 pr-6 pb-6 pl-6 gap-4">
            <CardContent className="flex pt-0 pr-0 pb-0 pl-0 justify-between items-start gap-4">
              <div className="flex flex-col gap-4">
                <p className="text-muted-foreground text-sm">
                  Total Caregivers
                </p>
                <p className="font-semibold text-foreground text-3xl tracking-tight">
                  1,248
                </p>
                <p className="font-medium text-primary text-xs">+6.1%</p>
              </div>
              <HeartHandshake className="text-primary size-5" />
            </CardContent>
          </Card>
          <Card className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl border-border pt-6 pr-6 pb-6 pl-6 gap-4">
            <CardContent className="flex pt-0 pr-0 pb-0 pl-0 justify-between items-start gap-4">
              <div className="flex flex-col gap-4">
                <p className="text-muted-foreground text-sm">Active Alerts</p>
                <p className="font-semibold text-foreground text-3xl tracking-tight">
                  24
                </p>
                <p className="font-medium text-amber-600 text-xs">
                  5 need attention
                </p>
              </div>
              <TriangleAlert className="text-amber-600 size-5" />
            </CardContent>
          </Card>
          <Card className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl border-border pt-6 pr-6 pb-6 pl-6 gap-4">
            <CardContent className="flex pt-0 pr-0 pb-0 pl-0 justify-between items-start gap-4">
              <div className="flex flex-col gap-4">
                <p className="text-muted-foreground text-sm">
                  Active Treatment Plans
                </p>
                <p className="font-semibold text-foreground text-3xl tracking-tight">
                  8,932
                </p>
                <p className="font-medium text-blue-600 text-xs">+3.4%</p>
              </div>
              <ClipboardList className="text-blue-600 size-5" />
            </CardContent>
          </Card>
          <Card className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl border-border pt-6 pr-6 pb-6 pl-6 gap-4">
            <CardContent className="flex pt-0 pr-0 pb-0 pl-0 justify-between items-start gap-4">
              <div className="flex flex-col gap-4">
                <p className="text-muted-foreground text-sm">New Users</p>
                <p className="font-semibold text-foreground text-3xl tracking-tight">
                  148
                </p>
                <p className="font-medium text-primary text-xs">+12.8%</p>
              </div>
              <UserPlus className="text-primary size-5" />
            </CardContent>
          </Card>
        </section>
        <section className="grid gap-6 grid-cols-2">
          <Card className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl border-border pt-6 pr-6 pb-6 pl-6 gap-6">
            <CardHeader className="flex pt-0 pr-0 pb-0 pl-0 flex-row justify-between items-start gap-4">
              <div className="flex flex-col gap-2">
                <CardTitle className="font-semibold text-lg">
                  Patient activity
                </CardTitle>
                <CardDescription className="text-muted-foreground text-sm">
                  Weekly patient engagement
                </CardDescription>
              </div>
              <div className="text-muted-foreground text-xs flex items-center gap-4">
                <span className="flex items-center gap-2">
                  <span className="rounded-full bg-primary size-2" />
                  This week
                </span>
                <span className="flex items-center gap-2">
                  <span className="border-x-dashed border-x-blue-500 border-t border-t-dashed border-t-blue-500 border-b-dashed border-b-blue-500 w-3 h-0.5" />
                  Last week
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex pt-0 pr-0 pb-0 pl-0 flex-col gap-4">
              <svg
                viewBox="0 0 760 220"
                className="w-full h-52"
                role="img"
                aria-label="Patient activity line chart"
              >
                <path
                  d="M20 184 H740 M20 132 H740 M20 80 H740 M20 28 H740"
                  stroke="oklch(0.92 0.004 286.32)"
                  strokeWidth="1"
                />
                <path
                  d="M20 158 C90 142 112 150 140 126 S205 138 260 102 S330 115 380 86 S448 105 500 66 S580 88 620 54 S690 72 740 38"
                  fill="none"
                  stroke="oklch(0.723 0.219 149.579)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M20 170 C90 160 112 168 140 145 S205 153 260 132 S330 142 380 116 S448 128 500 101 S580 118 620 86 S690 103 740 78"
                  fill="none"
                  stroke="oklch(0.6 0.118 184.704)"
                  strokeWidth="2"
                  strokeDasharray="7 7"
                />
              </svg>
              <div className="text-muted-foreground text-xs flex pr-1 pl-1 justify-between">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl border-border pt-6 pr-6 pb-6 pl-6 gap-6">
            <CardHeader className="flex pt-0 pr-0 pb-0 pl-0 flex-row justify-between items-start gap-4">
              <div className="flex flex-col gap-2">
                <CardTitle className="font-semibold text-lg">
                  User registration trend
                </CardTitle>
                <CardDescription className="text-muted-foreground text-sm">
                  New users across the last 6 months
                </CardDescription>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="font-semibold text-foreground text-2xl">
                  148
                </span>
                <span className="text-muted-foreground text-xs">
                  this month
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex pt-0 pr-0 pb-0 pl-0 flex-col gap-4">
              <svg
                viewBox="0 0 760 220"
                className="w-full h-52"
                role="img"
                aria-label="User registration trend area chart"
              >
                <path
                  d="M20 184 H740 M20 132 H740 M20 80 H740 M20 28 H740"
                  stroke="oklch(0.92 0.004 286.32)"
                  strokeWidth="1"
                />
                <path
                  d="M20 184 L20 148 C125 145 160 125 260 136 S360 104 400 112 S500 72 540 85 S640 48 740 35 L740 184 Z"
                  fill="oklch(0.723 0.219 149.579 / 0.12)"
                />
                <path
                  d="M20 148 C125 145 160 125 260 136 S360 104 400 112 S500 72 540 85 S640 48 740 35"
                  fill="none"
                  stroke="oklch(0.6 0.118 184.704)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
              <div className="text-muted-foreground text-xs flex pr-1 pl-1 justify-between">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
              </div>
            </CardContent>
          </Card>
        </section>
        <section className="grid gap-6 grid-cols-5">
          <Card className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl border-border pt-6 pr-6 pb-6 pl-6 gap-6 col-span-3">
            <CardHeader className="pt-0 pr-0 pb-0 pl-0 gap-2">
              <CardTitle className="font-semibold text-lg">
                Health monitoring activity
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm">
                Care network completion rates
              </CardDescription>
            </CardHeader>
            <CardContent className="flex pt-0 pr-0 pb-0 pl-0 flex-col gap-6">
              <div className="flex flex-col gap-3">
                <div className="text-sm flex justify-between items-center">
                  <span className="font-medium">Medication adherence</span>
                  <span className="text-muted-foreground">86%</span>
                </div>
                <div className="rounded-full bg-muted h-2">
                  <div className="rounded-full bg-primary w-[86%] h-2" />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="text-sm flex justify-between items-center">
                  <span className="font-medium">Vital checks</span>
                  <span className="text-muted-foreground">74%</span>
                </div>
                <div className="rounded-full bg-muted h-2">
                  <div className="rounded-full bg-primary w-[74%] h-2" />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="text-sm flex justify-between items-center">
                  <span className="font-medium">Care plan reviews</span>
                  <span className="text-muted-foreground">68%</span>
                </div>
                <div className="rounded-full bg-muted h-2">
                  <div className="rounded-full bg-primary w-[68%] h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl border-border pt-6 pr-6 pb-6 pl-6 gap-6 col-span-2">
            <CardHeader className="flex pt-0 pr-0 pb-0 pl-0 flex-row justify-between items-center gap-4">
              <CardTitle className="font-semibold text-lg">
                Recent system activity
              </CardTitle>
              <a href="#" className="font-medium text-primary text-sm">
                View all activity
              </a>
            </CardHeader>
            <CardContent className="flex pt-0 pr-0 pb-0 pl-0 flex-col gap-4">
              <div className="border-t-border border-r-border border-b border-b-border border-l-border flex pb-3 justify-between items-start gap-4">
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-sm">
                    New patient registered
                  </span>
                  <span className="text-muted-foreground text-xs">
                    Olivia Bennett
                  </span>
                </div>
                <span className="whitespace-nowrap text-muted-foreground text-xs">
                  8 min ago
                </span>
              </div>
              <div className="border-t-border border-r-border border-b border-b-border border-l-border flex pb-3 justify-between items-start gap-4">
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-sm">Doctor added</span>
                  <span className="text-muted-foreground text-xs">
                    Dr. Lucas Martin
                  </span>
                </div>
                <span className="whitespace-nowrap text-muted-foreground text-xs">
                  24 min ago
                </span>
              </div>
              <div className="border-t-border border-r-border border-b border-b-border border-l-border flex pb-3 justify-between items-start gap-4">
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-sm">
                    Caregiver assigned
                  </span>
                  <span className="text-muted-foreground text-xs">
                    Nora Williams to Ethan Cole
                  </span>
                </div>
                <span className="whitespace-nowrap text-muted-foreground text-xs">
                  1 hr ago
                </span>
              </div>
              <div className="border-t-border border-r-border border-b border-b-border border-l-border flex pb-3 justify-between items-start gap-4">
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-sm">
                    Resource published
                  </span>
                  <span className="text-muted-foreground text-xs">
                    Managing hypertension at home
                  </span>
                </div>
                <span className="whitespace-nowrap text-muted-foreground text-xs">
                  2 hrs ago
                </span>
              </div>
              <div className="flex justify-between items-start gap-4">
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-sm">Alert generated</span>
                  <span className="text-muted-foreground text-xs">
                    Missed medication check-in
                  </span>
                </div>
                <span className="whitespace-nowrap text-muted-foreground text-xs">
                  3 hrs ago
                </span>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  </div>
</div>;
