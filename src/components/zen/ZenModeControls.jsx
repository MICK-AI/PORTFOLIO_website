import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useZenMode } from "../../context/ZenModeContext";

export default function ZenModeControls() {
  const { isZenMode, exitZenMode } = useZenMode();
  const navigate = useNavigate();
  const location = useLocation();
  const onMissionControl = location.pathname === "/mission-control";

  return (
    <AnimatePresence>
      {isZenMode && (
        <motion.div
          className="fixed bottom-6 right-6 z-[150] flex flex-col items-end gap-3 zen-essential"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          {!onMissionControl && (
            <motion.button
              type="button"
              onClick={() => navigate("/mission-control")}
              className="px-5 py-3 rounded-full text-sm font-bold border backdrop-blur-md"
              style={{
                background: "var(--surface-glass)",
                borderColor: "var(--border)",
                color: "var(--text)",
                boxShadow: "var(--shadow-glow)",
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Mission Control
            </motion.button>
          )}
          <motion.button
            type="button"
            onClick={exitZenMode}
            className="px-5 py-3 rounded-full text-sm font-bold backdrop-blur-md"
            style={{
              background: "linear-gradient(135deg, var(--accent-emerald), var(--accent-cyan))",
              color: "#fff",
              boxShadow: "0 0 30px var(--accent-glow)",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Exit Zen Mode
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
