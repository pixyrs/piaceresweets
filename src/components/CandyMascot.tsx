import { useEffect, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";

/**
 * CandyMascot — a wrapped candy character that runs in from the left,
 * arrives near the hero CTA, waves and points down toward the button.
 */
const CandyMascot = () => {
  const { t } = useLang();
  const [phase, setPhase] = useState<"hidden" | "running" | "arrived">("hidden");

  useEffect(() => {
    let arriveTimer: ReturnType<typeof setTimeout>;
    let loopTimer: ReturnType<typeof setTimeout>;
    const RUN_MS = 4000;
    const STAY_MS = 6000;
    const cycle = () => {
      setPhase("running");
      arriveTimer = setTimeout(() => setPhase("arrived"), RUN_MS);
      loopTimer = setTimeout(cycle, RUN_MS + STAY_MS);
    };
    const startTimer = setTimeout(cycle, 150);
    return () => {
      clearTimeout(startTimer);
      clearTimeout(arriveTimer);
      clearTimeout(loopTimer);
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute left-0 right-0 bottom-[6%] md:bottom-[10%] z-20 flex justify-center`}
    >
      <div
        className={`relative ${phase === "running" ? "mascot-run" : "mascot-arrive"}`}
        style={{ width: 110, height: 130 }}
      >

        {/* Body that bobs while running, sways when arrived */}
        <div className={phase === "running" ? "mascot-bob" : "mascot-sway"}>
          <svg viewBox="0 0 120 140" width="110" height="130" xmlns="http://www.w3.org/2000/svg">
            {/* shadow */}
            <ellipse cx="60" cy="132" rx="28" ry="4" fill="hsl(20 30% 20% / 0.25)" />

            {/* Left wrapper twist */}
            <g className={phase === "running" ? "wrap-flutter-l" : ""}>
              <path
                d="M 18 70 Q 4 56 6 78 Q 8 92 22 84 Z"
                fill="hsl(14 55% 60%)"
                stroke="hsl(20 30% 20%)"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path d="M 12 68 L 18 76 M 10 78 L 16 82" stroke="hsl(20 30% 20% / 0.4)" strokeWidth="1.2" fill="none" />
            </g>

            {/* Right wrapper twist */}
            <g className={phase === "running" ? "wrap-flutter-r" : ""}>
              <path
                d="M 102 70 Q 116 56 114 78 Q 112 92 98 84 Z"
                fill="hsl(14 55% 60%)"
                stroke="hsl(20 30% 20%)"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path d="M 108 68 L 102 76 M 110 78 L 104 82" stroke="hsl(20 30% 20% / 0.4)" strokeWidth="1.2" fill="none" />
            </g>

            {/* Candy body */}
            <circle cx="60" cy="70" r="32" fill="hsl(14 65% 70%)" stroke="hsl(20 30% 20%)" strokeWidth="2.5" />
            {/* Stripes */}
            <path d="M 38 58 Q 60 50 82 58" stroke="hsl(36 35% 94%)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 36 82 Q 60 90 84 82" stroke="hsl(36 35% 94%)" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Shine */}
            <ellipse cx="48" cy="58" rx="8" ry="5" fill="hsl(36 35% 96% / 0.7)" />

            {/* Eyes */}
            <circle cx="51" cy="70" r="3.5" fill="hsl(20 30% 15%)" />
            <circle cx="69" cy="70" r="3.5" fill="hsl(20 30% 15%)" />
            <circle cx="52" cy="69" r="1" fill="hsl(36 35% 96%)" />
            <circle cx="70" cy="69" r="1" fill="hsl(36 35% 96%)" />
            {/* Cheeks */}
            <circle cx="45" cy="78" r="3" fill="hsl(14 70% 65% / 0.6)" />
            <circle cx="75" cy="78" r="3" fill="hsl(14 70% 65% / 0.6)" />
            {/* Smile */}
            <path d="M 54 80 Q 60 86 66 80" stroke="hsl(20 30% 15%)" strokeWidth="1.8" fill="none" strokeLinecap="round" />

            {/* Legs (running cycle) */}
            <g className={phase === "running" ? "legs-run" : ""}>
              <line x1="52" y1="100" x2="48" y2="120" stroke="hsl(20 30% 20%)" strokeWidth="3" strokeLinecap="round" />
              <line x1="68" y1="100" x2="72" y2="120" stroke="hsl(20 30% 20%)" strokeWidth="3" strokeLinecap="round" />
              <ellipse cx="46" cy="122" rx="5" ry="2.5" fill="hsl(20 30% 20%)" />
              <ellipse cx="74" cy="122" rx="5" ry="2.5" fill="hsl(20 30% 20%)" />
            </g>

            {/* Left arm (swings while running) */}
            <g
              className={phase === "running" ? "arm-swing" : ""}
              style={{ transformOrigin: "32px 78px" }}
            >
              <line x1="32" y1="78" x2="22" y2="96" stroke="hsl(20 30% 20%)" strokeWidth="3" strokeLinecap="round" />
              <circle cx="22" cy="96" r="3.5" fill="hsl(14 65% 70%)" stroke="hsl(20 30% 20%)" strokeWidth="1.5" />
            </g>

            {/* Right arm: swings while running, points UP at the CTA when arrived */}
            <g
              className={phase === "running" ? "arm-swing-r" : "arm-point"}
              style={{ transformOrigin: "88px 78px" }}
            >
              <line x1="88" y1="78" x2={phase === "arrived" ? "78" : "100"} y2={phase === "arrived" ? "36" : "96"} stroke="hsl(20 30% 20%)" strokeWidth="3" strokeLinecap="round" />
              <circle cx={phase === "arrived" ? 78 : 100} cy={phase === "arrived" ? 36 : 96} r="4" fill="hsl(14 65% 70%)" stroke="hsl(20 30% 20%)" strokeWidth="1.5" />
              {phase === "arrived" && (
                <line x1="78" y1="36" x2="78" y2="24" stroke="hsl(20 30% 20%)" strokeWidth="2.5" strokeLinecap="round" />
              )}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CandyMascot;
