import type { SavedSessionSnapshot } from '@/domain/saved-sessions';
import { map } from 'nanostores';
import { storage } from '@/utils/storage';

export const SAVED_SESSIONS_STORAGE_KEY = 'fetcher.savedSessions';

export interface SavedSessionsState {
  sessions: SavedSessionSnapshot[];
}

function readSessionsFromStorage(): SavedSessionSnapshot[] {
  return storage.readJson(SAVED_SESSIONS_STORAGE_KEY) ?? [];
}

export const $savedSessions = map<SavedSessionsState>({
  sessions: readSessionsFromStorage(),
});

function persistSessions(sessions: SavedSessionSnapshot[]): void {
  storage.writeJson(SAVED_SESSIONS_STORAGE_KEY, sessions);
  $savedSessions.setKey('sessions', sessions);
}

export function refreshSavedSessions(): void {
  $savedSessions.setKey('sessions', readSessionsFromStorage());
}

export function setSavedSessions(sessions: SavedSessionSnapshot[]): void {
  persistSessions(sessions);
}

export function appendSavedSession(snapshot: SavedSessionSnapshot): void {
  const { sessions } = $savedSessions.get();
  const exist = sessions.find((s) => s.search === snapshot.search);

  if (exist) {
    return;
  }

  persistSessions([...sessions, snapshot]);
}

export function removeSavedSession(snapshot: SavedSessionSnapshot): void {
  const { sessions } = $savedSessions.get();
  const next = sessions.filter(
    (s) => s.savedAt !== snapshot.savedAt && s.search !== snapshot.search,
  );

  persistSessions(next);
}
