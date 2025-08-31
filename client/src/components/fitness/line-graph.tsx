import { motion } from "framer-motion";
import { useMemo } from "react";
import type { FitnessData } from "@shared/schema";

interface LineGraphProps {
  data: FitnessData[];
  height?: number;
  className?: string;
}

export function LineGraph({ data, height = 120, className = "" }: LineGraphProps) {
  const { points, maxSteps, path } = useMemo(() => {
    if (!data || data.length === 0) {
      return { points: [], maxSteps: 0, path: "" };
    }

    const maxSteps = Math.max(...data.map(d => d.steps));
    const minSteps = Math.min(...data.map(d => d.steps));
    const stepRange = maxSteps - minSteps || 1;
    
    const width = 280;
    const padding = 20;
    const graphWidth = width - (padding * 2);
    const graphHeight = height - (padding * 2);
    
    const points = data.map((day, index) => {
      const x = padding + (index / (data.length - 1)) * graphWidth;
      const normalizedValue = (day.steps - minSteps) / stepRange;
      const y = padding + (1 - normalizedValue) * graphHeight;
      return { x, y, steps: day.steps, date: day.date };
    });

    // Create smooth path
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const prevPoint = points[i - 1];
      const currentPoint = points[i];
      
      // Control points for smooth curve
      const cp1x = prevPoint.x + (currentPoint.x - prevPoint.x) * 0.4;
      const cp1y = prevPoint.y;
      const cp2x = currentPoint.x - (currentPoint.x - prevPoint.x) * 0.4;
      const cp2y = currentPoint.y;
      
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${currentPoint.x} ${currentPoint.y}`;
    }

    return { points, maxSteps, path };
  }, [data, height]);

  if (!data || data.length === 0) {
    return (
      <div className={`w-full ${className}`} style={{ height }} data-testid="line-graph-empty">
        <div className="flex items-center justify-center h-full text-gray-400 text-sm">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`} data-testid="line-graph">
      <svg width="100%" height={height} viewBox="0 0 280 120" className="overflow-visible">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(16, 185, 129, 0.3)" />
            <stop offset="50%" stopColor="rgba(6, 182, 212, 0.2)" />
            <stop offset="100%" stopColor="rgba(168, 85, 247, 0.1)" />
          </linearGradient>
        </defs>
        
        {/* Grid lines */}
        <g opacity="0.1">
          {[0, 1, 2, 3, 4].map(i => (
            <line
              key={i}
              x1={20}
              y1={20 + (i * 20)}
              x2={260}
              y2={20 + (i * 20)}
              stroke="white"
              strokeWidth="1"
            />
          ))}
        </g>
        
        {/* Area under curve */}
        <motion.path
          d={`${path} L ${points[points.length - 1]?.x} ${height - 20} L ${points[0]?.x} ${height - 20} Z`}
          fill="url(#areaGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
        
        {/* Main line */}
        <motion.path
          d={path}
          stroke="url(#lineGradient)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        
        {/* Data points */}
        {points.map((point, index) => (
          <motion.g key={index}>
            <motion.circle
              cx={point.x}
              cy={point.y}
              r="6"
              fill="rgba(0, 0, 0, 0.8)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.5, duration: 0.3 }}
            />
            <motion.circle
              cx={point.x}
              cy={point.y}
              r="4"
              fill="url(#lineGradient)"
              className="cursor-pointer"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.5, duration: 0.3 }}
              whileHover={{ scale: 1.5 }}
              data-testid={`point-${point.date}`}
            />
            
            {/* Tooltip on hover */}
            <motion.g
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="pointer-events-none"
            >
              <rect
                x={point.x - 20}
                y={point.y - 35}
                width="40"
                height="20"
                rx="4"
                fill="rgba(0, 0, 0, 0.8)"
                stroke="rgba(156, 163, 175, 0.3)"
              />
              <text
                x={point.x}
                y={point.y - 22}
                textAnchor="middle"
                className="text-xs fill-white font-medium"
              >
                {point.steps.toLocaleString()}
              </text>
            </motion.g>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}