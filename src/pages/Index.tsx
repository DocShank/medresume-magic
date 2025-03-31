
import React from 'react';
import IntroPage from '../components/IntroPage/IntroPage';
import ResumeBuilder from '../components/ResumeBuilder/ResumeBuilder';

const Index = () => {
  return (
    <div className="min-h-screen w-full">
      <section id="intro" className="min-h-screen">
        <IntroPage />
      </section>
      <section id="builder" className="min-h-screen">
        <ResumeBuilder />
      </section>
    </div>
  );
};

export default Index;
