const prisma = require("../config/db");
const { hashPassword } = require("../utils/password");
const { generatePatientCode } = require("../utils/patientCode");
const alertService = require("../services/alert.service");

const DEMO_PASSWORD = "Demo@12345";

function daysAgo(n, hour = 9, minute = 0) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(hour, minute, 0, 0);
  return d;
}

function pick(arr, i) {
  return arr[i % arr.length];
}

async function createUser({ email, fullName, phone, role, status, extra }) {
  const passwordHash = await hashPassword(DEMO_PASSWORD);
  return prisma.user.create({
    data: {
      email,
      passwordHash,
      fullName,
      phone,
      role,
      status,
      emailVerifiedAt: status === "PENDING" ? null : new Date(),
      ...extra,
    },
  });
}

async function seedDoctors() {
  const roster = [
    { fullName: "Dr. Lucas Martin", specialization: "Cardiology", hospital: "VidaCare General Hospital", license: "MD-482910", years: 12, status: "ACTIVE" },
    { fullName: "Dr. Priya Shah", specialization: "Internal Medicine", hospital: "VidaCare General Hospital", license: "MD-317654", years: 9, status: "ACTIVE" },
    { fullName: "Dr. Elena Rossi", specialization: "Endocrinology", hospital: "Lakeside Medical Center", license: "MD-556231", years: 15, status: "ACTIVE" },
    { fullName: "Dr. James Okafor", specialization: "Family Medicine", hospital: "Riverside Clinic", license: "MD-609187", years: 5, status: "PENDING" },
  ];

  const doctors = [];
  for (const [idx, d] of roster.entries()) {
    const email = `${d.fullName.toLowerCase().replace(/^dr\.\s*/, "").replace(/\s+/g, ".")}@vidacare.com`;
    const user = await createUser({
      email,
      fullName: d.fullName,
      phone: `+1 (555) 21${idx}-70${10 + idx}`,
      role: "DOCTOR",
      status: d.status,
    });
    await prisma.doctorProfile.create({
      data: {
        userId: user.id,
        specialization: d.specialization,
        licenseNumber: d.license,
        hospital: d.hospital,
        yearsOfExperience: d.years,
        bio: `${d.specialization} specialist with ${d.years} years of experience.`,
      },
    });
    const verification = await prisma.verificationRequest.create({
      data: {
        userId: user.id,
        role: "DOCTOR",
        status: d.status === "PENDING" ? "PENDING" : "APPROVED",
        documentType: "Medical License",
        documentReference: d.license,
        issuingBody: "State Medical Board (demo)",
        notes: "Submitted at signup (demo data).",
        reviewedAt: d.status === "PENDING" ? null : daysAgo(60),
        decisionReason: d.status === "PENDING" ? null : "Credentials reviewed and approved (demo workflow).",
      },
    });
    doctors.push({ user, verification });
  }
  return doctors;
}

async function seedCaregivers() {
  const roster = [
    { fullName: "Nora Williams", type: "FAMILY_MEMBER", years: 4, status: "ACTIVE" },
    { fullName: "Marcus Lee", type: "PROFESSIONAL_CAREGIVER", years: 7, status: "ACTIVE" },
    { fullName: "Elena Bennett", type: "FAMILY_MEMBER", years: 2, status: "ACTIVE" },
    { fullName: "Priya Nair", type: "PROFESSIONAL_CAREGIVER", years: 3, status: "PENDING" },
  ];

  const caregivers = [];
  for (const [idx, c] of roster.entries()) {
    const email = `${c.fullName.toLowerCase().replace(/\s+/g, ".")}@example.com`;
    const user = await createUser({
      email,
      fullName: c.fullName,
      phone: `+1 (555) 21${idx}-90${10 + idx}`,
      role: "CAREGIVER",
      status: c.status,
    });
    await prisma.caregiverProfile.create({
      data: { userId: user.id, caregiverType: c.type, yearsOfExperience: c.years },
    });
    const verification = await prisma.verificationRequest.create({
      data: {
        userId: user.id,
        role: "CAREGIVER",
        status: c.status === "PENDING" ? "PENDING" : "APPROVED",
        documentType: "Caregiver reference",
        documentReference: `REF-${1000 + idx}`,
        issuingBody: "Self-attested (demo)",
        notes: "Submitted at signup (demo data).",
        reviewedAt: c.status === "PENDING" ? null : daysAgo(60),
        decisionReason: c.status === "PENDING" ? null : "Reference reviewed and approved (demo workflow).",
      },
    });
    caregivers.push({ user, verification });
  }
  return caregivers;
}

async function seedPatients() {
  const roster = [
    { fullName: "Olivia Bennett", age: 68, gender: "FEMALE" },
    { fullName: "Ethan Cole", age: 54, gender: "MALE" },
    { fullName: "Samuel Ortiz", age: 73, gender: "MALE" },
    { fullName: "Grace Kim", age: 61, gender: "FEMALE" },
    { fullName: "Amara Johnson", age: 47, gender: "FEMALE" },
    { fullName: "John Smith", age: 58, gender: "MALE" },
    { fullName: "Maria Garcia", age: 65, gender: "FEMALE" },
    { fullName: "David Chen", age: 71, gender: "MALE" },
    { fullName: "Sophia Turner", age: 44, gender: "FEMALE" },
    { fullName: "Michael Brooks", age: 69, gender: "MALE" },
    { fullName: "Isabella Reyes", age: 52, gender: "FEMALE" },
    { fullName: "Noah Patel", age: 60, gender: "MALE" },
  ];

  const patients = [];
  for (const [idx, p] of roster.entries()) {
    const email = `${p.fullName.toLowerCase().replace(/\s+/g, ".")}@example.com`;
    const user = await createUser({
      email,
      fullName: p.fullName,
      phone: `+1 (555) 21${idx}-${9000 + idx}`,
      role: "PATIENT",
      status: "ACTIVE",
    });
    const dob = new Date();
    dob.setFullYear(dob.getFullYear() - p.age);
    let patientCode = generatePatientCode();
    while (await prisma.patientProfile.findUnique({ where: { patientCode } })) {
      patientCode = generatePatientCode();
    }
    const profile = await prisma.patientProfile.create({
      data: {
        userId: user.id,
        patientCode,
        dateOfBirth: dob,
        gender: p.gender,
        emergencyContactName: "Demo Emergency Contact",
        emergencyContactPhone: "+1 (555) 000-0000",
      },
    });
    patients.push({ user, profile, ...p });
  }
  return patients;
}

async function seedAssignments(patients, doctors, caregivers, admin) {
  const activeDoctors = doctors.filter((d) => d.user.status === "ACTIVE");
  const activeCaregivers = caregivers.filter((c) => c.user.status === "ACTIVE");

  for (const [idx, patient] of patients.entries()) {
    const doctor = pick(activeDoctors, idx);
    await prisma.patientDoctorAssignment.create({
      data: {
        patientId: patient.profile.id,
        doctorId: doctor.user.id,
        assignedById: admin.id,
        assignedAt: daysAgo(150 - idx * 3),
      },
    });

    // Leave a couple of patients without a caregiver to show the
    // "Unassigned" state in the UI, matching the Flowstep reference design.
    if (idx % 5 !== 4) {
      const caregiver = pick(activeCaregivers, idx);
      await prisma.patientCaregiverAssignment.create({
        data: {
          patientId: patient.profile.id,
          caregiverId: caregiver.user.id,
          assignedById: admin.id,
          assignedAt: daysAgo(150 - idx * 3),
        },
      });
    }
  }
}

const VITAL_BASELINES = {
  BLOOD_PRESSURE: { primary: 122, secondary: 78, unit: "mmHg", jitter: 8 },
  HEART_RATE: { primary: 74, unit: "bpm", jitter: 6 },
  SPO2: { primary: 97, unit: "%", jitter: 2 },
  BLOOD_SUGAR: { primary: 104, unit: "mg/dL", jitter: 12 },
  WEIGHT: { primary: 71, unit: "kg", jitter: 1.2 },
};

function jitterValue(base, jitter) {
  return Math.round((base + (Math.random() * 2 - 1) * jitter) * 10) / 10;
}

// Seeds 45 days of daily vitals per patient across all five types. A subset
// of patients get one deliberately out-of-range reading near the end of the
// window so the alert engine (and the demo alert screens) have real,
// consistently-derived data to show instead of hand-authored alert rows.
async function seedVitalsAndAlerts(patients) {
  const DAYS = 45;
  let alertCount = 0;

  for (const [pIdx, patient] of patients.entries()) {
    for (let day = DAYS; day >= 0; day--) {
      const recordedAt = daysAgo(day, 8 + Math.floor(Math.random() * 3), Math.floor(Math.random() * 60));

      for (const type of Object.keys(VITAL_BASELINES)) {
        const baseline = VITAL_BASELINES[type];
        let valuePrimary = jitterValue(baseline.primary, baseline.jitter);
        let valueSecondary = baseline.secondary ? jitterValue(baseline.secondary, 5) : undefined;

        // Deliberately push a handful of readings out of range for variety
        // in the alert list — patients 0, 2, 4 get abnormal readings on day 1.
        const isRecent = day <= 1;
        if (isRecent && pIdx === 0 && type === "BLOOD_PRESSURE") {
          valuePrimary = 148;
          valueSecondary = 92;
        }
        if (isRecent && pIdx === 2 && type === "SPO2") {
          valuePrimary = 91;
        }
        if (isRecent && pIdx === 4 && type === "BLOOD_SUGAR") {
          valuePrimary = 178;
        }
        if (isRecent && pIdx === 5 && type === "HEART_RATE") {
          valuePrimary = 132;
        }

        const vital = await prisma.vital.create({
          data: {
            patientId: patient.profile.id,
            type,
            valuePrimary,
            valueSecondary,
            unit: baseline.unit,
            source: day % 4 === 0 ? "DEMO_DEVICE" : "MANUAL",
            recordedAt,
            createdById: patient.user.id,
          },
        });

        if (isRecent) {
          const created = await alertService.evaluateVitalForAlerts(vital);
          alertCount += created.length;
        }
      }
    }
  }
  return alertCount;
}

const MOODS = ["CALM", "GOOD", "ANXIOUS", "SAD", "STRESSED", "ENERGETIC"];
const SYMPTOM_POOL = ["Mild fatigue", "Headache", "Stiffness", "None reported", "Mild dizziness", "Shortness of breath"];
const JOURNAL_NOTES = [
  "Rested after morning walk.",
  "Completed medication check-in.",
  "Noted mild headache in afternoon.",
  "Stretching helped.",
  "Felt more energetic today.",
  "Slept well, no complaints.",
];

async function seedJournalEntries(patients) {
  for (const patient of patients) {
    for (let i = 0; i < 10; i++) {
      const entryDate = daysAgo(i * 3, 9, 15);
      await prisma.journalEntry.create({
        data: {
          patientId: patient.profile.id,
          mood: pick(MOODS, i + patients.indexOf(patient)),
          painLevel: Math.floor(Math.random() * 5),
          symptoms: [pick(SYMPTOM_POOL, i)],
          notes: pick(JOURNAL_NOTES, i),
          entryDate,
        },
      });
    }
  }
}

const MEDICATION_SETS = [
  [
    { name: "Lisinopril", dosage: "10 mg", frequency: "Once daily", durationDays: 90, instructions: "Take in the morning" },
    { name: "Metformin", dosage: "500 mg", frequency: "Twice daily", durationDays: 90, instructions: "Take with meals" },
    { name: "Vitamin D3", dosage: "1,000 IU", frequency: "Once daily", durationDays: null, instructions: "Take with breakfast" },
  ],
  [
    { name: "Atorvastatin", dosage: "20 mg", frequency: "Once daily", durationDays: 180, instructions: "Take at bedtime" },
    { name: "Aspirin", dosage: "81 mg", frequency: "Once daily", durationDays: 180, instructions: "Take with food" },
  ],
];

async function seedTreatmentPlans(patients) {
  const assignments = await prisma.patientDoctorAssignment.findMany({ where: { status: "ACTIVE" } });
  const byPatient = new Map(assignments.map((a) => [a.patientId, a.doctorId]));

  for (const [idx, patient] of patients.entries()) {
    const doctorId = byPatient.get(patient.profile.id);
    if (!doctorId || idx % 4 === 3) continue; // leave a few patients without a plan

    const plan = await prisma.treatmentPlan.create({
      data: {
        patientId: patient.profile.id,
        doctorId,
        title: idx % 2 === 0 ? "Hypertension & Diabetes Management" : "Cardiovascular Risk Management",
        description: "Demo treatment plan for prototype review.",
        status: "ACTIVE",
        startDate: daysAgo(25),
        lastReviewedAt: daysAgo(2),
        adherencePercent: 78 + (idx % 15),
      },
    });

    const meds = pick(MEDICATION_SETS, idx);
    await prisma.medication.createMany({
      data: meds.map((m, i) => ({ ...m, treatmentPlanId: plan.id, sortOrder: i })),
    });

    await prisma.treatmentPlanEvent.create({
      data: {
        treatmentPlanId: plan.id,
        actorUserId: doctorId,
        eventType: "PLAN_CREATED",
        description: "Plan created (demo data)",
        createdAt: daysAgo(25),
      },
    });
  }
}

async function seedResources(admin, doctors) {
  const resources = [
    { title: "Understanding blood pressure trends", category: "HEART_HEALTH", description: "Learn how to read sample blood pressure trends and when to review them with a care team.", author: "VidaCare Education", status: "PUBLISHED", authorUser: admin },
    { title: "Everyday nutrition basics", category: "NUTRITION", description: "Practical meal-planning guidance for a balanced routine.", author: "Dr. Priya Shah", status: "PUBLISHED", authorUser: doctors[1].user },
    { title: "Building a calmer evening routine", category: "MENTAL_WELLNESS", description: "Simple habits that support reflection and rest.", author: "VidaCare Education", status: "PUBLISHED", authorUser: admin },
    { title: "Movement for daily wellbeing", category: "EXERCISE", description: "Gentle movement ideas for different comfort levels.", author: "VidaCare Education", status: "DRAFT", authorUser: admin },
    { title: "Medication check-in guide", category: "MEDICATION", description: "A reminder framework for recording questions before a review.", author: "VidaCare Education", status: "UNPUBLISHED", authorUser: admin },
    { title: "Diabetes-friendly pantry guide", category: "DIABETES", description: "Sample educational content for healthy pantry planning.", author: "Dr. Elena Rossi", status: "PUBLISHED", authorUser: doctors[2].user },
  ];

  for (const r of resources) {
    const slugBase = r.title.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
    await prisma.healthResource.create({
      data: {
        title: r.title,
        slug: slugBase,
        category: r.category,
        description: r.description,
        content: `${r.description}\n\nThis is sample educational content for the VidaCare prototype demonstration. It is not clinical advice.\n\nParagraph two would continue with practical, general guidance appropriate to ${r.category.replace("_", " ").toLowerCase()}.`,
        authorName: r.author,
        status: r.status,
        publishedAt: r.status === "PUBLISHED" ? daysAgo(Math.floor(Math.random() * 20)) : null,
        createdById: r.authorUser.id,
      },
    });
  }
}

async function seedExtraNotifications(patients) {
  for (const patient of patients.slice(0, 4)) {
    await prisma.notification.create({
      data: {
        recipientUserId: patient.user.id,
        type: "CONTENT",
        title: "New resource published",
        body: "Understanding blood pressure trends is now available in your resource library.",
      },
    });
    await prisma.notification.create({
      data: {
        recipientUserId: patient.user.id,
        type: "CARE_UPDATE",
        title: "Treatment plan reviewed",
        body: "Your care team reviewed your treatment plan.",
        readAt: daysAgo(3),
      },
    });
  }
}

// Seeding writes directly via Prisma rather than through the services (for
// speed and precise control over historical timestamps), so it bypasses
// activity.service's automatic logging. Backfill a realistic-looking feed
// here so the "Recent system activity" dashboard card is populated
// immediately after seeding, matching the Flowstep reference copy.
async function seedActivityLog(patients, doctors, caregivers, admin) {
  const entries = [
    { minutesAgo: 8, action: "USER_REGISTERED", entityType: "User", summary: `New patient registered: ${patients[0].user.fullName}` },
    { minutesAgo: 24, action: "VERIFICATION_APPROVED", entityType: "VerificationRequest", summary: `Doctor added: ${doctors[1].user.fullName}` },
    { minutesAgo: 60, action: "CAREGIVER_ASSIGNED", entityType: "Patient", summary: `Caregiver assigned: ${caregivers[0].user.fullName} to ${patients[1].user.fullName}` },
    { minutesAgo: 120, action: "RESOURCE_CREATED", entityType: "HealthResource", summary: "Resource published: Understanding blood pressure trends" },
    { minutesAgo: 180, action: "ALERT_CREATED", entityType: "Alert", summary: "Alert generated: Missed medication check-in" },
    { minutesAgo: 260, action: "TREATMENT_PLAN_CREATED", entityType: "TreatmentPlan", summary: `Treatment plan created for ${patients[2].user.fullName}` },
    { minutesAgo: 400, action: "USER_LOGIN", entityType: "User", summary: `${doctors[0].user.fullName} signed in` },
  ];

  for (const e of entries) {
    await prisma.activityLog.create({
      data: {
        actorUserId: admin.id,
        action: e.action,
        entityType: e.entityType,
        summary: e.summary,
        createdAt: new Date(Date.now() - e.minutesAgo * 60 * 1000),
      },
    });
  }
}

async function seedDemoData() {
  const adminUser = await prisma.user.findFirst({ where: { role: "ADMIN" } });
  if (!adminUser) {
    throw new Error("No admin account found. Run the admin seed first (npm run seed runs both).");
  }

  console.log("Seeding doctors...");
  const doctors = await seedDoctors();
  console.log("Seeding caregivers...");
  const caregivers = await seedCaregivers();
  console.log("Seeding patients...");
  const patients = await seedPatients();
  console.log("Seeding assignments...");
  await seedAssignments(patients, doctors, caregivers, adminUser);
  console.log("Seeding 45 days of vitals + evaluating alerts (this takes a moment)...");
  const alertCount = await seedVitalsAndAlerts(patients);
  console.log("Seeding journal entries...");
  await seedJournalEntries(patients);
  console.log("Seeding treatment plans...");
  await seedTreatmentPlans(patients);
  console.log("Seeding health resources...");
  await seedResources(adminUser, doctors);
  console.log("Seeding extra notifications...");
  await seedExtraNotifications(patients);
  console.log("Backfilling recent activity feed...");
  await seedActivityLog(patients, doctors, caregivers, adminUser);

  // Give a couple of alerts varied statuses so the alert list/detail screens
  // show more than just "Open".
  const openAlerts = await prisma.alert.findMany({ where: { status: "OPEN" }, take: 3 });
  if (openAlerts[0]) {
    await prisma.alert.update({
      where: { id: openAlerts[0].id },
      data: { status: "REVIEWED", reviewedById: adminUser.id, reviewedAt: new Date() },
    });
  }
  if (openAlerts[1]) {
    await prisma.alert.update({
      where: { id: openAlerts[1].id },
      data: { status: "RESOLVED", reviewedById: adminUser.id, reviewedAt: new Date(), resolvedAt: new Date() },
    });
  }

  console.log(`\nDemo data seeded successfully.`);
  console.log(`  Doctors: ${doctors.length} (1 pending)`);
  console.log(`  Caregivers: ${caregivers.length} (1 pending)`);
  console.log(`  Patients: ${patients.length}`);
  console.log(`  Vitals: ~${patients.length * 46 * 5}`);
  console.log(`  Alerts generated by threshold engine: ${alertCount}`);
  console.log(`\nAll demo accounts use the password: ${DEMO_PASSWORD}`);
}

module.exports = { seedDemoData, DEMO_PASSWORD };
