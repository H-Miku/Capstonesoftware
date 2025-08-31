import { motion } from "framer-motion";

export function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute top-12 right-5 w-40 h-40 rounded-full orb-enhanced"
        style={{
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(168, 85, 247, 0.1) 70%, transparent 100%)"
        }}
        animate={{ 
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-24 left-5 w-32 h-32 rounded-full orb-enhanced"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(139, 92, 246, 0.1) 70%, transparent 100%)"
        }}
        animate={{ 
          y: [0, -25, 0],
          scale: [1, 1.15, 1],
          rotate: [360, 180, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: -2 }}
      />
      <motion.div
        className="absolute top-1/2 right-0 w-24 h-24 rounded-full orb-enhanced"
        style={{
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.4) 0%, rgba(124, 58, 237, 0.1) 70%, transparent 100%)"
        }}
        animate={{ 
          y: [0, -20, 0],
          scale: [1, 1.2, 1],
          rotate: [0, -180, -360]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: -4 }}
      />
      <motion.div
        className="absolute top-1/4 left-1/4 w-28 h-28 rounded-full orb-enhanced"
        style={{
          background: "radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, rgba(147, 51, 234, 0.1) 70%, transparent 100%)"
        }}
        animate={{ 
          y: [0, -35, 0],
          scale: [1, 1.05, 1],
          rotate: [180, 0, 180]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: -6 }}
      />
    </div>
  );
}
