import { useAuth } from "../../contexts/AuthContext";

type NavItem = { label: string; iconPaths: string[] };

const NAV_ITEMS: NavItem[] = [
    { label: "Dashboard", iconPaths: ["M20 3h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1m-1 8h-4V5h4zm-9-8H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1M9 7H5V5h4zm11 8h-6c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1m-1 4h-4v-2h4zm-9-8H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1m-1 8H5v-6h4z"] },
    { label: "Items", iconPaths: ["M21.93 7.66c-.02-.05-.04-.11-.07-.16a1 1 0 0 0-.06-.08c-.03-.04-.06-.09-.1-.12-.03-.03-.06-.04-.09-.07-.04-.03-.07-.06-.11-.09h-.01l-9-5.01a.99.99 0 0 0-.97 0l-9.01 5H2.5c-.04.02-.07.06-.11.09a.6.6 0 0 0-.09.07c-.04.04-.07.08-.1.12-.02.03-.05.05-.06.08-.03.05-.05.1-.07.16-.01.03-.03.05-.03.08-.02.08-.04.17-.04.26v8c0 .36.2.7.51.87l9 5 .15.06c.03.01.06.03.09.03a1.1 1.1 0 0 0 .5 0c.03 0 .06-.02.09-.03.05-.02.1-.03.15-.06l9-5c.32-.18.51-.51.51-.87v-8c0-.09-.01-.18-.04-.26 0-.03-.02-.05-.03-.08ZM12 4.15l6.94 3.86-2.44 1.36-6.94-3.86zm-4.5 2.5 6.94 3.86L12 11.87 5.06 8.01zM4 9.71l7 3.89v5.71l-7-3.89zm16 5.71-7 3.89V13.6l2.5-1.39v3.21l2-1.11V11.1L20 9.71z"] },
    { label: "Reports", iconPaths: ["M6 15h8v2H6zm0-4h12v2H6zm0-4h12v2H6z", "M4 21h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2M4 5h16v14H4z"] },
    { label: "Requests", iconPaths: ["M18 4h2v16h-2zm-8 13 6-5-6-5v4H3v2h7z"] },
    { label: "Item Tracking", iconPaths: ["M20 4h-8.59L10 2.59C9.62 2.21 9.12 2 8.59 2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 14H4V6h16z", "M8 11.5c0 1.93 1.57 3.5 3.5 3.5.73 0 1.41-.23 1.97-.61l1.82 1.82 1.41-1.41-1.97-1.97c.17-.41.26-.85.26-1.32 0-1.93-1.57-3.5-3.5-3.5s-3.5 1.57-3.5 3.5Zm5 0c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5"] },
    { label: "Clients", iconPaths: ["M22 11h-3V8h-2v3h-3v2h3v3h2v-3h3zM4 8c0 2.28 1.72 4 4 4s4-1.72 4-4-1.72-4-4-4-4 1.72-4 4m6 0c0 1.18-.82 2-2 2s-2-.82-2-2 .82-2 2-2 2 .82 2 2M3 20h10c.55 0 1-.45 1-1v-1c0-2.76-2.24-5-5-5H7c-2.76 0-5 2.24-5 5v1c0 .55.45 1 1 1m4-5h2c1.65 0 3 1.35 3 3H4c0-1.65 1.35-3 3-3"] },
    { label: "Categories", iconPaths: ["M3 3h4v4H3zm7 0h4v4h-4z", "M10 3h4v4h-4zm7 0h4v4h-4zM3 17h4v4H3zm7 0h4v4h-4z", "M10 17h4v4h-4zm7 0h4v4h-4zM3 10h4v4H3zm7 0h4v4h-4z", "M10 10h4v4h-4zm7 0h4v4h-4z"] },
];

const BASE = "text-left text-lg font-nunito font-bold inline-flex items-center gap-3";
const ACTIVE = "border-2 rounded-xl p-2 bg-[#DCEFC6] text-[#23261C] shadow-[4px_4px_0px_#000000]";
const INACTIVE = "text-[#5B5A4A]";

export default function AdminSidebar({ active }: { active: string }) {
    const { logout } = useAuth();

    return (
        <nav className="min-h-screen bg-[#FFFDF6] border-r-2 border-[#23261C] flex flex-col p-5 gap-8">
            <p className="self-center font-bricolage font-extrabold text-4xl mb-2">findly</p>

            {NAV_ITEMS.map(({ label, iconPaths }) => (
                <button key={label} type="button" className={`${BASE} ${label === active ? ACTIVE : INACTIVE}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        {iconPaths.map((d) => <path key={d} d={d} />)}
                    </svg>
                    {label}
                </button>
            ))}

            <button type="button" onClick={logout} className={`${BASE} ${INACTIVE} mt-auto`}>
                Log out
            </button>
        </nav>
    );
}
