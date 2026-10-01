<!-- screenType: "desktop-large" width: "1920" height: "1080" name: "Screen 6" colorTheme: "green" screenId: "2b9d4c8c-4aed-4d29-9e35-f763405026ac" -->
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
          User management
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
      <main className="bg-muted/30 relative pt-8 pr-8 pb-8 pl-8 min-h-[calc(100vh_-_72px)]">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-2xl tracking-tight">Users</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Manage patient and care team access.
            </p>
          </div>
          <Button className="rounded-xl bg-primary text-primary-foreground">
            Add user
          </Button>
        </div>
        <Card className="rounded-2xl bg-card border-border mt-8 pt-0 pr-0 pb-0 pl-0 gap-0 overflow-hidden">
          <CardContent className="pt-0 pr-0 pb-0 pl-0 gap-0">
            <table className="text-left w-full">
              <thead className="bg-muted/40 border-t-border border-r-border border-b border-b-border border-l-border">
                <tr>
                  <th className="font-semibold uppercase text-muted-foreground text-xs tracking-wider pt-4 pr-6 pb-4 pl-6">
                    User
                  </th>
                  <th className="font-semibold uppercase text-muted-foreground text-xs tracking-wider pt-4 pr-6 pb-4 pl-6">
                    Role
                  </th>
                  <th className="font-semibold uppercase text-muted-foreground text-xs tracking-wider pt-4 pr-6 pb-4 pl-6">
                    Assigned doctor
                  </th>
                  <th className="font-semibold uppercase text-muted-foreground text-xs tracking-wider pt-4 pr-6 pb-4 pl-6">
                    Status
                  </th>
                  <th className="font-semibold uppercase text-muted-foreground text-xs tracking-wider pt-4 pr-6 pb-4 pl-6">
                    Last login
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-accent/70">
                  <td className="pt-5 pr-6 pb-5 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="font-semibold rounded-full bg-primary/15 text-primary text-sm flex justify-center items-center size-10">
                        OB
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Olivia Bennett</p>
                        <p className="text-muted-foreground text-xs mt-1">
                          olivia.bennett@email.com
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="text-sm pt-5 pr-6 pb-5 pl-6">Patient</td>
                  <td className="text-sm pt-5 pr-6 pb-5 pl-6">
                    Dr. Lucas Martin
                  </td>
                  <td className="pt-5 pr-6 pb-5 pl-6">
                    <Badge className="rounded-full bg-primary/10 text-primary">
                      Active
                    </Badge>
                  </td>
                  <td className="text-muted-foreground text-sm pt-5 pr-6 pb-5 pl-6">
                    Today, 9:42 AM
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
        <div className="bg-foreground/20 absolute top-0 right-0 bottom-0 left-0" />
      </main>
    </div>
    <div className="flex fixed z-30 top-0 right-0 bottom-0 left-0 pr-[480px] justify-center items-center">
      <Card className="shadow-[0px_25px_50px_-12px_rgba(0,_0,_0,_0.25)] rounded-2xl bg-card border-border pt-6 pr-6 pb-6 pl-6 gap-6 w-[430px]">
        <CardHeader className="pt-0 pr-0 pb-0 pl-0 gap-2">
          <CardTitle className="text-lg">Disable Olivia Bennett?</CardTitle>
          <CardDescription>
            This will prevent the user from signing in until re-enabled.
          </CardDescription>
        </CardHeader>
        <CardFooter className="pt-0 pr-0 pb-0 pl-0 justify-end gap-2">
          <Button variant="outline" className="rounded-xl">
            Cancel
          </Button>
          <Button variant="destructive" className="rounded-xl">
            Disable account
          </Button>
        </CardFooter>
      </Card>
    </div>
    <aside className="shadow-[-12px_0px_30px_rgba(9,_9,_21,_0.12)] bg-card border-y-border border-r-border border-l border-l-border flex fixed z-40 top-0 right-0 bottom-0 flex-col w-[480px]">
      <div className="border-t-border border-r-border border-b border-b-border border-l-border flex pt-6 pr-8 pb-6 pl-8 justify-between items-center">
        <h2 className="font-semibold text-xl tracking-tight">User details</h2>
        <button
          type="button"
          aria-label="Close user details"
          className="rounded-xl text-muted-foreground pt-2 pr-2 pb-2 pl-2"
        >
          <X className="size-5" />
        </button>
      </div>
      <div className="pt-6 pr-8 pb-6 pl-8 flex-1 overflow-y-auto">
        <div className="flex items-center gap-4">
          <div className="font-semibold rounded-full bg-primary/15 text-primary text-xl flex justify-center items-center size-16">
            OB
          </div>
          <div>
            <h3 className="font-semibold text-lg">Olivia Bennett</h3>
            <p className="text-muted-foreground text-sm mt-1">
              olivia.bennett@email.com
            </p>
            <div className="flex mt-3 gap-2">
              <Badge className="rounded-full bg-muted text-muted-foreground">
                Patient
              </Badge>
              <Badge className="rounded-full bg-primary/10 text-primary">
                Active
              </Badge>
            </div>
          </div>
        </div>
        <div className="border-x-border border-t border-t-border border-b-border mt-6 mb-6" />
        <div>
          <div className="mb-4">
            <p className="font-medium text-muted-foreground text-xs">Phone</p>
            <p className="text-sm mt-1">+1 (555) 214-9087</p>
          </div>
          <div className="mb-4">
            <p className="font-medium text-muted-foreground text-xs">
              Assigned doctor
            </p>
            <p className="text-sm mt-1">Dr. Lucas Martin</p>
          </div>
          <div className="mb-4">
            <p className="font-medium text-muted-foreground text-xs">
              Assigned caregiver
            </p>
            <p className="text-sm mt-1">Nora Williams</p>
          </div>
          <div className="mb-4">
            <p className="font-medium text-muted-foreground text-xs">
              Last login
            </p>
            <p className="text-sm mt-1">Today, 9:42 AM</p>
          </div>
          <div>
            <p className="font-medium text-muted-foreground text-xs">
              Created date
            </p>
            <p className="text-sm mt-1">Jan 18, 2025</p>
          </div>
        </div>
        <div className="border-x-border border-t border-t-border border-b-border mt-6 mb-6" />
        <section>
          <h3 className="font-semibold text-sm">Assigned patients</h3>
          <Card className="rounded-xl border-border mt-3 pt-4 pr-4 pb-4 pl-4 gap-1">
            <p className="font-semibold text-sm">Olivia Bennett</p>
            <p className="text-muted-foreground text-xs">Primary profile</p>
          </Card>
        </section>
        <section className="mt-8">
          <h3 className="font-semibold text-sm">Recent activity</h3>
          <div className="mt-4">
            <div className="flex mb-5 gap-3">
              <div className="rounded-full bg-primary mt-1 size-2" />
              <div>
                <p className="text-sm">Medication plan updated</p>
                <p className="text-muted-foreground text-xs mt-1">
                  Today, 9:40 AM
                </p>
              </div>
            </div>
            <div className="flex mb-5 gap-3">
              <div className="rounded-full bg-primary mt-1 size-2" />
              <div>
                <p className="text-sm">Caregiver assignment confirmed</p>
                <p className="text-muted-foreground text-xs mt-1">
                  Jun 10, 2025
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="rounded-full bg-primary mt-1 size-2" />
              <div>
                <p className="text-sm">Profile created</p>
                <p className="text-muted-foreground text-xs mt-1">
                  Jan 18, 2025
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="border-x-border border-t border-t-border border-b-border pt-6 pr-8 pb-6 pl-8">
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl flex-1">
            Edit user
          </Button>
          <Button
            variant="outline"
            className="rounded-xl text-destructive border-destructive flex-1"
          >
            Disable account
          </Button>
        </div>
      </div>
    </aside>
    <div className="font-medium shadow-[0px_10px_15px_-3px_rgba(0,_0,_0,_0.1),_0px_4px_6px_-4px_rgba(0,_0,_0,_0.1)] rounded-xl bg-card text-foreground text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border flex fixed z-50 right-6 bottom-6 pt-3 pr-4 pb-3 pl-4 items-center gap-3">
      <CheckCircle2 className="text-primary size-4" />
      Changes saved successfully
    </div>
  </div>
</div>;
