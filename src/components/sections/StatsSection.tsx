import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Stat } from '../../types/landing';
import { Activity, Users, Database, Globe } from 'lucide-react';

interface StatsSectionProps {
  stats: Stat[];
}

const iconMap = {
  users: Users,
  database: Database,
  activity: Activity,
  globe: Globe,
};

export const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="py-24 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto px-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => {
            const Icon = iconMap[stat.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={index}
                variants={statVariants}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-6 p-4 bg-white/10 rounded-full">
                  {Icon && <Icon className="w-8 h-8" />}
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};