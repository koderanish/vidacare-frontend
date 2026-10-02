<!-- screenType: "desktop-large" width: "1920" height: "1080" name: "Screen 11" colorTheme: "green" screenId: "1b9aa766-6021-4e1d-bcb4-b3083dd492e4" -->
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
          Doctor assignment
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
      <main className="flex pt-8 pr-8 pb-8 pl-8 flex-col gap-6">
        <section className="rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border flex pt-6 pr-6 pb-6 pl-6 justify-between items-center">
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
              <div className="text-muted-foreground text-sm flex mt-2 items-center gap-5">
                <span>68</span>
                <span>Female</span>
                <span>ID VC-10482</span>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-muted/40 border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border flex pt-1 pr-1 pb-1 pl-1 items-center gap-2">
            <button type="button">Overview</button>
            <button type="button">Vitals</button>
            <button type="button">Journal</button>
            <button type="button">Treatment</button>
            <button type="button">Care Team</button>
          </div>
        </section>
        <section className="flex justify-between items-end">
          <div>
            <h2 className="font-semibold text-2xl tracking-tight">
              Doctor assignment
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
              Manage care-team relationships for administrative coordination.
            </p>
          </div>
        </section>
        <section className="grid gap-6 grid-cols-[1fr_1.2fr]">
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-6 pr-6 pb-6 pl-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-muted-foreground text-sm">
                    Current assignment
                  </p>
                  <h3 className="font-semibold text-xl mt-2">
                    Dr. Lucas Martin
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Cardiology
                  </p>
                </div>
                <span className="font-medium rounded-full bg-primary/10 text-primary text-xs pt-1 pr-3 pb-1 pl-3">
                  Active
                </span>
              </div>
              <div className="border-x-border border-t border-t-border border-b-border grid mt-6 pt-5 gap-5 grid-cols-2">
                <div>
                  <p className="text-muted-foreground text-xs">Email</p>
                  <p className="text-sm mt-1">lucas.martin@vidacare.com</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Phone</p>
                  <p className="text-sm mt-1">+1 (555) 214-7012</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">
                    Assignment date
                  </p>
                  <p className="text-sm mt-1">Jan 18, 2025</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Status</p>
                  <p className="text-sm mt-1">Active</p>
                </div>
              </div>
              <button
                type="button"
                className="font-medium rounded-xl text-primary text-sm border-t border-t-primary border-r border-r-primary border-b border-b-primary border-l border-l-primary inline-flex mt-6 pt-2.5 pr-4 pb-2.5 pl-4 items-center gap-2"
              >
                <RefreshCw className="size-4" />
                Change doctor
              </button>
            </div>
            <div className="opacity-60 rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-6 pr-6 pb-6 pl-6">
              <h3 className="font-semibold text-lg">Assignment details</h3>
              <p className="text-muted-foreground text-sm mt-3">
                Select a doctor to review assignment details.
              </p>
            </div>
          </div>
          <div className="rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-6 pr-6 pb-6 pl-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">Assign a doctor</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Search available doctors by name or specialization.
                </p>
              </div>
              <UserRoundSearch className="text-muted-foreground size-5" />
            </div>
            <div className="relative mt-5">
              <Search className="-translate-y-1/2 text-muted-foreground absolute top-1/2 left-3 size-4" />
              <input
                placeholder="Search by name or specialization"
                className="rounded-xl bg-background text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border outline-none pr-4 pl-10 w-full h-11"
                defaultValue=""
              />
            </div>
            <div className="rounded-xl border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border mt-4">
              <button
                type="button"
                className="text-left border-t-border border-r-border border-b border-b-border border-l-border flex pt-4 pr-4 pb-4 pl-4 justify-between items-center w-full"
              >
                <div>
                  <p className="font-medium text-sm">Dr. Lucas Martin</p>
                  <p className="text-muted-foreground text-xs mt-1">
                    Cardiology
                  </p>
                </div>
                <span className="rounded-full bg-muted text-muted-foreground text-xs pt-1 pr-3 pb-1 pl-3">
                  Current doctor
                </span>
              </button>
              <button
                type="button"
                className="text-left border-t-border border-r-border border-b border-b-border border-l-border flex pt-4 pr-4 pb-4 pl-4 justify-between items-center w-full"
              >
                <div>
                  <p className="font-medium text-sm">Dr. Priya Shah</p>
                  <p className="text-muted-foreground text-xs mt-1">
                    Internal Medicine
                  </p>
                </div>
                <span className="rounded-full bg-primary/10 text-primary text-xs pt-1 pr-3 pb-1 pl-3">
                  Available
                </span>
              </button>
              <button
                type="button"
                className="text-left flex pt-4 pr-4 pb-4 pl-4 justify-between items-center w-full"
              >
                <div>
                  <p className="font-medium text-sm">Dr. Elena Rossi</p>
                  <p className="text-muted-foreground text-xs mt-1">
                    Endocrinology
                  </p>
                </div>
                <span className="rounded-full bg-primary/10 text-primary text-xs pt-1 pr-3 pb-1 pl-3">
                  Available
                </span>
              </button>
            </div>
          </div>
        </section>
      </main>
      <div className="shadow-[0px_20px_25px_-5px_rgba(0,_0,_0,_0.1),_0px_8px_10px_-6px_rgba(0,_0,_0,_0.1)] rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border fixed z-30 right-8 bottom-8 pt-6 pr-6 pb-6 pl-6 w-[430px]">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">Change assigned doctor?</h3>
            <p className="text-muted-foreground text-sm leading-6 mt-3">
              Olivia Bennett will be reassigned from Dr. Lucas Martin to Dr.
              Priya Shah.
            </p>
          </div>
          <button
            type="button"
            aria-label="Close dialog"
            className="rounded-lg text-muted-foreground pt-1 pr-1 pb-1 pl-1"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="flex mt-6 justify-end gap-3">
          <button
            type="button"
            className="font-medium rounded-xl text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-2.5 pr-4 pb-2.5 pl-4"
          >
            Cancel
          </button>
          <button
            type="button"
            className="font-medium rounded-xl bg-primary text-primary-foreground text-sm pt-2.5 pr-4 pb-2.5 pl-4"
          >
            Confirm assignment
          </button>
        </div>
      </div>
      <div className="shadow-[0px_10px_15px_-3px_rgba(0,_0,_0,_0.1),_0px_4px_6px_-4px_rgba(0,_0,_0,_0.1)] rounded-xl bg-card text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border flex fixed z-20 right-8 bottom-8 pt-3 pr-4 pb-3 pl-4 items-center gap-3">
        <div className="rounded-full bg-primary/10 text-primary flex justify-center items-center size-6">
          <Check className="size-4" />
        </div>
        <span>Doctor assignment updated</span>
        <button
          type="button"
          aria-label="Dismiss notification"
          className="text-muted-foreground ml-2"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  </div>
</div>;
