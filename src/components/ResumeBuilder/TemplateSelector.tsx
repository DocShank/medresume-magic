
import React from 'react';
import { useResume } from './ResumeContext';
import { Card, CardContent } from "@/components/ui/card";
import { Check, Layout, Briefcase, Award } from "lucide-react";

const TemplateSelector = () => {
  const { template, setTemplate } = useResume();

  const templates = [
    {
      id: 'professional',
      name: 'Professional',
      description: 'Classic elegance with refined typography',
      icon: <Briefcase className="text-white h-5 w-5" />,
      previewClass: 'border-t-4 border-white'
    },
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean sidebar with contemporary styling',
      icon: <Layout className="text-white h-5 w-5" />,
      previewClass: 'border-l-4 border-medsume-appleBlue'
    },
    {
      id: 'executive',
      name: 'Executive',
      description: 'Premium layout with distinguished accents',
      icon: <Award className="text-medsume-resumeGold h-5 w-5" />,
      previewClass: 'border-t-4 border-medsume-resumeGold'
    }
  ];

  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-6 text-white flex items-center">
        <div className="bg-gradient-to-r from-medsume-appleBlue to-medsume-teal text-white p-2 rounded-lg mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        </div>
        Select Your Template
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {templates.map((t) => (
          <Card 
            key={t.id} 
            className={`relative cursor-pointer overflow-hidden transition-all duration-300
                      ${template === t.id 
                        ? 'ring-2 ring-medsume-appleBlue bg-gradient-to-br from-medsume-appleBlue/20 to-medsume-teal/10 shadow-lg transform scale-[1.02]' 
                        : 'bg-white/5 backdrop-blur-md hover:bg-white/10 hover:shadow-xl hover:scale-[1.01] transform transition-all border border-white/10'}`}
            onClick={() => setTemplate(t.id as any)}
          >
            <CardContent className="p-6 text-white">
              <div className={`h-36 mb-5 rounded-lg flex flex-col items-center justify-center ${t.previewClass} p-4 bg-gradient-to-br from-slate-800/50 to-black/30 backdrop-blur-sm border border-white/5`}>
                <div className="p-2 rounded-full bg-gradient-to-br from-medsume-appleBlue/80 to-medsume-teal/80 mb-2 shadow-inner">
                  {t.icon}
                </div>
                <span className={`text-lg font-medium text-white
                  ${t.id === 'professional' ? 'font-times' : 
                    t.id === 'modern' ? 'font-arial' : 'font-garamond'}`}>
                  {t.name}
                </span>
                <div className="w-3/4 h-1 bg-white/20 mt-2"></div>
                <div className="w-1/2 h-1 bg-white/20 mt-1"></div>
                <div className="w-5/6 h-1 bg-white/20 mt-1"></div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-lg">{t.name}</h3>
                  <p className="text-xs text-gray-300">{t.description}</p>
                </div>
                
                {template === t.id && (
                  <div className="bg-gradient-to-r from-medsume-appleBlue to-medsume-teal text-white rounded-full p-1 shadow-lg">
                    <Check size={16} />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
