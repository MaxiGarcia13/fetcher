import type { SavedSessionSnapshot } from '@/domain/saved-sessions';
import { createStorage } from '@maxigarcia/js-utils';

export const savedSessionsStorage = createStorage<SavedSessionSnapshot[]>('saved-sessions');
