
import React, { useEffect } from 'react';
import IntroPage from '../components/IntroPage/IntroPage';
import ResumeBuilder from '../components/ResumeBuilder/ResumeBuilder';
import { ChevronDown } from 'lucide-react';

const Index = () => {
  // Apply smooth scrolling behavior globally
  useEffect(() => {
    // Add class to improve scroll behavior
    document.documentElement.classList.add('smooth-scroll');
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Handle hash navigation on load
    if (window.location.hash) {
      setTimeout(() => {
        const id = window.location.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    
    return () => {
      document.documentElement.classList.remove('smooth-scroll');
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const scrollToBuilder = () => {
    const element = document.getElementById('builder');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <section id="intro" className="min-h-screen relative pb-24">
        <IntroPage />
        
        {/* Swipe down prompt */}
        <div className="fixed bottom-8 right-8 z-20 animate-bounce" style={{animationDuration: '2s'}}>
          <a 
            href="#builder" 
            className="flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-apple text-medsume-appleBlue hover:text-medsume-appleBlueLight transition-all duration-300 hover:shadow-lg hover:scale-110"
            aria-label="Go to Resume Builder"
          >
            <ChevronDown className="h-6 w-6" />
          </a>
        </div>
      </section>
      
      {/* User guidance animation between sections */}
      <div 
        className="w-full py-8 flex flex-col items-center justify-center bg-gradient-to-r from-slate-800 to-slate-900 cursor-pointer"
        onClick={scrollToBuilder}
      >
        <p className="text-white text-center mb-2">Swipe down to start creating your professional resume</p>
        <ChevronDown className="h-6 w-6 text-white animate-bounce" />
      </div>
      
      <section id="builder" className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-medsume-appleDarkGrey"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-10 w-60 h-60 bg-medsume-appleBlue rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDuration: '8s'}}></div>
          <div className="absolute bottom-0 right-10 w-60 h-60 bg-medsume-teal rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDuration: '12s'}}></div>
        </div>
        <ResumeBuilder />
      </section>
    </div>
  );
};

export default Index;
