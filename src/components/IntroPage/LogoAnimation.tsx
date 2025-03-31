
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
    <div className="relative font-montserrat font-bold text-3xl md:text-4xl text-medsume-textDark">
      <div className="flex items-center justify-center">
        <span>Medsume by </span>
        
        {/* First SHA (Initially visible and stays) */}
        <span className={stage >= 1 ? 'text-medsume-teal' : 'text-medsume-textDark'}>
          {stage < 3 ? "Sha" : "S"}
        </span>
        
        {/* Second SHA (Slides left and merges with first SHA) */}
        {stage < 3 && (
          <span 
            className={`${stage >= 2 ? 'text-medsume-teal' : 'text-medsume-textDark'} 
                      ${stage === 2 ? 'animate-slide-left' : ''}`}
          >
            sha
          </span>
        )}
        
        {/* nk (slides in from right) */}
        {stage >= 3 && (
          <span 
            className={`text-medsume-teal ${stage === 3 ? 'animate-fade-in' : ''}`}
          >
            hank
          </span>
        )}
        
        {/* Subtitle fades in */}
        {stage >= 4 && (
          <span 
            className={`ml-2 text-base md:text-lg font-normal ${stage === 4 ? 'animate-fade-in' : ''}`}
          >
            - AI Resume Builder
          </span>
        )}
      </div>
    </div>
  );
};

export default LogoAnimation;
