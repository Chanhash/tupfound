import Spinner from '../components/Spinner';
import { motion } from 'motion/react';

type LoginPageProps = {
    setEmail: React.Dispatch<React.SetStateAction<string>>,
    setPassword: React.Dispatch<React.SetStateAction<string>>,
    isValidEmail: (email: string) => boolean,
    isFormValid: () => boolean,
    errorMessage?: string,
    email: string,
    password: string,
    loading: boolean
};

export default function LoginPage({
    setEmail,
    setPassword,
    isValidEmail,
    isFormValid,
    errorMessage,
    email,
    password,
    loading
}: LoginPageProps) {
    return (
        <div className="flex flex-col gap-2 p-1">
            <p className="text-4xl font-bricolage font-extrabold">Welcome back!</p>
            <p className="font-extralight font-nunito mb-4">Log in to check on your lost and found items.</p>

            <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                    <p className="font-bold text-sm">Email</p>

                    {!isValidEmail(email) && email.length > 0 && (
                        <p className="text-red-500 text-xs">
                            Please enter a valid email address.
                        </p>
                    )}
                </div>

                <input
                    type="email"
                    placeholder="example@gmail.com"
                    className="p-2 px-4 rounded-xl border-2"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </div>

            <div className="flex flex-col gap-1">
                <p className="font-bold text-sm">Password</p>

                <input
                    type="password"
                    placeholder='••••••••'
                    className="p-2 px-4 rounded-xl border-2"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </div>

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

                <button className="text-sm font-bold font-nunito text-[#5E9440] hover:underline">
                    Forgot password?
                </button>
            </div>

            <motion.button
                whileHover={{
                    scale: isFormValid() && !loading ? 1.05 : 1,
                }}
                whileTap={{
                    scale: 0.99
                }}
                animate={{
                    backgroundPosition: isFormValid() && !loading ? "0% 0%" : "100% 0%",
                }}
                transition={{ duration: 0.2 }}
                style={{
                    backgroundSize: "200% 100%",
                    backgroundPosition: "100% 0%",
                    backgroundImage: "linear-gradient(to right, #a1ffb1 50%, #afafaf 50%)"
                }}
                className="px-6 py-4 rounded-lg border mt-2 flex items-center justify-center gap-2"
                type="submit"
            >
                {loading ? "Logging in..." : "Log In"}
                {loading && <Spinner />}
            </motion.button>
            {errorMessage && (
                <p className="self-center text-sm text-red-800  ">Unable to log in! {errorMessage}</p>
            )}
        </div>
    )
}