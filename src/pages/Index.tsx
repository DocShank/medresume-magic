
import React from 'react';
import IntroPage from '../components/IntroPage/IntroPage';
import ResumeBuilder from '../components/ResumeBuilder/ResumeBuilder';

const Index = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <section id="intro" className="min-h-screen relative">
        <IntroPage />
        <div className="absolute bottom-12 left-0 right-0 flex justify-center animate-float">
          <a 
            href="#builder" 
            className="flex flex-col items-center text-gray-500 hover:text-medsume-appleBlue transition-colors"
          >
            <span className="text-sm mb-2">Start Building Your Resume</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </section>
      <section id="builder" className="min-h-screen bg-gradient-to-b from-slate-900 to-medsume-appleDarkGrey">
        <ResumeBuilder />
      </section>
    </div>
  );
};

export default Index;
