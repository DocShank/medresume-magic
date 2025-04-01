
import React, { useEffect, useState } from 'react';

const LogoAnimation = () => {
  const [stage, setStage] = useState(0);
  
  useEffect(() => {
    const stageTimers = [
      setTimeout(() => setStage(1), 0),    // Initial state
      setTimeout(() => setStage(2), 2000), // Highlight SHA
      setTimeout(() => setStage(3), 3000), // Merge SHAs
      setTimeout(() => setStage(4), 4000), // Add NK
      setTimeout(() => setStage(5), 5000)  // Add subtitle
    ];
    
    return () => stageTimers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <div className="relative font-sfpro font-bold text-4xl md:text-5xl lg:text-6xl text-medsume-textDark">
      <div className="flex items-center justify-center">
        <span className="bg-gradient-to-r from-medsume-textDark to-medsume-textDark/80 bg-clip-text text-transparent">Medsume by </span>
        
        {/* First SHA (Initially visible and stays) */}
        <span className={`${stage >= 1 ? 
          'bg-gradient-to-r from-medsume-teal to-medsume-appleBlue bg-clip-text text-transparent' : 
          'text-medsume-textDark'} transition-all duration-500`}
        >
          {stage < 3 ? "Sha" : "S"}
        </span>
        
        {/* Second SHA (Slides left and merges with first SHA) */}
        {stage < 3 && (
          <span 
            className={`${stage >= 2 ? 
              'bg-gradient-to-r from-medsume-teal to-medsume-appleBlue bg-clip-text text-transparent' : 
              'text-medsume-textDark'} 
              ${stage === 2 ? 'animate-slide-left' : ''} transition-all duration-500`}
          >
            sha
          </span>
        )}
        
        {/* nk (slides in from right) */}
        {stage >= 3 && (
          <span 
            className={`bg-gradient-to-r from-medsume-teal to-medsume-appleBlue bg-clip-text text-transparent
                        ${stage === 3 ? 'animate-fade-in' : ''} transition-all duration-500`}
          >
            hank
          </span>
        )}
        
        {/* Subtitle fades in */}
        {stage >= 4 && (
          <span 
            className={`ml-2 text-base md:text-xl lg:text-2xl font-normal
                        ${stage === 4 ? 'animate-fade-in' : ''} transition-all duration-500`}
          >
            - AI Resume Builder
          </span>
        )}
      </div>
      
      {stage >= 5 && (
        <div className="mt-2 text-sm text-center font-light animate-fade-in opacity-70">
          Elevate your medical career with precision
        </div>
      )}
    </div>
  );
};

export default LogoAnimation;
