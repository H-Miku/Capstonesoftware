import { motion } from "framer-motion";

interface WeekDay {
  date: string;
  display: string;
  isToday: boolean;
}

interface WeekSelectorProps {
  weekDays: WeekDay[];
  selectedDate: string;
  onDateSelect: (date: string) => void;
}

export function WeekSelector({ weekDays, selectedDate, onDateSelect }: WeekSelectorProps) {
  return (
    <div className="flex justify-between items-center mb-6 gap-1" data-testid="week-selector">
      {weekDays.map((day, index) => (
        <motion.div
          key={day.date}
          className={`day-selector flex flex-col items-center cursor-pointer p-2 rounded-lg transition-all duration-300 hover:transform hover:-translate-y-0.5 ${
            selectedDate === day.date ? 'bg-gray-800 bg-opacity-50' : ''
          }`}
          onClick={() => onDateSelect(day.date)}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          data-testid={`button-day-${day.date}`}
        >
          <span className={`text-xs font-medium ${
            selectedDate === day.date ? 'text-white font-bold' : 'text-gray-400'
          }`}>
            {day.display}
          </span>
          {selectedDate === day.date && (
            <motion.div
              className="w-2 h-2 bg-primary rounded-full mt-1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
