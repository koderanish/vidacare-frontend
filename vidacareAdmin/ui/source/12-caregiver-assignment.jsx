<!-- screenType: "desktop-large" width: "1920" height: "1080" name: "Screen 12" colorTheme: "green" screenId: "1d98ce50-ec4f-4151-9bde-80e5f0e12bdd" -->
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
          Caregiver assignment
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
      <main className="pt-8 pr-8 pb-8 pl-8">
        <section className="flex mb-6 justify-between items-start">
          <div>
            <div className="flex mb-2 items-center gap-3">
              <h2 className="font-semibold text-2xl tracking-tight">
                Olivia Bennett
              </h2>
              <Badge className="rounded-full bg-primary/10 text-primary">
                Monitoring
              </Badge>
            </div>
            <div className="text-muted-foreground text-sm flex items-center gap-4">
              <span>Age 68</span>
              <span>Female</span>
              <span>VC-10482</span>
            </div>
          </div>
        </section>
        <Tabs className="mb-6 w-full" defaultValue="Care Team">
          <TabsList className="rounded-xl bg-muted pt-1 pr-1 pb-1 pl-1 gap-1 w-fit h-11">
            <TabsTrigger value="Overview" className="rounded-lg pr-5 pl-5">
              Overview
            </TabsTrigger>
            <TabsTrigger value="Vitals" className="rounded-lg pr-5 pl-5">
              Vitals
            </TabsTrigger>
            <TabsTrigger value="Journal" className="rounded-lg pr-5 pl-5">
              Journal
            </TabsTrigger>
            <TabsTrigger value="Treatment" className="rounded-lg pr-5 pl-5">
              Treatment
            </TabsTrigger>
            <TabsTrigger value="Care Team" className="rounded-lg pr-5 pl-5">
              Care Team
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="mb-6">
          <h2 className="font-semibold text-2xl tracking-tight mb-2">
            Caregiver assignment
          </h2>
          <p className="text-muted-foreground text-sm">
            Manage support access and patient-caregiver relationships.
          </p>
        </div>
        <div className="grid gap-6 grid-cols-[1.2fr_0.8fr]">
          <div>
            <Card className="mb-6 pt-6 pr-6 pb-6 pl-6 gap-6">
              <CardHeader className="pt-0 pr-0 pb-0 pl-0 flex-row justify-between items-start gap-4">
                <div>
                  <CardTitle className="text-lg mb-1">
                    Current assignment
                  </CardTitle>
                  <CardDescription>
                    Assigned caregiver and access status
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  className="text-primary border-primary"
                >
                  Change caregiver
                </Button>
              </CardHeader>
              <CardContent className="grid pt-0 pr-0 pb-0 pl-0 gap-6 grid-cols-2">
                <div>
                  <p className="font-semibold text-sm mb-1">Nora Williams</p>
                  <p className="text-muted-foreground text-sm">
                    Family caregiver
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">
                    Assignment date
                  </p>
                  <p className="font-medium text-sm">Jan 18, 2025</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Email</p>
                  <p className="font-medium text-sm">nora.williams@email.com</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Phone</p>
                  <p className="font-medium text-sm">+1 (555) 214-9087</p>
                </div>
              </CardContent>
              <CardFooter className="border-x-border border-t border-t-border border-b-border pt-4 pr-0 pb-0 pl-0">
                <Badge className="rounded-full bg-primary/10 text-primary">
                  Active
                </Badge>
              </CardFooter>
            </Card>
            <Card className="pt-6 pr-6 pb-6 pl-6 gap-5">
              <CardHeader className="pt-0 pr-0 pb-0 pl-0">
                <CardTitle className="text-lg">Available caregivers</CardTitle>
                <CardDescription>
                  Search by name or relationship
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 pr-0 pb-0 pl-0">
                <div className="relative mb-3">
                  <Search className="-translate-y-1/2 text-muted-foreground absolute top-1/2 left-3 size-4" />
                  <input
                    placeholder="Search by name or relationship"
                    aria-label="Search caregivers"
                    className="rounded-xl bg-background text-sm border-t border-t-input border-r border-r-input border-b border-b-input border-l border-l-input outline-none pr-4 pl-10 w-full h-10"
                    defaultValue=""
                  />
                </div>
                <div className="rounded-xl border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border">
                  <div className="border-t-border border-r-border border-b border-b-border border-l-border flex pt-4 pr-4 pb-4 pl-4 justify-between items-center">
                    <div>
                      <p className="font-medium text-sm">Nora Williams</p>
                      <p className="text-muted-foreground text-xs mt-1">
                        Family caregiver
                      </p>
                    </div>
                    <Badge variant="secondary" className="rounded-full">
                      Current caregiver
                    </Badge>
                  </div>
                  <div className="border-t-border border-r-border border-b border-b-border border-l-border flex pt-4 pr-4 pb-4 pl-4 justify-between items-center">
                    <div>
                      <p className="font-medium text-sm">Marcus Lee</p>
                      <p className="text-muted-foreground text-xs mt-1">
                        Professional caregiver
                      </p>
                    </div>
                    <Badge className="rounded-full bg-primary/10 text-primary">
                      Available
                    </Badge>
                  </div>
                  <div className="flex pt-4 pr-4 pb-4 pl-4 justify-between items-center">
                    <div>
                      <p className="font-medium text-sm">Elena Bennett</p>
                      <p className="text-muted-foreground text-xs mt-1">
                        Family caregiver
                      </p>
                    </div>
                    <Badge className="rounded-full bg-primary/10 text-primary">
                      Available
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="mb-6 pt-6 pr-6 pb-6 pl-6 gap-5">
              <CardHeader className="pt-0 pr-0 pb-0 pl-0">
                <CardTitle className="text-lg">Permissions</CardTitle>
                <CardDescription>
                  Administrative access controls for this caregiver
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 pr-0 pb-0 pl-0">
                <div className="flex mb-5 justify-between items-center">
                  <span className="text-sm">View patient profile</span>
                  <Switch defaultChecked={true} />
                </div>
                <div className="flex mb-5 justify-between items-center">
                  <span className="text-sm">View journal</span>
                  <Switch defaultChecked={true} />
                </div>
                <div className="flex mb-5 justify-between items-center">
                  <span className="text-sm">Receive alerts</span>
                  <Switch defaultChecked={true} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Edit clinical information</span>
                  <Switch defaultChecked={false} />
                </div>
              </CardContent>
              <CardFooter className="border-x-border border-t border-t-border border-b-border pt-4 pr-0 pb-0 pl-0">
                <p className="text-muted-foreground text-xs">
                  Clinical information is read-only for caregivers.
                </p>
              </CardFooter>
            </Card>
            <Card className="border-dashed pt-6 pr-6 pb-6 pl-6 gap-3">
              <CardHeader className="pt-0 pr-0 pb-0 pl-0">
                <CardTitle className="text-base">
                  No caregiver assigned
                </CardTitle>
                <CardDescription>
                  This empty state is shown for an unassigned patient.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </main>
      <div className="bg-foreground/40 flex fixed z-30 top-0 right-0 bottom-0 left-0 pt-6 pr-6 pb-6 pl-6 justify-center items-center">
        <Card className="shadow-[0px_20px_25px_-5px_rgba(0,_0,_0,_0.1),_0px_8px_10px_-6px_rgba(0,_0,_0,_0.1)] pt-6 pr-6 pb-6 pl-6 gap-6 w-full max-w-md">
          <CardHeader className="pt-0 pr-0 pb-0 pl-0 gap-2">
            <CardTitle>Change assigned caregiver?</CardTitle>
            <CardDescription>
              Changing the assignment will update Olivia Bennett's caregiver
              access and relationship.
            </CardDescription>
          </CardHeader>
          <CardFooter className="pt-0 pr-0 pb-0 pl-0 justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Confirm assignment</Button>
          </CardFooter>
        </Card>
      </div>
      <div className="shadow-[0px_10px_15px_-3px_rgba(0,_0,_0,_0.1),_0px_4px_6px_-4px_rgba(0,_0,_0,_0.1)] rounded-xl bg-card text-sm border-t border-t-border border-r border-r-border border-b border-b-border border-l border-l-border flex fixed z-40 right-8 bottom-6 pt-3 pr-4 pb-3 pl-4 items-center gap-3">
        <div className="rounded-full bg-primary/10 text-primary flex justify-center items-center size-6">
          <Check className="size-4" />
        </div>
        <span>Caregiver assignment updated</span>
      </div>
    </div>
  </div>
</div>;
