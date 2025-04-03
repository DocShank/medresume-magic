
import React from 'react';
import { useResume, Template } from './ResumeContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export const TemplateSelector: React.FC = () => {
  const { template, setTemplate } = useResume();

  const templates: { id: Template; name: string; description: string }[] = [
    {
      id: 'professional',
      name: 'Professional',
      description: 'A clean, straightforward layout suitable for most medical professionals.'
    },
    {
      id: 'executive',
      name: 'Executive',
      description: 'An elegant, sophisticated design for senior medical professionals.'
    }
  ];

  const handleSelectTemplate = (template: Template) => {
    setTemplate(template);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-8">Select a Template</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((t) => (
          <Card 
            key={t.id} 
            className={`overflow-hidden cursor-pointer transition-all ${
              template === t.id ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'
            }`}
            onClick={() => handleSelectTemplate(t.id)}
          >
            <CardContent className="p-0">
              <div className="relative">
                <div className="p-6 bg-white">
                  <h3 className="text-lg font-semibold">{t.name}</h3>
                  <p className="text-sm text-gray-600 mt-2">{t.description}</p>
                </div>
                {template === t.id && (
                  <div className="absolute top-2 right-2">
                    <Button variant="default" size="sm" className="h-7 w-7 rounded-full p-0">
                      <Check className="h-4 w-4" />
                    </Button>
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
