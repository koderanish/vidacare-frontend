// Private URL prefix for the admin panel. Change via VITE_ADMIN_BASE (no trailing slash).
export const ADMIN_BASE = (import.meta.env.VITE_ADMIN_BASE || "/vc-portal").replace(/\/+$/, "");

export function isAdminPath(pathname) {
  return pathname === ADMIN_BASE || pathname.startsWith(ADMIN_BASE + "/");
}
