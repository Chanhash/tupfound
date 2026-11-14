import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { homePathFor } from "../lib/auth";
import type { Role } from "../types";

export function ProtectedRoute({ allow }: { allow: Role[] }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-8">Loading...</div>;
  if (!user) return <Navigate to="/auth" replace />;
  if (!allow.includes(user.role)) return <Navigate to={homePathFor(user.role)} replace />;
  return <Outlet />;
}

export function HomeRedirect() {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-8">Loading...</div>;
  return <Navigate to={user ? homePathFor(user.role) : "/auth"} replace />;
}
