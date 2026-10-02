import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

export default function PendingStatus() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  const isAdmin = user?.role === "admin";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7fafa] px-4">
      <Card className="max-w-md text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700">
          ⏳
        </div>
        <h1 className="text-lg font-semibold text-ink-900">
          {isAdmin ? "Signed in" : "Admin access required"}
        </h1>
        <p className="mt-2 text-sm text-ink-500">
          {isAdmin
            ? "Your admin session is active."
            : `Signed in as ${user?.email || "a non-admin account"}. This portal is for VidaCare administrators only (role is granted manually in the database, never via signup).`}
        </p>
        <Button variant="secondary" className="mt-6" onClick={handleLogout}>
          Log out
        </Button>
      </Card>
    </div>
  );
}
