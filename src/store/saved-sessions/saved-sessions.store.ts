import type { SavedSessionsState } from './type';
import type { SavedSessionSnapshot } from '@/domain/saved-sessions';
import { map } from 'nanostores';
import { storage } from '@/utils/storage';
import { SAVED_SESSIONS_STORAGE_KEY } from './consts';

export const $savedSessions = map<SavedSessionsState>({
  sessions: readSessionsFromStorage(),
  activeSession: null,
});

export function readSessionsFromStorage(): SavedSessionSnapshot[] {
  return storage.readJson(SAVED_SESSIONS_STORAGE_KEY) ?? [];
}
