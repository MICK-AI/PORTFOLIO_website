import React from "react";
import { motion } from "framer-motion";
import { useZenMode } from "../../../context/ZenModeContext";

export default function ZenToggle({ className = "" }) {
  const { isZenMode, enterZenMode, exitZenMode } = useZenMode();

  return (
    <motion.button
      type="button"
      onClick={isZenMode ? exitZenMode : enterZenMode}
      className={[
        "zen-essential inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-zen ease-zen",
        isZenMode
          ? "border"
          : "bg-black text-white hover:bg-gray-800",
        className,
      ].join(" ")}
      style={
        isZenMode
          ? {
              background: "var(--surface-glass)",
              borderColor: "var(--border)",
              color: "var(--accent)",
              boxShadow: "var(--shadow-glow)",
            }
          : undefined
      }
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span
        className="inline-block w-2 h-2 rounded-full opacity-80"
        style={{ background: isZenMode ? "var(--accent-cyan)" : "currentColor" }}
      />
      {isZenMode ? "Exit Zen Mode" : "Enter Zen Mode"}
    </motion.button>
  );
}
