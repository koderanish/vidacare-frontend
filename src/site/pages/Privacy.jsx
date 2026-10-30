import { useRef } from "react";
import { PageHero } from "../components/Section";
import { CONTACT_EMAIL } from "../components/Footer";
import { useReveal } from "../useReveal";

const UPDATED = "October 30, 2026";

const SECTIONS = [
  {
    title: "1. Who we are",
    body: [
      "VidaCare Technologies Inc. (\"VidaCare\", \"we\", \"us\") provides a remote health monitoring platform for patients, caregivers and doctors through our website and the VidaCare mobile app.",
    ],
  },
  {
    title: "2. Information we collect",
    list: [
      "Account information: name, email address, role (patient, caregiver or doctor) and profile details. If you sign in with Google, we receive your name, email and profile identifier from Google.",
      "Health information you choose to provide: vitals (such as heart rate, blood pressure, oxygen level, temperature), ECG readings, journal entries, treatment and medication details.",
      "Care team information: connections between patients, caregivers and verified doctors, and messages or alerts shared within them.",
      "Doctor verification information: details needed to review and approve doctor accounts.",
      "Device information: push notification token, device type and app version, used to deliver alerts and keep the app working.",
    ],
  },
  {
    title: "3. How we use your information",
    list: [
      "To provide monitoring, alerts and care-team communication.",
      "To let you share your health data with the people you choose.",
      "To verify doctors and keep the platform safe.",
      "To send notifications you have enabled, such as vitals alerts and reminders.",
      "To maintain, secure and improve the service.",
    ],
  },
  {
    title: "4. How we share information",
    body: [
      "Your health data is visible only to you and the caregivers and doctors you connect with. We do not sell your personal information and we do not use it for advertising.",
      "We may share limited data with service providers who help us run the platform (for example hosting, authentication and push notifications), and when required by law.",
    ],
  },
  {
    title: "5. Data security and storage",
    body: [
      "We use encryption in transit, access controls and secure storage to protect your information. No system is perfectly secure, but we work to protect your data and limit access to those who need it.",
    ],
  },
  {
    title: "6. Retention and deletion",
    body: [
      `We keep your information while your account is active. You can request access, correction or deletion of your account and associated data at any time by emailing ${CONTACT_EMAIL}. We will process verified requests within a reasonable time, except where we must retain data by law.`,
    ],
  },
  {
    title: "7. Your choices",
    list: [
      "Control which caregivers and doctors can see your data.",
      "Turn notifications on or off in the app or your device settings.",
      "Request a copy or deletion of your data.",
    ],
  },
  {
    title: "8. Children",
    body: [
      "VidaCare is not directed to children under 13, and we do not knowingly collect their personal information. Accounts for minors should be managed by a parent or guardian.",
    ],
  },
  {
    title: "9. Medical disclaimer",
    body: [
      "VidaCare is a monitoring and communication tool. It does not provide medical advice, diagnosis or treatment. In an emergency, contact your local emergency services.",
    ],
  },
  {
    title: "10. Changes to this policy",
    body: [
      "We may update this policy from time to time. We will post the new version here and update the date above. Significant changes will be communicated in the app or by email.",
    ],
  },
  {
    title: "11. Contact us",
    body: [`Questions or requests about privacy: ${CONTACT_EMAIL}.`],
  },
];

export default function Privacy() {
  const root = useRef(null);
  useReveal(root);

  return (
    <div ref={root}>
      <PageHero eyebrow="[ Legal ]" lines={["Privacy", "policy."]}>
        How VidaCare Technologies Inc. collects, uses and protects your information. Last updated {UPDATED}.
      </PageHero>

      <section className="bg-site-paper px-5 py-20 md:py-32">
        <div className="mx-auto max-w-3xl space-y-12">
          {SECTIONS.map((s) => (
            <div key={s.title} data-reveal>
              <h2 className="font-display text-2xl font-bold tracking-tight text-site-ink md:text-3xl">{s.title}</h2>
              {s.body?.map((p, i) => (
                <p key={i} className="mt-4 text-base leading-relaxed text-ink-500">{p}</p>
              ))}
              {s.list && (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-ink-500">
                  {s.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
