<!-- screenType: "desktop-large" width: "1920" height: "1080" name: "Screen 13" colorTheme: "green" screenId: "265f9c45-8f2a-45bf-8e0b-a6d29881a431" -->
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
          Care team view
        </h1>
        <div className="flex items-center gap-6">
          <div className="relative w-72">
            <Search className="pointer-events-none rounded-xl bg-card text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border absolute top-1/2 left-3 pr-4 pl-10 w-full h-4" />
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
        <section className="rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border mb-6 pt-6 pr-6 pb-6 pl-6">
          <div className="flex justify-between items-start gap-6">
            <div className="flex items-center gap-4">
              <div className="font-semibold rounded-full bg-primary/10 text-primary text-lg flex justify-center items-center size-14">
                OB
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="font-semibold text-2xl tracking-tight">
                    Olivia Bennett
                  </h2>
                  <span className="font-medium rounded-full bg-primary/10 text-primary text-xs pt-1 pr-3 pb-1 pl-3">
                    Monitoring
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mt-2">
                  68 years · Female · VC-10482
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium uppercase text-muted-foreground text-xs tracking-[0.16em]">
                Patient profile
              </p>
              <p className="text-muted-foreground text-sm mt-2">Care network</p>
            </div>
          </div>
          <Tabs className="mt-6" defaultValue="care-team">
            <TabsList className="rounded-none bg-transparent border-t-border border-r-border border-b border-b-border border-l-border pt-0 pr-0 pb-0 pl-0 gap-6 h-auto">
              <TabsTrigger
                value="overview"
                className="rounded-none text-muted-foreground text-sm border-t-transparent border-r-transparent border-b-2 border-b-transparent border-l-transparent pt-0 pr-1 pb-3 pl-1"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="vitals"
                className="rounded-none text-muted-foreground text-sm border-t-transparent border-r-transparent border-b-2 border-b-transparent border-l-transparent pt-0 pr-1 pb-3 pl-1"
              >
                Vitals
              </TabsTrigger>
              <TabsTrigger
                value="journal"
                className="rounded-none text-muted-foreground text-sm border-t-transparent border-r-transparent border-b-2 border-b-transparent border-l-transparent pt-0 pr-1 pb-3 pl-1"
              >
                Journal
              </TabsTrigger>
              <TabsTrigger
                value="treatment"
                className="rounded-none text-muted-foreground text-sm border-t-transparent border-r-transparent border-b-2 border-b-transparent border-l-transparent pt-0 pr-1 pb-3 pl-1"
              >
                Treatment
              </TabsTrigger>
              <TabsTrigger
                value="care-team"
                className="rounded-none text-muted-foreground text-sm border-t-transparent border-r-transparent border-b-2 border-b-transparent border-l-transparent pt-0 pr-1 pb-3 pl-1"
              >
                Care Team
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </section>
        <div className="grid gap-6 grid-cols-[minmax(0,1fr)_360px]">
          <section>
            <div className="mb-6">
              <h2 className="font-semibold text-2xl tracking-tight">
                Care team
              </h2>
              <p className="text-muted-foreground text-sm mt-2">
                Review the people connected to this patient.
              </p>
            </div>
            <div className="relative mb-6 pl-24">
              <div className="bg-primary/40 absolute top-28 left-[116px] mb-4 w-px h-[330px]" />
              <div className="text-primary absolute top-[188px] left-[110px] mb-4">
                <ChevronDown className="size-4" />
              </div>
              <div className="text-primary absolute top-[350px] left-[110px] mb-4">
                <ChevronDown className="size-4" />
              </div>
              <div className="font-semibold uppercase text-muted-foreground text-xs tracking-[0.16em] absolute top-12 left-0 mb-4">
                Patient
              </div>
              <Card className="rounded-2xl border-primary/30 relative z-10 mb-4 pt-6 pr-6 pb-6 pl-6 gap-4">
                <CardHeader className="pt-0 pr-0 pb-0 pl-0 gap-1">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Olivia Bennett</CardTitle>
                    <span className="font-medium rounded-full bg-primary/10 text-primary text-xs pt-1 pr-3 pb-1 pl-3">
                      Monitoring
                    </span>
                  </div>
                  <CardDescription>Patient ID VC-10482</CardDescription>
                </CardHeader>
              </Card>
              <div className="font-semibold uppercase text-muted-foreground text-xs tracking-[0.16em] absolute top-[190px] left-0 mb-4">
                Doctor
              </div>
              <Card className="rounded-2xl relative z-10 mb-4 pt-6 pr-6 pb-6 pl-6 gap-4">
                <CardHeader className="pt-0 pr-0 pb-0 pl-0 gap-1">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Dr. Lucas Martin</CardTitle>
                    <span className="font-medium text-primary text-xs flex items-center gap-2">
                      <span className="rounded-full bg-primary size-2" />
                      Active
                    </span>
                  </div>
                  <CardDescription>Cardiology</CardDescription>
                </CardHeader>
                <CardContent className="text-sm grid pt-0 pr-0 pb-0 pl-0 gap-3 grid-cols-2">
                  <div className="text-muted-foreground flex items-center gap-2">
                    <Mail className="size-4" />
                    lucas.martin@vidacare.com
                  </div>
                  <div className="text-muted-foreground flex items-center gap-2">
                    <Phone className="size-4" />
                    +1 (555) 214-7012
                  </div>
                  <div className="text-muted-foreground">
                    Assigned
                    <span className="text-foreground">Jan 18, 2025</span>
                  </div>
                </CardContent>
              </Card>
              <div className="font-semibold uppercase text-muted-foreground text-xs tracking-[0.16em] absolute top-[352px] left-0 mb-4">
                Caregiver
              </div>
              <Card className="rounded-2xl relative z-10 pt-6 pr-6 pb-6 pl-6 gap-4">
                <CardHeader className="pt-0 pr-0 pb-0 pl-0 gap-1">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Nora Williams</CardTitle>
                    <span className="font-medium text-primary text-xs flex items-center gap-2">
                      <span className="rounded-full bg-primary size-2" />
                      Active
                    </span>
                  </div>
                  <CardDescription>Family caregiver</CardDescription>
                </CardHeader>
                <CardContent className="text-sm grid pt-0 pr-0 pb-0 pl-0 gap-3 grid-cols-2">
                  <div className="text-muted-foreground flex items-center gap-2">
                    <Mail className="size-4" />
                    nora.williams@email.com
                  </div>
                  <div className="text-muted-foreground flex items-center gap-2">
                    <Phone className="size-4" />
                    +1 (555) 214-9087
                  </div>
                  <div className="text-muted-foreground">
                    Assigned
                    <span className="text-foreground">Jan 18, 2025</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card className="rounded-2xl border-dashed pt-5 pr-5 pb-5 pl-5 gap-2">
              <CardHeader className="pt-0 pr-0 pb-0 pl-0 gap-1">
                <CardTitle className="text-base">
                  Care team not complete
                </CardTitle>
                <CardDescription>
                  Assign a doctor or caregiver to complete this view.
                </CardDescription>
              </CardHeader>
            </Card>
          </section>
          <aside>
            <Card className="rounded-2xl mb-6 pt-6 pr-6 pb-6 pl-6 gap-5">
              <CardHeader className="pt-0 pr-0 pb-0 pl-0 gap-1">
                <CardTitle className="text-lg">Assignment status</CardTitle>
                <CardDescription>Current care team connections</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 pr-0 pb-0 pl-0">
                <div className="text-sm flex mb-4 items-center gap-3">
                  <span className="rounded-full bg-primary size-2" />
                  Doctor assigned
                </div>
                <div className="text-sm flex mb-4 items-center gap-3">
                  <span className="rounded-full bg-primary size-2" />
                  Caregiver assigned
                </div>
                <div className="text-muted-foreground text-sm border-x-border border-t border-t-border border-b-border pt-4">
                  Last reviewed
                  <span className="text-foreground">Jun 12, 2025</span>
                </div>
              </CardContent>
              <CardFooter className="pt-0 pr-0 pb-0 pl-0 flex-col items-stretch gap-2">
                <Button variant="outline" className="justify-between">
                  View doctor profile
                  <ArrowUpRight className="size-4" />
                </Button>
                <Button variant="outline" className="justify-between">
                  View caregiver profile
                  <ArrowUpRight className="size-4" />
                </Button>
              </CardFooter>
            </Card>
            <Card className="rounded-2xl pt-6 pr-6 pb-6 pl-6 gap-4">
              <CardHeader className="pt-0 pr-0 pb-0 pl-0 gap-1">
                <CardTitle className="text-base">Latest readings</CardTitle>
                <CardDescription>Demo Device Data</CardDescription>
              </CardHeader>
              <CardContent className="text-sm pt-0 pr-0 pb-0 pl-0">
                <div className="flex mb-3 justify-between">
                  <span className="text-muted-foreground">Last synced</span>
                  <span>Today, 9:42 AM</span>
                </div>
                <p className="text-muted-foreground text-xs leading-5 border-x-border border-t border-t-border border-b-border pt-3">
                  Device readings are simulated for prototype use. No wearable
                  or medical-device integration is implemented.
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  </div>
</div>;
