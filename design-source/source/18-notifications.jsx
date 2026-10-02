<!-- screenType: "desktop-large" width: "1920" height: "1080" name: "Screen 18" colorTheme: "green" screenId: "e56fdd44-7d2b-459d-9eb5-d282118360aa" -->
<div className="font-sans bg-background text-foreground w-full h-fit">
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
          className="font-medium rounded-xl bg-accent text-primary text-sm flex relative mb-1 pt-2.5 pr-3 pb-2.5 pl-3 items-center gap-3"
        >
          <span className="rounded-r-full bg-primary absolute -left-4 w-1 h-5" />
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
        Notifications
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
      <section className="flex mb-6 justify-between items-start">
        <div>
          <h2 className="font-semibold text-2xl tracking-tight">
            Notifications
          </h2>
          <p className="text-muted-foreground text-sm mt-2">
            Review system messages and delivery status
          </p>
        </div>
        <button
          type="button"
          className="font-medium rounded-lg bg-card text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-2 pr-4 pb-2 pl-4"
        >
          Mark all as read
        </button>
      </section>
      <div className="rounded-xl bg-blue-50 text-blue-900 text-sm border-t border-t-blue-200 border-r border-r-blue-200 border-b border-b-blue-200 border-l border-l-blue-200 flex mb-6 pt-3 pr-4 pb-3 pl-4 items-center gap-3">
        <span className="font-semibold">DEMO DATA</span>
        <span className="text-blue-300">·</span>
        <span>Notification examples are simulated for prototype review.</span>
      </div>
      <section className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border flex mb-6 pt-4 pr-4 pb-4 pl-4 items-center gap-3">
        <div className="relative flex-1">
          <Search className="-translate-y-1/2 pointer-events-none text-muted-foreground absolute top-1/2 left-3 size-4" />
          <input
            placeholder="Search notifications"
            aria-label="Search notifications"
            className="rounded-lg bg-background text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border outline-none pr-3 pl-10 w-full h-10"
            defaultValue=""
          />
        </div>
        <select
          aria-label="Type filter"
          className="rounded-lg bg-background text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pr-3 pl-3 h-10"
          defaultValue="All types"
        >
          <option>All types</option>
          <option>Health alert</option>
          <option>Care update</option>
          <option>Assignment</option>
          <option>Content</option>
          <option>Reminder</option>
        </select>
        <select
          aria-label="Status filter"
          className="rounded-lg bg-background text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pr-3 pl-3 h-10"
          defaultValue="All statuses"
        >
          <option>All statuses</option>
          <option>Delivered</option>
          <option>Failed</option>
        </select>
        <select
          aria-label="Date filter"
          className="rounded-lg bg-background text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pr-3 pl-3 h-10"
          defaultValue="Last 30 days"
        >
          <option>Last 30 days</option>
          <option>Last 7 days</option>
          <option>Last 90 days</option>
        </select>
      </section>
      <section className="grid mb-6 gap-4 grid-cols-3">
        <div className="rounded-xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-5 pr-5 pb-5 pl-5">
          <p className="text-muted-foreground text-sm">Unread</p>
          <p className="font-semibold text-3xl mt-2">8</p>
        </div>
        <div className="rounded-xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-5 pr-5 pb-5 pl-5">
          <p className="text-muted-foreground text-sm">Total this month</p>
          <p className="font-semibold text-3xl mt-2">24</p>
        </div>
        <div className="rounded-xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-5 pr-5 pb-5 pl-5">
          <p className="text-muted-foreground text-sm">Delivered</p>
          <p className="font-semibold text-primary text-3xl mt-2">98%</p>
        </div>
      </section>
      <section className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border mb-6 overflow-hidden">
        <div className="font-semibold uppercase bg-muted/40 text-muted-foreground text-xs tracking-wide border-t-border border-r-border border-b border-b-border border-l-border grid pt-3 pr-5 pb-3 pl-5 grid-cols-[2.2fr_1.2fr_1fr_1.5fr_1fr_1fr_1fr]">
          <span>Notification</span>
          <span>Recipient</span>
          <span>Type</span>
          <span>Date</span>
          <span>Status</span>
          <span>Read/unread</span>
          <span>Actions</span>
        </div>
        <div className="text-sm border-t-border border-r-border border-b-0 border-b-border border-l-border grid pt-4 pr-5 pb-4 pl-5 items-center grid-cols-[2.2fr_1.2fr_1fr_1.5fr_1fr_1fr_1fr]">
          <div className="font-medium flex items-center gap-2">
            <span />
            High BP reading detected for John Smith.
          </div>
          <span className="text-muted-foreground">John Smith</span>
          <span className="text-muted-foreground">Health alert</span>
          <span className="text-muted-foreground">Jun 12, 2025, 9:42 AM</span>
          <span>Delivered</span>
          <span className="text-muted-foreground" />
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-md text-xs border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-1.5 pr-2.5 pb-1.5 pl-2.5"
            >
              View
            </button>
            <button
              type="button"
              aria-label="Mark as read"
              className="rounded-md text-muted-foreground pt-1.5 pr-1.5 pb-1.5 pl-1.5"
            >
              <MailOpen className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Delete notification"
              className="rounded-md text-muted-foreground pt-1.5 pr-1.5 pb-1.5 pl-1.5"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        </div>
        <div className="text-sm border-t-border border-r-border border-b-0 border-b-border border-l-border grid pt-4 pr-5 pb-4 pl-5 items-center grid-cols-[2.2fr_1.2fr_1fr_1.5fr_1fr_1fr_1fr]">
          <div className="font-medium flex items-center gap-2">
            <span />
            New treatment plan available
          </div>
          <span className="text-muted-foreground">Olivia Bennett</span>
          <span className="text-muted-foreground">Care update</span>
          <span className="text-muted-foreground">Jun 12, 2025, 9:15 AM</span>
          <span>Delivered</span>
          <span className="text-muted-foreground" />
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-md text-xs border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-1.5 pr-2.5 pb-1.5 pl-2.5"
            >
              View
            </button>
            <button
              type="button"
              aria-label="Mark as read"
              className="rounded-md text-muted-foreground pt-1.5 pr-1.5 pb-1.5 pl-1.5"
            >
              <MailOpen className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Delete notification"
              className="rounded-md text-muted-foreground pt-1.5 pr-1.5 pb-1.5 pl-1.5"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        </div>
        <div className="text-sm border-t-border border-r-border border-b-0 border-b-border border-l-border grid pt-4 pr-5 pb-4 pl-5 items-center grid-cols-[2.2fr_1.2fr_1fr_1.5fr_1fr_1fr_1fr]">
          <div className="font-medium flex items-center gap-2">
            <span />
            Caregiver assignment confirmed
          </div>
          <span className="text-muted-foreground">Nora Williams</span>
          <span className="text-muted-foreground">Assignment</span>
          <span className="text-muted-foreground">Jun 11, 2025, 4:20 PM</span>
          <span>Delivered</span>
          <span className="text-muted-foreground" />
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-md text-xs border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-1.5 pr-2.5 pb-1.5 pl-2.5"
            >
              View
            </button>
            <button
              type="button"
              aria-label="Mark as read"
              className="rounded-md text-muted-foreground pt-1.5 pr-1.5 pb-1.5 pl-1.5"
            >
              <MailOpen className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Delete notification"
              className="rounded-md text-muted-foreground pt-1.5 pr-1.5 pb-1.5 pl-1.5"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        </div>
        <div className="text-sm border-t-border border-r-border border-b-0 border-b-border border-l-border grid pt-4 pr-5 pb-4 pl-5 items-center grid-cols-[2.2fr_1.2fr_1fr_1.5fr_1fr_1fr_1fr]">
          <div className="font-medium flex items-center gap-2">
            <span />
            Resource published: Understanding blood pressure trends
          </div>
          <span className="text-muted-foreground">All care teams</span>
          <span className="text-muted-foreground">Content</span>
          <span className="text-muted-foreground">Jun 10, 2025, 11:30 AM</span>
          <span>Delivered</span>
          <span className="text-muted-foreground" />
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-md text-xs border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-1.5 pr-2.5 pb-1.5 pl-2.5"
            >
              View
            </button>
            <button
              type="button"
              aria-label="Mark as read"
              className="rounded-md text-muted-foreground pt-1.5 pr-1.5 pb-1.5 pl-1.5"
            >
              <MailOpen className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Delete notification"
              className="rounded-md text-muted-foreground pt-1.5 pr-1.5 pb-1.5 pl-1.5"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        </div>
        <div className="text-sm border-t-border border-r-border border-b-0 border-b-border border-l-border grid pt-4 pr-5 pb-4 pl-5 items-center grid-cols-[2.2fr_1.2fr_1fr_1.5fr_1fr_1fr_1fr]">
          <div className="font-medium flex items-center gap-2">
            <span />
            Missed reading reminder for Ethan Cole
          </div>
          <span className="text-muted-foreground">Ethan Cole</span>
          <span className="text-muted-foreground">Reminder</span>
          <span className="text-muted-foreground">Jun 10, 2025, 8:00 AM</span>
          <span>Failed</span>
          <span className="text-muted-foreground" />
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-md text-xs border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-1.5 pr-2.5 pb-1.5 pl-2.5"
            >
              View
            </button>
            <button
              type="button"
              aria-label="Mark as read"
              className="rounded-md text-muted-foreground pt-1.5 pr-1.5 pb-1.5 pl-1.5"
            >
              <MailOpen className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Delete notification"
              className="rounded-md text-muted-foreground pt-1.5 pr-1.5 pb-1.5 pl-1.5"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        </div>
      </section>
      <div className="text-center rounded-xl bg-card border-t border-t-dashed border-t-border border-r border-r-dashed border-r-border border-b border-b-dashed border-b-border border-l border-l-dashed border-l-border mb-6 pt-8 pr-6 pb-8 pl-6">
        <BellOff className="text-muted-foreground mr-auto ml-auto size-5" />
        <p className="font-medium text-sm mt-3">
          No notifications in this date range
        </p>
      </div>
      <div className="rounded-xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border pt-5 pr-5 pb-5 pl-5">
        <div className="animate-pulse rounded-full bg-muted mb-3 w-1/3 h-3" />
        <div className="animate-pulse rounded-full bg-muted mb-3 w-2/3 h-3" />
        <div className="animate-pulse rounded-full bg-muted w-1/2 h-3" />
      </div>
    </main>
    <div className="shadow-[0px_10px_15px_-3px_rgba(0,_0,_0,_0.1),_0px_4px_6px_-4px_rgba(0,_0,_0,_0.1)] rounded-xl bg-card text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border flex fixed right-8 bottom-8 pt-4 pr-5 pb-4 pl-5 items-center gap-3">
      <span className="rounded-full bg-primary/10 text-primary flex justify-center items-center size-7">
        <Check className="size-4" />
      </span>
      <span>Notification marked as read</span>
      <button
        type="button"
        aria-label="Dismiss toast"
        className="text-muted-foreground ml-2"
      >
        <X className="size-4" />
      </button>
    </div>
  </div>
</div>;
