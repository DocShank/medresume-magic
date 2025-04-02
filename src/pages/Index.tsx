
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
      <section id="intro" className="min-h-screen relative">
        <IntroPage />
      </section>
      
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
