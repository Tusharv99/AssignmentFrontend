"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { HeroTile } from "./HeroTile";
import { CourseGrid } from "./CourseGrid";
import { ActivityTile } from "./ActivityTile";
import { createClient } from "@/lib/supabase/client";
import type { Course, UserStats } from "@/types";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export function DashboardClient() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const userStats: UserStats = {
    name: "Alex",
    streak: 12,
    totalLearningTime: 47,
    coursesCompleted: 8,
  };

  useEffect(() => {
    async function fetchCourses() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching courses:", error);
      } else {
        setCourses(data || []);
      }
      setLoading(false);
    }

    fetchCourses();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#050505]">
      {!isMobile && <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />}
      
      {isMobile && <Sidebar collapsed={false} setCollapsed={() => {}} isMobile />}

      <main className="flex-1 transition-all duration-300 pb-20 md:pb-0">
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            <div className="lg:col-span-2 md:col-span-2">
              <HeroTile stats={userStats} />
            </div>

            <div className="md:col-span-2 lg:col-span-1">
              <CourseGrid courses={courses} loading={loading} />
            </div>

            <div className="lg:col-span-2 md:col-span-2">
              <ActivityTile />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}