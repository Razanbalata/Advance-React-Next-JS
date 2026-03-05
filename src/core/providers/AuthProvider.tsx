"use client";

import { useAuthListener } from "@/src/shared/hooks/useAuthListener"; 

export default function AuthProvider({ children }: { children: React.ReactNode }) {

  useAuthListener();

  return <>{children}</>;
}