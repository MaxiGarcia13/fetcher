import type { SavedSessionSnapshot } from '@/domain/saved-sessions';
import { applyHttpRequestFromSearch } from '@/store/http-request';
import { storage } from '@/utils/storage';
import { clearHttpResponse } from '../http-response';
import { SAVED_SESSIONS_STORAGE_KEY } from './consts';
import { $savedSessions, readSessionsFromStorage } from './saved-sessions.store';

function pruneInvalidActive(sessions: SavedSessionSnapshot[]): void {
  const { activeSession } = $savedSessions.get();
  if (activeSession && !sessions.some((s) => s.id === activeSession)) {
    $savedSessions.setKey('activeSession', null);
  }
}

function persistSessions(sessions: SavedSessionSnapshot[]): void {
  storage.writeJson(SAVED_SESSIONS_STORAGE_KEY, sessions);
  $savedSessions.setKey('sessions', sessions);
  pruneInvalidActive(sessions);
}

export function refreshSavedSessions(): void {
  const sessions = readSessionsFromStorage();
  $savedSessions.setKey('sessions', sessions);
  pruneInvalidActive(sessions);
}

export function setSavedSessions(sessions: SavedSessionSnapshot[]): void {
  persistSessions(sessions);
}

export function setActiveSession(id: string | null): void {
  $savedSessions.setKey('activeSession', id);
}

export function selectSavedSession(snapshot: SavedSessionSnapshot): void {
  $savedSessions.setKey('activeSession', snapshot.id);

  applyHttpRequestFromSearch(snapshot.search);

  clearHttpResponse();
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
  const { sessions, activeSession } = $savedSessions.get();
  const next = sessions.filter((s) => s.id !== snapshot.id);
  if (activeSession === snapshot.id) {
    $savedSessions.setKey('activeSession', null);
  }
  persistSessions(next);
}

export function updateSavedSessionFromSearch(): void {
  const { activeSession, sessions } = $savedSessions.get();

  if (!activeSession) {
    return;
  }

  const snapshot = sessions.find((s) => s.id === activeSession);

  if (!snapshot) {
    return;
  }

  const index = sessions.findIndex((s) => s.id === activeSession);
  if (index === -1) {
    return;
  }

  const next = [...sessions];
  next[index] = {
    ...snapshot,
    savedAt: new Date().toISOString(),
    search: window.location.search,
  };

  persistSessions(next);
}
