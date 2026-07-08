import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useZenMode } from "../../context/ZenModeContext";

export default function ZenCinematicTransition() {
  const { transitionPhase } = useZenMode();

  return (
    <AnimatePresence>
      {transitionPhase !== "idle" && (
        <motion.div
          className="zen-cinematic-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: transitionPhase === "cover" ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: transitionPhase === "cover" ? 0.45 : 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      )}
    </AnimatePresence>
  );
}
