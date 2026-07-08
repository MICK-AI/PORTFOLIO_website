import { useCallback, useEffect, useState } from "react";
import { reflectionRepository, sessionRepository } from "../services/storage/sessionRepository";

export function useStudySessions() {
  const [sessions, setSessions] = useState(() => sessionRepository.getAll());
  const [reflections, setReflections] = useState(() => reflectionRepository.getAll());

  const refresh = useCallback(() => {
    setSessions(sessionRepository.getAll());
    setReflections(reflectionRepository.getAll());
  }, []);

  const saveSession = useCallback((session) => {
    const next = sessionRepository.save(session);
    setSessions(next);
    return next;
  }, []);

  const saveReflection = useCallback((dateKey, reflection) => {
    const next = reflectionRepository.save(dateKey, reflection);
    setReflections(next);
    return next;
  }, []);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key?.startsWith("mc_")) refresh();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [refresh]);

  return { sessions, reflections, saveSession, saveReflection, refresh };
}
