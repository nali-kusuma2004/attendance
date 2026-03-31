import React from "react";
import { motion } from "framer-motion";

export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-700 text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center p-8 max-w-md"
      >
        <h1 className="text-4xl font-bold mb-4">🚧 Under Maintenance</h1>
        <p className="text-lg opacity-90 mb-6">
          We're currently working on improvements. Please check back later.
        </p>

        <div className="flex justify-center">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>

        <p className="mt-6 text-sm opacity-80">© 2026 Your Website</p>
      </motion.div>
    </div>
  );
}