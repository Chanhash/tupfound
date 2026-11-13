/**
 * Findly — dino illustrations & icons
 * React + TypeScript + Tailwind
 *
 * Every component accepts normal SVG props, so size it with Tailwind:
 *   <DinoMascot className="h-10 w-auto" />
 *   <Footprint className="h-5 w-5 text-dino-ink" />
 *
 * Components that use `currentColor` take their color from Tailwind `text-*`.
 * The dino drawings also take color props (body, plates…) so you can theme them.
 */
import type { SVGProps } from "react";

type SvgProps = SVGProps<SVGSVGElement>;

/* Palette used across the drawings (copy into tailwind.config if you like):
   ink #23261C · moss #5E9440 · leaf #6FA34B · light-leaf #9CCB6E
   yolk #F2B544 · terracotta #D9774A · sky #6AAED0 · eggshell #FFF6DC · blush #F29A8E */
const INK = "#23261C";

/* ------------------------------------------------------------------ */
/* Dino mascot (logo)                                                  */
/* ------------------------------------------------------------------ */
export function DinoMascot({
  body = "#5E9440",
  plates = "#F2B544",
  blush = "#F29A8E",
  ...props
}: SvgProps & { body?: string; plates?: string; blush?: string }) {
  return (
    <svg viewBox="0 0 120 90" fill="none" aria-hidden="true" {...props}>
      <g stroke={INK} strokeWidth={3} strokeLinejoin="round" strokeLinecap="round">
        <polygon points="50,40 56,24 63,38" fill={plates} />
        <polygon points="62,37 70,20 76,36" fill={plates} />
        <polygon points="74,38 83,24 87,42" fill={plates} />
        <rect x="44" y="66" width="10" height="16" rx="4" fill={body} />
        <rect x="78" y="66" width="10" height="16" rx="4" fill={body} />
        <path d="M92 54 C106 56 114 52 118 42 C117 58 106 68 88 66 Z" fill={body} />
        <ellipse cx="66" cy="57" rx="31" ry="20" fill={body} />
        <path
          d="M42 50 C40 36 37 26 32 21 C27 14 32 5 43 6 C54 7 57 15 52 22 C49 28 52 36 58 40"
          fill={body}
        />
      </g>
      <circle cx="44" cy="13" r="2.6" fill={INK} />
      <ellipse cx="38" cy="18" rx="3.2" ry="2" fill={blush} />
      <ellipse cx="66" cy="62" rx="16" ry="8" fill="#FFFFFF" opacity={0.25} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Big sniffing dino scene (login page)                                */
/* ------------------------------------------------------------------ */
export function DinoSniffScene({
  body = "#5E9440",
  plates = "#F2B544",
  ...props
}: SvgProps & { body?: string; plates?: string }) {
  return (
    <svg viewBox="0 0 420 300" fill="none" aria-hidden="true" {...props}>
      <g stroke={INK} strokeWidth={4} strokeLinejoin="round" strokeLinecap="round">
        {/* ground */}
        <path d="M0 270 C80 262 160 274 240 266 C320 258 380 270 420 264" fill="none" />
        {/* fern */}
        <path d="M360 268 C356 220 368 190 392 168 C384 206 380 236 384 268 Z" fill="#6FA34B" />
        <path d="M378 268 C390 236 408 222 420 218 C412 238 404 252 402 268 Z" fill="#9CCB6E" />
        {/* tail */}
        <path d="M70 200 C40 196 20 186 6 168 C18 200 46 222 84 222 Z" fill={body} />
        {/* plates */}
        <polygon points="100,150 112,118 128,146" fill={plates} />
        <polygon points="126,140 142,104 160,136" fill={plates} />
        <polygon points="158,136 176,104 190,140" fill={plates} />
        <polygon points="188,142 204,116 214,152" fill={plates} />
        {/* legs */}
        <rect x="96" y="214" width="26" height="50" rx="10" fill={body} />
        <rect x="186" y="214" width="26" height="50" rx="10" fill={body} />
        {/* body */}
        <ellipse cx="154" cy="194" rx="88" ry="54" fill={body} />
        {/* neck + head */}
        <path
          d="M218 178 C246 172 262 190 272 212 C278 224 290 230 304 230 C326 230 334 214 324 200 C314 186 290 186 276 176 C262 166 240 158 222 162"
          fill={body}
        />
      </g>
      <ellipse cx="150" cy="214" rx="56" ry="22" fill="#FFFFFF" opacity={0.2} />
      {/* happy closed eye + blush */}
      <path d="M296 200 q6 -6 12 0" stroke={INK} strokeWidth={3.5} strokeLinecap="round" />
      <ellipse cx="312" cy="214" rx="6" ry="3.5" fill="#F29A8E" />
      {/* sniff lines */}
      <path d="M336 214 l12 -4 M338 224 l14 2" stroke={INK} strokeWidth={3} strokeLinecap="round" />
      {/* lost backpack */}
      <g stroke={INK} strokeWidth={4} strokeLinejoin="round">
        <rect x="350" y="222" width="40" height="44" rx="10" fill="#D9774A" />
        <path d="M360 222 v-8 a10 10 0 0 1 20 0 v8" fill="none" />
        <rect x="358" y="240" width="24" height="14" rx="4" fill="#F8D9C6" />
      </g>
      <Sparkle4 x={384} y={196} />
    </svg>
  );
}

function Sparkle4({ x, y }: { x: number; y: number }) {
  return (
    <path
      transform={`translate(${x - 384} ${y - 196})`}
      d="M398 196 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4z"
      fill="#F2B544"
      stroke={INK}
      strokeWidth={2.5}
      strokeLinejoin="round"
    />
  );
}

/** Standalone sparkle */
export function Sparkle(props: SvgProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <path
        d="M16 2 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4z"
        fill="#F2B544"
        stroke={INK}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Stegosaurus back plates (peek over the top of summary cards)        */
/* Use: <div className="relative"><BackPlates className="absolute -top-5 left-6 h-6 w-auto" fill="#D9774A" />… */
/* ------------------------------------------------------------------ */
export function BackPlates({ fill = "#6FA34B", ...props }: SvgProps & { fill?: string }) {
  return (
    <svg viewBox="0 0 90 22" fill="none" aria-hidden="true" {...props}>
      <g fill={fill} stroke={INK} strokeWidth={2.4} strokeLinejoin="round">
        <polygon points="2,22 14,2 26,22" />
        <polygon points="24,22 38,0 52,22" />
        <polygon points="50,22 62,4 74,22" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Egg stages (item journey)                                           */
/* ------------------------------------------------------------------ */
const EGG_PATH = "M20 3 C30 3 36 18 36 29 C36 39 29 45 20 45 C11 45 4 39 4 29 C4 18 10 3 20 3Z";

export type EggStage = "reported" | "registered" | "matched" | "ready";

/** Stage 1–4 eggs. Stage 5 is <Hatchling />. */
export function Egg({
  stage = "reported",
  spot = "#9CCB6E",
  shell = "#FFF6DC",
  ...props
}: SvgProps & { stage?: EggStage; spot?: string; shell?: string }) {
  return (
    <svg viewBox="0 0 40 48" fill="none" aria-hidden="true" {...props}>
      <path d={EGG_PATH} fill={shell} stroke={INK} strokeWidth={2.6} />
      {stage === "registered" && (
        <>
          <circle cx="14" cy="20" r="3" fill={spot} />
          <circle cx="25" cy="30" r="4" fill={spot} />
          <circle cx="13" cy="35" r="2.2" fill={spot} />
        </>
      )}
      {stage === "matched" && (
        <>
          <circle cx="14" cy="32" r="3" fill={spot} />
          <circle cx="26" cy="36" r="2.4" fill={spot} />
          <path
            d="M7 22 L13 26 L18 20 L23 26 L28 21 L33 24"
            stroke={INK}
            strokeWidth={2.2}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </>
      )}
      {stage === "ready" && (
        <>
          <path
            d="M5 26 L11 20 L15 27 L20 18 L25 27 L29 19 L35 25"
            stroke={INK}
            strokeWidth={2.2}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path d="M20 18 L18 12" stroke={INK} strokeWidth={2.2} strokeLinecap="round" />
          <circle cx="20" cy="34" r="3" fill={spot} />
        </>
      )}
    </svg>
  );
}

/** Timeline egg: done (green + check), now (yellow), future (dashed) */
export function TimelineEgg({
  state,
  ...props
}: SvgProps & { state: "done" | "now" | "future" }) {
  const fill = state === "done" ? "#DCEFC6" : state === "now" ? "#FBE7A6" : "#FFFDF6";
  const stroke = state === "future" ? "#B9AF8E" : INK;
  return (
    <svg viewBox="0 0 40 48" fill="none" aria-hidden="true" {...props}>
      <path
        d={EGG_PATH}
        fill={fill}
        stroke={stroke}
        strokeWidth={2.6}
        strokeDasharray={state === "future" ? "5 4" : undefined}
      />
      {state === "done" && (
        <path
          d="M12 27 L18 33 L29 21"
          stroke={INK}
          strokeWidth={3.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

/** "New category" egg with a plus */
export function EggPlus(props: SvgProps) {
  return (
    <svg viewBox="0 0 40 48" fill="none" aria-hidden="true" {...props}>
      <path d={EGG_PATH} fill="#FFF6DC" stroke={INK} strokeWidth={2.6} />
      <path d="M20 20v16M12 28h16" stroke={INK} strokeWidth={3} strokeLinecap="round" />
    </svg>
  );
}

/** Stage 5: baby dino popping out of its shell */
export function Hatchling({ body = "#5E9440", ...props }: SvgProps & { body?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
      <g stroke={INK} strokeWidth={2.6} strokeLinejoin="round">
        <path d="M17 26 C14 18 16 8 25 7 C34 6 37 14 34 20 C32 24 32 26 32 28" fill={body} />
        <path
          d="M6 28 L12 22 L17 28 L24 21 L31 28 L36 22 L42 28 C42 39 35 45 24 45 C13 45 6 39 6 28Z"
          fill="#FFF6DC"
        />
      </g>
      <circle cx="28" cy="13" r="2" fill={INK} />
      <ellipse cx="23" cy="17" rx="2.6" ry="1.6" fill="#F29A8E" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Footprint (uses currentColor → text-*)                              */
/* ------------------------------------------------------------------ */
export function Footprint(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <ellipse cx="12" cy="15.5" rx="5" ry="5.5" />
      <ellipse cx="5.5" cy="8" rx="2" ry="3.4" transform="rotate(-25 5.5 8)" />
      <ellipse cx="12" cy="5" rx="2" ry="3.4" />
      <ellipse cx="18.5" cy="8" rx="2" ry="3.4" transform="rotate(25 18.5 8)" />
    </svg>
  );
}

/** A row of alternating footprints, e.g. under the item journey */
export function FootprintTrail({ count = 16, className = "" }: { count?: number; className?: string }) {
  return (
    <div aria-hidden="true" className={`flex justify-between gap-1.5 overflow-hidden opacity-35 ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <Footprint
          key={i}
          className="h-[18px] w-[18px] shrink-0 text-[#23261C]"
          style={{ transform: `rotate(90deg) translateX(${i % 2 ? 5 : -5}px)` }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Fern leaves (sidebar "rawr!" card decoration)                       */
/* ------------------------------------------------------------------ */
export function Ferns(props: SvgProps) {
  return (
    <svg viewBox="0 0 64 40" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6 38 C10 22 20 10 32 4 C26 16 24 28 26 38 Z"
        fill="#9CCB6E"
        stroke={INK}
        strokeWidth={2.4}
        strokeLinejoin="round"
      />
      <path
        d="M28 38 C34 26 46 18 60 16 C50 24 44 32 44 38 Z"
        fill="#6FA34B"
        stroke={INK}
        strokeWidth={2.4}
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Line icons (currentColor, 24×24). Sidebar, buttons, categories.     */
/* ------------------------------------------------------------------ */
function Line({ children, strokeWidth = 2.2, ...props }: SvgProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const IconDashboard = (p: SvgProps) => (
  <Line {...p}>
    <rect x="3" y="3" width="7" height="9" rx="2" />
    <rect x="14" y="3" width="7" height="5" rx="2" />
    <rect x="14" y="12" width="7" height="9" rx="2" />
    <rect x="3" y="16" width="7" height="5" rx="2" />
  </Line>
);
export const IconBox = (p: SvgProps) => (
  <Line {...p}>
    <path d="M21 8l-9-5-9 5 9 5 9-5z" />
    <path d="M3 8v8l9 5 9-5V8" />
  </Line>
);
export const IconReview = (p: SvgProps) => (
  <Line {...p}>
    <path d="M9 11l3 3 8-8" />
    <path d="M20 12v7a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2h9" />
  </Line>
);
export const IconArrowRight = (p: SvgProps) => (
  <Line {...p}>
    <path d="M20 12H4" />
    <path d="M14 6l6 6-6 6" />
  </Line>
);
export const IconUsers = (p: SvgProps) => (
  <Line {...p}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20c.8-3.4 3.4-5 6.5-5s5.7 1.6 6.5 5" />
    <path d="M16 4.5a3.5 3.5 0 010 7" />
    <path d="M18 15c2 .6 3.2 2.3 3.5 5" />
  </Line>
);
export const IconBookmark = (p: SvgProps) => (
  <Line {...p}>
    <path d="M7 3h10v18l-5-4-5 4V3z" />
  </Line>
);
export const IconSearch = (p: SvgProps) => (
  <Line strokeWidth={2.4} {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M20 20l-4.2-4.2" />
  </Line>
);
export const IconBell = (p: SvgProps) => (
  <Line {...p}>
    <path d="M6 9a6 6 0 0112 0c0 6 2.5 7.5 2.5 7.5h-17S6 15 6 9z" />
    <path d="M10 20a2 2 0 004 0" />
  </Line>
);
export const IconPlus = (p: SvgProps) => (
  <Line strokeWidth={3} {...p}>
    <path d="M12 5v14M5 12h14" />
  </Line>
);
export const IconCheck = (p: SvgProps) => (
  <Line strokeWidth={3} {...p}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Line>
);
export const IconX = (p: SvgProps) => (
  <Line strokeWidth={3} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Line>
);
export const IconEye = (p: SvgProps) => (
  <Line strokeWidth={2.4} {...p}>
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </Line>
);
export const IconEdit = (p: SvgProps) => (
  <Line strokeWidth={2.4} {...p}>
    <path d="M4 20h4L19 9l-4-4L4 16v4z" />
  </Line>
);
export const IconTrash = (p: SvgProps) => (
  <Line strokeWidth={2.4} {...p}>
    <path d="M4 7h16" />
    <path d="M9 7V4h6v3" />
    <path d="M6 7l1 13h10l1-13" />
  </Line>
);
export const IconDownload = (p: SvgProps) => (
  <Line strokeWidth={2.4} {...p}>
    <path d="M12 4v12M7 11l5 5 5-5" />
    <path d="M4 20h16" />
  </Line>
);
export const IconCamera = (p: SvgProps) => (
  <Line {...p}>
    <rect x="3" y="6" width="18" height="14" rx="3" />
    <circle cx="12" cy="13" r="3.5" />
    <path d="M8 6l1.5-2h5L16 6" />
  </Line>
);
export const IconImage = (p: SvgProps) => (
  <Line strokeWidth={2} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <circle cx="9" cy="10" r="1.8" />
    <path d="M21 16l-5-5-8 8" />
  </Line>
);

/* Category icons */
export const IconPhone = (p: SvgProps) => (
  <Line {...p}>
    <path d="M7 2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2zM11 18h2" />
  </Line>
);
export const IconBag = (p: SvgProps) => (
  <Line {...p}>
    <path d="M5 8h14l-1 12H6L5 8zM9 8V6a3 3 0 016 0v2" />
  </Line>
);
export const IconIdCard = (p: SvgProps) => (
  <Line {...p}>
    <path d="M3 6h18v12H3zM7 10h4M7 14h6M16 10h2" />
  </Line>
);
export const IconBottle = (p: SvgProps) => (
  <Line {...p}>
    <path d="M10 2h4v3l2 3v12a2 2 0 01-2 2h-4a2 2 0 01-2-2V8l2-3V2zM8 12h8" />
  </Line>
);
export const IconShirt = (p: SvgProps) => (
  <Line {...p}>
    <path d="M8 3l-5 4 3 4 2-1v11h8V10l2 1 3-4-5-4c-1 2-2 3-4 3S9 5 8 3z" />
  </Line>
);
export const IconKey = (p: SvgProps) => (
  <Line {...p}>
    <path d="M8 15a4 4 0 110-8 4 4 0 010 8zM12 11h9M18 11v3M21 11v2" />
  </Line>
);
export const IconBook = (p: SvgProps) => (
  <Line {...p}>
    <path d="M4 4h12a3 3 0 013 3v13H7a3 3 0 01-3-3V4zM4 17a3 3 0 013-3h12" />
  </Line>
);
export const IconUmbrella = (p: SvgProps) => (
  <Line {...p}>
    <path d="M12 3a9 9 0 019 9H3a9 9 0 019-9zM12 12v7a2 2 0 01-4 0" />
  </Line>
);
