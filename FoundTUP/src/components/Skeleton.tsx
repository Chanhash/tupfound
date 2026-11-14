import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Base block                                                         */
/* ------------------------------------------------------------------ */

type SkeletonProps = {
  className?: string;
  /** Seconds to offset the shimmer, so blocks sweep left-to-right instead of in unison. */
  delay?: number;
};

/**
 * A single placeholder block with a shimmer sweep.
 * Uses a translucent ink tint, so it reads on cream cards AND the pastel stat cards.
 * Respects prefers-reduced-motion (shimmer turns off, block stays).
 */
export function Skeleton({ className = "", delay = 0 }: SkeletonProps) {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden rounded-lg bg-[#23261C]/10 ${className}`}
    >
      {!reduce && (
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(90deg, transparent 0%, rgba(255,253,246,0.75) 50%, transparent 100%)",
          }}
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 1.3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 0.4,
            delay,
          }}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Screen-reader wrapper                                              */
/* ------------------------------------------------------------------ */

/** Wrap any skeleton so screen readers hear "Loading…" once instead of nothing. */
export function LoadingRegion({
  label = "Loading…",
  className = "",
  children,
}: {
  label?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div role="status" aria-live="polite" aria-busy="true" className={className}>
      <span className="sr-only">{label}</span>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section skeletons — drop these INSIDE your existing card divs      */
/* ------------------------------------------------------------------ */

/** Lost / Found / Pending / Retrieved cards. */
export function StatCardSkeleton({ delay = 0 }: { delay?: number }) {
  return (
    <LoadingRegion label="Loading stats" className="flex h-full flex-col justify-evenly gap-3 p-5">
      <Skeleton className="h-4 w-[80%]" delay={delay} />
      <Skeleton className="h-11 w-[50%] rounded-xl" delay={delay + 0.05} />
      <Skeleton className="h-5 w-[65%]" delay={delay + 0.1} />
    </LoadingRegion>
  );
}

/** "Item journey" — five egg stages. */
export function JourneySkeleton() {
  return (
    <LoadingRegion label="Loading item journey" className="flex h-full flex-col gap-5 p-6">
      <div className="flex items-baseline gap-3">
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-5 w-48" delay={0.05} />
      </div>

      <div className="grid flex-1 grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#C9C0A2] px-3 py-4"
          >
            {/* egg-shaped placeholder */}
            <Skeleton
              className="h-[52px] w-[44px] rounded-[50%_50%_46%_46%/60%_60%_40%_40%]"
              delay={i * 0.08}
            />
            <Skeleton className="h-4 w-20" delay={i * 0.08 + 0.05} />
            <Skeleton className="h-7 w-10 rounded-md" delay={i * 0.08 + 0.1} />
            <Skeleton className="h-3 w-24" delay={i * 0.08 + 0.15} />
          </div>
        ))}
      </div>
    </LoadingRegion>
  );
}

/** "This week" bar chart. */
const BAR_HEIGHTS: [number, number][] = [
  [70, 50], [30, 90], [55, 75], [15, 35], [55, 55], [30, 30], [15, 35],
];

export function ChartSkeleton() {
  return (
    <LoadingRegion label="Loading chart" className="flex h-full flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-28" />
        <div className="flex gap-3">
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-4 w-14" />
        </div>
      </div>

      <div className="flex flex-1 items-end gap-2.5 border-b-[2.5px] border-[#23261C]">
        {BAR_HEIGHTS.map(([a, b], i) => (
          <div key={i} className="flex h-full flex-1 items-end justify-center gap-1">
            {[a, b].map((h, j) => (
              // height set on a wrapper so Skeleton stays generic
              <div key={j} className="flex h-full w-[40%] max-w-[18px] items-end">
                <div className="w-full" style={{ height: `${h}%` }}>
                  <Skeleton
                    className="h-full w-full rounded-b-none rounded-t-[9px]"
                    delay={i * 0.06 + j * 0.03}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="-mt-1.5 flex gap-2.5">
        {BAR_HEIGHTS.map((_, i) => (
          <div key={i} className="flex flex-1 justify-center">
            <Skeleton className="h-3 w-7" delay={i * 0.06} />
          </div>
        ))}
      </div>
    </LoadingRegion>
  );
}

/** "Reports to review" list. */
export function ReviewListSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <LoadingRegion label="Loading reports" className="flex h-full flex-col gap-3 p-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-44" />
        <Skeleton className="h-4 w-12" />
      </div>

      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 border-b-2 border-dashed border-[#E2DBC4] py-2.5"
        >
          <Skeleton className="h-11 w-11 shrink-0 rounded-xl" delay={i * 0.08} />
          <div className="flex flex-1 flex-col gap-1.5">
            <Skeleton className="h-4 w-36" delay={i * 0.08 + 0.04} />
            <Skeleton className="h-3 w-48" delay={i * 0.08 + 0.08} />
          </div>
          <Skeleton className="h-6 w-14 rounded-full" delay={i * 0.08 + 0.12} />
          <Skeleton className="h-11 w-11 rounded-xl" delay={i * 0.08 + 0.16} />
          <Skeleton className="h-11 w-11 rounded-xl" delay={i * 0.08 + 0.2} />
        </div>
      ))}
    </LoadingRegion>
  );
}

/** "Retrieval requests" table. */
const COL_WIDTHS = ["w-20", "w-36", "w-24", "w-14", "w-24"];

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <LoadingRegion label="Loading requests" className="flex h-full flex-col gap-3 p-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-44" />
        <Skeleton className="h-4 w-16" />
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[560px]">
          {/* header */}
          <div className="grid grid-cols-5 gap-4 border-b-[2.5px] border-[#23261C] px-2.5 py-2">
            {COL_WIDTHS.map((_, i) => (
              <Skeleton key={i} className="h-3 w-16" />
            ))}
          </div>
          {/* rows */}
          {Array.from({ length: rows }).map((_, r) => (
            <div
              key={r}
              className="grid grid-cols-5 items-center gap-4 border-b-2 border-dashed border-[#E2DBC4] px-2.5 py-4"
            >
              {COL_WIDTHS.map((w, c) => (
                <Skeleton
                  key={c}
                  className={`${c === 4 ? "h-6 rounded-full" : "h-4"} ${w}`}
                  delay={r * 0.08 + c * 0.04}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </LoadingRegion>
  );
}

/** "By category" progress bars. */
const CAT_WIDTHS = ["100%", "76%", "68%", "54%", "41%", "28%"];

export function CategorySkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <LoadingRegion label="Loading categories" className="flex h-full flex-col gap-4 p-6">
      <Skeleton className="h-6 w-32" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex flex-col gap-1.5">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-28" delay={i * 0.08} />
            <Skeleton className="h-4 w-6" delay={i * 0.08} />
          </div>
          <div className="h-3.5 overflow-hidden rounded-full border-2 border-[#23261C] bg-[#EFE8D2]">
            <div style={{ width: CAT_WIDTHS[i % CAT_WIDTHS.length] }} className="h-full">
              <Skeleton className="h-full w-full rounded-none" delay={i * 0.08 + 0.05} />
            </div>
          </div>
        </div>
      ))}
    </LoadingRegion>
  );
}

/* ------------------------------------------------------------------ */
/*  Whole-dashboard version — cards + content, same grid slots as      */
/*  your AdminDashboard (place it right after the header row).         */
/* ------------------------------------------------------------------ */

const card =
  "border-2 border-[#23261C] rounded-3xl shadow-[4px_4px_0px_#23261C] overflow-hidden";

export function DashboardSkeleton() {
  return (
    <>
      <div className={`col-span-3 m-4 bg-[#F8D9C6] ${card}`}><StatCardSkeleton delay={0} /></div>
      <div className={`col-span-3 m-4 bg-[#DCEFC6] ${card}`}><StatCardSkeleton delay={0.1} /></div>
      <div className={`col-span-3 m-4 bg-[#FBE7A6] ${card}`}><StatCardSkeleton delay={0.2} /></div>
      <div className={`col-span-3 m-4 bg-[#CFE6F2] ${card}`}><StatCardSkeleton delay={0.3} /></div>

      <div className={`col-span-12 mx-4 bg-[#FFFDF6] ${card}`}><JourneySkeleton /></div>

      <div className={`col-span-6 mx-4 bg-[#FFFDF6] ${card}`}><ChartSkeleton /></div>
      <div className={`col-span-6 mx-4 bg-[#FFFDF6] ${card}`}><ReviewListSkeleton /></div>

      <div className={`col-span-8 mx-4 bg-[#FFFDF6] ${card}`}><TableSkeleton /></div>
      <div className={`col-span-4 mx-4 bg-[#FFFDF6] ${card}`}><CategorySkeleton /></div>
    </>
  );
}
