import { motion } from "framer-motion";
import { Flame, Route } from "lucide-react";

interface StatsCardProps {
  icon: "calories" | "distance";
  label: string;
  value: string | number;
  delay?: number;
}

export function StatsCard({ icon, label, value, delay = 0 }: StatsCardProps) {
  const IconComponent = icon === "calories" ? Flame : Route;
  const iconColor = icon === "calories" ? "text-orange-500" : "text-blue-500";

  return (
    <motion.div
      className="glassmorphic rounded-xl p-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      data-testid={`card-${icon}`}
    >
      <IconComponent className={`${iconColor} text-xl mb-2 mx-auto`} />
      <p className="text-gray-400 text-xs">{label}</p>
      <p className="text-white text-lg font-semibold" data-testid={`text-${icon}-value`}>
        {value}
      </p>
    </motion.div>
  );
}
