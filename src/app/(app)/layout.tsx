"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/hooks/useAppContext";
import { Header } from "@/components/Header";

function AuthGuard({ children }: { children: ReactNode }) {
  const { currentUser } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    // This check runs only on the client side after hydration.
    if (currentUser === null) {
      router.replace("/login");
    }
  }, [currentUser, router]);

  // Render a loading state or null while checking auth
  if (!currentUser) {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
    );
  }

  return <>{children}</>;
}


export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen w-full flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-background">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
