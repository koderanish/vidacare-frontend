<!-- screenType: "desktop-large" width: "1920" height: "1080" name: "Screen 5" colorTheme: "green" screenId: "45f053c1-445f-4cf3-aed4-29fce7683f2b" -->
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
            className="font-medium rounded-xl bg-accent text-primary text-sm flex relative mb-1 pt-2.5 pr-3 pb-2.5 pl-3 items-center gap-3"
          >
            <span className="rounded-r-full bg-primary absolute -left-4 w-1 h-5" />
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
          Create caregiver
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
      <main className="flex relative pt-8 pr-12 pb-8 pl-12 justify-center">
        <div className="w-full max-w-[920px]">
          <div className="mb-6">
            <p className="text-muted-foreground text-sm mb-3">
              Caregivers / Create caregiver
            </p>
            <div>
              <h2 className="font-semibold text-foreground text-2xl tracking-tight">
                Provision a caregiver account
              </h2>
              <p className="text-muted-foreground text-sm mt-2">
                Give a trusted caregiver secure access to the patients they
                support.
              </p>
            </div>
          </div>
          <div className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border mb-6 pt-6 pr-6 pb-6 pl-6">
            <div className="grid gap-6 grid-cols-2">
              <div>
                <label className="font-medium text-foreground text-sm mb-2">
                  Full Name<span className="text-primary">*</span>
                </label>
                <input
                  placeholder="e.g. Nora Williams"
                  className="ring-ring rounded-xl bg-background text-sm border-t border-t-input border-r border-r-input border-b border-b-input border-l border-l-input outline-none pr-3 pl-3 w-full h-11"
                  defaultValue=""
                />
              </div>
              <div>
                <label className="font-medium text-foreground text-sm mb-2">
                  Email<span className="text-primary">*</span>
                </label>
                <input
                  placeholder="caregiver@email.com"
                  className="ring-ring rounded-xl bg-background text-sm border-t border-t-input border-r border-r-input border-b border-b-input border-l border-l-input outline-none pr-3 pl-3 w-full h-11"
                  defaultValue=""
                />
              </div>
              <div>
                <label className="font-medium text-foreground text-sm mb-2">
                  Phone<span className="text-primary">*</span>
                </label>
                <input
                  placeholder="+1 (555) 000-0000"
                  className="ring-ring rounded-xl bg-background text-sm border-t border-t-input border-r border-r-input border-b border-b-input border-l border-l-input outline-none pr-3 pl-3 w-full h-11"
                  defaultValue=""
                />
              </div>
              <div>
                <label className="font-medium text-foreground text-sm mb-2">
                  Relationship / Type<span className="text-primary">*</span>
                </label>
                <select
                  className="ring-ring rounded-xl bg-background text-foreground text-sm border-t border-t-input border-r border-r-input border-b border-b-input border-l border-l-input outline-none pr-3 pl-3 w-full h-11"
                  defaultValue="Family member"
                >
                  <option>Family member</option>
                  <option>Professional caregiver</option>
                  <option>Legal guardian</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="font-medium text-foreground text-sm mb-2">
                  Assigned Patient<span className="text-primary">*</span>
                </label>
                <input
                  aria-label="Search assigned patient"
                  className="ring-ring rounded-xl bg-background text-sm border-t border-t-input border-r border-r-input border-b border-b-input border-l border-l-input outline-none pr-3 pl-3 w-full h-11"
                  defaultValue="Ethan Cole"
                />
              </div>
              <div>
                <label className="font-medium text-foreground text-sm mb-2">
                  Temporary Password<span className="text-primary">*</span>
                </label>
                <div className="flex mb-2 gap-2">
                  <input
                    className="ring-ring rounded-xl bg-background text-sm border-t border-t-input border-r border-r-input border-b border-b-input border-l border-l-input outline-none pr-3 pl-3 flex-1 h-11 min-w-0"
                    defaultValue=""
                  />
                  <button
                    type="button"
                    className="font-medium rounded-xl bg-secondary text-secondary-foreground text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pr-4 pl-4 h-11"
                  >
                    Generate password
                  </button>
                </div>
                <p className="text-muted-foreground text-xs">
                  The caregiver will be asked to change this on first sign in.
                </p>
              </div>
              <div>
                <label className="font-medium text-foreground text-sm mb-2">
                  Status<span className="text-primary">*</span>
                </label>
                <div className="rounded-xl bg-muted border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border flex pt-1 pr-1 pb-1 pl-1">
                  <button type="button">Active</button>
                  <button type="button">Pending</button>
                </div>
              </div>
              <div className="flex pb-2 self-end items-center gap-3">
                <input
                  type="checkbox"
                  className="accent-primary rounded-sm border-input size-4"
                  defaultChecked={true}
                />
                <label className="text-foreground text-sm">
                  Send account invitation by email
                </label>
              </div>
            </div>
            <div className="border-x-border border-t border-t-border border-b-border flex mt-8 pt-6 justify-between items-center">
              <p className="text-muted-foreground text-xs flex items-center gap-2">
                <Lock className="size-4" />
                No public caregiver signup. Accounts are provisioned by VidaCare
                administrators.
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  className="font-medium rounded-xl bg-background text-foreground text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-2.5 pr-5 pb-2.5 pl-5"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="font-medium rounded-xl bg-primary text-primary-foreground text-sm pt-2.5 pr-5 pb-2.5 pl-5"
                >
                  Create caregiver
                </button>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-muted/40 border-t border-t-dashed border-t-border border-r border-r-dashed border-r-border border-b border-b-dashed border-b-border border-l border-l-dashed border-l-border pt-4 pr-4 pb-4 pl-4">
            <p className="font-medium text-foreground text-sm">
              No patient selected
            </p>
            <p className="text-muted-foreground text-xs mt-1">
              A caregiver must be assigned before access is enabled
            </p>
            <button
              type="button"
              disabled={true}
              className="font-medium rounded-xl bg-muted text-muted-foreground text-sm mt-3 pt-2 pr-4 pb-2 pl-4"
            >
              Create caregiver
            </button>
          </div>
        </div>
        <div className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-xl bg-destructive/10 text-destructive text-sm border-t border-t-destructive/20 border-r border-r-destructive/20 border-b border-b-destructive/20 border-l border-l-destructive/20 flex fixed right-8 bottom-8 pt-3 pr-4 pb-3 pl-4 items-center gap-3">
          <TriangleAlert className="size-4" />
          Unable to create caregiver. Try again.
        </div>
      </main>
    </div>
  </div>
</div>;
