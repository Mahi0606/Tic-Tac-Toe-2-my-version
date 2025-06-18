import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface WinAnimationProps {
  winner: string;
  onComplete?: () => void;
}

const WinAnimation: React.FC<WinAnimationProps> = ({ winner, onComplete }) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; color: string }>>([]);
  
  useEffect(() => {
    // Generate random particles for the celebration effect
    const newParticles = [];
    const colors = winner === 'X' 
      ? ['#3B82F6', '#60A5FA', '#93C5FD'] // Blue shades for X
      : ['#F97316', '#FB923C', '#FDBA74']; // Orange shades for O
      
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    
    setParticles(newParticles);
    
    // Cleanup animation after it's done
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [winner, onComplete]);
  
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            backgroundColor: particle.color,
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            y: [0, -100 * Math.random() - 50],
            x: [0, (Math.random() - 0.5) * 100],
          }}
          transition={{
            duration: 2,
            ease: "easeOut",
            delay: Math.random() * 0.2,
          }}
        />
      ))}
    </motion.div>
  );
};

export default WinAnimation;