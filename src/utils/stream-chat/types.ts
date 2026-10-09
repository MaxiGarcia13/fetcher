export type ChatMessageRole = 'system' | 'user' | 'assistant' | (string & {});

export interface ChatMessage {
  role: ChatMessageRole;
  content: string;
}
