import React, { useMemo } from "react";
import { useZenMode } from "../../context/ZenModeContext";

const PARTICLE_COUNT = 28;

export default function ZenEnvironment() {
  const { isZenMode } = useZenMode();

  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        left: `${(i * 37 + 11) % 100}%`,
        top: `${(i * 53 + 7) % 100}%`,
        delay: `${(i % 10) * 1.4}s`,
        duration: `${18 + (i % 8) * 2}s`,
        size: i % 3 === 0 ? 3 : 2,
      })),
    []
  );

  return (
    <div
      className="zen-environment fixed inset-0 z-0 pointer-events-none"
      aria-hidden={!isZenMode}
    >
      <div className="zen-environment__base" />
      <div className="zen-environment__gradient zen-environment__gradient--a" />
      <div className="zen-environment__gradient zen-environment__gradient--b" />
      <div className="zen-environment__noise" />
      <div className="zen-environment__particles absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <span
            key={p.id}
            className="zen-environment__particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>
      <div className="zen-environment__vignette" />
    </div>
  );
}
