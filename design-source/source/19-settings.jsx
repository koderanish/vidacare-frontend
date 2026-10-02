<!-- screenType: "desktop-large" width: "1920" height: "1080" name: "Screen 19" colorTheme: "green" screenId: "adc028f7-6602-4882-a5a1-e7abff5aedbd" -->
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
            className="font-medium rounded-xl bg-accent text-primary text-sm flex relative pt-2.5 pr-3 pb-2.5 pl-3 items-center gap-3"
          >
            <span className="rounded-r-full bg-primary absolute -left-4 w-1 h-5" />
            <Settings className="size-5" />
            <span>Settings</span>
          </a>
        </div>
      </nav>
    </aside>
    <div className="ml-[248px] min-h-screen">
      <header className="bg-background border-t-border border-r-border border-b border-b-border border-l-border flex pr-8 pl-8 justify-between items-center h-[72px]">
        <h1 className="font-semibold text-foreground text-xl tracking-tight">
          Settings
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
      <main className="flex mr-auto ml-auto pt-10 pr-8 pb-10 pl-8 flex-col gap-8 max-w-[1040px]">
        <div>
          <h2 className="font-semibold text-3xl tracking-tight">Settings</h2>
          <p className="text-muted-foreground text-sm mt-2">
            Manage your VidaCare demo workspace preferences.
          </p>
        </div>
        <div className="flex items-start gap-8">
          <nav className="shrink-0 w-48" aria-label="Settings sections">
            <a
              href="#profile"
              className="font-medium rounded-xl bg-accent text-primary text-sm block mb-1 pt-3 pr-4 pb-3 pl-4"
            >
              Profile
            </a>
            <a
              href="#account"
              className="rounded-xl text-muted-foreground text-sm block mb-1 pt-3 pr-4 pb-3 pl-4"
            >
              Account
            </a>
            <a
              href="#notifications"
              className="rounded-xl text-muted-foreground text-sm block mb-1 pt-3 pr-4 pb-3 pl-4"
            >
              Notifications
            </a>
            <a
              href="#thresholds"
              className="rounded-xl text-muted-foreground text-sm block mb-1 pt-3 pr-4 pb-3 pl-4"
            >
              Alert thresholds
            </a>
            <a
              href="#platform"
              className="rounded-xl text-muted-foreground text-sm block pt-3 pr-4 pb-3 pl-4"
            >
              Platform
            </a>
          </nav>
          <div className="flex flex-col flex-1 gap-6 min-w-0">
            <Card
              id="profile"
              className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-6 pr-6 pb-6 pl-6"
            >
              <CardHeader className="pt-0 pr-0 pb-0 pl-0 gap-1">
                <CardTitle className="text-lg">Admin profile</CardTitle>
              </CardHeader>
              <CardContent className="flex pt-4 pr-0 pb-0 pl-0 justify-between items-center gap-4">
                <div>
                  <p className="font-semibold">Maya Chen</p>
                  <p className="text-muted-foreground text-sm mt-1">
                    maya.chen@vidacare.com
                  </p>
                  <p className="text-muted-foreground text-sm mt-1">
                    System Administrator
                  </p>
                </div>
                <Button variant="outline">Edit profile</Button>
              </CardContent>
            </Card>
            <Card
              id="account"
              className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-6 pr-6 pb-6 pl-6"
            >
              <CardHeader className="pt-0 pr-0 pb-0 pl-0 gap-1">
                <CardTitle className="text-lg">Account settings</CardTitle>
              </CardHeader>
              <CardContent className="grid pt-4 pr-0 pb-0 pl-0 items-end gap-6 grid-cols-2">
                <label className="font-medium text-sm flex flex-col gap-2">
                  Session timeout
                  <select
                    className="font-normal rounded-xl bg-background border-t border-t-input border-r border-r-input border-b border-b-input border-l border-l-input outline-none pr-3 pl-3 h-10"
                    defaultValue="30 minutes"
                  >
                    <option>15 minutes</option>
                    <option>30 minutes</option>
                    <option>60 minutes</option>
                  </select>
                </label>
                <label className="font-medium text-sm flex flex-col gap-2">
                  Language
                  <select
                    className="font-normal rounded-xl bg-background border-t border-t-input border-r border-r-input border-b border-b-input border-l border-l-input outline-none pr-3 pl-3 h-10"
                    defaultValue="English"
                  >
                    <option>English</option>
                    <option>Spanish</option>
                  </select>
                </label>
                <Button variant="outline" className="w-fit">
                  Change password
                </Button>
              </CardContent>
            </Card>
            <Card
              id="notifications"
              className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-6 pr-6 pb-6 pl-6"
            >
              <CardHeader className="pt-0 pr-0 pb-0 pl-0 gap-1">
                <CardTitle className="text-lg">
                  Notification preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="flex pt-4 pr-0 pb-0 pl-0 flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Email notifications</span>
                  <Switch defaultChecked={true} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">In-app notifications</span>
                  <Switch defaultChecked={true} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Daily summary</span>
                  <Switch defaultChecked={false} />
                </div>
              </CardContent>
            </Card>
            <Card
              id="thresholds"
              className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-6 pr-6 pb-6 pl-6"
            >
              <CardHeader className="pt-0 pr-0 pb-0 pl-0 gap-1">
                <CardTitle className="text-lg">
                  Alert threshold configuration
                </CardTitle>
                <p className="text-muted-foreground text-sm">
                  Demo thresholds only, not clinical guidance.
                </p>
              </CardHeader>
              <CardContent className="flex pt-4 pr-0 pb-0 pl-0 flex-col gap-4">
                <label className="text-sm flex justify-between items-center gap-4">
                  <span>High blood pressure above</span>
                  <span className="flex items-center gap-2">
                    <input
                      className="rounded-xl bg-background border-t border-t-input border-r border-r-input border-b border-b-input border-l border-l-input outline-none pr-3 pl-3 w-28 h-10"
                      defaultValue="140/90"
                    />
                    <span className="text-muted-foreground w-20">mmHg</span>
                  </span>
                </label>
                <label className="text-sm flex justify-between items-center gap-4">
                  <span>Low SpO2 below</span>
                  <span className="flex items-center gap-2">
                    <input
                      className="rounded-xl bg-background border-t border-t-input border-r border-r-input border-b border-b-input border-l border-l-input outline-none pr-3 pl-3 w-28 h-10"
                      defaultValue="94"
                    />
                    <span className="text-muted-foreground w-20">%</span>
                  </span>
                </label>
                <label className="text-sm flex justify-between items-center gap-4">
                  <span>Elevated blood sugar above</span>
                  <span className="flex items-center gap-2">
                    <input
                      className="rounded-xl bg-background border-t border-t-input border-r border-r-input border-b border-b-input border-l border-l-input outline-none pr-3 pl-3 w-28 h-10"
                      defaultValue="160"
                    />
                    <span className="text-muted-foreground w-20">mg/dL</span>
                  </span>
                </label>
                <Button className="bg-primary text-primary-foreground mt-2 w-fit">
                  Save thresholds
                </Button>
              </CardContent>
            </Card>
            <Card
              id="platform"
              className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-6 pr-6 pb-6 pl-6"
            >
              <CardHeader className="pt-0 pr-0 pb-0 pl-0 gap-1">
                <CardTitle className="text-lg">Platform settings</CardTitle>
              </CardHeader>
              <CardContent className="flex pt-4 pr-0 pb-0 pl-0 flex-col gap-4">
                <label className="font-medium text-sm flex flex-col gap-2">
                  Workspace name
                  <input
                    className="font-normal rounded-xl bg-background border-t border-t-input border-r border-r-input border-b border-b-input border-l border-l-input outline-none pr-3 pl-3 h-10"
                    defaultValue="VidaCare Demo Workspace"
                  />
                </label>
                <div className="text-sm flex justify-between items-center">
                  <span>Demo data mode</span>
                  <span className="font-medium rounded-full bg-accent text-primary text-xs pt-1 pr-3 pb-1 pl-3">
                    Enabled
                  </span>
                </div>
                <div className="text-sm flex justify-between items-center">
                  <span>Device integrations</span>
                  <span className="text-muted-foreground">Not implemented</span>
                </div>
                <p className="text-muted-foreground text-sm border-x-border border-t border-t-border border-b-border pt-4">
                  Device integrations are not available in this prototype
                  workspace.
                </p>
              </CardContent>
            </Card>
            <div className="rounded-xl bg-blue-50 text-blue-900 text-sm border-t border-t-blue-200 border-r border-r-blue-200 border-b border-b-blue-200 border-l border-l-blue-200 pt-3 pr-4 pb-3 pl-4">
              All settings are prototype configuration and do not change
              clinical decision-making.
            </div>
            <div className="border-x-border border-t border-t-border border-b-border flex pt-6 justify-end items-center gap-3">
              <Button variant="ghost">Cancel</Button>
              <Button className="bg-primary text-primary-foreground">
                Save changes
              </Button>
            </div>
          </div>
        </div>
      </main>
      <div className="shadow-[0px_10px_15px_-3px_rgba(0,_0,_0,_0.1),_0px_4px_6px_-4px_rgba(0,_0,_0,_0.1)] rounded-xl bg-card text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border flex fixed right-8 bottom-8 pt-3 pr-4 pb-3 pl-4 items-center gap-3">
        <div className="rounded-full bg-primary/15 text-primary flex justify-center items-center size-6">
          <Check className="size-4" />
        </div>
        <span>Settings saved</span>
      </div>
    </div>
  </div>
</div>;
