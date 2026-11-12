import { createContext, useContext, useEffect, useState } from "react";

type User = { id: string, email: string, role: "user" | "admin" };

type Context = {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<User>;
    logout: () => void;
}

const API = "http://localhost:3000/api";
const AuthContext = createContext<Context>(null!)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API}/auth/me`, { credentials: "include" })
            .then((res) => res.ok ? res.json() : null)
            .then((data) => setUser(data?.user ?? null))
            .finally(() => setLoading(false));
    }, []);

    console.log(user);

    async function login(email: string, password: string) {
        const res = await fetch(`${API}/auth/login`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })
        const data = await res.json();
        if (!res.ok) throw new Error(`Login failed: ${res.status}`);
        setUser(data.user);
        return data.user as User
    }

    async function logout() {
        //await fetch(`${API}/auth/logout`, { method: "POST", credentials: "include" });
        setUser(null);
    }
    
    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
