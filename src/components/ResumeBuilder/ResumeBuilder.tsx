
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';
import TemplateSelector from './TemplateSelector';
import { ResumeProvider } from './ResumeContext';

const ResumeBuilder = () => {
  const [currentTab, setCurrentTab] = useState("edit");
  
  return (
    <ResumeProvider>
      <div className="min-h-screen bg-gradient-to-b from-medsume-darkGray to-medsume-mediumGray text-white">
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold font-montserrat">Medsume by Shank</h1>
            <p className="text-medsume-watermark">Premium Resume Builder for Medical Professionals</p>
          </header>
          
          <TemplateSelector />
          
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="mt-6">
            <TabsList className="bg-white/10 backdrop-blur-sm">
              <TabsTrigger value="edit" className="text-white data-[state=active]:bg-medsume-teal">
                Edit
              </TabsTrigger>
              <TabsTrigger value="preview" className="text-white data-[state=active]:bg-medsume-teal">
                Preview
              </TabsTrigger>
            </TabsList>
            
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TabsContent value="edit" className="m-0">
                <ResumeForm />
              </TabsContent>
              
              <TabsContent value="preview" className="mt-0 lg:mt-0 lg:col-span-2">
                <ResumePreview />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </ResumeProvider>
  );
};

export default ResumeBuilder;
