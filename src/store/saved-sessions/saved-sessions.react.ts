import type { SavedSessionsState } from './type';
import { useSyncExternalStore } from 'react';
import {
  appendSavedSession,
  refreshSavedSessions,
  removeSavedSession,
  selectSavedSession,
  setActiveSession,
  setSavedSessions,
} from './saved-sessions.action';
import { $savedSessions } from './saved-sessions.store';

export function useSavedSessionsState(): SavedSessionsState & {
  refresh: typeof refreshSavedSessions;
  setSessions: typeof setSavedSessions;
  appendSession: typeof appendSavedSession;
  removeSession: typeof removeSavedSession;
  setActiveSession: typeof setActiveSession;
  selectSession: typeof selectSavedSession;
} {
  const state = useSyncExternalStore(
    (onChange) => $savedSessions.subscribe(onChange),
    () => $savedSessions.get(),
    () => $savedSessions.get(),
  );

  return {
    ...state,
    refresh: refreshSavedSessions,
    setSessions: setSavedSessions,
    appendSession: appendSavedSession,
    removeSession: removeSavedSession,
    setActiveSession,
    selectSession: selectSavedSession,
  };
}
