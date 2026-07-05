import type { GlobalProvider } from '@ladle/react';
import '@fontsource-variable/nunito';
import '../src/styles/globals.css';

export const Provider: GlobalProvider = ({ children }) => (
  <div className="min-h-screen bg-background p-6 font-sans text-foreground">{children}</div>
);
