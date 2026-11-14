import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";
import type { User } from "../types";

type RegisterResult = { user: User | null; confirmEmail: boolean };

type AuthContextValue = {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<User>;
    register: (email: string, password: string) => Promise<RegisterResult>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api<{ user: User }>("/auth/me")
            .then((data) => setUser(data.user))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        const data = await api<{ user: User }>("/auth/login", { method: "POST", body: { email, password } });
        setUser(data.user);
        return data.user;
    }, []);

    const register = useCallback(async (email: string, password: string) => {
        const data = await api<RegisterResult>("/auth/register", { method: "POST", body: { email, password } });
        if (data.user) setUser(data.user);
        return data;
    }, []);

    const logout = useCallback(async () => {
        try {
            await api("/auth/logout", { method: "POST" });
        } finally {
            setUser(null);
        }
    }, []);

    const value = useMemo(() => ({ user, loading, login, register, logout }), [user, loading, login, register, logout]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
    return ctx;
}
