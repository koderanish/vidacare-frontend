import { Sidebar } from "./Sidebar";

export function AdminShell({ children }) {
  return (
    <div className="flex min-h-screen bg-[#f7fafa]">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">{children}</div>
    </div>
  );
}
