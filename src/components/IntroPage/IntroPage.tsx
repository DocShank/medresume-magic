
import React, { useEffect, useState } from 'react';
import LogoAnimation from './LogoAnimation';
import FoundingTeam from './FoundingTeam';

const IntroPage = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 5000); // Animation completes after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4 md:p-8 relative overflow-hidden">
      {/* Apple-style gradient blurred circles in background */}
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-gradient-to-r from-medsume-teal/20 to-medsume-appleBlue/20 blur-3xl animate-pulse" style={{animationDuration: '15s'}}></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-gradient-to-r from-medsume-tealLight/20 to-medsume-resumeGold/20 blur-3xl animate-pulse" style={{animationDuration: '20s'}}></div>
      
      <div className="h-[20vh] flex items-center justify-center mt-8 z-10">
        <LogoAnimation />
      </div>
      
      <div className="max-w-3xl mx-auto my-8 text-center z-10 backdrop-blur-sm bg-white/50 p-6 rounded-2xl shadow-apple transition-all duration-500 hover:shadow-xl">
        <h1 className="text-2xl md:text-3xl font-semibold font-sfpro mb-4 text-medsume-textDark animate-fade-in">
          Welcome to the Medical Professional Community
        </h1>
        <p className="text-lg md:text-xl font-opensans text-medsume-textDark leading-relaxed">
          Create stunning, professional resumes tailored for medical practitioners. Our specialized tool helps you showcase your credentials with precision and elegance.
        </p>
      </div>
      
      <div className="mt-12 w-full z-10">
        <FoundingTeam />
      </div>
      
      <div className="mt-auto pt-6 text-xs text-medsume-watermark opacity-70">
        Created by Medsume by Shank
      </div>
    </div>
  );
};

export default IntroPage;
