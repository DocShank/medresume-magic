
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';
import TemplateSelector from './TemplateSelector';
import { ResumeProvider } from './ResumeContext';
import { Edit, EyeIcon } from 'lucide-react';

const ResumeBuilder = () => {
  const [currentTab, setCurrentTab] = useState("edit");
  
  return (
    <ResumeProvider>
      <div className="min-h-screen relative z-10">
        <div className="container mx-auto px-4 py-12">
          <header className="mb-10">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
              <h1 className="text-3xl md:text-4xl font-bold font-sfpro bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-medsume-appleBlueLight">
                Medsume by Shank
              </h1>
              <div className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium border border-white/20 shadow-inner">
                Premium Resume Builder for Medical Professionals
              </div>
            </div>
          </header>
          
          <TemplateSelector />
          
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="mt-10">
            <TabsList className="w-full flex justify-center mb-8 bg-white/5 backdrop-blur-lg p-1 rounded-full border border-white/10 shadow-inner">
              <TabsTrigger 
                value="edit" 
                className="flex-1 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-medsume-appleBlue data-[state=active]:to-medsume-teal data-[state=active]:text-white rounded-full text-white/80 transition-all duration-300 hover:text-white"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Resume
              </TabsTrigger>
              <TabsTrigger 
                value="preview" 
                className="flex-1 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-medsume-appleBlue data-[state=active]:to-medsume-teal data-[state=active]:text-white rounded-full text-white/80 transition-all duration-300 hover:text-white"
              >
                <EyeIcon className="w-4 h-4 mr-2" />
                Preview Resume
              </TabsTrigger>
            </TabsList>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <TabsContent value="edit" className="m-0">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                  <ResumeForm />
                </div>
              </TabsContent>
              
              <TabsContent value="preview" className="mt-0 lg:mt-0 lg:col-span-2">
                <div className="bg-white backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg overflow-hidden">
                  <ResumePreview />
                </div>
              </TabsContent>
            </div>
          </Tabs>
          
          <footer className="mt-16 text-center">
            <div className="py-4 px-6 rounded-full bg-white/5 backdrop-blur-sm inline-block border border-white/10">
              <p className="text-white/50 text-sm">© {new Date().getFullYear()} Medsume by Shank. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </div>
    </ResumeProvider>
  );
};

export default ResumeBuilder;
