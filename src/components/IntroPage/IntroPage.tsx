
import React, { useEffect, useState } from 'react';
import LogoAnimation from './LogoAnimation';
import { ArrowDown } from 'lucide-react';

const IntroPage = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleScrollToTemplates = () => {
    const templateSection = document.getElementById('templates');
    if (templateSection) {
      templateSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTeam = () => {
    const teamSection = document.getElementById('team');
    if (teamSection) {
      teamSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4 md:p-8 relative overflow-hidden">
      {/* Logo background */}
      <div className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-10" 
           style={{ backgroundImage: "url('/lovable-uploads/fb6bfe57-b837-4100-9c9c-98968711791d.png')" }}>
      </div>
      
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
        <p className="text-lg md:text-xl font-opensans text-medsume-textDark leading-relaxed mb-6">
          Create stunning, professional resumes tailored for medical practitioners.
        </p>
        
        {/* Navigation guidance with click functionality */}
        <div 
          className="flex flex-col items-center mt-6 hover:scale-105 transition-transform duration-300 cursor-pointer py-2 px-6 bg-medsume-appleBlue/10 rounded-full" 
          onClick={handleScrollToTemplates}
        >
          <p className="text-medsume-textDark mb-2">Click here to start creating</p>
          <ArrowDown size={24} className="text-medsume-appleBlue animate-bounce" style={{animationDuration: '2s'}} />
        </div>
      </div>
      
      {/* About Us Link */}
      <div className="mt-6 z-10">
        <button 
          onClick={handleScrollToTeam}
          className="text-medsume-appleBlue hover:text-medsume-teal transition-colors duration-300 font-medium"
        >
          About Us
        </button>
      </div>
      
      <div className="mt-auto pt-6 text-xs text-medsume-watermark opacity-70">
        Created by Medsume by Shank
      </div>
    </div>
  );
};

export default IntroPage;
