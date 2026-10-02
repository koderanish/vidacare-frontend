<!-- screenType: "desktop-large" width: "1920" height: "1080" name: "Screen 4" colorTheme: "green" screenId: "7bf72323-c941-4513-a604-87c308bf1e33" -->
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
            className="font-medium rounded-xl bg-accent text-primary text-sm flex relative mb-1 pt-2.5 pr-3 pb-2.5 pl-3 items-center gap-3"
          >
            <span className="rounded-r-full bg-primary absolute -left-4 w-1 h-5" />
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
          Create doctor
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
      <main className="flex pt-12 pr-8 pb-12 pl-8 justify-center">
        <div className="w-full max-w-[920px]">
          <div className="text-muted-foreground text-sm flex mb-6 items-center gap-2">
            <span>Doctors</span>
            <ChevronRight className="size-4" />
            <span className="text-foreground">Create doctor</span>
          </div>
          <div className="mb-8">
            <h2 className="font-semibold text-foreground text-3xl tracking-tight">
              Provision a doctor account
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
              Create secure access for a verified care professional. Doctor
              accounts are provisioned by admins only.
            </p>
          </div>
          <Card className="pt-8 pr-8 pb-8 pl-8 gap-6">
            <CardContent className="grid pt-0 pr-0 pb-0 pl-0 gap-6 grid-cols-2">
              <div>
                <label className="font-medium text-sm mb-2">
                  Full Name<span className="text-primary">*</span>
                </label>
                <input
                  placeholder="e.g. Dr. Priya Shah"
                  className="ring-ring rounded-lg bg-background text-sm border-t border-t-input border-r border-r-input border-b border-b-input border-l border-l-input outline-none pr-3 pl-3 w-full h-11"
                  defaultValue=""
                />
              </div>
              <div>
                <label className="font-medium text-sm mb-2">
                  Email<span className="text-primary">*</span>
                </label>
                <input
                  type="email"
                  placeholder="doctor@hospital.org"
                  className="ring-ring rounded-lg bg-background text-sm border-t border-t-input border-r border-r-input border-b border-b-input border-l border-l-input outline-none pr-3 pl-3 w-full h-11"
                  defaultValue=""
                />
              </div>
              <div>
                <label className="font-medium text-sm mb-2">
                  Phone<span className="text-primary">*</span>
                </label>
                <input
                  placeholder="+1 (555) 000-0000"
                  className="ring-ring rounded-lg bg-background text-sm border-t border-t-input border-r border-r-input border-b border-b-input border-l border-l-input outline-none pr-3 pl-3 w-full h-11"
                  defaultValue=""
                />
              </div>
              <div>
                <label className="font-medium text-sm mb-2">
                  Specialization<span className="text-primary">*</span>
                </label>
                <Select defaultValue="">
                  <SelectTrigger className="rounded-lg h-11">
                    <SelectValue placeholder="Select specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cardiology">Cardiology</SelectItem>
                    <SelectItem value="Neurology">Neurology</SelectItem>
                    <SelectItem value="Family Medicine">
                      Family Medicine
                    </SelectItem>
                    <SelectItem value="Oncology">Oncology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="font-medium text-sm mb-2">
                  License Number<span className="text-primary">*</span>
                </label>
                <input
                  placeholder="e.g. MD-482910"
                  className="ring-ring rounded-lg bg-background text-sm border-t border-t-input border-r border-r-input border-b border-b-input border-l border-l-input outline-none mb-2 pr-3 pl-3 w-full h-11"
                  defaultValue=""
                />
                <p className="text-destructive/80 text-xs">
                  License number is required
                </p>
              </div>
              <div>
                <label className="font-medium text-sm mb-2">
                  Hospital / Organization<span className="text-primary">*</span>
                </label>
                <input
                  placeholder="Search organization"
                  className="ring-ring rounded-lg bg-background text-sm border-t border-t-input border-r border-r-input border-b border-b-input border-l border-l-input outline-none pr-3 pl-3 w-full h-11"
                  defaultValue=""
                />
              </div>
              <div>
                <label className="font-medium text-sm mb-2">
                  Temporary Password<span className="text-primary">*</span>
                </label>
                <div className="flex mb-2 gap-2">
                  <input
                    className="ring-ring rounded-lg bg-background text-sm border-t border-t-input border-r border-r-input border-b border-b-input border-l border-l-input outline-none pr-3 pl-3 flex-1 h-11 min-w-0"
                    defaultValue=""
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="shrink-0 h-11"
                  >
                    Generate password
                  </Button>
                </div>
                <p className="text-muted-foreground text-xs">
                  The doctor will be asked to change this on first sign in.
                </p>
              </div>
              <div>
                <label className="font-medium text-sm mb-2">
                  Status<span className="text-primary">*</span>
                </label>
                <div className="rounded-lg border-t border-t-input border-r border-r-input border-b border-b-input border-l border-l-input flex pt-1 pr-1 pb-1 pl-1 h-11">
                  <button type="button">Active</button>
                  <button type="button">Pending</button>
                </div>
              </div>
              <div className="flex pt-2 items-center gap-3 col-span-2">
                <Checkbox id="send-invitation" defaultChecked={true} />
                <label
                  htmlFor="send-invitation"
                  className="font-medium text-sm"
                >
                  Send account invitation by email
                </label>
              </div>
            </CardContent>
            <CardFooter className="border-x-border border-t border-t-border border-b-border flex pt-6 pr-0 pb-0 pl-0 justify-between items-center">
              <div className="text-muted-foreground text-xs flex items-center gap-2">
                <Lock className="size-4" />
                <span>
                  No public doctor signup. Only VidaCare administrators can
                  create accounts.
                </span>
              </div>
              <div className="flex gap-3">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="bg-primary text-primary-foreground"
                >
                  Create doctor
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      <div className="font-medium shadow-[0px_10px_15px_-3px_rgba(0,_0,_0,_0.1),_0px_4px_6px_-4px_rgba(0,_0,_0,_0.1)] rounded-xl bg-card text-foreground text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border flex fixed right-8 bottom-8 pt-3 pr-4 pb-3 pl-4 items-center gap-3">
        <div className="rounded-full bg-primary/15 text-primary flex justify-center items-center size-7">
          <Check className="size-4" />
        </div>
        <span>Doctor account created</span>
      </div>
    </div>
  </div>
</div>;
