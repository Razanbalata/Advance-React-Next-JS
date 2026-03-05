"use client";

import ReduxProvider from "./ReduxProvider";
import { ThemeProvider } from "./ThemeProvider";
import AuthProvider from "./AuthProvider";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ReduxProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </ReduxProvider>
    </ThemeProvider>
  );
}