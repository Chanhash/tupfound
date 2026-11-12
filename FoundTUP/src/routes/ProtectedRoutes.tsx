import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";

type Role = "user" | "admin";

export function ProtectedRoute({ allow }: { allow: Role[] }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-8">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (!allow.includes(user.role))
    return <Navigate to={user.role === "admin" ? "/admin" : "/home"} replace />;
  return <Outlet />;
}