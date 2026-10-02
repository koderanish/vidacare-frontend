export const SERVICES = [
  {
    id: "vitals",
    title: "Vitals monitoring",
    tagline: "Numbers you can actually read.",
    text: "Log heart rate, blood pressure, glucose and more. Trend charts turn scattered readings into a clear picture you can act on.",
    points: ["Heart rate, blood pressure, glucose and more", "Trend charts over time", "Easy manual logging"],
    visual: "vitals",
  },
  {
    id: "ecg",
    title: "ECG insights",
    tagline: "See your heartbeat, clearly.",
    text: "A clean, readable heartbeat view makes changes easy to spot and easy to share with your doctor.",
    points: ["Clear heartbeat visualisation", "Spot changes at a glance", "Share with your care team"],
    visual: "ecg",
  },
  {
    id: "alerts",
    title: "Smart alerts",
    tagline: "Know the moment something changes.",
    text: "Get notified when a reading looks unusual, and keep the right people informed so nothing important slips by.",
    points: ["Alerts when readings look unusual", "Keep caregivers informed", "Reminders that fit your routine"],
    visual: "alerts",
  },
  {
    id: "doctors",
    title: "Verified doctors",
    tagline: "Care guided by people you can trust.",
    text: "Doctor accounts are reviewed and approved before they can take part in care, then see patient trends in one place.",
    points: ["Reviewed and admin-approved doctors", "Patient trends in one view", "Guide care with clear data"],
    visual: "shield",
  },
  {
    id: "caregivers",
    title: "Caregiver circle",
    tagline: "Support that stays close.",
    text: "Stay close to a loved one's health and respond quickly when something changes, always with permission.",
    points: ["Follow a loved one's health", "Respond quickly to changes", "Shared with permission"],
    visual: "circle",
  },
  {
    id: "resources",
    title: "Health resources",
    tagline: "Guidance, one tap away.",
    text: "Educational content from our team, right inside the app, so answers are never far away.",
    points: ["Educational guidance in the app", "Curated by our team", "Always within reach"],
    visual: "pages",
  },
];

export const HOME_SERVICE_IDS = ["vitals", "alerts", "doctors", "caregivers"];

export const ROLES = [
  { n: "01", title: "Patients", text: "Understand your numbers, build healthy routines and share them with the people who matter." },
  { n: "02", title: "Caregivers", text: "Stay close to a loved one's health and respond quickly when something changes." },
  { n: "03", title: "Doctors", text: "Review patient trends in one place, backed by a verified-professional onboarding." },
];

export const STEPS = [
  { n: "01", title: "Create your account", text: "Sign up as a patient, caregiver or doctor with email or Google." },
  { n: "02", title: "Track your health", text: "Add readings and watch vitals and ECG build a clear picture over time." },
  { n: "03", title: "Stay connected", text: "Share progress with your care team and act early on alerts." },
];
