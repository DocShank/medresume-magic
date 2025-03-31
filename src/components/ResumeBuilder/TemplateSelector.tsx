
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
      description: 'Single column, clean layout, Times New Roman',
      icon: <Briefcase className="text-medsume-appleBlue h-5 w-5" />,
      previewClass: 'border-t-4 border-slate-800'
    },
    {
      id: 'modern',
      name: 'Modern',
      description: 'Two columns, clean sidebar, Arial',
      icon: <Layout className="text-medsume-appleBlue h-5 w-5" />,
      previewClass: 'border-l-4 border-medsume-appleBlue'
    },
    {
      id: 'executive',
      name: 'Executive',
      description: 'Premium layout with gold accents, Garamond',
      icon: <Award className="text-medsume-resumeGold h-5 w-5" />,
      previewClass: 'border-t-4 border-medsume-resumeGold'
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
        <span className="bg-medsume-appleBlue text-white p-1 rounded-md mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        </span>
        Choose a Template
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {templates.map((t) => (
          <Card 
            key={t.id} 
            className={`relative cursor-pointer overflow-hidden transition-all frosted-glass
                      ${template === t.id 
                        ? 'ring-2 ring-medsume-appleBlue bg-medsume-appleBlue/5 shadow-lg transform scale-[1.02]' 
                        : 'bg-white/5 hover:bg-white/10 hover:shadow-md hover:scale-[1.01] transform transition-all'}`}
            onClick={() => setTemplate(t.id as any)}
          >
            <CardContent className="p-5 text-white">
              <div className={`h-32 bg-white/10 mb-4 rounded-lg flex flex-col items-center justify-center ${t.previewClass}`}>
                <div className="mb-2">{t.icon}</div>
                <span className={`text-lg 
                  ${t.id === 'professional' ? 'font-times' : 
                    t.id === 'modern' ? 'font-arial' : 'font-garamond'}`}>
                  {t.name} Template
                </span>
                <div className="w-3/4 h-1 bg-white/20 mt-2"></div>
                <div className="w-1/2 h-1 bg-white/20 mt-1"></div>
                <div className="w-5/6 h-1 bg-white/20 mt-1"></div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-base">{t.name}</h3>
                  <p className="text-xs text-gray-300">{t.description}</p>
                </div>
                
                {template === t.id && (
                  <div className="bg-medsume-appleBlue text-white rounded-full p-1">
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
