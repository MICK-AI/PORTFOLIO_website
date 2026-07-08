import { useCallback, useEffect, useRef, useState } from "react";

const TIMER_MODES = {
  POMODORO: "pomodoro",
  STOPWATCH: "stopwatch",
  COUNTDOWN: "countdown",
};

const DEFAULT_POMODORO_MS = 25 * 60 * 1000;
const DEFAULT_COUNTDOWN_MS = 25 * 60 * 1000;

export function useTimer() {
  const [mode, setMode] = useState(TIMER_MODES.STOPWATCH);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [targetMs, setTargetMs] = useState(DEFAULT_POMODORO_MS);
  const [countdownMs, setCountdownMs] = useState(DEFAULT_COUNTDOWN_MS);
  const [sessionStart, setSessionStart] = useState(null);

  const intervalRef = useRef(null);
  const startedAtRef = useRef(null);
  const accumulatedRef = useRef(0);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const tick = useCallback(() => {
    if (!startedAtRef.current) return;
    const now = Date.now();
    const delta = now - startedAtRef.current + accumulatedRef.current;

    if (mode === TIMER_MODES.COUNTDOWN) {
      const remaining = countdownMs - delta;
      if (remaining <= 0) {
        setElapsedMs(countdownMs);
        setIsRunning(false);
        clearTimer();
        return;
      }
      setElapsedMs(delta);
    } else {
      setElapsedMs(delta);
      if (mode === TIMER_MODES.POMODORO && delta >= targetMs) {
        setIsRunning(false);
        clearTimer();
      }
    }
  }, [mode, countdownMs, targetMs, clearTimer]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(tick, 200);
    } else {
      clearTimer();
    }
    return clearTimer;
  }, [isRunning, tick, clearTimer]);

  const start = useCallback(() => {
    if (!sessionStart) setSessionStart(new Date());
    startedAtRef.current = Date.now();
    setIsRunning(true);
  }, [sessionStart]);

  const pause = useCallback(() => {
    if (startedAtRef.current) {
      accumulatedRef.current += Date.now() - startedAtRef.current;
      startedAtRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    clearTimer();
    startedAtRef.current = null;
    accumulatedRef.current = 0;
    setElapsedMs(0);
    setIsRunning(false);
    setSessionStart(null);
  }, [clearTimer]);

  const stop = useCallback(() => {
    if (startedAtRef.current) {
      accumulatedRef.current += Date.now() - startedAtRef.current;
      startedAtRef.current = null;
    }
    const duration =
      mode === TIMER_MODES.COUNTDOWN
        ? Math.min(accumulatedRef.current, countdownMs)
        : accumulatedRef.current;
    setElapsedMs(duration);
    setIsRunning(false);
    clearTimer();

    const result = {
      durationMs: duration,
      startTime: sessionStart,
      endTime: new Date(),
    };

    accumulatedRef.current = 0;
    setSessionStart(null);
    return result;
  }, [mode, countdownMs, sessionStart, clearTimer]);

  const switchMode = useCallback(
    (nextMode) => {
      reset();
      setMode(nextMode);
      if (nextMode === TIMER_MODES.POMODORO) {
        setTargetMs(DEFAULT_POMODORO_MS);
      }
      if (nextMode === TIMER_MODES.COUNTDOWN) {
        setCountdownMs(DEFAULT_COUNTDOWN_MS);
      }
    },
    [reset]
  );

  const displayMs =
    mode === TIMER_MODES.COUNTDOWN ? Math.max(0, countdownMs - elapsedMs) : elapsedMs;

  return {
    mode,
    modes: TIMER_MODES,
    isRunning,
    displayMs,
    elapsedMs,
    targetMs,
    countdownMs,
    sessionStart,
    setTargetMs,
    setCountdownMs,
    setMode: switchMode,
    start,
    pause,
    reset,
    stop,
  };
}
