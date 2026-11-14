import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { StatCardSkeleton, JourneySkeleton } from "../components/Skeleton";
import AdminSidebar from "../components/admin/AdminSidebar";
import Odometer from "../components/Odometer";
import { api } from "../lib/api";
import type { AdminStats } from "../types";
import { BackPlates, FootprintTrail, Egg, Hatchling } from "../components/FindlyArt";

export default function AdminDashboard() {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        api<AdminStats>("/admin/stats")
            .then((data) => { if (!cancelled) setStats(data); })
            .catch((e: Error) => { if (!cancelled) setError(e.message); });
        return () => { cancelled = true; };
    }, []);

    const isLoading = stats === null && error === null;

    return (
        <div className="grid grid-cols-[275px_1fr] min-h-screen bg-[#F3EEDF]">
            <AdminSidebar active="Dashboard" />

            {/* Main content */}
            <div className="grid grid-cols-12 grid-rows-[80px_250px_380px_600px_600px] gap-x-4 gap-y-8 p-12 font-bricolage">
                <div className="col-span-6 -mt-2">
                    <p className="font-gaegu text-3xl -rotate-2 -mt-4 pb-4 text-[#5E9440] font-bold">Welcome back, keeper of lost things</p>
                    <p className="font-extrabold text-5xl">Admin dashboard</p>
                    {error && <p className="font-nunito text-sm text-red-800 mt-2">Couldn't load dashboard data: {error}</p>}
                </div>
                <div className="col-span-6 flex flex-row gap-6 py-2.5">
                    <input
                        type="text"
                        placeholder="Dig up an item, ID or owner..."
                        className="border-2 border-[#23261C] rounded-xl px-5 py-4 w-[60%] bg-[#FFFDF6]"></input>
                    <button type="button" className="relative border p-4 rounded-xl border-2 bg-[#FFFDF6]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            fill="currentColor" viewBox="0 0 24 24" >
                            <path d="M19 12.59V10c0-3.22-2.18-5.93-5.14-6.74C13.57 2.52 12.85 2 12 2s-1.56.52-1.86 1.26C7.18 4.08 5 6.790 5 10v2.59L3.29 14.3a1 1 0 0 0-.29.71v2c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-2c0-.27-.11-.52-.29-.71zM19 16H5v-.59l1.71-1.71a1 1 0 0 0 .29-.71v-3c0-2.76 2.240-5 5-5s5 2.24 5 5v3c0 .27.11.52.29.71L19 15.41zM14.82 20H9.18c.41 1.17 1.51 2 2.82 2s2.41-.83 2.82-2" />
                        </svg>
                        <div className="absolute -top-2 -right-2 rounded-full w-6 h-6 bg-[#D9774A] border-2" />
                    </button>
                    <button type="button" className="border rounded-xl border-2 px-10 font-nunito font-bold bg-[#6FA34B] shadow-[4px_4px_0px_#000000]">
                        <span className="text-[#FFFDF6]">+ New item</span>
                    </button>
                </div>

                {/* Lost Items */}
                <div className="col-span-3 bg-[#F8D9C6] border-2 border-[#23261C] rounded-3xl m-4 shadow-[4px_4px_0px_#000000]">
                    <div className="relative">
                        <BackPlates className="absolute -top-8 left-6 h-8 w-auto" fill="#D9774A" />
                    </div>
                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div key="skel" exit={{ opacity: 0 }} className="h-full">
                                <StatCardSkeleton />
                            </motion.div>
                        ) : (
                            <motion.div key="data" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-5">
                                <p className="font-nunito font-extrabold text-lg text-[#6E2E12]">Lost items</p>
                                <p className="text-8xl font-bricolage font-extrabold">
                                    {stats ? <Odometer value={stats.lost} /> : "–"}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Found Items */}
                <div className="col-span-3 bg-[#DCEFC6] border-3 border-xl rounded-3xl m-4 shadow-[4px_4px_0px_#000000]">
                    <div className="relative">
                        <BackPlates className="absolute -top-8 left-6 h-8 w-auto" fill="#5E9440" />
                    </div>
                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div key="skel" exit={{ opacity: 0 }} className="h-full">
                                <StatCardSkeleton />
                            </motion.div>
                        ) : (
                            <motion.div key="data" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-5">
                                <p className="font-nunito font-extrabold text-lg text-[#6E2E12]">Found items</p>
                                <p className="text-8xl font-bricolage font-extrabold">
                                    {stats ? <Odometer value={stats.found} /> : "–"}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Pending */}
                <div className="col-span-3 bg-[#FBE7A6] border-3 border-xl rounded-3xl m-4 shadow-[4px_4px_0px_#000000]">
                    <div className="relative">
                        <BackPlates className="absolute -top-8 left-6 h-8 w-auto" fill="#F2B544" />
                    </div>
                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div key="skel" exit={{ opacity: 0 }} className="h-full">
                                <StatCardSkeleton />
                            </motion.div>
                        ) : (
                            <motion.div key="data" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-5">
                                <p className="font-nunito font-extrabold text-lg text-[#6E2E12]">Pending reports</p>
                                <p className="text-8xl font-bricolage font-extrabold">
                                    {stats ? <Odometer value={stats.reported} /> : "–"}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Retrieved */}
                <div className="col-span-3 bg-[#CFE6F2] border-3 border-xl rounded-3xl m-4 shadow-[4px_4px_0px_#000000]">
                    <div className="relative">
                        <BackPlates className="absolute -top-8 left-6 h-8 w-auto" fill="#6AAED0" />
                    </div>
                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div key="skel" exit={{ opacity: 0 }} className="h-full">
                                <StatCardSkeleton />
                            </motion.div>
                        ) : (
                            <motion.div key="data" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-5">
                                <p className="font-nunito font-extrabold text-lg text-[#6E2E12]">Retrieved items</p>
                                <p className="text-8xl font-bricolage font-extrabold">
                                    {stats ? <Odometer value={stats.retrieved} /> : "–"}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Item journey */}
                <div className="col-span-12 bg-[#FFFDF6] border-3 border-xl rounded-3xl mx-4 shadow-[4px_4px_0px_#000000]">
                    {isLoading
                        ? <JourneySkeleton />
                        : <div className="p-4 mx-5 text-bricolage">
                            <p className="font-bricolage text-3xl font-extrabold">
                                Item journey
                                <span className="font-gaegu ml-4 text-[#5B5A4A] text-2xl">every item spawns as an egg...</span>
                            </p>
                            <motion.div initial={{ opacity:0, y:5 }} animate={{ opacity: 1, y: 0 }} className="flex flex-row mt-4 justify-between">
                                <div className="gap-2 flex flex-col items-center justify-center border-2 w-55 h-60 rounded-2xl border-[#E2DBC4] border-dashed">
                                    <Egg className="w-20 h-20"/>
                                    <p className="font-extrabold">1 · Reported</p>
                                    {stats ? <Odometer className="font-extrabold text-5xl" value={stats.reported} /> : "–"}
                                    <p className="text-sm text-[#5B5A4A]">Waiting for review</p>
                                </div>
                                <div className="flex flex-col items-center justify-center border-2 w-55 h-60 rounded-2xl border-[#E2DBC4] border-dashed">
                                    <Egg className="w-20 h-20" stage="registered"/>
                                    <p className="font-extrabold">2 · Registered</p>
                                    {stats ? <Odometer className="font-extrabold text-5xl" value={stats.lost + stats.found} /> : "–"}
                                    <p className="text-sm text-[#5B5A4A]">Logged as lost or found</p>
                                </div>
                                <div className="flex flex-col items-center justify-center border-2 w-55 h-60 rounded-2xl border-[#E2DBC4] border-dashed">
                                    <Egg className="w-20 h-20" stage="matched" />
                                    <p className="font-extrabold">3 · Matched</p>
                                    {stats ? <Odometer className="font-extrabold text-5xl" value={stats.matched} /> : "–"}
                                    <p className="text-sm text-[#5B5A4A]">Owner asked for it</p>
                                </div>
                                <div className="flex flex-col items-center justify-center border-2 w-55 h-60 rounded-2xl border-[#E2DBC4] border-dashed">
                                    <Egg className="w-20 h-20" stage="ready"/>
                                    <p className="font-extrabold">4 · Ready</p>
                                    {stats ? <Odometer className="font-extrabold text-5xl" value={stats.ready} /> : "–"}
                                    <p className="text-sm text-[#5B5A4A]">Verified, set for pickup</p>
                                </div>
                                <div className="flex flex-col items-center justify-center border-2 w-55 h-60 rounded-2xl bg-[#DCEFC6]">
                                    <Hatchling className="w-20 h-20"/>
                                    <p className="font-extrabold">5 · Retrieved</p>
                                    {stats ? <Odometer className="font-extrabold text-5xl" value={stats.retrieved} /> : "–"}
                                    <p className="text-sm text-[#5B5A4A]">Hatched! Back home</p>
                                </div>
                            </motion.div>
                            <div className="mt-5">
                                <FootprintTrail />
                            </div>
                        </div>}
                </div>

                {/* This week chart */}
                <div className="col-span-6 bg-[#FFFDF6] border-3 border-xl rounded-3xl mx-4 shadow-[4px_4px_0px_#000000]">

                </div>

                {/* Reports to review */}
                <div className="col-span-6 bg-[#FFFDF6] border-3 border-xl rounded-3xl mx-4 shadow-[4px_4px_0px_#000000]">

                </div>

                {/* Retrieval requests */}
                <div className="col-span-8 bg-[#FFFDF6] border-2 rounded-3xl mx-4 shadow-[4px_4px_0px_#000000]">
                </div>

                {/* By category */}
                <div className="col-span-4 bg-[#FFFDF6] border-2 rounded-3xl mx-4 shadow-[4px_4px_0px_#000000]">
                </div>

            </div>
        </div>
    );
}
