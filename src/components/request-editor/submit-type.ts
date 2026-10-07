import { createStorage } from '@maxigarcia/js-utils';

export type SubmitType = 'server' | 'client';

const submitTypeStorage = createStorage<SubmitType>('submit-button-selected-submit-type');

export function getStoredSubmitType(): SubmitType {
  return (submitTypeStorage.getItem() as SubmitType) ?? 'server';
}

export function setStoredSubmitType(submitType: SubmitType): void {
  submitTypeStorage.setItem(submitType);
}
