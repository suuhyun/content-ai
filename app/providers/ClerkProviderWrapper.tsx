"use client";

import { clerkAppearance } from "@/lib/clerkAppearance";
import { ClerkProvider } from "@clerk/nextjs";

export default function ClerkProviderWrapper({ children }: { children: React.ReactNode }) {
  return <ClerkProvider appearance={clerkAppearance}>{children}</ClerkProvider>;
}