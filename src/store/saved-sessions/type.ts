import type { SavedSessionSnapshot } from '@/domain/saved-sessions';

export interface SavedSessionsState {
  sessions: SavedSessionSnapshot[];
  activeSession: string | null;
}
