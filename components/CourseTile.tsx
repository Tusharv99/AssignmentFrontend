"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import * as Icons from "lucide-react";
import type { Course } from "@/types";

interface CourseTileProps {
  course: Course;
  index: number;
}

const tileVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function CourseTile({ course, index }: CourseTileProps) {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  // Dynamically get the icon component
  const IconComponent = (Icons as any)[course.icon_name] || Icons.BookOpen;

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.article
      ref={ref}
      variants={tileVariants}
      initial="hidden"
      animate={controls}
      custom={index}
      className="relative group overflow-hidden rounded-xl bg-[#0a0a0a] border border-gray-800 p-4 cursor-pointer"
      whileHover={{
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 bg-grain opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Glow Border on Hover */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/0 via-green-500/50 to-purple-600/0 blur-xl" />
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-purple-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <IconComponent className="w-6 h-6 text-green-400" />
          </div>
        </div>

        <h3 className="text-white font-semibold mb-3 line-clamp-2">{course.title}</h3>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Progress</span>
            <span className="text-green-400 font-medium">{course.progress}%</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-500 to-purple-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${course.progress}%` }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            />
          </div>
        </div>

        <button className="mt-4 w-full py-2 rounded-lg bg-white/5 text-sm font-medium text-gray-300 hover:bg-white/10 transition-colors">
          Continue Learning →
        </button>
      </div>
    </motion.article>
  );
}