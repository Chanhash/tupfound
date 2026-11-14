import { motion, useReducedMotion } from "motion/react";

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const SPINS = 1;
const STRIP = Array.from({ length: SPINS + 1 }, () => DIGITS).flat();

type OdometerProps = {
    value: number;
    className?: string;
    duration?: number;
};

export default function Odometer({ value, className = "", duration = 1.4 }: OdometerProps) {
    const reduceMotion = useReducedMotion();
    const digits = String(Math.max(0, Math.round(value))).split("").map(Number);

    return (
        <span className={`inline-flex items-start overflow-hidden h-[1em] leading-none tabular-nums ${className}`} aria-label={String(value)} role="img">
            {digits.map((digit, i) => {
                const target = SPINS * DIGITS.length + digit;
                const y = `${-target}em`;

                return (
                    <motion.span
                        key={`${digits.length - i}-${digit}`}
                        className="flex flex-col"
                        aria-hidden="true"
                        initial={{ y: reduceMotion ? y : "0em" }}
                        animate={{ y }}
                        transition={{
                            duration: duration + i * 0.25,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    >
                        {STRIP.map((d, j) => (
                            <span key={j} className="h-[1em] flex items-center justify-center">
                                {d}
                            </span>
                        ))}
                    </motion.span>
                );
            })}
        </span>
    );
}
