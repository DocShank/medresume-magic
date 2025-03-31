
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
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-medsume-appleDarkGrey text-white">
        <div className="container mx-auto px-4 py-12">
          <header className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl md:text-4xl font-bold font-montserrat bg-clip-text text-transparent bg-gradient-to-r from-white to-medsume-appleBlue">
                Medsume by Shank
              </h1>
              <div className="px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium">
                Premium Resume Builder for Medical Professionals
              </div>
            </div>
          </header>
          
          <TemplateSelector />
          
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="mt-6">
            <TabsList className="w-full flex justify-center glass-panel mb-8 bg-opacity-30 backdrop-blur-lg p-1">
              <TabsTrigger 
                value="edit" 
                className="flex-1 py-3 data-[state=active]:bg-medsume-appleBlue data-[state=active]:text-white rounded-full text-white"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Resume
              </TabsTrigger>
              <TabsTrigger 
                value="preview" 
                className="flex-1 py-3 data-[state=active]:bg-medsume-appleBlue data-[state=active]:text-white rounded-full text-white"
              >
                <EyeIcon className="w-4 h-4 mr-2" />
                Preview Resume
              </TabsTrigger>
            </TabsList>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <TabsContent value="edit" className="m-0">
                <div className="frosted-glass p-6 rounded-2xl">
                  <ResumeForm />
                </div>
              </TabsContent>
              
              <TabsContent value="preview" className="mt-0 lg:mt-0 lg:col-span-2">
                <ResumePreview />
              </TabsContent>
            </div>
          </Tabs>
          
          <footer className="mt-16 text-center text-white/50 text-sm">
            <p>© {new Date().getFullYear()} Medsume by Shank. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </ResumeProvider>
  );
};

export default ResumeBuilder;
