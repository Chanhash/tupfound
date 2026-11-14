import { useAuth } from "../contexts/AuthContext";

export default function Home() {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen flex flex-col justify-center items-center gap-4 bg-[#F3EEDF] font-nunito">
            <p className="font-bricolage font-extrabold text-4xl">findly</p>
            <p>Logged in as <span className="font-bold">{user?.email}</span></p>
            <button
                type="button"
                onClick={logout}
                className="border-2 rounded-xl px-6 py-2 font-bold bg-[#FFFDF6] shadow-[4px_4px_0px_#000000]"
            >
                Log out
            </button>
        </div>
    );
}
