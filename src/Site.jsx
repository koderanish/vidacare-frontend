import { ADMIN_BASE } from "./adminBase";

// Placeholder public landing page. The full marketing site (Home / About / Services / Contact) replaces this.
export default function Site() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        background: "#062b26",
        color: "#fff",
        fontFamily: "Inter, system-ui, sans-serif",
        textAlign: "center",
        padding: 24,
      }}
    >
      <h1 style={{ fontSize: 40, margin: 0 }}>
        Vida<span style={{ color: "#4ade80" }}>Care</span>
      </h1>
      <p style={{ opacity: 0.8, margin: 0 }}>Smarter remote care for patients, caregivers and doctors.</p>
      <p style={{ opacity: 0.5, margin: 0, fontSize: 14 }}>Website coming soon.</p>
      <span hidden data-admin-base={ADMIN_BASE} />
    </main>
  );
}
