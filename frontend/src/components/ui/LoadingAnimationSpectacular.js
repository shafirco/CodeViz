'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const LoadingAnimationSpectacular = ({ message = "Processing...", type = "default" }) => {
  const [lightningStrikes, setLightningStrikes] = useState([]);
  const [energyOrbs, setEnergyOrbs] = useState([]);
  const [electricArcs, setElectricArcs] = useState([]);

  // Generate ultra-realistic lightning with complex branching like the images
  const generateUltraRealisticLightning = () => {
    const strikes = [];
    for (let i = 0; i < 6; i++) {
      const startX = Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200);
      const startY = -100;
      const endX = startX + (Math.random() - 0.5) * 600;
      const endY = (typeof window !== 'undefined' ? window.innerHeight : 800) + 100;
      
      // Create main lightning path with ultra-realistic zigzag
      const segments = [];
      const numSegments = 20 + Math.random() * 15;
      
      for (let j = 0; j <= numSegments; j++) {
        const progress = j / numSegments;
        // More aggressive zigzag pattern
        const randomOffset = (Math.random() - 0.5) * 120 * Math.sin(progress * Math.PI);
        const x = startX + (endX - startX) * progress + randomOffset;
        const y = startY + (endY - startY) * progress + (Math.random() - 0.5) * 80;
        segments.push({ x, y });
      }

      // Create complex branching system like real lightning
      const branches = [];
      const maxBranches = 5 + Math.random() * 8;
      
      for (let k = 0; k < maxBranches; k++) {
        const branchStartIndex = Math.floor(Math.random() * (segments.length - 8)) + 3;
        const branchStart = segments[branchStartIndex];
        const branchLength = 4 + Math.random() * 8;
        
        const branchSegments = [branchStart];
        let currentX = branchStart.x;
        let currentY = branchStart.y;
        
        for (let l = 1; l <= branchLength; l++) {
          // More realistic branching angles
          const angle = (Math.random() - 0.5) * Math.PI * 0.8;
          const distance = 30 + Math.random() * 70;
          currentX += Math.cos(angle) * distance;
          currentY += Math.sin(angle) * distance + 20;
          branchSegments.push({ x: currentX, y: currentY });
          
          // Secondary branches (branches of branches)
          if (l > 2 && Math.random() < 0.4) {
            const subBranches = [];
            const subBranchLength = 2 + Math.random() * 4;
            let subX = currentX;
            let subY = currentY;
            
            for (let m = 1; m <= subBranchLength; m++) {
              const subAngle = (Math.random() - 0.5) * Math.PI * 0.6;
              const subDistance = 20 + Math.random() * 40;
              subX += Math.cos(subAngle) * subDistance;
              subY += Math.sin(subAngle) * subDistance + 15;
              subBranches.push({ x: subX, y: subY });
            }
            branches.push(subBranches);
          }
        }
        branches.push(branchSegments);
      }

      // Lightning colors matching the beautiful images
      const lightningColors = [
        '#a5b4fc', // Light purple-blue
        '#6366f1', // Indigo
        '#8b5cf6', // Purple
        '#3b82f6', // Blue
        '#1e40af', // Dark blue
        '#4c1d95'  // Dark purple
      ];

      strikes.push({
        id: i,
        mainPath: segments,
        branches,
        delay: Math.random() * 3,
        duration: 0.15 + Math.random() * 0.25,
        intensity: 0.8 + Math.random() * 0.2,
        color: lightningColors[Math.floor(Math.random() * lightningColors.length)],
        coreColor: '#ffffff',
        glowColor: '#e0e7ff'
      });
    }
    setLightningStrikes(strikes);
  };

  // Generate magical energy orbs
  const generateMagicalEnergyOrbs = () => {
    const orbs = [];
    for (let i = 0; i < 35; i++) {
      orbs.push({
        id: i,
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
        size: 3 + Math.random() * 10,
        delay: Math.random() * 4,
        duration: 2 + Math.random() * 4,
        color: ['#a5b4fc', '#6366f1', '#8b5cf6', '#3b82f6'][Math.floor(Math.random() * 4)]
      });
    }
    setEnergyOrbs(orbs);
  };

  // Generate electric arcs with storm-like appearance
  const generateStormArcs = () => {
    const arcs = [];
    for (let i = 0; i < 15; i++) {
      const startX = Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200);
      const startY = Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800);
      const endX = startX + (Math.random() - 0.5) * 400;
      const endY = startY + (Math.random() - 0.5) * 400;
      
      arcs.push({
        id: i,
        startX, startY, endX, endY,
        delay: Math.random() * 5,
        duration: 0.4 + Math.random() * 0.8,
        color: ['#a5b4fc', '#6366f1', '#8b5cf6'][Math.floor(Math.random() * 3)]
      });
    }
    setElectricArcs(arcs);
  };

  useEffect(() => {
    generateUltraRealisticLightning();
    generateMagicalEnergyOrbs();
    generateStormArcs();

    const interval = setInterval(() => {
      generateUltraRealisticLightning();
      generateMagicalEnergyOrbs();
      generateStormArcs();
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  if (type === "ai") {
    return (
      <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
        {/* Storm atmosphere background */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 30% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 70% 60%, rgba(139, 92, 246, 0.12) 0%, transparent 50%),
              radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)
            `,
            backdropFilter: 'blur(0.5px)'
          }}
        />

        {/* Ultra-Realistic Lightning System */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            {/* Enhanced lightning glow filters */}
            <filter id="ultra-lightning-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="2" result="innerGlow"/>
              <feGaussianBlur stdDeviation="6" result="mediumGlow"/>
              <feGaussianBlur stdDeviation="12" result="outerGlow"/>
              <feGaussianBlur stdDeviation="25" result="atmosphereGlow"/>
              <feMerge>
                <feMergeNode in="atmosphereGlow"/>
                <feMergeNode in="outerGlow"/>
                <feMergeNode in="mediumGlow"/>
                <feMergeNode in="innerGlow"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* Plasma-like electric pulse */}
            <filter id="plasma-pulse" x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur stdDeviation="8" result="plasma"/>
              <feColorMatrix in="plasma" type="matrix" 
                values="1 0 1 0 0.2
                        0 0.5 1 0 0.3
                        0.3 0 1 0 0.5
                        0 0 0 1 0"/>
              <feMerge>
                <feMergeNode in="plasma"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* Storm gradients */}
            <linearGradient id="storm-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor:"#a5b4fc", stopOpacity:1}} />
              <stop offset="30%" style={{stopColor:"#6366f1", stopOpacity:0.9}} />
              <stop offset="70%" style={{stopColor:"#8b5cf6", stopOpacity:0.8}} />
              <stop offset="100%" style={{stopColor:"#3b82f6", stopOpacity:1}} />
            </linearGradient>

            <radialGradient id="lightning-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" style={{stopColor:"#ffffff", stopOpacity:1}} />
              <stop offset="30%" style={{stopColor:"#e0e7ff", stopOpacity:0.9}} />
              <stop offset="100%" style={{stopColor:"#6366f1", stopOpacity:0.6}} />
            </radialGradient>
          </defs>

          <AnimatePresence>
            {lightningStrikes.map((strike) => (
              <g key={strike.id}>
                {/* Atmospheric glow base */}
                <motion.path
                  d={`M ${strike.mainPath.map((seg, i) => `${i === 0 ? 'M' : 'L'} ${seg.x} ${seg.y}`).join(' ')}`}
                  stroke={strike.glowColor}
                  strokeWidth="15"
                  fill="none"
                  opacity="0.3"
                  filter="url(#ultra-lightning-glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: [0, 1, 1, 0],
                    opacity: [0, 0.4, 0.3, 0],
                    strokeWidth: [8, 20, 12, 5]
                  }}
                  transition={{
                    duration: strike.duration * 1.2,
                    delay: strike.delay,
                    repeat: Infinity,
                    repeatDelay: 4 + Math.random() * 6
                  }}
                />

                {/* Main lightning bolt with storm colors */}
                <motion.path
                  d={`M ${strike.mainPath.map((seg, i) => `${i === 0 ? 'M' : 'L'} ${seg.x} ${seg.y}`).join(' ')}`}
                  stroke={strike.color}
                  strokeWidth="6"
                  fill="none"
                  filter="url(#ultra-lightning-glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: [0, 1, 1, 0],
                    opacity: [0, strike.intensity, strike.intensity * 0.8, 0],
                    strokeWidth: [2, 8, 5, 1]
                  }}
                  transition={{
                    duration: strike.duration,
                    delay: strike.delay,
                    repeat: Infinity,
                    repeatDelay: 4 + Math.random() * 6
                  }}
                />
                
                {/* Bright white core */}
                <motion.path
                  d={`M ${strike.mainPath.map((seg, i) => `${i === 0 ? 'M' : 'L'} ${seg.x} ${seg.y}`).join(' ')}`}
                  stroke="url(#lightning-core)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: [0, 1, 1, 0],
                    opacity: [0, 1, 0.9, 0],
                    strokeWidth: [1, 3, 2, 0.5]
                  }}
                  transition={{
                    duration: strike.duration * 0.9,
                    delay: strike.delay + 0.02,
                    repeat: Infinity,
                    repeatDelay: 4 + Math.random() * 6
                  }}
                />

                {/* Complex lightning branches */}
                {strike.branches.map((branch, branchIndex) => (
                  <g key={branchIndex}>
                    {/* Branch glow */}
                    <motion.path
                      d={`M ${branch.map((seg, i) => `${i === 0 ? 'M' : 'L'} ${seg.x} ${seg.y}`).join(' ')}`}
                      stroke={strike.glowColor}
                      strokeWidth="8"
                      fill="none"
                      opacity="0.2"
                      filter="url(#ultra-lightning-glow)"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: [0, 1, 1, 0],
                        opacity: [0, 0.3, 0.2, 0]
                      }}
                      transition={{
                        duration: strike.duration * 0.8,
                        delay: strike.delay + 0.05 + branchIndex * 0.02,
                        repeat: Infinity,
                        repeatDelay: 4 + Math.random() * 6
                      }}
                    />
                    
                    {/* Branch main path */}
                    <motion.path
                      d={`M ${branch.map((seg, i) => `${i === 0 ? 'M' : 'L'} ${seg.x} ${seg.y}`).join(' ')}`}
                      stroke={strike.color}
                      strokeWidth="3"
                      fill="none"
                      filter="url(#ultra-lightning-glow)"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: [0, 1, 1, 0],
                        opacity: [0, strike.intensity * 0.7, strike.intensity * 0.5, 0]
                      }}
                      transition={{
                        duration: strike.duration * 0.7,
                        delay: strike.delay + 0.08 + branchIndex * 0.03,
                        repeat: Infinity,
                        repeatDelay: 4 + Math.random() * 6
                      }}
                    />

                    {/* Branch core */}
                    <motion.path
                      d={`M ${branch.map((seg, i) => `${i === 0 ? 'M' : 'L'} ${seg.x} ${seg.y}`).join(' ')}`}
                      stroke="#ffffff"
                      strokeWidth="1"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: [0, 1, 1, 0],
                        opacity: [0, 0.9, 0.7, 0]
                      }}
                      transition={{
                        duration: strike.duration * 0.6,
                        delay: strike.delay + 0.1 + branchIndex * 0.03,
                        repeat: Infinity,
                        repeatDelay: 4 + Math.random() * 6
                      }}
                    />
                  </g>
                ))}
              </g>
            ))}
          </AnimatePresence>

          {/* Storm Electric Arcs */}
          <AnimatePresence>
            {electricArcs.map((arc) => (
              <motion.line
                key={arc.id}
                x1={arc.startX}
                y1={arc.startY}
                x2={arc.endX}
                y2={arc.endY}
                stroke={arc.color}
                strokeWidth="3"
                filter="url(#plasma-pulse)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 1, 0],
                  opacity: [0, 0.7, 0],
                  strokeWidth: [1, 4, 1]
                }}
                transition={{
                  duration: arc.duration,
                  delay: arc.delay,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              />
            ))}
          </AnimatePresence>
        </svg>

        {/* Magical Energy Orbs with storm colors */}
        <AnimatePresence>
          {energyOrbs.map((orb) => (
            <motion.div
              key={orb.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: orb.x,
                top: orb.y,
                width: orb.size,
                height: orb.size,
                background: `radial-gradient(circle, ${orb.color}, transparent)`,
                boxShadow: `0 0 ${orb.size * 3}px ${orb.color}, 0 0 ${orb.size * 6}px ${orb.color}40`
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.8, 1.2, 1.5, 0],
                opacity: [0, 0.9, 0.7, 0.8, 0],
                x: [0, Math.random() * 150 - 75],
                y: [0, Math.random() * 150 - 75]
              }}
              transition={{
                duration: orb.duration,
                delay: orb.delay,
                repeat: Infinity,
                repeatDelay: 1.5 + Math.random() * 3
              }}
            />
          ))}
        </AnimatePresence>

        {/* Storm Cloud Effects at Screen Edges */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              [i < 3 ? 'top' : 'bottom']: i < 3 ? `${(i * 33)}%` : `${((i - 3) * 33)}%`,
              [i % 2 === 0 ? 'left' : 'right']: 0,
              width: '250px',
              height: '250px',
              background: `conic-gradient(from ${i * 60}deg, transparent, rgba(99, 102, 241, 0.2), transparent, rgba(139, 92, 246, 0.15), transparent)`,
              borderRadius: '50%',
              filter: 'blur(30px)'
            }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0.7, 1.3, 0.8],
              rotate: 360
            }}
            transition={{
              duration: 6 + i,
              delay: i * 0.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Enhanced AI Core with Storm Theme */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
          <motion.div
            className="relative w-28 h-28"
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {/* Storm energy rings */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute border-2 rounded-full"
                style={{
                  width: `${65 + i * 18}px`,
                  height: `${65 + i * 18}px`,
                  borderColor: ['#a5b4fc', '#6366f1', '#8b5cf6', '#3b82f6'][i],
                  opacity: 0.6,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
                animate={{
                  rotate: i % 2 === 0 ? 360 : -360,
                  scale: [1, 1.15, 1],
                  opacity: [0.6, 0.9, 0.6]
                }}
                transition={{
                  rotate: { duration: 4 + i, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              />
            ))}

            {/* Central storm AI core */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center font-bold text-white text-base"
              style={{
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.95), rgba(139, 92, 246, 0.8))',
                boxShadow: '0 0 40px rgba(99, 102, 241, 0.9), 0 0 80px rgba(139, 92, 246, 0.6)'
              }}
              animate={{
                boxShadow: [
                  '0 0 30px rgba(99, 102, 241, 0.9), 0 0 60px rgba(139, 92, 246, 0.6)',
                  '0 0 50px rgba(139, 92, 246, 1), 0 0 100px rgba(99, 102, 241, 0.8)',
                  '0 0 30px rgba(99, 102, 241, 0.9), 0 0 60px rgba(139, 92, 246, 0.6)'
                ],
                scale: [1, 1.08, 1]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              AI
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Storm Message */}
        <motion.div
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center pointer-events-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="px-8 py-4 rounded-xl backdrop-blur-lg border"
            style={{
              background: 'rgba(0, 0, 0, 0.75)',
              borderColor: 'rgba(99, 102, 241, 0.6)',
              boxShadow: '0 0 30px rgba(99, 102, 241, 0.3)'
            }}
          >
            <motion.h2
              className="text-2xl font-bold mb-3"
              style={{
                background: 'linear-gradient(45deg, #a5b4fc, #6366f1, #8b5cf6, #3b82f6, #a5b4fc)',
                backgroundSize: '400% 400%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {message}
            </motion.h2>
            
            <motion.div
              className="text-base text-white"
              animate={{
                opacity: [0.8, 1, 0.8],
                textShadow: [
                  '0 0 10px rgba(99, 102, 241, 0.8)',
                  '0 0 20px rgba(139, 92, 246, 1)',
                  '0 0 10px rgba(99, 102, 241, 0.8)'
                ]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity
              }}
            >
              ⚡ Lightning storm of AI power ⚡
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600">{message}</p>
    </div>
  );
};

export default LoadingAnimationSpectacular;