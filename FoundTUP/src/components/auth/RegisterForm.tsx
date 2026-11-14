import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { MIN_PASSWORD_LENGTH, isValidEmail } from "../../lib/auth";
import type { User } from "../../types";
import Field from "./Field";
import SubmitButton from "./SubmitButton";

export default function RegisterForm({ onSuccess }: { onSuccess: (user: User) => void }) {
    const { register } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [checkEmail, setCheckEmail] = useState(false);

    const passwordTooShort = password.length < MIN_PASSWORD_LENGTH;
    const passwordsMatch = password === confirmPassword;
    const isFormValid = isValidEmail(email) && !passwordTooShort && passwordsMatch;

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!isFormValid || loading) return;

        setLoading(true);
        setErrorMessage("");
        try {
            const result = await register(email, password);
            if (result.user) onSuccess(result.user);
            else setCheckEmail(true);
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "Unable to register.");
        } finally {
            setLoading(false);
        }
    }

    if (checkEmail) {
        return (
            <div className="flex flex-col gap-2 p-1">
                <p className="text-4xl font-bricolage font-extrabold">Check your inbox!</p>
                <p className="font-nunito">
                    We sent a confirmation link to <span className="font-bold">{email}</span>. Confirm it, then log in.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-1" noValidate>
            <p className="text-4xl font-bricolage font-extrabold">Join the hunt!</p>
            <p className="font-extralight font-nunito mb-4">Create an account to report and claim items.</p>

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
                autoComplete="new-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={password.length > 0 && passwordTooShort && `At least ${MIN_PASSWORD_LENGTH} characters.`}
            />

            <Field
                label="Confirm password"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={confirmPassword.length > 0 && !passwordsMatch && "Passwords do not match."}
            />

            <SubmitButton ready={isFormValid} loading={loading} label="Create account" loadingLabel="Creating account..." />

            {errorMessage && <p className="self-center text-sm text-red-800">{errorMessage}</p>}
        </form>
    );
}
