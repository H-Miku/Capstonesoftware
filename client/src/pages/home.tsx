import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, MoreHorizontal, Activity, TrendingUp } from "lucide-react";
import { BackgroundOrbs } from "@/components/layout/background-orbs";
import { WeekSelector } from "@/components/fitness/week-selector";
import { ProgressRing } from "@/components/fitness/progress-ring";
import { StatsCard } from "@/components/fitness/stats-card";
import { LineGraph } from "@/components/fitness/line-graph";
import { useFitnessData, useFitnessDataRange } from "@/hooks/use-fitness-data";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });

  // Generate week days around current date
  const weekDays = useMemo(() => {
    const today = new Date();
    const days = [];
    
    for (let i = -3; i <= 3; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      const isToday = i === 0;
      
      let display;
      if (isToday) {
        display = `Lorem, ${date.getDate()} Sit`;
      } else {
        display = date.getDate().toString();
      }
      
      days.push({
        date: dateStr,
        display,
        isToday
      });
    }
    
    return days;
  }, []);

  const { data: fitnessData, isLoading } = useFitnessData(selectedDate);

  // Get week data for line graph
  const endDate = new Date().toISOString().split('T')[0];
  const startDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() - 6);
    return date.toISOString().split('T')[0];
  }, []);

  const { data: weekData, isLoading: weekLoading } = useFitnessDataRange(startDate, endDate);

  const weeklyStats = useMemo(() => {
    if (!weekData || weekData.length === 0) return { total: 0, average: 0 };
    const totalSteps = weekData.reduce((sum, day) => sum + day.steps, 0);
    return {
      total: totalSteps,
      average: Math.round(totalSteps / weekData.length)
    };
  }, [weekData]);

  const progress = fitnessData 
    ? Math.min((fitnessData.steps / fitnessData.stepGoal) * 100, 100)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <BackgroundOrbs />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-8 space-y-6">
        
        {/* Main Fitness Card */}
        <motion.div
          className="glassmorphic-card rounded-3xl p-6 w-full max-w-sm shadow-2xl neon-glow"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          data-testid="card-fitness-main"
        >
          
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <motion.button
              className="w-11 h-11 rounded-2xl bg-gray-700 bg-opacity-80 flex items-center justify-center transition-all duration-300 hover:bg-opacity-100 hover:scale-105"
              whileTap={{ scale: 0.95 }}
              data-testid="button-back"
            >
              <ChevronLeft className="text-gray-200 text-sm" />
            </motion.button>
            <motion.button
              className="w-11 h-11 rounded-2xl bg-gray-700 bg-opacity-80 flex items-center justify-center transition-all duration-300 hover:bg-opacity-100 hover:scale-105"
              whileTap={{ scale: 0.95 }}
              data-testid="button-menu"
            >
              <MoreHorizontal className="text-gray-200 text-sm" />
            </motion.button>
          </div>

          {/* Title */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className="gradient-text text-2xl font-bold mb-3" data-testid="text-title">
              Lorem Ipsum Dolor
            </h1>
            <div className="w-12 h-0.5 bg-gradient-to-r from-primary via-purple-400 to-purple-600 rounded" />
          </motion.div>

          {/* Week Days Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <WeekSelector
              weekDays={weekDays}
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
          </motion.div>

          {/* Steps Section */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <p className="text-gray-400 text-xs font-semibold tracking-wider mb-2">
              CONSECTETUR
            </p>
            {isLoading ? (
              <div className="h-14 skeleton-gradient rounded-lg mb-4" />
            ) : (
              <p className="text-white text-5xl font-thin mb-4 gradient-text" data-testid="text-steps-count">
                {fitnessData?.steps?.toLocaleString() || '0'}
              </p>
            )}
          </motion.div>

          {/* Progress Ring */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <ProgressRing progress={progress} />
          </motion.div>

          {/* Additional Stats */}
          <motion.div
            className="grid grid-cols-2 gap-4 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <StatsCard
              icon="calories"
              label="Amet"
              value={fitnessData?.calories || 0}
              delay={0.1}
            />
            <StatsCard
              icon="distance"
              label="Tempor"
              value={fitnessData?.distance || "0 km"}
              delay={0.2}
            />
          </motion.div>
          
        </motion.div>

        {/* Weekly Progress Graph */}
        <motion.div
          className="glassmorphic-card rounded-3xl p-6 w-full max-w-sm shadow-2xl neon-glow"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          data-testid="card-weekly-progress"
        >
          <div className="flex items-center mb-4">
            <Activity className="text-primary mr-2" />
            <h2 className="text-white text-lg font-semibold">Sed Do Eiusmod</h2>
          </div>
          
          {weekLoading ? (
            <div className="h-32 skeleton-gradient rounded-lg" />
          ) : (
            <LineGraph data={weekData || []} height={120} />
          )}
        </motion.div>

        {/* Weekly Stats Summary */}
        <motion.div
          className="glassmorphic-card rounded-3xl p-6 w-full max-w-sm shadow-2xl pulse-glow"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          data-testid="card-weekly-stats"
        >
          <div className="flex items-center mb-4">
            <TrendingUp className="text-primary mr-2" />
            <h2 className="text-white text-lg font-semibold">Magna Aliqua</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-gray-400 text-xs">Ut Enim</p>
              {weekLoading ? (
                <div className="h-8 skeleton-gradient rounded mt-1" />
              ) : (
                <p className="gradient-text text-2xl font-bold" data-testid="text-weekly-total">
                  {weeklyStats.total.toLocaleString()}
                </p>
              )}
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-xs">Minim Veniam</p>
              {weekLoading ? (
                <div className="h-8 skeleton-gradient rounded mt-1" />
              ) : (
                <p className="gradient-text text-2xl font-bold" data-testid="text-weekly-average">
                  {weeklyStats.average.toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </motion.div>
        
      </div>
    </div>
  );
}
