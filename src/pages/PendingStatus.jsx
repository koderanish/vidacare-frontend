import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

const COPY = {
  PENDING: {
    title: "Your account is pending review",
    body: "An administrator needs to verify your account before you can access VidaCare. We'll notify you once that happens.",
  },
  REJECTED: {
    title: "Your application was not approved",
    body: "Contact your VidaCare administrator for details on your application status.",
  },
  SUSPENDED: {
    title: "Your account is suspended",
    body: "Contact your VidaCare administrator to restore access.",
  },
};

export default function PendingStatus() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const copy = COPY[user?.status] || COPY.PENDING;

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7fafa] px-4">
      <Card className="max-w-md text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700">
          ⏳
        </div>
        <h1 className="text-lg font-semibold text-ink-900">{copy.title}</h1>
        <p className="mt-2 text-sm text-ink-500">{copy.body}</p>
        <Button variant="secondary" className="mt-6" onClick={handleLogout}>
          Log out
        </Button>
      </Card>
    </div>
  );
}
