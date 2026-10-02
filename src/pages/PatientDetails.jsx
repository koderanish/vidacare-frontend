import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AdminShell } from "../components/layout/AdminShell";
import { Topbar } from "../components/layout/Topbar";
import { Badge } from "../components/ui/Badge";
import { LoadingState, ErrorState } from "../components/ui/States";
import { adminApi, fullName } from "../api/admin";
import { apiErrorMessage } from "../api/client";

import PatientOverviewTab from "./patient/PatientOverviewTab";
import PatientVitalsTab from "./patient/PatientVitalsTab";
import PatientJournalTab from "./patient/PatientJournalTab";
import PatientTreatmentTab from "./patient/PatientTreatmentTab";
import PatientCareTeamTab from "./patient/PatientCareTeamTab";

const TABS = [
  { key: "overview", label: "Overview" },
  { key: "vitals", label: "Vitals" },
  { key: "journal", label: "Journal" },
  { key: "treatment", label: "Treatment" },
  { key: "care-team", label: "Care Team" },
];

export default function PatientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState("overview");

  const query = useQuery({ queryKey: ["admin", "user", id], queryFn: () => adminApi.getUser(id) });

  if (query.isLoading) {
    return (
      <AdminShell>
        <Topbar title="Patient" />
        <main className="flex-1 p-6">
          <LoadingState label="Loading patient record..." />
        </main>
      </AdminShell>
    );
  }
  if (query.isError) {
    return (
      <AdminShell>
        <Topbar title="Patient" />
        <main className="flex-1 p-6">
          <ErrorState message={apiErrorMessage(query.error)} onRetry={query.refetch} />
        </main>
      </AdminShell>
    );
  }

  const { user, counts } = query.data;
  const name = fullName(user);

  return (
    <AdminShell>
      <Topbar title={name} subtitle={user.mrn ? `MRN: ${user.mrn} · ${user.email}` : user.email} />
      <main className="flex-1 space-y-4 p-6">
        <button onClick={() => navigate(-1)} className="text-sm text-ink-500 hover:text-ink-700">
          ← Back to Patients
        </button>

        <div className="flex flex-wrap items-center gap-3">
          {user.mrn && <Badge tone="teal">{user.mrn}</Badge>}
          <Badge tone="neutral">{user.role}</Badge>
          {user.emailVerified ? <Badge tone="green">Verified</Badge> : <Badge tone="neutral">Unverified</Badge>}
          {counts && <Badge tone="neutral">{counts.vitals} vitals · {counts.journal} journal · {counts.plans} plans</Badge>}
        </div>

        <div className="flex gap-1 border-b border-ink-900/5">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                tab === t.key ? "border-teal-600 text-teal-700" : "border-transparent text-ink-500 hover:text-ink-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div>
          {tab === "overview" && <PatientOverviewTab patientId={id} />}
          {tab === "vitals" && <PatientVitalsTab patientId={id} />}
          {tab === "journal" && <PatientJournalTab patientId={id} />}
          {tab === "treatment" && <PatientTreatmentTab patientId={id} />}
          {tab === "care-team" && <PatientCareTeamTab patientId={id} user={user} />}
        </div>
      </main>
    </AdminShell>
  );
}
