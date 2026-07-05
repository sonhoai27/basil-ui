import * as React from 'react';
import { en } from './en';
import type { Messages } from './messages';

export type { Messages } from './messages';
export { en } from './en';
export { vi } from './vi';

const MessagesContext = React.createContext<Messages>(en);

export interface BasilProviderProps {
  /** Locale messages. Defaults to English (`en`). Pass `vi` or your own `Messages`. */
  messages?: Messages;
  children: React.ReactNode;
}

/**
 * Provides locale messages to Basil components. Optional — without it, components
 * fall back to English. Wrap your app once:
 *
 * ```tsx
 * import { BasilProvider, vi } from 'basil-ui';
 * <BasilProvider messages={vi}>{app}</BasilProvider>
 * ```
 */
export function BasilProvider({ messages = en, children }: BasilProviderProps) {
  return <MessagesContext.Provider value={messages}>{children}</MessagesContext.Provider>;
}

/** Read the current locale's default strings inside a Basil component. */
export function useMessages(): Messages {
  return React.useContext(MessagesContext);
}
