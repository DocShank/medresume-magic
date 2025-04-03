
import React, { useEffect, useState } from 'react';

const LogoAnimation = () => {
  const [stage, setStage] = useState(0);
  
  useEffect(() => {
    const stageTimers = [
      setTimeout(() => setStage(1), 300),  // Initial state
      setTimeout(() => setStage(2), 900),  // Highlight SHA
      setTimeout(() => setStage(3), 1500), // Merge SHAs
      setTimeout(() => setStage(4), 2100), // Add NK
    ];
    
    return () => stageTimers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <div className="relative font-sfpro font-bold text-4xl md:text-5xl lg:text-6xl text-medsume-textDark">
      <div className="flex items-center justify-center">
        <span className="bg-gradient-to-r from-medsume-textDark to-medsume-textDark/80 bg-clip-text text-transparent transition-all duration-800 ease-in-out">Medsume by </span>
        
        {/* First SHA (Initially visible and stays) */}
        <span className={`${stage >= 1 ? 
          'bg-gradient-to-r from-medsume-teal to-medsume-appleBlue bg-clip-text text-transparent' : 
          'text-medsume-textDark'} transition-all duration-800 ease-in-out`}
        >
          {stage < 3 ? "Sha" : "S"}
        </span>
        
        {/* Second SHA (Slides left and merges with first SHA) */}
        {stage < 3 && (
          <span 
            className={`${stage >= 2 ? 
              'bg-gradient-to-r from-medsume-teal to-medsume-appleBlue bg-clip-text text-transparent' : 
              'text-medsume-textDark'} 
              ${stage === 2 ? 'animate-slide-left' : ''} transition-all duration-800 ease-in-out`}
            style={{animationDuration: '0.8s', animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'}}
          >
            sha
          </span>
        )}
        
        {/* nk (slides in from right) */}
        {stage >= 3 && (
          <span 
            className={`bg-gradient-to-r from-medsume-teal to-medsume-appleBlue bg-clip-text text-transparent
                        ${stage === 3 ? 'animate-fade-in' : ''} transition-all duration-800 ease-in-out`}
            style={{animationDuration: '0.8s', animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'}}
          >
            hank
          </span>
        )}
      </div>
      
      {stage >= 4 && (
        <div className="mt-2 text-sm text-center font-light animate-fade-in opacity-70" 
             style={{animationDuration: '0.8s', animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'}}>
          Elevate your medical career with precision
        </div>
      )}
    </div>
  );
};

export default LogoAnimation;
