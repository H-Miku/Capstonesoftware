import { motion } from "framer-motion";
import { ChevronLeft, User, Target, Trophy, Settings } from "lucide-react";
import { BackgroundOrbs } from "@/components/layout/background-orbs";
import { BottomNavigation } from "@/components/layout/bottom-navigation";

export default function Profile() {
  const profileData = {
    name: "Fitness Enthusiast",
    joinDate: "January 2024",
    totalSteps: "1.2M",
    achievements: 15,
    dailyGoal: 8000
  };

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
          <h1 className="text-white text-2xl font-bold" data-testid="text-profile-title">
            Profile
          </h1>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          className="glassmorphic rounded-3xl p-6 w-full max-w-sm mx-auto mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          data-testid="card-profile-main"
        >
          
          {/* Profile Avatar */}
          <div className="flex flex-col items-center mb-6">
            <motion.div
              className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
              data-testid="avatar-user"
            >
              <User className="text-primary-foreground text-2xl" />
            </motion.div>
            <h2 className="text-white text-xl font-semibold" data-testid="text-username">
              {profileData.name}
            </h2>
            <p className="text-gray-400 text-sm" data-testid="text-join-date">
              Member since {profileData.joinDate}
            </p>
          </div>

          {/* Profile Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <p className="text-primary text-lg font-bold" data-testid="text-total-steps">
                {profileData.totalSteps}
              </p>
              <p className="text-gray-400 text-xs">Total Steps</p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <p className="text-primary text-lg font-bold" data-testid="text-achievements">
                {profileData.achievements}
              </p>
              <p className="text-gray-400 text-xs">Achievements</p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <p className="text-primary text-lg font-bold" data-testid="text-daily-goal">
                {profileData.dailyGoal.toLocaleString()}
              </p>
              <p className="text-gray-400 text-xs">Daily Goal</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Settings Options */}
        <motion.div
          className="glassmorphic rounded-3xl p-6 w-full max-w-sm mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          data-testid="card-settings"
        >
          <h3 className="text-white text-lg font-semibold mb-4">Settings</h3>
          
          <div className="space-y-3">
            <motion.button
              className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-800 bg-opacity-50 transition-all duration-300 hover:bg-opacity-80"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              data-testid="button-daily-goal"
            >
              <div className="flex items-center">
                <Target className="text-primary mr-3" size={20} />
                <span className="text-white">Daily Goal</span>
              </div>
              <span className="text-gray-400">{profileData.dailyGoal.toLocaleString()}</span>
            </motion.button>

            <motion.button
              className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-800 bg-opacity-50 transition-all duration-300 hover:bg-opacity-80"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              data-testid="button-achievements"
            >
              <div className="flex items-center">
                <Trophy className="text-primary mr-3" size={20} />
                <span className="text-white">Achievements</span>
              </div>
              <span className="text-gray-400">{profileData.achievements}</span>
            </motion.button>

            <motion.button
              className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-800 bg-opacity-50 transition-all duration-300 hover:bg-opacity-80"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              data-testid="button-settings"
            >
              <div className="flex items-center">
                <Settings className="text-primary mr-3" size={20} />
                <span className="text-white">Settings</span>
              </div>
            </motion.button>
          </div>
        </motion.div>
        
      </div>

      <BottomNavigation />
    </div>
  );
}
