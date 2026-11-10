"use client";

import { motion } from "motion/react";

export default function Spinner() {
    return (
        <motion.div
            className="w-5 h-5 rounded-full border border-2 border-gray-300 border-t-[#720000]"
            animate={{ rotate: 360 }}
            transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
            }}
        />
    );
}
