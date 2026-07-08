import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

const ZenModeContext = createContext(null);
const ZEN_STORAGE_KEY = "mickverse-zen-mode";
const COVER_MS = 450;
const REVEAL_MS = 500;

export function ZenModeProvider({ children }) {
  const [isZenMode, setIsZenMode] = useState(() => {
    try {
      return sessionStorage.getItem(ZEN_STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });
  const [transitionPhase, setTransitionPhase] = useState("idle");
  const timersRef = useRef([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const applyZenClass = useCallback((active) => {
    document.documentElement.classList.toggle("zen-mode", active);
    document.body.classList.toggle("zen-mode", active);
    if (active) {
      document.documentElement.dataset.zen = "true";
    } else {
      delete document.documentElement.dataset.zen;
    }
  }, []);

  useEffect(() => {
    applyZenClass(isZenMode);
    try {
      sessionStorage.setItem(ZEN_STORAGE_KEY, String(isZenMode));
    } catch {
      /* ignore */
    }
  }, [isZenMode, applyZenClass]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const runTransition = useCallback(
    (activating) => {
      clearTimers();
      setTransitionPhase("cover");

      timersRef.current.push(
        setTimeout(() => {
          setIsZenMode(activating);
          setTransitionPhase("reveal");

          timersRef.current.push(
            setTimeout(() => {
              setTransitionPhase("idle");
            }, REVEAL_MS)
          );
        }, COVER_MS)
      );
    },
    [clearTimers]
  );

  const enterZenMode = useCallback(() => {
    if (!isZenMode) runTransition(true);
  }, [isZenMode, runTransition]);

  const exitZenMode = useCallback(() => {
    if (isZenMode) runTransition(false);
  }, [isZenMode, runTransition]);

  const toggleZenMode = useCallback(() => {
    if (isZenMode) exitZenMode();
    else enterZenMode();
  }, [isZenMode, enterZenMode, exitZenMode]);

  const value = useMemo(
    () => ({ isZenMode, transitionPhase, enterZenMode, exitZenMode, toggleZenMode }),
    [isZenMode, transitionPhase, enterZenMode, exitZenMode, toggleZenMode]
  );

  return <ZenModeContext.Provider value={value}>{children}</ZenModeContext.Provider>;
}

export function useZenMode() {
  const ctx = useContext(ZenModeContext);
  if (!ctx) {
    throw new Error("useZenMode must be used within ZenModeProvider");
  }
  return ctx;
}
