
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Template, useResume } from './ResumeContext';
import { Check } from 'lucide-react';

interface TemplateCardProps {
  name: string;
  description: string;
  selected: boolean;
  onClick: () => void;
  value: Template;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ name, description, selected, onClick, value }) => {
  return (
    <div 
      className={`bg-white/10 backdrop-blur-sm p-6 rounded-2xl transition-all duration-300 cursor-pointer border-2 flex flex-col gap-4 h-full
        ${selected ? 'border-medsume-appleBlue shadow-xl scale-105' : 'border-white/10 shadow-md hover:border-white/30'}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-white">{name}</h3>
        {selected && <Check className="h-5 w-5 text-medsume-appleBlue" />}
      </div>
      <p className="text-white/70 text-sm flex-grow">{description}</p>
      <div className={`h-24 w-full rounded-lg bg-gradient-to-br ${value === 'professional' ? 'from-blue-600 to-teal-500' : 'from-amber-500 to-purple-600'} opacity-70`}></div>
    </div>
  );
};

const TemplateSelector = () => {
  const { template, setTemplate } = useResume();

  useEffect(() => {
    // Make sure template is one of the valid options
    if (template !== 'professional' && template !== 'executive') {
      setTemplate('professional');
    }
  }, [template, setTemplate]);

  const templates: { name: string; description: string; value: Template }[] = [
    {
      name: "Professional",
      description: "Clean and minimal design with focus on readability. Perfect for most healthcare professionals.",
      value: "professional"
    },
    {
      name: "Executive",
      description: "Premium design with elegant styling. Ideal for senior medical professionals and specialists.",
      value: "executive"
    }
  ];

  return (
    <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-apple">
      <h2 className="text-xl font-bold text-white mb-6">Choose Your Template</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((t) => (
          <TemplateCard
            key={t.value}
            name={t.name}
            description={t.description}
            selected={template === t.value}
            onClick={() => setTemplate(t.value)}
            value={t.value}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
