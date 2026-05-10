import type { SavedSessionSnapshot } from '@/domain/saved-sessions';
import { useCallback, useState } from 'react';
import { storage } from '@/utils/storage';

export const SAVED_SESSIONS_STORAGE_KEY = 'fetcher.savedSessions';

export function useSavedSessions() {
  const [sessions, setSessions] = useState<SavedSessionSnapshot[]>(() => storage.readJson(SAVED_SESSIONS_STORAGE_KEY) ?? []);

  const refresh = useCallback(() => {
    setSessions(storage.readJson(SAVED_SESSIONS_STORAGE_KEY) ?? []);
  }, []);

  const handleSetSessions = (sessions: SavedSessionSnapshot[]) => {
    storage.writeJson(SAVED_SESSIONS_STORAGE_KEY, sessions);
    setSessions(sessions);
  };

  const removeSession = (snapshot: SavedSessionSnapshot) => {
    const next = sessions.filter((s) => s.savedAt !== snapshot.savedAt && s.search !== snapshot.search);

    storage.writeJson(SAVED_SESSIONS_STORAGE_KEY, next);
    setSessions(next);
  };

  const appendSession = (snapshot: SavedSessionSnapshot) => {
    const exist = sessions.find((s) => s.search === snapshot.search);

    if (exist) {
      return;
    }

    const next = [...sessions, snapshot];
    storage.writeJson(SAVED_SESSIONS_STORAGE_KEY, next);
    setSessions(next);
  };

  return {
    sessions,
    refresh,
    setSessions: handleSetSessions,
    appendSession,
    removeSession,
  };
}
