import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";

// Shared application shell used by every authenticated page. The sidebar is
// a fixed-height flex sibling that never scrolls; the right-hand column
// (header + page content together) is the single scrollable region. This is
// the standard persistent-sidebar pattern — the page itself never scrolls,
// only this one inner container does, so the sidebar can't be scrolled away.
// On phones the sidebar is hidden, so MobileNav renders the same destinations
// as a scrollable top row.
export function AdminShell({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#f7fafa]">
      <Sidebar />
      <div className="flex h-full flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <MobileNav />
        {children}
      </div>
    </div>
  );
}
