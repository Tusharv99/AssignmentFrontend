"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  User,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: BookOpen, label: "Courses", id: "courses" },
  { icon: BarChart3, label: "Analytics", id: "analytics" },
  { icon: Settings, label: "Settings", id: "settings" },
];

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  isMobile?: boolean;
}

export function Sidebar({ collapsed, setCollapsed, isMobile = false }: SidebarProps) {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mobile hamburger menu
  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 bg-[#0a0a0a] border border-gray-800 rounded-lg lg:hidden"
        >
          <Menu className="w-5 h-5 text-white" />
        </button>

        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 z-50 lg:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.aside
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 left-0 bottom-0 w-64 bg-[#0a0a0a] border-r border-gray-800 z-50 lg:hidden"
              >
                <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-purple-600 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-lg bg-gradient-to-r from-green-400 to-purple-500 bg-clip-text text-transparent">
                      LearnFlow
                    </span>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)}>
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                <nav className="p-3 space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeItem === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveItem(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                          isActive
                            ? "bg-gradient-to-r from-green-500/20 to-purple-600/20 border border-green-500/30"
                            : "hover:bg-gray-800/50"
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isActive ? "text-green-500" : "text-gray-400"}`} />
                        <span className={`text-sm font-medium ${isActive ? "text-white" : "text-gray-400"}`}>
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-500 to-purple-600 flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-white">Alex Morgan</p>
                      <p className="text-xs text-gray-400">alex@learnflow.com</p>
                    </div>
                  </div>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Desktop sidebar
  return (
    <LayoutGroup>
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 260 }}
        className="relative hidden lg:block bg-[#0a0a0a]/80 backdrop-blur-xl border-r border-gray-800 h-screen sticky top-0 z-50"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-gray-800">
            <motion.div
              className="flex items-center gap-3"
              animate={{ justifyContent: collapsed ? "center" : "flex-start" }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-purple-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="font-bold text-lg bg-gradient-to-r from-green-400 to-purple-500 bg-clip-text text-transparent"
                  >
                    LearnFlow
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  className="relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeBackground"
                      className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-purple-600/20 rounded-xl border border-green-500/30"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                  <Icon
                    className={`relative z-10 w-5 h-5 transition-colors ${
                      isActive ? "text-green-500" : "text-gray-400"
                    }`}
                  />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className={`relative z-10 text-sm font-medium ${
                          isActive ? "text-white" : "text-gray-400"
                        }`}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-800">
            <motion.div
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-800/50 rounded-xl p-2 transition-colors"
              animate={{ justifyContent: collapsed ? "center" : "flex-start" }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-500 to-purple-600 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <AnimatePresence>
                {!collapsed && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex-1 text-left"
                  >
                    <p className="text-sm font-medium text-white">Alex Morgan</p>
                    <p className="text-xs text-gray-400">alex@learnflow.com</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Collapse Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-20 w-6 h-6 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-3 h-3 text-gray-400" />
            ) : (
              <ChevronLeft className="w-3 h-3 text-gray-400" />
            )}
          </button>
        </div>
      </motion.aside>
    </LayoutGroup>
  );
}