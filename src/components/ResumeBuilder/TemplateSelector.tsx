
import React from 'react';
import { useResume } from './ResumeContext';
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

const TemplateSelector = () => {
  const { template, setTemplate } = useResume();

  const templates = [
    {
      id: 'professional',
      name: 'Professional',
      description: 'Single column, black/white, Times New Roman'
    },
    {
      id: 'modern',
      name: 'Modern',
      description: 'Two columns, dark blue headers, Arial'
    },
    {
      id: 'executive',
      name: 'Executive',
      description: 'Single column, navy text, gold accents, Garamond'
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Choose a Template</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {templates.map((t) => (
          <Card 
            key={t.id} 
            className={`relative cursor-pointer overflow-hidden transition-all 
                      ${template === t.id ? 'ring-2 ring-medsume-teal bg-medsume-teal/10' : 'bg-white/5 hover:bg-white/10'}`}
            onClick={() => setTemplate(t.id as any)}
          >
            <CardContent className="p-4 text-white">
              <div className="h-24 bg-white/10 mb-3 rounded flex items-center justify-center">
                <span className={`text-lg ${t.id === 'professional' ? 'font-times' : t.id === 'modern' ? 'font-arial' : 'font-garamond'}`}>
                  {t.name}
                </span>
              </div>
              <h3 className="font-medium text-base">{t.name}</h3>
              <p className="text-xs text-gray-300">{t.description}</p>
              
              {template === t.id && (
                <div className="absolute top-2 right-2 bg-medsume-teal rounded-full p-1">
                  <Check size={14} />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
