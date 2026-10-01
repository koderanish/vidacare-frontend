<!-- screenType: "desktop-large" width: "1920" height: "1080" name: "Screen 17" colorTheme: "green" screenId: "f3717983-ec96-4509-9357-857231b9f5ac" -->
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
          Create resource
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
      <main className="flex mr-auto ml-auto pt-8 pr-8 pb-8 pl-8 flex-col gap-6 max-w-[1160px]">
        <div className="text-muted-foreground text-sm flex items-center gap-2">
          <span>Resources</span>
          <ChevronRight className="size-4" />
          <span className="text-foreground">Create resource</span>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-3xl tracking-tight">
            Create resource
          </h2>
          <p className="text-muted-foreground text-sm">
            Publish educational content for the VidaCare demo workspace.
          </p>
        </div>
        <div className="rounded-lg bg-blue-50 text-blue-800 text-sm border-t border-t-blue-200 border-r border-r-blue-200 border-b border-b-blue-200 border-l border-l-blue-200 flex pt-3 pr-4 pb-3 pl-4 items-center gap-3">
          <Info className="size-4" />
          <span className="font-semibold tracking-wide">DEMO CONTENT</span>
          <span className="text-blue-700">
            This workspace contains educational demo material.
          </span>
        </div>
        <div className="grid items-start gap-6 grid-cols-[58%_1fr]">
          <Card className="rounded-2xl pt-6 pr-6 pb-6 pl-6 gap-6">
            <CardHeader className="pt-0 pr-0 pb-0 pl-0 gap-2">
              <CardTitle className="text-lg">Resource details</CardTitle>
              <CardDescription>
                Build and publish a helpful resource for care teams.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex pt-0 pr-0 pb-0 pl-0 flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  defaultValue="Understanding blood pressure trends"
                />
                <p className="text-destructive text-xs hidden">
                  Title is required
                </p>
              </div>
              <div className="grid gap-4 grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select defaultValue="Heart Health">
                    <SelectTrigger id="category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Heart Health">Heart Health</SelectItem>
                      <SelectItem value="Medication">Medication</SelectItem>
                      <SelectItem value="Wellness">Wellness</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="author">Author</Label>
                  <Input id="author" defaultValue="VidaCare Education" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  className="resize-none min-h-20"
                  defaultValue="Learn how to read sample blood pressure trends and when to review them with a care team."
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  className="resize-y leading-6 min-h-64"
                  defaultValue="Blood pressure readings are recorded as two numbers: systolic pressure and diastolic pressure. Systolic pressure is the top number and reflects pressure when the heart beats, while diastolic pressure is the bottom number and reflects pressure between beats.

Looking at readings over time can help reveal patterns that a single reading may not show. Compare measurements taken under similar conditions, note the date and time, and consider factors such as activity, stress, and rest when reviewing a trend.

If a pattern concerns you or readings change noticeably, share the information with your care team. They can help place the readings in context and decide what follow-up may be appropriate. This educational example is not a substitute for medical advice."
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Cover image</Label>
                <button
                  type="button"
                  className="rounded-xl bg-muted/30 text-sm border-t border-t-dashed border-t-border border-r border-r-dashed border-r-border border-b border-b-dashed border-b-border border-l border-l-dashed border-l-border flex flex-col justify-center items-center gap-2 min-h-28"
                >
                  <Upload className="text-muted-foreground size-5" />
                  <span className="font-medium">Add cover image</span>
                  <span className="text-muted-foreground text-xs">
                    JPG or PNG up to 5 MB
                  </span>
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Publish status</Label>
                <RadioGroup
                  className="grid gap-2 grid-cols-2"
                  defaultValue="Published"
                >
                  <label className="cursor-pointer rounded-lg text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border flex pt-3 pr-4 pb-3 pl-4 items-center gap-2">
                    <RadioGroupItem value="Published" />
                    Published
                  </label>
                  <label className="cursor-pointer rounded-lg text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border flex pt-3 pr-4 pb-3 pl-4 items-center gap-2">
                    <RadioGroupItem value="Draft" />
                    Draft
                  </label>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter className="border-x-border border-t border-t-border border-b-border flex pt-5 pr-0 pb-0 pl-0 justify-between items-center">
              <p className="text-muted-foreground text-xs max-w-md">
                Content is educational demo material, not clinical advice.
              </p>
              <div className="flex items-center gap-3">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-primary text-primary-foreground">
                  Publish resource
                </Button>
              </div>
            </CardFooter>
          </Card>
          <Card className="rounded-2xl pt-6 pr-6 pb-6 pl-6 gap-6">
            <CardHeader className="pt-0 pr-0 pb-0 pl-0 gap-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Preview</CardTitle>
                <Button variant="ghost" size="sm" className="text-primary">
                  View preview
                  <ExternalLink className="ml-2 size-4" />
                </Button>
              </div>
              <CardDescription>
                How this resource will appear to readers.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex pt-0 pr-0 pb-0 pl-0 flex-col gap-5">
              <div className="flex flex-col gap-3">
                <h3 className="font-semibold text-2xl leading-tight" />
                <span className="font-medium rounded-full bg-accent text-primary text-xs pt-1 pr-3 pb-1 pl-3 w-fit" />
                <p className="text-muted-foreground text-sm leading-6" />
                <div className="text-muted-foreground text-xs border-t-border border-r-border border-b border-b-border border-l-border flex pb-5 items-center gap-2">
                  <User className="size-4" />
                  By
                </div>
              </div>
              <div className="text-muted-foreground text-sm leading-7 flex flex-col gap-4">
                <p>
                  Blood pressure readings are recorded as two numbers: systolic
                  pressure and diastolic pressure. Systolic pressure is the top
                  number and reflects pressure when the heart beats.
                </p>
                <p>
                  Looking at readings over time can help reveal patterns that a
                  single reading may not show. Compare measurements taken under
                  similar conditions and note the date and time.
                </p>
                <p>
                  If a pattern concerns you, share the information with your
                  care team so they can help place the readings in context.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-end items-center gap-3">
          <Button variant="outline">Publish resource</Button>
          <Button
            variant="outline"
            disabled={true}
            className="text-muted-foreground"
          >
            <LoaderCircle className="animate-spin mr-2 size-4" />
            Publish resource
          </Button>
        </div>
      </main>
      <div className="shadow-[0px_10px_15px_-3px_rgba(0,_0,_0,_0.1),_0px_4px_6px_-4px_rgba(0,_0,_0,_0.1)] rounded-xl bg-card text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border flex fixed right-8 bottom-6 pt-3 pr-4 pb-3 pl-4 items-center gap-3">
        <span className="rounded-full bg-primary/10 text-primary flex justify-center items-center size-6">
          <Check className="size-4" />
        </span>
        <span>Resource saved as draft</span>
      </div>
    </div>
  </div>
</div>;
