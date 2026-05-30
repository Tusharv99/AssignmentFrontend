"use client";

import { motion } from "framer-motion";
import { CourseTile } from "./CourseTile";
import type { Course } from "@/types";

interface CourseGridProps {
  courses: Course[];
  loading: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function CourseGrid({ courses, loading }: CourseGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl bg-[#0a0a0a] border border-gray-800 p-4 h-48 animate-shimmer"
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-4"
    >
      <h2 className="text-xl font-semibold text-white mb-2">My Courses</h2>
      {courses.map((course, index) => (
        <CourseTile key={course.id} course={course} index={index} />
      ))}
    </motion.div>
  );
}