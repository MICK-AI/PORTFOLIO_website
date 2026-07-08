import { STORAGE_KEYS } from "../../constants/topics";

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export const sessionRepository = {
  getAll() {
    return readJson(STORAGE_KEYS.SESSIONS, []);
  },

  save(session) {
    const sessions = this.getAll();
    const next = [{ ...session, id: session.id || crypto.randomUUID() }, ...sessions];
    writeJson(STORAGE_KEYS.SESSIONS, next);
    return next;
  },

  delete(id) {
    const next = this.getAll().filter((s) => s.id !== id);
    writeJson(STORAGE_KEYS.SESSIONS, next);
    return next;
  },

  clear() {
    writeJson(STORAGE_KEYS.SESSIONS, []);
    return [];
  },
};

export const reflectionRepository = {
  getAll() {
    return readJson(STORAGE_KEYS.REFLECTIONS, {});
  },

  get(dateKey) {
    return this.getAll()[dateKey] || "";
  },

  save(dateKey, reflection) {
    const all = this.getAll();
    all[dateKey] = reflection;
    writeJson(STORAGE_KEYS.REFLECTIONS, all);
    return all;
  },
};
