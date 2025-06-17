'use client';

import { motion } from 'framer-motion';

const LoadingAnimation = ({ message = "Processing...", type = "default" }) => {
  // Lightning bolt paths for animation
  const lightningPaths = [
    "M10 2L8 8h4l-2 8",
    "M6 4L4 10h4l-2 6", 
    "M14 4L12 10h4l-2 6"
  ];

  // Electricity spark variants
  const sparkVariants = {
    animate: {
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "loop",
        staggerChildren: 0.2
      }
    }
  };

  // Lightning bolt animation
  const lightningVariants = {
    animate: {
      opacity: [0, 1, 0],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut"
      }
    }
  };

  // Energy pulse animation
  const pulseVariants = {
    animate: {
      scale: [1, 1.5, 1],
      opacity: [0.3, 0.8, 0.3],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };

  if (type === "ai") {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        {/* Central AI Core */}
        <div className="relative">
          {/* Energy Core */}
          <motion.div
            className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center"
            variants={pulseVariants}
            animate="animate"
          >
            <motion.div
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center"
              animate={{
                rotate: 360,
                transition: { duration: 2, repeat: Infinity, ease: "linear" }
              }}
            >
              <span className="text-blue-600 font-bold text-sm">AI</span>
            </motion.div>
          </motion.div>

          {/* Lightning Bolts */}
          {[0, 1, 2, 3].map((index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{
                top: '50%',
                left: '50%',
                transformOrigin: 'center',
                transform: `translate(-50%, -50%) rotate(${index * 90}deg) translateY(-40px)`
              }}
              variants={lightningVariants}
              animate="animate"
              transition={{ delay: index * 0.15 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" className="text-yellow-400">
                <motion.path
                  d="M13 2L11 8h4l-2 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  animate={{
                    pathLength: [0, 1, 0],
                    transition: { duration: 0.8, repeat: Infinity }
                  }}
                />
              </svg>
            </motion.div>
          ))}

          {/* Energy Sparks */}
          {[...Array(8)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full"
              style={{
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${index * 45}deg) translateY(-60px)`
              }}
              variants={sparkVariants}
              animate="animate"
              transition={{ delay: index * 0.1 }}
            />
          ))}
        </div>

        {/* Loading Text */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.h3
            className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            animate={{
              opacity: [0.5, 1, 0.5],
              transition: { duration: 2, repeat: Infinity }
            }}
          >
            {message}
          </motion.h3>
          <motion.div
            className="flex justify-center space-x-1 mt-2"
            variants={sparkVariants}
            animate="animate"
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-blue-500 rounded-full"
                animate={{
                  scale: [0, 1, 0],
                  transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Default loading animation
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <motion.div
        className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <motion.p
        className="mt-4 text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {message}
      </motion.p>
    </div>
  );
};

export default LoadingAnimation; 