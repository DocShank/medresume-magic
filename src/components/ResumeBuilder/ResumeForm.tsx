
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useResume, IdType } from './ResumeContext';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Export the component as a named export
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
              <Label className="text-sm font-medium mb-2 text-white">Profile Photo</Label>
              <Input 
                type="file" 
                accept="image/*"
                className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      if (event.target?.result) {
                        updatePersonalDetails({ photoUrl: event.target.result as string });
                      }
                    };
                    reader.readAsDataURL(e.target.files[0]);
                  }
                }}
              />
            </div>

            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 text-white">First Name</Label>
                <Input 
                  value={resumeData.personalDetails.firstName || ''}
                  onChange={(e) => updatePersonalDetails({ firstName: e.target.value })}
                  className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                  placeholder="John"
                />
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 text-white">Middle Name (Optional)</Label>
                <Input 
                  value={resumeData.personalDetails.middleName || ''}
                  onChange={(e) => updatePersonalDetails({ middleName: e.target.value })}
                  className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                  placeholder="James"
                />
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 text-white">Last Name</Label>
                <Input 
                  value={resumeData.personalDetails.lastName || ''}
                  onChange={(e) => updatePersonalDetails({ lastName: e.target.value })}
                  className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <Label className="text-sm font-medium mb-2 text-white">Organization/Hospital/Institution</Label>
              <Input 
                value={resumeData.personalDetails.organization || ''}
                onChange={(e) => updatePersonalDetails({ organization: e.target.value })}
                className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                placeholder="Mayo Clinic"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium mb-2 text-white">ID Type</Label>
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

            {resumeData.personalDetails.idType === 'Others' && (
              <div>
                <Label className="text-sm font-medium mb-2 text-white">Specify Other ID Type</Label>
                <Input 
                  value={resumeData.personalDetails.customIdType || ''}
                  onChange={(e) => updatePersonalDetails({ customIdType: e.target.value })}
                  className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                  placeholder="Custom ID Type"
                />
              </div>
            )}

            <div>
              <Label className="text-sm font-medium mb-2 text-white">ID Number</Label>
              <Input 
                value={resumeData.personalDetails.idNumber || ''}
                onChange={(e) => updatePersonalDetails({ idNumber: e.target.value })}
                className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                placeholder="ABC123456"
              />
            </div>

            <div className="md:col-span-2 flex items-center space-x-2">
              <Switch 
                checked={resumeData.personalDetails.hasAccreditedId || false}
                onCheckedChange={(checked) => updatePersonalDetails({ hasAccreditedId: checked })}
              />
              <Label className="text-white">I have an additional accredited ID</Label>
            </div>

            {resumeData.personalDetails.hasAccreditedId && (
              <>
                <div>
                  <Label className="text-sm font-medium mb-2 text-white">Accredited Organization</Label>
                  <Input 
                    value={resumeData.personalDetails.accreditedOrg || ''}
                    onChange={(e) => updatePersonalDetails({ accreditedOrg: e.target.value })}
                    className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                    placeholder="Board of Medical Specialties"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2 text-white">Accredited ID Number</Label>
                  <Input 
                    value={resumeData.personalDetails.accreditedIdNumber || ''}
                    onChange={(e) => updatePersonalDetails({ accreditedIdNumber: e.target.value })}
                    className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                    placeholder="XYZ789012"
                  />
                </div>
              </>
            )}

            <div className="md:col-span-2">
              <Label className="text-sm font-medium mb-2 text-white">Mailing Address</Label>
              <Textarea 
                value={resumeData.personalDetails.mailingAddress || ''}
                onChange={(e) => updatePersonalDetails({ mailingAddress: e.target.value })}
                className="bg-white/10 border-white/20 text-white focus:border-medsume-teal h-20"
                placeholder="123 Medical Center Blvd, Rochester, MN 55905"
              />
            </div>

            <div className="flex gap-2">
              <div className="w-1/4">
                <Label className="text-sm font-medium mb-2 text-white">Country Code</Label>
                <Input 
                  value={resumeData.personalDetails.countryCode || ''}
                  onChange={(e) => updatePersonalDetails({ countryCode: e.target.value })}
                  className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                  placeholder="+1"
                />
              </div>
              <div className="flex-1">
                <Label className="text-sm font-medium mb-2 text-white">Phone Number</Label>
                <Input 
                  value={resumeData.personalDetails.phoneNumber || ''}
                  onChange={(e) => updatePersonalDetails({ phoneNumber: e.target.value })}
                  className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                  placeholder="555-123-4567"
                />
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 text-white">Email</Label>
              <Input 
                type="email"
                value={resumeData.personalDetails.email || ''}
                onChange={(e) => updatePersonalDetails({ email: e.target.value })}
                className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                placeholder="john.doe@medical.org"
              />
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 text-white">LinkedIn URL</Label>
              <Input 
                value={resumeData.personalDetails.socialMediaUrl || ''}
                onChange={(e) => updatePersonalDetails({ socialMediaUrl: e.target.value })}
                className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                placeholder="https://linkedin.com/in/johndoe"
              />
            </div>
          </div>
        </div>
      </div>
      
      <Separator className="my-8 bg-white/20" />
      
      <div className="text-center text-white text-sm opacity-60 mt-4">
        <p>More sections to fill out will be added soon!</p>
        <p>Switch to Preview tab to see your resume.</p>
      </div>
    </div>
  );
};

// Also export as default for backwards compatibility
export default ResumeForm;
