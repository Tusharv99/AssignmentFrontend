"use client";

import { motion } from "framer-motion";

const tileVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Mock contribution data for the last 30 days
const generateContributionData = () => {
  const data = [];
  for (let i = 0; i < 30; i++) {
    data.push(Math.floor(Math.random() * 20));
  }
  return data;
};

const getIntensityClass = (value: number) => {
  if (value === 0) return "bg-gray-800";
  if (value < 5) return "bg-green-900/60";
  if (value < 10) return "bg-green-700/60";
  if (value < 15) return "bg-green-600/60";
  return "bg-green-500/60";
};

export function ActivityTile() {
  const contributionData = generateContributionData();
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <motion.section
      variants={tileVariants}
      className="relative group overflow-hidden rounded-2xl bg-[#0a0a0a] border border-gray-800 p-6"
      whileHover={{
        scale: 1.01,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
    >
      <div className="absolute inset-0 bg-gradient-mesh opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <h2 className="text-xl font-semibold text-white mb-6">Activity Heatmap</h2>

        <div className="overflow-x-auto">
          <div className="min-w-[300px]">
            <div className="flex gap-1 mb-2">
              {weekDays.map((day) => (
                <div key={day} className="flex-1 text-center text-xs text-gray-500">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {contributionData.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.008 }}
                  className={`aspect-square rounded-sm ${getIntensityClass(value)} hover:scale-110 transition-transform cursor-pointer`}
                  title={`${value} contributions`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-sm bg-gray-800" />
              <span className="text-xs text-gray-500">0</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-sm bg-green-900/60" />
              <span className="text-xs text-gray-500">1-4</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-sm bg-green-700/60" />
              <span className="text-xs text-gray-500">5-9</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-sm bg-green-600/60" />
              <span className="text-xs text-gray-500">10-14</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-sm bg-green-500/60" />
              <span className="text-xs text-gray-500">15+</span>
            </div>
          </div>
          <p className="text-xs text-gray-500">Last 30 days</p>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-800">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold text-white">142</p>
              <p className="text-xs text-gray-400">Total contributions</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-400">+23%</p>
              <p className="text-xs text-gray-400">vs last month</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}