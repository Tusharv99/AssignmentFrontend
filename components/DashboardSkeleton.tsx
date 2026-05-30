"use client";

import { motion } from "framer-motion";

const SkeletonCard = () => (
  <div className="relative overflow-hidden rounded-2xl bg-[#0a0a0a] border border-gray-800 p-6 h-full animate-shimmer">
    <div className="space-y-4">
      <div className="w-12 h-12 rounded-xl bg-gray-800/50" />
      <div className="h-4 bg-gray-800/50 rounded-lg w-3/4" />
      <div className="h-2 bg-gray-800/50 rounded-full w-full" />
    </div>
  </div>
);

export function DashboardSkeleton() {
  return (
    <div className="flex min-h-screen bg-[#050505]">
      <div className="w-64 bg-[#0a0a0a] border-r border-gray-800 p-4 hidden lg:block">
        <div className="space-y-4">
          <div className="h-10 w-10 bg-gray-800 rounded-xl" />
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 bg-gray-800/50 rounded-xl" />
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1">
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="lg:col-span-2">
              <SkeletonCard />
            </div>
            <div>
              <div className="grid grid-cols-1 gap-4">
                {[1, 2].map((i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            </div>
            <div className="lg:col-span-2">
              <SkeletonCard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}