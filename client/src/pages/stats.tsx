import { motion } from "framer-motion";
import { useMemo } from "react";
import { BackgroundOrbs } from "@/components/layout/background-orbs";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { useFitnessDataRange } from "@/hooks/use-fitness-data";
import { ChevronLeft, TrendingUp } from "lucide-react";

export default function Stats() {
  const endDate = new Date().toISOString().split('T')[0];
  const startDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() - 6);
    return date.toISOString().split('T')[0];
  }, []);

  const { data: weekData, isLoading } = useFitnessDataRange(startDate, endDate);

  const weeklyAverage = useMemo(() => {
    if (!weekData || weekData.length === 0) return 0;
    const totalSteps = weekData.reduce((sum, day) => sum + day.steps, 0);
    return Math.round(totalSteps / weekData.length);
  }, [weekData]);

  const totalSteps = useMemo(() => {
    if (!weekData || weekData.length === 0) return 0;
    return weekData.reduce((sum, day) => sum + day.steps, 0);
  }, [weekData]);

  return (
    <div className="min-h-screen bg-background">
      <BackgroundOrbs />
      
      <div className="relative z-10 min-h-screen px-4 py-8 pb-24">
        
        {/* Header */}
        <motion.div
          className="flex items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.button
            className="w-11 h-11 rounded-2xl bg-gray-700 bg-opacity-80 flex items-center justify-center mr-4 transition-all duration-300 hover:bg-opacity-100 hover:scale-105"
            whileTap={{ scale: 0.95 }}
            data-testid="button-back"
          >
            <ChevronLeft className="text-gray-200 text-sm" />
          </motion.button>
          <h1 className="text-white text-2xl font-bold" data-testid="text-stats-title">
            Weekly Stats
          </h1>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          className="glassmorphic rounded-3xl p-6 w-full max-w-sm mx-auto mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          data-testid="card-stats-overview"
        >
          <div className="flex items-center mb-4">
            <TrendingUp className="text-primary mr-2" />
            <h2 className="text-white text-lg font-semibold">This Week</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-gray-400 text-xs">Total Steps</p>
              <p className="text-white text-2xl font-bold" data-testid="text-total-steps">
                {isLoading ? "..." : totalSteps.toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-xs">Daily Average</p>
              <p className="text-white text-2xl font-bold" data-testid="text-average-steps">
                {isLoading ? "..." : weeklyAverage.toLocaleString()}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Daily Breakdown */}
        <motion.div
          className="glassmorphic rounded-3xl p-6 w-full max-w-sm mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          data-testid="card-daily-breakdown"
        >
          <h3 className="text-white text-lg font-semibold mb-4">Daily Breakdown</h3>
          
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="h-8 bg-gray-800 rounded animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {weekData?.map((day, index) => {
                const date = new Date(day.date);
                const dayName = date.toLocaleDateString('en', { weekday: 'short' });
                const dayNumber = date.getDate();
                const progress = (day.steps / day.stepGoal) * 100;
                
                return (
                  <motion.div
                    key={day.date}
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                    data-testid={`row-day-${day.date}`}
                  >
                    <div className="flex items-center">
                      <span className="text-gray-400 text-sm w-8">{dayName}</span>
                      <span className="text-gray-400 text-sm w-8">{dayNumber}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-white text-sm font-medium" data-testid={`text-steps-${day.date}`}>
                        {day.steps.toLocaleString()}
                      </span>
                      <div className="w-16 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-emerald-600 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(progress, 100)}%` }}
                          transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
        
      </div>

      <BottomNavigation />
    </div>
  );
}
