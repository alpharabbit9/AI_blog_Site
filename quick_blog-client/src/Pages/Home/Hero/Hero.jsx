import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const starVariants = {
    animate: {
      rotate: [0, 360],
      scale: [1, 1.1, 1],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const floatingStars = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2
  }));

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300 overflow-hidden">
      {/* Animated Background Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingStars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute w-4 h-4 opacity-20"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut"
            }}
          >
            {/* Star Icon Placeholder - Replace with your assets.starIcon */}
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-primary">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </motion.div>
        ))}

       
      </div>

      {/* Main Star Background */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        variants={starVariants}
        animate="animate"
      >
        <div className="w-96 h-96 opacity-5">
          {/* Large Star Icon Placeholder - Replace with your assets.starIcon */}
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-primary">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
      </motion.div>

      {/* Content Container */}
      <motion.div
        className="relative z-10 container mx-auto px-4 py-16 min-h-screen flex flex-col justify-center items-center text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* New Feature Badge */}
        <motion.div
          variants={badgeVariants}
          className="mb-8"
        >
          <div className="badge badge-primary badge-lg gap-2 px-6 py-4 shadow-lg">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="font-medium">New: AI feature integrated</span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          variants={itemVariants}
          className="max-w-4xl mb-8"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
            <span className="text-[#364153]">Your own </span>
            <span className="text-primary bg-gradient-to-r from-primary to-secondary bg-clip-text ">
              blogging
            </span>
            <br />
            <span className="text-[#364153]">platform.</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          variants={itemVariants}
          className="max-w-2xl mb-12"
        >
          <p className="text-lg md:text-xl text-base-content/70 leading-relaxed">
            This is your space to think out loud, to share what matters, and to write without filters. 
            Whether it's one word or a thousand, your story starts right here.
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-2xl"
        >
          <div className="join w-full shadow-xl">
            <input
              type="text"
              placeholder="Search for blogs"
              className="input input-bordered input-lg join-item w-full text-base-content placeholder:text-base-content/50 bg-base-100/80 backdrop-blur-sm border-2 focus:border-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <motion.button
              className="btn btn-primary btn-lg join-item px-8 font-semibold"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Search
            </motion.button>
          </div>
        </motion.div>

      
        
      </motion.div>
    </div>
  );
};

export default Hero;