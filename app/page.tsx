// app/page.tsx
import { Suspense } from "react";
import { DashboardClient } from "@/components/DashboardClient";
import { DashboardSkeleton } from "@/components/DashboardSkeleton";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function Home() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardClient />
      </Suspense>
    </ErrorBoundary>
  );
}