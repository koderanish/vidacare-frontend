<!-- screenType: "desktop-large" width: "1920" height: "1080" name: "Screen 1" colorTheme: "green" screenId: "237497fc-8818-4d89-b137-39bfc1c4e00c" -->
<div className="bg-background text-foreground w-full h-fit">
  <div className="flex w-[1920px] min-h-[1080px] max-w-full">
    <aside className="bg-[oklch(0.97_0.015_220)] flex pt-12 pr-12 pb-12 pl-12 flex-col justify-between w-[42%]">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-primary text-primary-foreground flex justify-center items-center size-12">
            <HeartPulse className="size-6" />
          </div>
          <span className="font-semibold text-foreground text-2xl tracking-tight">
            VidaCare
          </span>
        </div>
        <div className="flex pt-12 flex-col gap-4 max-w-[520px]">
          <h1 className="font-semibold text-foreground text-5xl leading-tight tracking-tight">
            Care operations, connected.
          </h1>
          <p className="text-muted-foreground text-lg leading-8 max-w-[460px]">
            Securely manage the teams and people who make better care possible.
          </p>
        </div>
        <svg
          viewBox="0 0 560 260"
          fill="none"
          className="mt-8 w-full h-[260px] max-w-[560px]"
          aria-label="Abstract connected care illustration"
        >
          <path
            d="M18 188C74 130 103 202 156 145C207 90 245 121 290 77C339 29 375 103 425 64C464 34 493 54 542 18"
            stroke="oklch(0.723 0.219 149.579 / 0.45)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M16 224C76 204 107 154 164 181C220 208 250 180 300 145C349 111 377 151 426 126C475 101 508 118 544 88"
            stroke="oklch(0.6 0.118 184.704 / 0.38)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M72 48C105 74 119 102 152 94C191 84 203 45 239 52C275 59 283 104 320 106C359 108 371 72 404 79C438 86 449 119 488 132"
            stroke="oklch(0.398 0.07 227.392 / 0.24)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle
            cx="156"
            cy="145"
            r="6"
            fill="oklch(0.723 0.219 149.579 / 0.7)"
          />
          <circle
            cx="300"
            cy="145"
            r="6"
            fill="oklch(0.6 0.118 184.704 / 0.65)"
          />
          <circle
            cx="425"
            cy="64"
            r="6"
            fill="oklch(0.723 0.219 149.579 / 0.7)"
          />
        </svg>
      </div>
      <div className="text-muted-foreground text-sm">
        © 2025 VidaCare · Privacy · Security
      </div>
    </aside>
    <main className="bg-background flex pt-12 pr-12 pb-12 pl-12 justify-center items-center flex-1">
      <Card className="shadow-[0px_20px_60px_rgba(9,_9,_21,_0.08)] rounded-2xl border-border pt-8 pr-8 pb-8 pl-8 gap-6 w-full max-w-[440px]">
        <CardHeader className="pt-0 pr-0 pb-0 pl-0 gap-3">
          <p className="font-semibold text-primary text-xs tracking-[0.18em]">
            ADMIN PORTAL
          </p>
          <h2 className="font-semibold text-foreground text-3xl tracking-tight">
            Welcome back
          </h2>
          <p className="text-muted-foreground text-sm leading-6">
            Sign in to your VidaCare workspace.
          </p>
        </CardHeader>
        <CardContent className="flex pt-0 pr-0 pb-0 pl-0 flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@vidacare.com"
              className="rounded-lg h-11"
              defaultValue=""
            />
            <p className="text-destructive text-sm">Enter a valid work email</p>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                placeholder="Enter your password"
                className="rounded-lg pr-11 h-11"
                defaultValue=""
              />
              <button
                type="button"
                aria-label="Toggle password visibility"
                className="-translate-y-1/2 text-muted-foreground absolute top-1/2 right-3"
              >
                <EyeOff className="hidden size-4" />
                <Eye className="size-4" />
              </button>
            </div>
          </div>
          <div className="flex pt-1 justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" defaultChecked={true} />
              <Label
                htmlFor="remember"
                className="font-normal text-muted-foreground text-sm"
              >
                Remember me for 30 days
              </Label>
            </div>
            <button type="button" className="font-medium text-primary text-sm">
              Forgot password?
            </button>
          </div>
          <Button className="rounded-lg bg-primary text-primary-foreground w-full h-11">
            Sign in
          </Button>
          <p className="text-center text-muted-foreground text-xs leading-5">
            Admin access only. There is no public administrator signup.
          </p>
        </CardContent>
        <CardFooter className="text-muted-foreground text-xs border-x-border border-t border-t-border border-b-border flex pt-5 pr-0 pb-0 pl-0 justify-center items-center gap-2">
          <LockKeyhole className="size-4" />
          <span>Protected with enterprise-grade security</span>
        </CardFooter>
      </Card>
    </main>
  </div>
</div>;
