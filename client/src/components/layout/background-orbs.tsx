import { motion } from "framer-motion";

export function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute top-12 right-5 w-40 h-40 bg-emerald-500 rounded-full opacity-10 orb"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-24 left-5 w-32 h-32 bg-yellow-400 rounded-full opacity-10 orb"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: -2 }}
      />
      <motion.div
        className="absolute top-1/2 right-0 w-24 h-24 bg-cyan-400 rounded-full opacity-10 orb"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: -4 }}
      />
    </div>
  );
}
