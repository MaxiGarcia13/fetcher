import type { SavedSessionsState } from './type';
import type { SavedSessionSnapshot } from '@/domain/saved-sessions';
import { map } from 'nanostores';
import { savedSessionsStorage } from './consts';

export const $savedSessions = map<SavedSessionsState>({
  sessions: readSessionsFromStorage(),
  activeSession: null,
});

export function readSessionsFromStorage(): SavedSessionSnapshot[] {
  return savedSessionsStorage.getJson() ?? [];
}
