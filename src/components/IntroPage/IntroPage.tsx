
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

  const handleGetStarted = () => {
    document.getElementById('builder')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4 md:p-8">
      <div className="h-[20vh] flex items-center justify-center">
        <LogoAnimation />
      </div>
      
      <div className="max-w-3xl mx-auto my-10 text-center">
        <p className="text-lg md:text-xl font-opensans text-medsume-textDark p-5">
          Welcome, doctors! Craft your professional resume with this specialized tool 
          designed exclusively for medical professionals to create comprehensive, 
          visually striking CVs that showcase your credentials with precision and elegance.
        </p>
      </div>
      
      <button
        onClick={handleGetStarted}
        className={`bg-medsume-teal text-white font-montserrat text-lg rounded-lg px-6 py-3 
                   hover:bg-medsume-tealLight transition-colors duration-300 
                   ${!animationComplete ? 'opacity-0' : 'opacity-100 animate-fade-in'}`}
        disabled={!animationComplete}
      >
        Get Started
      </button>
      
      <div className="mt-16 w-full">
        <FoundingTeam />
      </div>
      
      <div className="mt-auto pt-4 text-xs text-medsume-watermark opacity-70">
        Created by Medsume by Shank
      </div>
    </div>
  );
};

export default IntroPage;
