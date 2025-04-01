import React, { useState } from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import DateSelector from './DateSelector';
import { useResume } from './ResumeContext';
import { 
  User, 
  GraduationCap, 
  Award, 
  Briefcase, 
  FileText, 
  Heart, 
  Languages, 
  Plus,
  CalendarIcon
} from "lucide-react";
import { hobbiesOptions, degreeOptions, jobTypeOptions, validateEmail, validatePhoneNumber } from './utils';

// Extended language options
const extendedLanguageOptions = [
  "English", "French", "Spanish", "German", "Chinese", "Russian", "Arabic", 
  "Bengali", "Dutch", "Greek", "Hebrew", "Hindi", "Indonesian", "Italian", 
  "Japanese", "Korean", "Malay", "Mandarin", "Nepali", "Norwegian", "Polish", 
  "Portuguese", "Romanian", "Swedish", "Tamil", "Thai", "Turkish", "Ukrainian", 
  "Urdu", "Vietnamese"
].sort();

// Extended ID types
const idTypeOptions = [
  "NMC", // Nepal Medical Council
  "GMC", // General Medical Council (UK)
  "USMLE", // United States Medical Licensing Examination
  "MCI", // Medical Council of India
  "AMC", // Australian Medical Council
  "HPCSA", // Health Professions Council of South Africa
  "PMDC", // Pakistan Medical and Dental Council
  "SMC", // Singapore Medical Council
  "BMDC", // Bangladesh Medical and Dental Council
  "SLMC", // Sri Lanka Medical Council
  "MMC", // Malaysian Medical Council
  "Other"
].sort();

const ResumeForm = () => {
  const { 
    resumeData, 
    updatePersonalDetails,
    addMedicalEducation,
    updateMedicalEducation,
    removeMedicalEducation,
    addOtherEducation,
    updateOtherEducation,
    removeOtherEducation,
    addExperience,
    updateExperience,
    removeExperience,
    addAward,
    updateAward,
    removeAward,
    addPublication,
    updatePublication,
    removePublication,
    updatePublicationsText,
    addMembership,
    updateMembership,
    removeMembership,
    addLanguage,
    updateLanguage,
    removeLanguage,
    updateHobbies
  } = useResume();
  
  const [detailedPublications, setDetailedPublications] = useState(true);
  const [customHobby, setCustomHobby] = useState('');
  const [customLanguage, setCustomLanguage] = useState('');
  
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalDetails({ photoUrl: reader.result as string });
        toast.success("Profile photo updated");
      };
      reader.readAsDataURL(file);
    }
  };
  
  const addNewEducation = (type: 'medical' | 'other') => {
    const newEducation = {
      id: '',
      institution: '',
      location: '',
      degree: '',
      startDate: '',
      endDate: '',
      graduationYear: '',
      score: '',
      remarks: ''
    };
    
    if (type === 'medical') {
      addMedicalEducation(newEducation);
      toast.success("Added new medical education");
    } else {
      addOtherEducation(newEducation);
      toast.success("Added other education");
    }
  };
  
  const addNewExperience = () => {
    const newExperience = {
      id: '',
      role: '',
      department: '',
      institution: '',
      startDate: '',
      endDate: '',
      type: 'Full-Time',
      description: ''
    };
    
    addExperience(newExperience);
    toast.success("Added new experience");
  };
  
  const addNewAward = () => {
    const newAward = {
      id: '',
      title: '',
      organization: '',
      date: '',
      description: ''
    };
    
    addAward(newAward);
    toast.success("Added new award");
  };
  
  const addNewPublication = () => {
    const newPublication = {
      id: '',
      authors: '',
      title: '',
      journal: '',
      date: '',
      doi: ''
    };
    
    addPublication(newPublication);
    toast.success("Added new publication");
  };
  
  const addNewMembership = () => {
    const newMembership = {
      id: '',
      name: '',
      issueDate: '',
      expiryDate: '',
      remarks: ''
    };
    
    addMembership(newMembership);
    toast.success("Added new membership");
  };
  
  const addNewLanguage = () => {
    const newLanguage = {
      id: '',
      name: '',
      proficiency: 'Intermediate' as const
    };
    
    addLanguage(newLanguage);
    toast.success("Added new language");
  };
  
  const handleHobbyToggle = (hobby: string) => {
    const isSelected = resumeData.hobbies.includes(hobby);
    if (isSelected) {
      updateHobbies(resumeData.hobbies.filter(h => h !== hobby));
    } else {
      updateHobbies([...resumeData.hobbies, hobby]);
    }
  };
  
  const handleAddCustomHobby = () => {
    if (customHobby && !resumeData.hobbies.includes(customHobby)) {
      updateHobbies([...resumeData.hobbies, customHobby]);
      setCustomHobby('');
      toast.success(`Added "${customHobby}" to your hobbies`);
    }
  };
  
  const handleAddCustomLanguage = () => {
    if (customLanguage) {
      addLanguage({
        id: '',
        name: customLanguage,
        proficiency: 'Intermediate'
      });
      setCustomLanguage('');
      toast.success(`Added ${customLanguage} to your languages`);
    }
  };
  
  // Simple date format handler for all date fields
  const formatDate = (date: string | undefined) => {
    if (!date) return '';
    return date;
  };
  
  const handleDateChange = (id: string, field: string, value: string, updateFunction: Function) => {
    updateFunction(id, { [field]: value });
  };
  
  return (
    <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl shadow-inner overflow-y-auto max-h-[800px] border border-white/10">
      <Accordion type="single" collapsible defaultValue="personal" className="space-y-4">
        {/* Personal Details */}
        <AccordionItem value="personal" className="border border-white/10 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm">
          <AccordionTrigger className="hover:bg-white/5 px-4 py-3 rounded-t-xl">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-gradient-to-r from-medsume-appleBlue to-medsume-teal mr-3">
                <User size={18} className="text-white" />
              </div>
              <span className="text-white font-medium">Personal Details</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-6">
            <div className="space-y-6">
              {/* Photo Upload */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-36 h-36 rounded-xl overflow-hidden border-2 border-white/20 bg-gradient-to-br from-white/5 to-black/10 flex items-center justify-center shadow-inner">
                    {resumeData.personalDetails.photoUrl ? (
                      <img 
                        src={resumeData.personalDetails.photoUrl} 
                        alt="Profile" 
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <User size={48} className="text-white/40" />
                    )}
                  </div>
                  <label 
                    htmlFor="photo-upload" 
                    className="absolute bottom-0 right-0 bg-gradient-to-r from-medsume-appleBlue to-medsume-teal text-white p-2 rounded-full cursor-pointer shadow-lg hover:scale-105 transition-transform duration-200"
                  >
                    <Plus size={16} />
                  </label>
                  <input 
                    id="photo-upload" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handlePhotoUpload}
                  />
                </div>
              </div>
              
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">First Name*</label>
                  <Input 
                    value={resumeData.personalDetails.firstName}
                    onChange={(e) => updatePersonalDetails({ firstName: e.target.value })}
                    className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Middle Name</label>
                  <Input 
                    value={resumeData.personalDetails.middleName}
                    onChange={(e) => updatePersonalDetails({ middleName: e.target.value })}
                    className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                    placeholder="Middle name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Last Name*</label>
                  <Input 
                    value={resumeData.personalDetails.lastName}
                    onChange={(e) => updatePersonalDetails({ lastName: e.target.value })}
                    className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                    placeholder="Last name"
                  />
                </div>
              </div>
              
              {/* Organization */}
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Organization</label>
                <Input 
                  value={resumeData.personalDetails.organization}
                  onChange={(e) => updatePersonalDetails({ organization: e.target.value })}
                  className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                  placeholder="e.g., Mayo Clinic"
                />
              </div>
              
              {/* ID Type & Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">ID Type</label>
                  <Select 
                    value={resumeData.personalDetails.idType} 
                    onValueChange={(value) => updatePersonalDetails({ idType: value })}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-medsume-teal">
                      <SelectValue placeholder="Select ID type" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/10 text-white">
                      {idTypeOptions.map(type => (
                        <SelectItem key={type} value={type} className="focus:bg-medsume-teal/20 focus:text-white">
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">ID Number</label>
                  <Input 
                    value={resumeData.personalDetails.idNumber}
                    onChange={(e) => updatePersonalDetails({ idNumber: e.target.value })}
                    className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                    placeholder="Your ID number"
                    maxLength={20}
                  />
                </div>
              </div>
              
              {/* Accredited ID */}
              <div className="flex items-center space-x-2 my-4">
                <Checkbox 
                  id="accredited-id" 
                  checked={resumeData.personalDetails.hasAccreditedId}
                  onCheckedChange={(checked) => 
                    updatePersonalDetails({ hasAccreditedId: checked as boolean })
                  }
                  className="border-white/20 data-[state=checked]:bg-medsume-teal data-[state=checked]:border-medsume-teal"
                />
                <label 
                  htmlFor="accredited-id" 
                  className="text-sm font-medium text-white leading-none cursor-pointer"
                >
                  I have an accredited ID
                </label>
              </div>
              
              {/* Accredited Organization & ID (conditional) */}
              {resumeData.personalDetails.hasAccreditedId && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 pl-6 border-l-2 border-medsume-teal">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Accredited Organization</label>
                    <Input 
                      value={resumeData.personalDetails.accreditedOrg}
                      onChange={(e) => updatePersonalDetails({ accreditedOrg: e.target.value })}
                      className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                      placeholder="Organization name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Accredited ID Number</label>
                    <Input 
                      value={resumeData.personalDetails.accreditedIdNumber}
                      onChange={(e) => updatePersonalDetails({ accreditedIdNumber: e.target.value })}
                      className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                      placeholder="ID number"
                    />
                  </div>
                </div>
              )}
              
              {/* Contact Information */}
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Mailing Address</label>
                <Textarea 
                  value={resumeData.personalDetails.mailingAddress}
                  onChange={(e) => updatePersonalDetails({ mailingAddress: e.target.value })}
                  className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                  placeholder="Your complete address"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Phone (with country code)</label>
                  <Input 
                    value={resumeData.personalDetails.phoneNumber}
                    onChange={(e) => updatePersonalDetails({ phoneNumber: e.target.value })}
                    className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                    placeholder="e.g. +1 234 567 8900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Email</label>
                  <Input 
                    type="email"
                    value={resumeData.personalDetails.email}
                    onChange={(e) => updatePersonalDetails({ email: e.target.value })}
                    className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                    placeholder="Your email address"
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Education - Combined Medical and Other */}
        <AccordionItem value="education" className="border border-white/10 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm">
          <AccordionTrigger className="hover:bg-white/5 px-4 py-3 rounded-t-xl">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-gradient-to-r from-medsume-appleBlue to-medsume-teal mr-3">
                <GraduationCap size={18} className="text-white" />
              </div>
              <span className="text-white font-medium">Education</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-6">
            {/* Medical Education Section */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-medsume-teal to-medsume-appleBlue mr-2 rounded-full"></div>
                Medical Education
              </h3>
              
              {resumeData.medicalEducation.length === 0 ? (
                <div className="text-center py-6 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-gray-400 mb-4">No medical education added yet</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {resumeData.medicalEducation.map((education, index) => (
                    <div key={education.id} className="border border-white/10 rounded-lg p-5 bg-white/5 backdrop-blur-sm">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-semibold text-white">Medical Education #{index + 1}</h3>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => {
                            removeMedicalEducation(education.id);
                            toast.info("Medical education removed");
                          }}
                          className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
                        >
                          Remove
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-white">Institution</label>
                          <Input 
                            value={education.institution}
                            onChange={(e) => updateMedicalEducation(education.id, { institution: e.target.value })}
                            className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                            placeholder="Institution name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-white">Location</label>
                          <Input 
                            value={education.location}
                            onChange={(e) => updateMedicalEducation(education.id, { location: e.target.value })}
                            className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                            placeholder="e.g., Boston, USA"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <label className="block text-sm font-medium mb-2 text-white">Degree</label>
                        <Select 
                          value={education.degree} 
                          onValueChange={(value) => updateMedicalEducation(education.id, { degree: value })}
                        >
                          <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-medsume-teal">
                            <SelectValue placeholder="Select degree" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-white/10 text-white">
                            {degreeOptions.map(degree => (
                              <SelectItem key={degree} value={degree} className="focus:bg-medsume-teal/20 focus:text-white">
                                {degree}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-white">Start Date (MM/YYYY)</label>
                          <div className="relative">
                            <Input 
                              type="text"
                              value={formatDate(education.startDate)}
                              onChange={(e) => handleDateChange(education.id, 'startDate', e.target.value, updateMedicalEducation)}
                              className="bg-white/10 border-white/20 text-white focus:border-medsume-teal pl-10"
                              placeholder="MM/YYYY"
                            />
                            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-white">End Date (MM/YYYY)</label>
                          <div className="relative">
                            <Input 
                              type="text"
                              value={formatDate(education.endDate)}
                              onChange={(e) => handleDateChange(education.id, 'endDate', e.target.value, updateMedicalEducation)}
                              className="bg-white/10 border-white/20 text-white focus:border-medsume-teal pl-10"
                              placeholder="MM/YYYY"
                            />
                            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <label className="block text-sm font-medium mb-2 text-white">Score (Optional)</label>
                        <Input 
                          type="text"
                          value={education.score}
                          onChange={(e) => updateMedicalEducation(education.id, { score: e.target.value })}
                          className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                          placeholder="e.g., 85"
                        />
                      </div>
                      
                      <div className="mt-4">
                        <label className="block text-sm font-medium mb-2 text-white">Remarks</label>
                        <Textarea 
                          value={education.remarks}
                          onChange={(e) => updateMedicalEducation(education.id, { remarks: e.target.value })}
                          className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                          placeholder="Additional information"
                          maxLength={500}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <Button 
                onClick={() => addNewEducation('medical')}
                className="mt-4 bg-gradient-to-r from-medsume-appleBlue to-medsume-teal hover:from-medsume-appleBlue hover:to-medsume-tealLight text-white border-none"
              >
                <Plus size={16} className="mr-2" />
                Add Medical Education
              </Button>
            </div>
            
            {/* Other Education Section */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-medsume-teal to-medsume-appleBlue mr-2 rounded-full"></div>
                Additional Education
              </h3>
              
              {resumeData.otherEducation.length === 0 ? (
                <div className="text-center py-6 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-gray-400 mb-4">No additional education added yet</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {resumeData.otherEducation.map((education, index) => (
                    <div key={education.id} className="border border-white/10 rounded-lg p-5 bg-white/5 backdrop-blur-sm">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-semibold text-white">Other Education #{index + 1}</h3>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => {
                            removeOtherEducation(education.id);
                            toast.info("Education removed");
                          }}
                          className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
                        >
                          Remove
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-white">Institution</label>
                          <Input 
                            value={education.institution}
                            onChange={(e) => updateOtherEducation(education.id, { institution: e.target.value })}
                            className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                            placeholder="Institution name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-white">Location</label>
                          <Input 
                            value={education.location}
                            onChange={(e) => updateOtherEducation(education.id, { location: e.target.value })}
                            className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                            placeholder="e.g., Boston, USA"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <label className="block text-sm font-medium mb-2 text-white">Degree</label>
                        <Input 
                          value={education.degree}
                          onChange={(e) => updateOtherEducation(education.id, { degree: e.target.value })}
                          className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                          placeholder="e.g., BSc Biology"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-white">Start Date (MM/YYYY)</label>
                          <div className="relative">
                            <Input 
                              type="text"
                              value={formatDate(education.startDate)}
                              onChange={(e) => handleDateChange(education.id, 'startDate', e.target.value, updateOtherEducation)}
                              className="bg-white/10 border-white/20 text-white focus:border-medsume-teal pl-10"
                              placeholder="MM/YYYY"
                            />
                            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-white">End Date (MM/YYYY)</label>
                          <div className="relative">
                            <Input 
                              type="text"
                              value={formatDate(education.endDate)}
                              onChange={(e) => handleDateChange(education.id, 'endDate', e.target.value, updateOtherEducation)}
                              className="bg-white/10 border-white/20 text-white focus:border-medsume-teal pl-10"
                              placeholder="MM/YYYY"
                            />
                            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <label className="block text-sm font-medium mb-2 text-white">Score (Optional)</label>
                        <Input 
                          value={education.score}
                          onChange={(e) => updateOtherEducation(education.id, { score: e.target.value })}
                          className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                          placeholder="e.g., 85"
                        />
                      </div>
                      
                      <div className="mt-4">
                        <label className="block text-sm font-medium mb-2 text-white">Remarks</label>
                        <Textarea 
                          value={education.remarks}
                          onChange={(e) => updateOtherEducation(education.id, { remarks: e.target.value })}
                          className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                          placeholder="Additional information"
                          maxLength={500}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <Button 
                onClick={() => addNewEducation('other')}
                className="mt-4 bg-gradient-to-r from-medsume-appleBlue to-medsume-teal hover:from-medsume-appleBlue hover:to-medsume-tealLight text-white border-none"
              >
                <Plus size={16} className="mr-2" />
                Add Other Education
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Honors & Awards */}
        <AccordionItem value="awards" className="border border-white/10 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm">
          <AccordionTrigger className="hover:bg-white/5 px-4 py-3 rounded-t-xl">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-gradient-to-r from-medsume-appleBlue to-medsume-teal mr-3">
                <Award size={18} className="text-white" />
              </div>
              <span className="text-white font-medium">Honors & Awards</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-6">
            {resumeData.awards.length === 0 ? (
              <div className="text-center py-6 bg-white/5 rounded-lg border border-white/10">
                <p className="text-gray-400 mb-4">No awards added yet</p>
              </div>
            ) : (
              <div className="space-y-6">
                {resumeData.awards.map((award, index) => (
                  <div key={award.id} className="border border-white/10 rounded-lg p-5 bg-white/5 backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-semibold text-white">Award #{index + 1}</h3>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => {
                          removeAward(award.id);
                          toast.info("Award removed");
                        }}
                        className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
                      >
                        Remove
                      </Button>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white">Award Title</label>
                      <Input 
                        value={award.title}
                        onChange={(e) => updateAward(award.id, { title: e.target.value })}
                        className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                        placeholder="Title of the award"
                      />
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2 text-white">Issuing Organization</label>
                      <Input 
                        value={award.organization}
                        onChange={(e) => updateAward(award.id, { organization: e.target.value })}
                        className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                        placeholder="Organization name"
                      />
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2 text-white">Date Awarded (MM/YYYY)</label>
                      <div className="relative">
                        <Input 
                          type="text"
                          value={formatDate(award.date)}
                          onChange={(e) => updateAward(award.id, { date: e.target.value })}
                          className="bg-white/10 border-white/20 text-white focus:border-medsume-teal pl-10"
                          placeholder="MM/YYYY"
                        />
                        <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2 text-white">Description</label>
                      <Textarea 
                        value={award.description}
                        onChange={(e) => updateAward(award.id, { description: e.target.value })}
                        className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                        placeholder="Brief description of the award"
                        maxLength={300}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <Button 
              onClick={addNewAward}
              className="mt-4 bg-gradient-to-r from-medsume-appleBlue to-medsume-teal hover:from-medsume-appleBlue hover:to-medsume-tealLight text-white border-none"
            >
              <Plus size={16} className="mr-2" />
              Add Award
            </Button>
          </AccordionContent>
        </AccordionItem>
        
        {/* Experience Section */}
        <AccordionItem value="experience" className="border border-white/10 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm">
          <AccordionTrigger className="hover:bg-white/5 px-4 py-3 rounded-t-xl">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-gradient-to-r from-medsume-appleBlue to-medsume-teal mr-3">
                <Briefcase size={18} className="text-white" />
              </div>
              <span className="text-white font-medium">Experience</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-6">
            {resumeData.experiences.length === 0 ? (
              <div className="text-center py-6 bg-white/5 rounded-lg border border-white/10">
                <p className="text-gray-400 mb-4">No experience added yet</p>
              </div>
            ) : (
              <div className="space-y-6">
                {resumeData.experiences.map((experience, index) => (
                  <div key={experience.id} className="border border-white/10 rounded-lg p-5 bg-white/5 backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-semibold text-white">Experience #{index + 1}</h3>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => {
                          removeExperience(experience.id);
                          toast.info("Experience removed");
                        }}
                        className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
                      >
                        Remove
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">Role</label>
                        <Input 
                          value={experience.role}
                          onChange={(e) => updateExperience(experience.id, { role: e.target.value })}
                          className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                          placeholder="e.g., Resident Physician"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">Department</label>
                        <Input 
                          value={experience.department}
                          onChange={(e) => updateExperience(experience.id, { department: e.target.value })}
                          className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                          placeholder="e.g., Cardiology"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2 text-white">Institution</label>
                      <Input 
                        value={experience.institution}
                        onChange={(e) => updateExperience(experience.id, { institution: e.target.value })}
                        className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                        placeholder="Institution name"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">Start Date (MM/YYYY)</label>
                        <div className="relative">
                          <Input 
                            type="text"
                            value={formatDate(experience.startDate)}
                            onChange={(e) => updateExperience(experience.id, { startDate: e.target.value })}
                            className="bg-white/10 border-white/20 text-white focus:border-medsume-teal pl-10"
                            placeholder="MM/YYYY"
                          />
                          <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">End Date (MM/YYYY)</label>
                        <div className="relative">
                          <Input 
                            type="text"
                            value={formatDate(experience.endDate)}
                            onChange={(e) => updateExperience(experience.id, { endDate: e.target.value })}
                            className="bg-white/10 border-white/20 text-white focus:border-medsume-teal pl-10"
                            placeholder="MM/YYYY"
                          />
                          <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2 text-white">Type</label>
                      <Select 
                        value={experience.type} 
                        onValueChange={(value) => updateExperience(experience.id, { type: value })}
                      >
                        <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-medsume-teal">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-white/10 text-white">
                          {jobTypeOptions.map(type => (
                            <SelectItem key={type} value={type} className="focus:bg-medsume-teal/20 focus:text-white">
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2 text-white">Description</label>
                      <Textarea 
                        value={experience.description}
                        onChange={(e) => updateExperience(experience.id, { description: e.target.value })}
                        className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                        placeholder="Describe your responsibilities and achievements"
                        maxLength={800}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <Button 
              onClick={addNewExperience}
              className="mt-4 bg-gradient-to-r from-medsume-appleBlue to-medsume-teal hover:from-medsume-appleBlue hover:to-medsume-tealLight text-white border-none"
            >
              <Plus size={16} className="mr-2" />
              Add Experience
            </Button>
          </AccordionContent>
        </AccordionItem>
        
        {/* Publications - Enhanced UI */}
        <AccordionItem value="publications" className="border border-white/10 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm">
          <AccordionTrigger className="hover:bg-white/5 px-4 py-3 rounded-t-xl">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-gradient-to-r from-medsume-appleBlue to-medsume-teal mr-3">
                <FileText size={18} className="text-white" />
              </div>
              <span className="text-white font-medium">Publications</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-6">
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-6 bg-white/5 p-4 rounded-lg">
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="detailed-pubs" 
                    name="pub-type" 
                    checked={detailedPublications} 
                    onChange={() => setDetailedPublications(true)}
                    className="mr-2 accent-medsume-teal"
                  />
                  <label htmlFor="detailed-pubs" className="text-sm text-white">Detailed Publications</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="simple-pubs" 
                    name="pub-type" 
                    checked={!detailedPublications} 
                    onChange={() => setDetailedPublications(false)}
                    className="mr-2 accent-medsume-teal"
                  />
                  <label htmlFor="simple-pubs" className="text-sm text-white">Simple Text Format</label>
                </div>
              </div>
              
              {detailedPublications ? (
                <>
                  {resumeData.publications.length === 0 ? (
                    <div className="text-center py-6 bg-white/5 rounded-lg border border-white/10">
                      <p className="text-gray-400 mb-4">No publications added yet</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {resumeData.publications.map((publication, index) => (
                        <div key={publication.id} className="border border-white/10 rounded-lg p-5 bg-gradient-to-br from-white/5 to-medsume-teal/5 backdrop-blur-sm">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-semibold text-white">Publication #{index + 1}</h3>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => {
                                removePublication(publication.id);
                                toast.info("Publication removed");
                              }}
                              className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
                            >
                              Remove
                            </Button>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2 text-white">Authors</label>
                            <Input 
                              value={publication.authors}
                              onChange={(e) => updatePublication(publication.id, { authors: e.target.value })}
                              className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                              placeholder="e.g., Smith J, Doe A, et al."
                            />
                          </div>
                          
                          <div className="mt-4">
                            <label className="block text-sm font-medium mb-2 text-white">Title</label>
                            <Input 
                              value={publication.title}
                              onChange={(e) => updatePublication(publication.id, { title: e.target.value })}
                              className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                              placeholder="Publication title"
                            />
                          </div>
                          
                          <div className="mt-4">
                            <label className="block text-sm font-medium mb-2 text-white">Journal</label>
                            <Input 
                              value={publication.journal}
                              onChange={(e) => updatePublication(publication.id, { journal: e.target.value })}
                              className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                              placeholder="Journal name"
                            />
                          </div>
                          
                          <div className="mt-4">
                            <label className="block text-sm font-medium mb-2 text-white">Publication Date (MM/YYYY)</label>
                            <div className="relative">
                              <Input 
                                type="text"
                                value={formatDate(publication.date)}
                                onChange={(e) => updatePublication(publication.id, { date: e.target.value })}
                                className="bg-white/10 border-white/20 text-white focus:border-medsume-teal pl-10"
                                placeholder="MM/YYYY"
                              />
                              <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <label className="block text-sm font-medium mb-2 text-white">DOI</label>
                            <Input 
                              value={publication.doi}
                              onChange={(e) => updatePublication(publication.id, { doi: e.target.value })}
                              className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                              placeholder="DOI number"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <Button 
                    onClick={addNewPublication}
                    className="mt-4 bg-gradient-to-r from-medsume-appleBlue to-medsume-teal hover:from-medsume-appleBlue hover:to-medsume-tealLight text-white border-none"
                  >
                    <Plus size={16} className="mr-2" />
                    Add Publication
                  </Button>
                </>
              ) : (
                <div className="border border-white/10 rounded-lg p-5 bg-gradient-to-br from-white/5 to-medsume-teal/5 backdrop-blur-sm">
                  <label className="block text-sm font-medium mb-2 text-white">Publications</label>
                  <Textarea 
                    value={resumeData.publicationsText}
                    onChange={(e) => updatePublicationsText(e.target.value)}
                    className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                    placeholder="List your publications here in your preferred format"
                    rows={10}
                    maxLength={2000}
                  />
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Professional Memberships & Certifications - Combined */}
        <AccordionItem value="memberships" className="border border-white/10 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm">
          <AccordionTrigger className="hover:bg-white/5 px-4 py-3 rounded-t-xl">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-gradient-to-r from-medsume-appleBlue to-medsume-teal mr-3">
                <FileText size={18} className="text-white" />
              </div>
              <span className="text-white font-medium">Professional Memberships & Certifications</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-6">
            {resumeData.memberships.length === 0 ? (
              <div className="text-center py-6 bg-white/5 rounded-lg border border-white/10">
                <p className="text-gray-400 mb-4">No memberships or certifications added yet</p>
              </div>
            ) : (
              <div className="space-y-6">
                {resumeData.memberships.map((membership, index) => (
                  <div key={membership.id} className="border border-white/10 rounded-lg p-5 bg-white/5 backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-semibold text-white">Membership/Certification #{index + 1}</h3>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => {
                          removeMembership(membership.id);
                          toast.info("Item removed");
                        }}
                        className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
                      >
                        Remove
                      </Button>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white">Name</label>
                      <Input 
                        value={membership.name}
                        onChange={(e) => updateMembership(membership.id, { name: e.target.value })}
                        className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                        placeholder="Membership or certification name"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">Issue Date (MM/YYYY)</label>
                        <div className="relative">
                          <Input 
                            type="text"
                            value={formatDate(membership.issueDate)}
                            onChange={(e) => updateMembership(membership.id, { issueDate: e.target.value })}
                            className="bg-white/10 border-white/20 text-white focus:border-medsume-teal pl-10"
                            placeholder="MM/YYYY"
                          />
                          <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">Expiry Date (MM/YYYY, Optional)</label>
                        <div className="relative">
                          <Input 
                            type="text"
                            value={formatDate(membership.expiryDate)}
                            onChange={(e) => updateMembership(membership.id, { expiryDate: e.target.value })}
                            className="bg-white/10 border-white/20 text-white focus:border-medsume-teal pl-10"
                            placeholder="MM/YYYY"
                          />
                          <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2 text-white">Remarks</label>
                      <Textarea 
                        value={membership.remarks}
                        onChange={(e) => updateMembership(membership.id, { remarks: e.target.value })}
                        className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                        placeholder="Additional information"
                        maxLength={300}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <Button 
              onClick={addNewMembership}
              className="mt-4 bg-gradient-to-r from-medsume-appleBlue to-medsume-teal hover:from-medsume-appleBlue hover:to-medsume-tealLight text-white border-none"
            >
              <Plus size={16} className="mr-2" />
              Add Membership/Certification
            </Button>
          </AccordionContent>
        </AccordionItem>
        
        {/* Languages - Enhanced with more options */}
        <AccordionItem value="languages" className="border border-white/10 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm">
          <AccordionTrigger className="hover:bg-white/5 px-4 py-3 rounded-t-xl">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-gradient-to-r from-medsume-appleBlue to-medsume-teal mr-3">
                <Languages size={18} className="text-white" />
              </div>
              <span className="text-white font-medium">Languages</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-6">
            {resumeData.languages.length === 0 ? (
              <div className="text-center py-6 bg-white/5 rounded-lg border border-white/10">
                <p className="text-gray-400 mb-4">No languages added yet</p>
              </div>
            ) : (
              <div className="space-y-6">
                {resumeData.languages.map((language, index) => (
                  <div key={language.id} className="border border-white/10 rounded-lg p-5 bg-white/5 backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-semibold text-white">Language #{index + 1}</h3>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => {
                          removeLanguage(language.id);
                          toast.info("Language removed");
                        }}
                        className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
                      >
                        Remove
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">Language</label>
                        <Select 
                          value={language.name} 
                          onValueChange={(value) => updateLanguage(language.id, { name: value })}
                        >
                          <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-medsume-teal">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-white/10 text-white h-56 overflow-y-auto">
                            {extendedLanguageOptions.map(lang => (
                              <SelectItem key={lang} value={lang} className="focus:bg-medsume-teal/20 focus:text-white">
                                {lang}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">Proficiency</label>
                        <Select 
                          value={language.proficiency} 
                          onValueChange={(value: 'Native' | 'Fluent' | 'Intermediate' | 'Basic') => 
                            updateLanguage(language.id, { proficiency: value })
                          }
                        >
                          <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-medsume-teal">
                            <SelectValue placeholder="Select proficiency" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-white/10 text-white">
                            <SelectItem value="Native" className="focus:bg-medsume-teal/20 focus:text-white">Native</SelectItem>
                            <SelectItem value="Fluent" className="focus:bg-medsume-teal/20 focus:text-white">Fluent</SelectItem>
                            <SelectItem value="Intermediate" className="focus:bg-medsume-teal/20 focus:text-white">Intermediate</SelectItem>
                            <SelectItem value="Basic" className="focus:bg-medsume-teal/20 focus:text-white">Basic</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <Input
                  value={customLanguage}
                  onChange={(e) => setCustomLanguage(e.target.value)}
                  className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                  placeholder="Add a custom language not in the list"
                />
              </div>
              <Button 
                onClick={handleAddCustomLanguage}
                disabled={!customLanguage}
                className="bg-gradient-to-r from-medsume-appleBlue to-medsume-teal hover:from-medsume-appleBlue hover:to-medsume-tealLight text-white border-none disabled:opacity-50"
              >
                <Plus size={16} className="mr-2" />
                Add Custom
              </Button>
            </div>
            
            <Button 
              onClick={addNewLanguage}
              className="mt-4 bg-gradient-to-r from-medsume-appleBlue to-medsume-teal hover:from-medsume-appleBlue hover:to-medsume-tealLight text-white border-none"
            >
              <Plus size={16} className="mr-2" />
              Add Language
            </Button>
          </AccordionContent>
        </AccordionItem>
        
        {/* Hobbies & Interests - Enhanced visual design */}
        <AccordionItem value="hobbies" className="border border-white/10 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm">
          <AccordionTrigger className="hover:bg-white/5 px-4 py-3 rounded-t-xl">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-gradient-to-r from-medsume-appleBlue to-medsume-teal mr-3">
                <Heart size={18} className="text-white" />
              </div>
              <span className="text-white font-medium">Hobbies & Interests</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-6">
            <div>
              <label className="block text-sm font-medium mb-4 text-white">Select your hobbies and interests</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {hobbiesOptions.map((hobby) => (
                  <div 
                    key={hobby} 
                    className={`flex items-center space-x-2 p-3 rounded-lg cursor-pointer transition-all duration-200 border
                      ${resumeData.hobbies.includes(hobby) 
                        ? 'bg-gradient-to-r from-medsume-appleBlue/20 to-medsume-teal/20 border-medsume-teal/50 shadow-inner' 
                        : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                    onClick={() => handleHobbyToggle(hobby)}
                  >
                    <Checkbox 
                      id={`hobby-${hobby}`} 
                      checked={resumeData.hobbies.includes(hobby)}
                      onCheckedChange={() => handleHobbyToggle(hobby)}
                      className="border-white/20 data-[state=checked]:bg-medsume-teal data-[state=checked]:border-medsume-teal"
                    />
                    <label 
                      htmlFor={`hobby-${hobby}`}
                      className="text-sm text-white cursor-pointer flex-1"
                    >
                      {hobby}
                    </label>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <Input
                    value={customHobby}
                    onChange={(e) => setCustomHobby(e.target.value)}
                    className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                    placeholder="Add a custom hobby or interest"
                  />
                </div>
                <Button 
                  onClick={handleAddCustomHobby}
                  disabled={!customHobby}
                  className="bg-gradient-to-r from-medsume-appleBlue to-medsume-teal hover:from-medsume-appleBlue hover:to-medsume-tealLight text-white border-none disabled:opacity-50"
                >
                  <Plus size={16} className="mr-2" />
                  Add Custom
                </Button>
              </div>
              
              {resumeData.hobbies.length > 0 && (
                <div className="mt-6 p-4 border border-white/10 rounded-lg bg-white/5">
                  <h4 className="text-sm font-medium text-white mb-2">Your Selected Hobbies & Interests:</h4>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.hobbies.map((hobby) => (
                      <div 
                        key={hobby} 
                        className="px-3 py-1 bg-gradient-to-r from-medsume-appleBlue/30 to-medsume-teal/30 rounded-full text-white text-xs flex items-center group"
                      >
                        {hobby}
                        <button
                          onClick={() => handleHobbyToggle(hobby)}
                          className="ml-2 rounded-full p-0.5 bg-white/10 hover:bg-white/20 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ResumeForm;
