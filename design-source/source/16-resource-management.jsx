<!-- screenType: "desktop-large" width: "1920" height: "1080" name: "Screen 16" colorTheme: "green" screenId: "445ed731-2a29-4f8d-99f7-93321b838a92" -->
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
            className="font-medium rounded-xl bg-accent text-primary text-sm flex relative mb-1 pt-2.5 pr-3 pb-2.5 pl-3 items-center gap-3"
          >
            <span className="rounded-r-full bg-primary absolute -left-4 w-1 h-5" />
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
          Resources
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
      <main className="flex pt-8 pr-8 pb-8 pl-8 flex-col gap-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="font-semibold text-2xl tracking-tight">Resources</h2>
            <p className="text-muted-foreground text-sm mt-2">
              Manage educational content for the VidaCare demo workspace
            </p>
          </div>
          <button
            type="button"
            className="font-medium shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-xl bg-primary text-primary-foreground text-sm flex pt-2.5 pr-4 pb-2.5 pl-4 items-center gap-2"
          >
            <Plus className="size-4" />
            Create resource
          </button>
        </div>
        <div className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl bg-card border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border flex pt-4 pr-4 pb-4 pl-4 items-center gap-4">
          <div className="relative flex-1">
            <Search className="-translate-y-1/2 pointer-events-none text-muted-foreground absolute top-1/2 left-3 size-4" />
            <input
              aria-label="Search resources"
              placeholder="Search resources"
              className="ring-ring rounded-xl bg-background text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border outline-none pr-4 pl-10 w-full h-10"
              defaultValue=""
            />
          </div>
          <Select defaultValue="Heart Health">
            <SelectTrigger className="rounded-xl w-52 h-10">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Heart Health">Heart Health</SelectItem>
              <SelectItem value="Diabetes">Diabetes</SelectItem>
              <SelectItem value="Mental Wellness">Mental Wellness</SelectItem>
              <SelectItem value="Nutrition">Nutrition</SelectItem>
              <SelectItem value="Exercise">Exercise</SelectItem>
              <SelectItem value="Medication">Medication</SelectItem>
              <SelectItem value="General Health">General Health</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="All statuses">
            <SelectTrigger className="rounded-xl w-44 h-10">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All statuses">All statuses</SelectItem>
              <SelectItem value="Published">Published</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Unpublished">Unpublished</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="rounded-xl bg-blue-50 text-blue-800 text-sm border-t border-t-blue-200 border-r border-r-blue-200 border-b border-b-blue-200 border-l border-l-blue-200 flex pt-3 pr-4 pb-3 pl-4 items-center gap-3">
          <span className="font-semibold tracking-wide">DEMO CONTENT</span>
          <span className="text-blue-300">·</span>
          <span>
            Resources are sample educational materials for prototype
            demonstration.
          </span>
        </div>
        <div className="grid gap-6 grid-cols-3">
          <Card className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl border-border flex pt-6 pr-6 pb-6 pl-6 flex-col justify-between min-h-[230px]">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <Badge className="rounded-full bg-green-50 text-green-700">
                  Heart Health
                </Badge>
                <button
                  type="button"
                  aria-label="More options"
                  className="rounded-lg text-muted-foreground pt-1 pr-1 pb-1 pl-1"
                >
                  <MoreHorizontal className="size-5" />
                </button>
              </div>
              <div>
                <h3 className="font-semibold text-base">
                  Understanding blood pressure trends
                </h3>
                <p className="text-muted-foreground text-sm leading-6 mt-2">
                  Learn how to read sample blood pressure trends and when to
                  review them with a care team.
                </p>
              </div>
            </div>
            <div className="border-x-border border-t border-t-border border-b-border flex pt-4 justify-between items-end">
              <div>
                <p className="font-medium text-sm">VidaCare Education</p>
                <p className="text-muted-foreground text-xs mt-1">
                  Jun 10, 2025
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="rounded-full bg-green-50 text-green-700">
                  Published
                </Badge>
                <Button variant="outline" size="sm" className="rounded-lg">
                  Edit
                </Button>
              </div>
            </div>
          </Card>
          <Card className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl border-border flex pt-6 pr-6 pb-6 pl-6 flex-col justify-between min-h-[230px]">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <Badge className="rounded-full bg-orange-50 text-orange-700">
                  Nutrition
                </Badge>
                <button
                  type="button"
                  aria-label="More options"
                  className="rounded-lg text-muted-foreground pt-1 pr-1 pb-1 pl-1"
                >
                  <MoreHorizontal className="size-5" />
                </button>
              </div>
              <div>
                <h3 className="font-semibold text-base">
                  Everyday nutrition basics
                </h3>
                <p className="text-muted-foreground text-sm leading-6 mt-2">
                  Practical meal-planning guidance for a balanced routine.
                </p>
              </div>
            </div>
            <div className="border-x-border border-t border-t-border border-b-border flex pt-4 justify-between items-end">
              <div>
                <p className="font-medium text-sm">Dr. Priya Shah</p>
                <p className="text-muted-foreground text-xs mt-1">
                  Jun 08, 2025
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="rounded-full bg-green-50 text-green-700">
                  Published
                </Badge>
                <Button variant="outline" size="sm" className="rounded-lg">
                  Edit
                </Button>
              </div>
            </div>
          </Card>
          <Card className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl border-border flex pt-6 pr-6 pb-6 pl-6 flex-col justify-between min-h-[230px]">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <Badge className="rounded-full bg-purple-50 text-purple-700">
                  Mental Wellness
                </Badge>
                <button
                  type="button"
                  aria-label="More options"
                  className="rounded-lg text-muted-foreground pt-1 pr-1 pb-1 pl-1"
                >
                  <MoreHorizontal className="size-5" />
                </button>
              </div>
              <div>
                <h3 className="font-semibold text-base">
                  Building a calmer evening routine
                </h3>
                <p className="text-muted-foreground text-sm leading-6 mt-2">
                  Simple habits that support reflection and rest.
                </p>
              </div>
            </div>
            <div className="border-x-border border-t border-t-border border-b-border flex pt-4 justify-between items-end">
              <div>
                <p className="font-medium text-sm">VidaCare Education</p>
                <p className="text-muted-foreground text-xs mt-1">
                  Jun 05, 2025
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="rounded-full bg-green-50 text-green-700">
                  Published
                </Badge>
                <Button variant="outline" size="sm" className="rounded-lg">
                  Edit
                </Button>
              </div>
            </div>
          </Card>
          <Card className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl border-border flex pt-6 pr-6 pb-6 pl-6 flex-col justify-between min-h-[230px]">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <Badge className="rounded-full bg-blue-50 text-blue-700">
                  Exercise
                </Badge>
                <button
                  type="button"
                  aria-label="More options"
                  className="rounded-lg text-muted-foreground pt-1 pr-1 pb-1 pl-1"
                >
                  <MoreHorizontal className="size-5" />
                </button>
              </div>
              <div>
                <h3 className="font-semibold text-base">
                  Movement for daily wellbeing
                </h3>
                <p className="text-muted-foreground text-sm leading-6 mt-2">
                  Gentle movement ideas for different comfort levels.
                </p>
              </div>
            </div>
            <div className="border-x-border border-t border-t-border border-b-border flex pt-4 justify-between items-end">
              <div>
                <p className="font-medium text-sm">Marcus Lee</p>
                <p className="text-muted-foreground text-xs mt-1">
                  May 29, 2025
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="rounded-full bg-amber-50 text-amber-700">
                  Draft
                </Badge>
                <Button variant="outline" size="sm" className="rounded-lg">
                  Edit
                </Button>
              </div>
            </div>
          </Card>
          <Card className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl border-border flex pt-6 pr-6 pb-6 pl-6 flex-col justify-between min-h-[230px]">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <Badge className="rounded-full bg-slate-100 text-slate-700">
                  Medication
                </Badge>
                <button
                  type="button"
                  aria-label="More options"
                  className="rounded-lg text-muted-foreground pt-1 pr-1 pb-1 pl-1"
                >
                  <MoreHorizontal className="size-5" />
                </button>
              </div>
              <div>
                <h3 className="font-semibold text-base">
                  Medication check-in guide
                </h3>
                <p className="text-muted-foreground text-sm leading-6 mt-2">
                  A reminder framework for recording questions before a review.
                </p>
              </div>
            </div>
            <div className="border-x-border border-t border-t-border border-b-border flex pt-4 justify-between items-end">
              <div>
                <p className="font-medium text-sm">VidaCare Education</p>
                <p className="text-muted-foreground text-xs mt-1">
                  May 22, 2025
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="rounded-full bg-red-50 text-red-700">
                  Unpublished
                </Badge>
                <Button variant="outline" size="sm" className="rounded-lg">
                  Edit
                </Button>
              </div>
            </div>
          </Card>
          <Card className="shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl border-border flex pt-6 pr-6 pb-6 pl-6 flex-col justify-between min-h-[230px]">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <Badge className="rounded-full bg-cyan-50 text-cyan-700">
                  Diabetes
                </Badge>
                <button
                  type="button"
                  aria-label="More options"
                  className="rounded-lg text-muted-foreground pt-1 pr-1 pb-1 pl-1"
                >
                  <MoreHorizontal className="size-5" />
                </button>
              </div>
              <div>
                <h3 className="font-semibold text-base">
                  Diabetes-friendly pantry guide
                </h3>
                <p className="text-muted-foreground text-sm leading-6 mt-2">
                  Sample educational content for healthy pantry planning.
                </p>
              </div>
            </div>
            <div className="border-x-border border-t border-t-border border-b-border flex pt-4 justify-between items-end">
              <div>
                <p className="font-medium text-sm">Dr. Elena Rossi</p>
                <p className="text-muted-foreground text-xs mt-1">
                  May 18, 2025
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="rounded-full bg-green-50 text-green-700">
                  Published
                </Badge>
                <Button variant="outline" size="sm" className="rounded-lg">
                  Edit
                </Button>
              </div>
            </div>
          </Card>
        </div>
        <div className="text-center text-muted-foreground text-sm pt-4 pb-4">
          No resources match these filters
        </div>
      </main>
      <div className="shadow-[0px_10px_15px_-3px_rgba(0,_0,_0,_0.1),_0px_4px_6px_-4px_rgba(0,_0,_0,_0.1)] rounded-xl bg-card text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border flex fixed right-8 bottom-8 pt-3 pr-4 pb-3 pl-4 items-center gap-3">
        <div className="rounded-full bg-green-100 text-primary flex justify-center items-center size-6">
          <Check className="size-4" />
        </div>
        <span>Resource published successfully</span>
      </div>
    </div>
  </div>
</div>;
