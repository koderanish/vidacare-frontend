import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { ProtectedRoute } from "./routes/ProtectedRoute";

import Login from "./pages/Login";
import PendingStatus from "./pages/PendingStatus";
import DashboardOverview from "./pages/DashboardOverview";
import UserManagement from "./pages/UserManagement";
import UserDetails from "./pages/UserDetails";
import Verifications from "./pages/Verifications";
import PatientManagement from "./pages/PatientManagement";
import PatientDetails from "./pages/PatientDetails";
import Alerts from "./pages/Alerts";
import Resources from "./pages/Resources";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";

function LoginGate() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user?.status === "ACTIVE") return <Navigate to="/" replace />;
  if (user) return <Navigate to="/pending" replace />;
  return <Login />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginGate />} />
      <Route
        path="/pending"
        element={
          <RequireAnyUser>
            <PendingStatus />
          </RequireAnyUser>
        }
      />

      <Route path="/" element={<ProtectedRoute roles={["ADMIN"]}><DashboardOverview /></ProtectedRoute>} />
      <Route path="/users" element={<ProtectedRoute roles={["ADMIN"]}><UserManagement /></ProtectedRoute>} />
      <Route path="/users/:id" element={<ProtectedRoute roles={["ADMIN"]}><UserDetails /></ProtectedRoute>} />
      <Route path="/verifications" element={<ProtectedRoute roles={["ADMIN"]}><Verifications /></ProtectedRoute>} />
      <Route path="/patients" element={<ProtectedRoute roles={["ADMIN"]}><PatientManagement /></ProtectedRoute>} />
      <Route path="/patients/:id" element={<ProtectedRoute roles={["ADMIN"]}><PatientDetails /></ProtectedRoute>} />
      <Route path="/alerts" element={<ProtectedRoute roles={["ADMIN"]}><Alerts /></ProtectedRoute>} />
      <Route path="/resources" element={<ProtectedRoute roles={["ADMIN"]}><Resources /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute roles={["ADMIN"]}><Notifications /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute roles={["ADMIN"]}><Settings /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function RequireAnyUser({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
