import { motion } from "framer-motion";
import { Home, BarChart3, User } from "lucide-react";
import { Link, useLocation } from "wouter";

interface NavItem {
  path: string;
  icon: React.ComponentType<any>;
  label: string;
}

const navItems: NavItem[] = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/stats", icon: BarChart3, label: "Stats" },
  { path: "/profile", icon: User, label: "Profile" },
];

export function BottomNavigation() {
  const [location] = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 glassmorphic border-t border-gray-700 border-opacity-30" data-testid="bottom-navigation">
      <div className="flex justify-around py-3 px-4">
        {navItems.map((item) => {
          const isActive = location === item.path;
          const IconComponent = item.icon;
          
          return (
            <Link key={item.path} href={item.path}>
              <motion.button
                className="nav-item flex flex-col items-center space-y-1 transition-all duration-300"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                data-testid={`button-nav-${item.label.toLowerCase()}`}
              >
                <IconComponent 
                  className={`text-lg ${isActive ? 'text-primary' : 'text-gray-400'}`} 
                />
                <span className={`text-xs ${
                  isActive 
                    ? 'text-primary font-semibold' 
                    : 'text-gray-400 font-medium'
                }`}>
                  {item.label}
                </span>
              </motion.button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
