
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useResume, IdType } from './ResumeContext';

// Export the component using a named export
export const ResumeForm = () => {
  const { 
    resumeData, 
    updatePersonalDetails, 
    getIdTypeList 
  } = useResume();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Resume Information</h2>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-white">ID Type</label>
              <Select 
                value={resumeData.personalDetails.idType} 
                onValueChange={(value) => updatePersonalDetails({ idType: value as IdType })}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-medsume-teal">
                  <SelectValue placeholder="Select ID type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/10 text-white max-h-60">
                  {getIdTypeList().map(option => (
                    <SelectItem key={option.value} value={option.value} className="focus:bg-medsume-teal/20 focus:text-white">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Make this the default export as well
export default ResumeForm;
