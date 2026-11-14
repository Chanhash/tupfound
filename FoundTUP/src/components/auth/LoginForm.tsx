import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { isValidEmail } from "../../lib/auth";
import type { User } from "../../types";
import Field from "./Field";
import SubmitButton from "./SubmitButton";

export default function LoginForm({ onSuccess }: { onSuccess: (user: User) => void }) {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const isFormValid = isValidEmail(email) && password.length > 0;

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!isFormValid || loading) return;

        setLoading(true);
        setErrorMessage("");
        try {
            onSuccess(await login(email, password));
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "Unable to log in.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-1" noValidate>
            <p className="text-4xl font-bricolage font-extrabold">Welcome back!</p>
            <p className="font-extralight font-nunito mb-4">Log in to check on your lost and found items.</p>

            <Field
                label="Email"
                type="email"
                autoComplete="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={email.length > 0 && !isValidEmail(email) && "Please enter a valid email address."}
            />

            <Field
                label="Password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex flex-row justify-between mt-2">
                <label className="flex items-center gap-2 cursor-pointer group text-sm font-bold font-nunito">
                    <input type="checkbox" className="sr-only peer" />
                    <span className="w-5 h-5 border rounded-sm flex items-center justify-center
                                    group-has-[:checked]:bg-green-500
                                    group-has-[:checked]:border-green-500">
                        <svg
                            className="w-4 h-4 text-white opacity-0 group-has-[:checked]:opacity-100"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            viewBox="0 0 24 24"
                        >
                            <path d="M5 12l4 4L19 6" />
                        </svg>
                    </span>
                    Remember me?
                </label>

                <button type="button" className="text-sm font-bold font-nunito text-[#5E9440] hover:underline">
                    Forgot password?
                </button>
            </div>

            <SubmitButton ready={isFormValid} loading={loading} label="Log In" loadingLabel="Logging in..." />

            {errorMessage && <p className="self-center text-sm text-red-800">{errorMessage}</p>}
        </form>
    );
}
