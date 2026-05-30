"use client";

import { motion } from "framer-motion";
import { Calendar, Flame, Award, Clock } from "lucide-react";
import type { UserStats } from "@/types";

interface HeroTileProps {
  stats: UserStats;
}

const tileVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function HeroTile({ stats }: HeroTileProps) {
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12 ? "Good morning" : currentHour < 18 ? "Good afternoon" : "Good evening";

  return (
    <motion.article
      variants={tileVariants}
      className="relative group overflow-hidden rounded-2xl bg-[#0a0a0a] border border-gray-800 p-6 hover:border-green-500/50 transition-colors duration-300"
      whileHover={{
        scale: 1.01,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
    >
      <div className="absolute inset-0 bg-gradient-mesh opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 bg-grain opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {greeting}, {stats.name}! 👋
            </h1>
            <p className="text-gray-400">Ready to continue your learning journey?</p>
          </div>
          <div className="flex items-center gap-2 bg-green-500/10 rounded-full px-4 py-2 border border-green-500/20">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="text-white font-semibold">{stats.streak} day streak</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Award className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.coursesCompleted}</p>
              <p className="text-xs text-gray-400">Courses Completed</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.totalLearningTime}h</p>
              <p className="text-xs text-gray-400">Learning Hours</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">Top 5%</p>
              <p className="text-xs text-gray-400">Global Rank</p>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}