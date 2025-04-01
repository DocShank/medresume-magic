
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

  const handleScrollToBuilder = () => {
    document.getElementById('builder')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4 md:p-8 relative overflow-hidden">
      {/* Apple-style gradient blurred circles in background */}
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-gradient-to-r from-medsume-teal/20 to-medsume-appleBlue/20 blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-gradient-to-r from-medsume-tealLight/20 to-medsume-resumeGold/20 blur-3xl"></div>
      
      <div className="h-[20vh] flex items-center justify-center mt-8 z-10">
        <LogoAnimation />
      </div>
      
      <div className="max-w-3xl mx-auto my-8 text-center z-10 backdrop-blur-sm bg-white/50 p-6 rounded-2xl shadow-apple">
        <h1 className="text-2xl md:text-3xl font-semibold font-sfpro mb-4 text-medsume-textDark animate-fade-in">
          Your Medical Journey, Beautifully Presented
        </h1>
        <p className="text-lg md:text-xl font-opensans text-medsume-textDark leading-relaxed">
          Create stunning, professional resumes tailored for medical practitioners. Our specialized tool helps you showcase your credentials with precision and elegance.
        </p>
      </div>
      
      <div className="mt-8 z-10">
        <div 
          className="flex items-center text-medsume-textDark animate-float cursor-pointer"
          onClick={handleScrollToBuilder}
        >
          <span className="text-sm mr-2">Explore Resume Builder</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
      
      <div className="mt-16 w-full z-10">
        <FoundingTeam />
      </div>
      
      <div className="mt-auto pt-6 text-xs text-medsume-watermark opacity-70">
        Created by Medsume by Shank
      </div>
    </div>
  );
};

export default IntroPage;
