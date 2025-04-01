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
  X,
  Calendar,
  BookOpen
} from "lucide-react";
import { 
  hobbiesOptions, 
  languageOptions, 
  degreeOptions, 
  jobTypeOptions, 
  idTypeOptions,
  validateEmail, 
  validatePhoneNumber 
} from './utils';

const proficiencyOptions = ['Native', 'Fluent', 'Intermediate', 'Basic'];

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
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>(resumeData.hobbies || []);
  
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalDetails({ photoUrl: reader.result as string });
        toast.success("Profile photo updated successfully");
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Unified date input handler for simpler date selection
  const handleDateChange = (fieldType: string, id: string, field: string, value: string) => {
    // For various record types, update the appropriate data
    if (fieldType === 'medical-education') {
      updateMedicalEducation(id, { [field]: value });
    } else if (fieldType === 'other-education') {
      updateOtherEducation(id, { [field]: value });
    } else if (fieldType === 'experience') {
      updateExperience(id, { [field]: value });
    } else if (fieldType === 'award') {
      updateAward(id, { [field]: value });
    } else if (fieldType === 'publication') {
      updatePublication(id, { [field]: value });
    } else if (fieldType === 'membership') {
      updateMembership(id, { [field]: value });
    }
  };
  
  const addNewEducation = (type: 'medical' | 'other') => {
    const newEducation = {
      id: Date.now().toString(),
      institution: '',
      location: '',
      degree: '',
      startDate: '',
      endDate: '',
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
      id: Date.now().toString(),
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
      id: Date.now().toString(),
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
      id: Date.now().toString(),
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
      id: Date.now().toString(),
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
      id: Date.now().toString(),
      name: '',
      proficiency: 'Intermediate' as const
    };
    
    addLanguage(newLanguage);
    toast.success("Added new language");
  };
  
  const handleHobbyToggle = (hobby: string) => {
    let newHobbies;
    if (selectedHobbies.includes(hobby)) {
      newHobbies = selectedHobbies.filter(h => h !== hobby);
    } else {
      newHobbies = [...selectedHobbies, hobby];
    }
    setSelectedHobbies(newHobbies);
    updateHobbies(newHobbies);
  };
  
  const handleAddCustomHobby = () => {
    if (customHobby && !selectedHobbies.includes(customHobby)) {
      const newHobbies = [...selectedHobbies, customHobby];
      setSelectedHobbies(newHobbies);
      updateHobbies(newHobbies);
      setCustomHobby('');
      toast.success(`Added "${customHobby}" to your hobbies`);
    }
  };
  
  const handleAddCustomLanguage = () => {
    if (customLanguage) {
      addLanguage({
        id: Date.now().toString(),
        name: customLanguage,
        proficiency: 'Intermediate'
      });
      setCustomLanguage('');
      toast.success(`Added ${customLanguage} to your languages`);
    }
  };
  
  // Render the Education section combining medical and other education
  const renderEducationSection = () => {
    return (
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
          {/* Medical Education */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-medsume-appleBlue font-medium">Medical Education</h3>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => addNewEducation('medical')}
                className="border-medsume-teal text-medsume-teal hover:bg-medsume-teal/10"
              >
                <Plus size={16} className="mr-1" /> Add
              </Button>
            </div>
            
            <div className="space-y-8">
              {resumeData.medicalEducation.map((edu, index) => (
                <div 
                  key={edu.id} 
                  className="p-4 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex justify-between mb-4">
                    <h4 className="text-white font-medium">Degree {index + 1}</h4>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeMedicalEducation(edu.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 w-8 p-0"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">Institution</label>
                      <Input 
                        value={edu.institution}
                        onChange={(e) => updateMedicalEducation(edu.id, { institution: e.target.value })}
                        className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                        placeholder="Institution name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">Degree</label>
                      <Select 
                        value={edu.degree} 
                        onValueChange={(value) => updateMedicalEducation(edu.id, { degree: value })}
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
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">Location</label>
                      <Input 
                        value={edu.location}
                        onChange={(e) => updateMedicalEducation(edu.id, { location: e.target.value })}
                        className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                        placeholder="City, Country"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">Remarks</label>
                      <Input 
                        value={edu.remarks}
                        onChange={(e) => updateMedicalEducation(edu.id, { remarks: e.target.value })}
                        className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                        placeholder="Additional information"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">Start Date</label>
                      <div className="relative">
                        <Input 
                          type="date"
                          value={edu.startDate}
                          onChange={(e) => handleDateChange('medical-education', edu.id, 'startDate', e.target.value)}
                          className="bg-white/10 border-white/20 text-white focus:border-medsume-teal pl-10"
                        />
                        <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">End Date</label>
                      <div className="relative">
                        <Input 
                          type="date"
                          value={edu.endDate}
                          onChange={(e) => handleDateChange('medical-education', edu.id, 'endDate', e.target.value)}
                          className="bg-white/10 border-white/20 text-white focus:border-medsume-teal pl-10"
                        />
                        <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {resumeData.medicalEducation.length === 0 && (
                <div className="text-center p-6 border border-dashed border-white/20 rounded-lg bg-white/5">
                  <GraduationCap size={32} className="mx-auto text-white/40 mb-2" />
                  <p className="text-white/60">No medical education added yet</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => addNewEducation('medical')}
                    className="mt-2 border-medsume-teal text-medsume-teal hover:bg-medsume-teal/10"
                  >
                    <Plus size={16} className="mr-1" /> Add Medical Education
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {/* Other Education */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-medsume-appleBlue font-medium">Additional Education</h3>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => addNewEducation('other')}
                className="border-medsume-teal text-medsume-teal hover:bg-medsume-teal/10"
              >
                <Plus size={16} className="mr-1" /> Add
              </Button>
            </div>
            
            <div className="space-y-8">
              {resumeData.otherEducation.map((edu, index) => (
                <div 
                  key={edu.id} 
                  className="p-4 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex justify-between mb-4">
                    <h4 className="text-white font-medium">Degree {index + 1}</h4>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeOtherEducation(edu.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 w-8 p-0"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">Institution</label>
                      <Input 
                        value={edu.institution}
                        onChange={(e) => updateOtherEducation(edu.id, { institution: e.target.value })}
                        className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                        placeholder="Institution name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">Degree</label>
                      <Input 
                        value={edu.degree}
                        onChange={(e) => updateOtherEducation(edu.id, { degree: e.target.value })}
                        className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                        placeholder="Degree name"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">Location</label>
                      <Input 
                        value={edu.location}
                        onChange={(e) => updateOtherEducation(edu.id, { location: e.target.value })}
                        className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                        placeholder="City, Country"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">Remarks</label>
                      <Input 
                        value={edu.remarks}
                        onChange={(e) => updateOtherEducation(edu.id, { remarks: e.target.value })}
                        className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                        placeholder="Additional information"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">Start Date</label>
                      <div className="relative">
                        <Input 
                          type="date"
                          value={edu.startDate}
                          onChange={(e) => handleDateChange('other-education', edu.id, 'startDate', e.target.value)}
                          className="bg-white/10 border-white/20 text-white focus:border-medsume-teal pl-10"
                        />
                        <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">End Date</label>
                      <div className="relative">
                        <Input 
                          type="date"
                          value={edu.endDate}
                          onChange={(e) => handleDateChange('other-education', edu.id, 'endDate', e.target.value)}
                          className="bg-white/10 border-white/20 text-white focus:border-medsume-teal pl-10"
                        />
                        <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {resumeData.otherEducation.length === 0 && (
                <div className="text-center p-6 border border-dashed border-white/20 rounded-lg bg-white/5">
                  <BookOpen size={32} className="mx-auto text-white/40 mb-2" />
                  <p className="text-white/60">No additional education added yet</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => addNewEducation('other')}
                    className="mt-2 border-medsume-teal text-medsume-teal hover:bg-medsume-teal/10"
                  >
                    <Plus size={16} className="mr-1" /> Add Additional Education
                  </Button>
                </div>
              )}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  };
  
  // Render hobby selection with improved UI
  const renderHobbiesSection = () => {
    return (
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
          <div className="mb-4">
            <label className="block text-sm font-medium mb-3 text-white/80">Select your hobbies and interests</label>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedHobbies.map(hobby => (
                <div 
                  key={hobby}
                  className="px-3 py-1 rounded-full bg-gradient-to-r from-medsume-appleBlue to-medsume-teal text-white text-sm flex items-center gap-1"
                >
                  {hobby}
                  <button
                    type="button"
                    onClick={() => handleHobbyToggle(hobby)}
                    className="ml-1 hover:text-white/80"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-60 overflow-y-auto pr-2">
              {hobbiesOptions.filter(h => !selectedHobbies.includes(h)).map(hobby => (
                <div 
                  key={hobby} 
                  className="flex items-center space-x-2 p-2 border border-white/10 rounded-lg hover:bg-white/10 cursor-pointer transition-all duration-200"
                  onClick={() => handleHobbyToggle(hobby)}
                >
                  <Checkbox 
                    id={`hobby-${hobby}`}
                    checked={selectedHobbies.includes(hobby)}
                    onCheckedChange={() => handleHobbyToggle(hobby)}
                    className="border-white/20 data-[state=checked]:bg-medsume-teal data-[state=checked]:border-medsume-teal"
                  />
                  <label 
                    htmlFor={`hobby-${hobby}`}
                    className="text-sm text-white leading-none cursor-pointer"
                  >
                    {hobby}
                  </label>
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex items-center gap-2">
              <Input 
                value={customHobby}
                onChange={(e) => setCustomHobby(e.target.value)}
                className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                placeholder="Add a custom hobby"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && customHobby) {
                    e.preventDefault();
                    handleAddCustomHobby();
                  }
                }}
              />
              <Button 
                type="button" 
                onClick={handleAddCustomHobby}
                className="bg-gradient-to-r from-medsume-appleBlue to-medsume-teal text-white hover:opacity-90"
                disabled={!customHobby}
              >
                Add
              </Button>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  };
  
  // Render enhanced language selection
  const renderLanguagesSection = () => {
    return (
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
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-medium text-white/80">Add languages you speak</label>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={addNewLanguage}
              className="border-medsume-teal text-medsume-teal hover:bg-medsume-teal/10"
            >
              <Plus size={16} className="mr-1" /> Add
            </Button>
          </div>
          
          <div className="space-y-4">
            {resumeData.languages.map((language) => (
              <div 
                key={language.id} 
                className="p-4 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 flex flex-col md:flex-row gap-4 items-center"
              >
                <div className="flex-grow">
                  <Select 
                    value={language.name} 
                    onValueChange={(value) => updateLanguage(language.id, { name: value })}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-medsume-teal">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/10 text-white max-h-60">
                      {languageOptions.map(lang => (
                        <SelectItem key={lang} value={lang} className="focus:bg-medsume-teal/20 focus:text-white">
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex-grow">
                  <Select 
                    value={language.proficiency} 
                    onValueChange={(value) => updateLanguage(language.id, { proficiency: value as any })}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-medsume-teal">
                      <SelectValue placeholder="Proficiency" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/10 text-white">
                      {proficiencyOptions.map(prof => (
                        <SelectItem key={prof} value={prof} className="focus:bg-medsume-teal/20 focus:text-white">
                          {prof}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeLanguage(language.id)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 w-8 p-0 flex-shrink-0"
                >
                  <X size={16} />
                </Button>
              </div>
            ))}
          </div>
          
          {resumeData.languages.length === 0 && (
            <div className="text-center p-6 border border-dashed border-white/20 rounded-lg bg-white/5">
              <Languages size={32} className="mx-auto text-white/40 mb-2" />
              <p className="text-white/60">No languages added yet</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={addNewLanguage}
                className="mt-2 border-medsume-teal text-medsume-teal hover:bg-medsume-teal/10"
              >
                <Plus size={16} className="mr-1" /> Add Language
              </Button>
            </div>
          )}
          
          <div className="mt-4 flex items-center gap-2">
            <Input 
              value={customLanguage}
              onChange={(e) => setCustomLanguage(e.target.value)}
              className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
              placeholder="Add a custom language"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && customLanguage) {
                  e.preventDefault();
                  handleAddCustomLanguage();
                }
              }}
            />
            <Button 
              type="button" 
              onClick={handleAddCustomLanguage}
              className="bg-gradient-to-r from-medsume-appleBlue to-medsume-teal text-white hover:opacity-90"
              disabled={!customLanguage}
            >
              Add
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  };
  
  return (
    <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl shadow-inner overflow-y-auto max-h-[800px] border border-white/10">
      <Accordion type="single" collapsible defaultValue="personal" className="space-y-4">
        {/* Personal Details Section */}
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
                  <p className="text-xs text-white/60 text-center mt-2">Upload a professional headshot</p>
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
                    <SelectContent className="bg-slate-800 border-white/10 text-white max-h-60">
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
        
        {/* Education Section - Combined */}
        {renderEducationSection()}
        
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
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-white/80">Add your professional experience</label>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={addNewExperience}
                className="border-medsume-teal text-medsume-teal hover:bg-medsume-teal/10"
              >
                <Plus size={16} className="mr-1" /> Add
              </Button>
            </div>
            
            <div className="space-y-8">
              {resumeData.experiences.map((exp, index) => (
                <div 
                  key={exp.id} 
                  className="p-4 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex justify-between mb-4">
                    <h4 className="text-white font-medium">Experience {index + 1}</h4>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeExperience(exp.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 w-8 p-0"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">Role/Position</label>
                      <Input 
                        value={exp.role}
                        onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
                        className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                        placeholder="e.g., Resident Physician"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">Department</label>
                      <Input 
                        value={exp.department}
                        onChange={(e) => updateExperience(exp.id, { department: e.target.value })}
                        className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                        placeholder="e.g., Internal Medicine"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">Institution</label>
                      <Input 
                        value={exp.institution}
                        onChange={(e) => updateExperience(exp.id, { institution: e.target.value })}
                        className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                        placeholder="e.g., Mayo Clinic"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">Type</label>
                      <Select 
                        value={exp.type} 
                        onValueChange={(value) => updateExperience(exp.id, { type: value })}
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
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">Start Date</label>
                      <div className="relative">
                        <Input 
                          type="date"
                          value={exp.startDate}
                          onChange={(e) => handleDateChange('experience', exp.id, 'startDate', e.target.value)}
                          className="bg-white/10 border-white/20 text-white focus:border-medsume-teal pl-10"
                        />
                        <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">End Date</label>
                      <div className="relative">
                        <Input 
                          type="date"
                          value={exp.endDate}
                          onChange={(e) => handleDateChange('experience', exp.id, 'endDate', e.target.value)}
                          className="bg-white/10 border-white/20 text-white focus:border-medsume-teal pl-10"
                        />
                        <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">Description</label>
                    <Textarea 
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                      className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                      placeholder="Describe your responsibilities and achievements"
                      rows={3}
                    />
                  </div>
                </div>
              ))}
              
              {resumeData.experiences.length === 0 && (
                <div className="text-center p-6 border border-dashed border-white/20 rounded-lg bg-white/5">
                  <Briefcase size={32} className="mx-auto text-white/40 mb-2" />
                  <p className="text-white/60">No experience added yet</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={addNewExperience}
                    className="mt-2 border-medsume-teal text-medsume-teal hover:bg-medsume-teal/10"
                  >
                    <Plus size={16} className="mr-1" /> Add Experience
                  </Button>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Awards Section */}
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
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-white/80">Add your honors and awards</label>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={addNewAward}
                className="border-medsume-teal text-medsume-teal hover:bg-medsume-teal/10"
              >
                <Plus size={16} className="mr-1" /> Add
              </Button>
            </div>
            
            <div className="space-y-8">
              {resumeData.awards.map((award, index) => (
                <div 
                  key={award.id} 
                  className="p-4 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex justify-between mb-4">
                    <h4 className="text-white font-medium">Award {index + 1}</h4>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeAward(award.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 w-8 p-0"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">Title</label>
                      <Input 
                        value={award.title}
                        onChange={(e) => updateAward(award.id, { title: e.target.value })}
                        className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                        placeholder="e.g., Excellence in Research"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">Organization</label>
                      <Input 
                        value={award.organization}
                        onChange={(e) => updateAward(award.id, { organization: e.target.value })}
                        className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                        placeholder="e.g., American Medical Association"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-white/80">Date</label>
                    <div className="relative">
                      <Input 
                        type="date"
                        value={award.date}
                        onChange={(e) => handleDateChange('award', award.id, 'date', e.target.value)}
                        className="bg-white/10 border-white/20 text-white focus:border-medsume-teal pl-10"
                      />
                      <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">Description</label>
                    <Textarea 
                      value={award.description}
                      onChange={(e) => updateAward(award.id, { description: e.target.value })}
                      className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                      placeholder="Brief description of the award"
                      rows={3}
                    />
                  </div>
                </div>
              ))}
              
              {resumeData.awards.length === 0 && (
                <div className="text-center p-6 border border-dashed border-white/20 rounded-lg bg-white/5">
                  <Award size={32} className="mx-auto text-white/40 mb-2" />
                  <p className="text-white/60">No awards added yet</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={addNewAward}
                    className="mt-2 border-medsume-teal text-medsume-teal hover:bg-medsume-teal/10"
                  >
                    <Plus size={16} className="mr-1" /> Add Award
                  </Button>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Publications Section */}
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
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="detailed-publications"
                    checked={detailedPublications}
                    onCheckedChange={(checked) => setDetailedPublications(checked as boolean)}
                    className="border-white/20 data-[state=checked]:bg-medsume-teal data-[state=checked]:border-medsume-teal"
                  />
                  <label 
                    htmlFor="detailed-publications"
                    className="text-sm text-white leading-none cursor-pointer"
                  >
                    Detailed Publications
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="text-publications"
                    checked={!detailedPublications}
                    onCheckedChange={(checked) => setDetailedPublications(!(checked as boolean))}
                    className="border-white/20 data-[state=checked]:bg-medsume-teal data-[state=checked]:border-medsume-teal"
                  />
                  <label 
                    htmlFor="text-publications"
                    className="text-sm text-white leading-none cursor-pointer"
                  >
                    Text Format
                  </label>
                </div>
              </div>
              
              {detailedPublications && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={addNewPublication}
                  className="border-medsume-teal text-medsume-teal hover:bg-medsume-teal/10"
                >
                  <Plus size={16} className="mr-1" /> Add
                </Button>
              )}
            </div>
            
            {detailedPublications ? (
              <div className="space-y-8">
                {resumeData.publications.map((pub, index) => (
                  <div 
                    key={pub.id} 
                    className="p-4 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex justify-between mb-4">
                      <h4 className="text-white font-medium">Publication {index + 1}</h4>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removePublication(pub.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 w-8 p-0"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white/80">Title</label>
                        <Input 
                          value={pub.title}
                          onChange={(e) => updatePublication(pub.id, { title: e.target.value })}
                          className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                          placeholder="Publication title"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white/80">Authors</label>
                        <Input 
                          value={pub.authors}
                          onChange={(e) => updatePublication(pub.id, { authors: e.target.value })}
                          className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                          placeholder="e.g., Smith J, Jones A, et al."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white/80">Journal</label>
                        <Input 
                          value={pub.journal}
                          onChange={(e) => updatePublication(pub.id, { journal: e.target.value })}
                          className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                          placeholder="e.g., Journal of Medical Research"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-white/80">Date</label>
                          <div className="relative">
                            <Input 
                              type="date"
                              value={pub.date}
                              onChange={(e) => handleDateChange('publication', pub.id, 'date', e.target.value)}
                              className="bg-white/10 border-white/20 text-white focus:border-medsume-teal pl-10"
                            />
                            <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-white/80">DOI</label>
                          <Input 
                            value={pub.doi}
                            onChange={(e) => updatePublication(pub.id, { doi: e.target.value })}
                            className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                            placeholder="e.g., 10.1000/xyz123"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {resumeData.publications.length === 0 && (
                  <div className="text-center p-6 border border-dashed border-white/20 rounded-lg bg-white/5">
                    <FileText size={32} className="mx-auto text-white/40 mb-2" />
                    <p className="text-white/60">No publications added yet</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={addNewPublication}
                      className="mt-2 border-medsume-teal text-medsume-teal hover:bg-medsume-teal/10"
                    >
                      <Plus size={16} className="mr-1" /> Add Publication
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium mb-2 text-white/80">Publications (in text format)</label>
                <Textarea 
                  value={resumeData.publicationsText}
                  onChange={(e) => updatePublicationsText(e.target.value)}
                  className="bg-white/10 border-white/20 text-white focus:border-medsume-teal min-h-[200px]"
                  placeholder="Enter your publications in your preferred format. Each publication will be displayed as entered."
                  rows={8}
                />
                <p className="text-xs text-white/60 mt-2">
                  Tip: Enter each publication on a new line. You can use standard citation formats.
                </p>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
        
        {/* Memberships Section */}
        <AccordionItem value="memberships" className="border border-white/10 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm">
          <AccordionTrigger className="hover:bg-white/5 px-4 py-3 rounded-t-xl">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-gradient-to-r from-medsume-appleBlue to-medsume-teal mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
              </div>
              <span className="text-white font-medium">Professional Memberships & Certifications</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-6">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-white/80">Add your professional memberships and certifications</label>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={addNewMembership}
                className="border-medsume-teal text-medsume-teal hover:bg-medsume-teal/10"
              >
                <Plus size={16} className="mr-1" /> Add
              </Button>
            </div>
            
            <div className="space-y-8">
              {resumeData.memberships.map((membership, index) => (
                <div 
                  key={membership.id} 
                  className="p-4 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex justify-between mb-4">
                    <h4 className="text-white font-medium">Membership/Certification {index + 1}</h4>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeMembership(membership.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 w-8 p-0"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-white/80">Name</label>
                    <Input 
                      value={membership.name}
                      onChange={(e) => updateMembership(membership.id, { name: e.target.value })}
                      className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                      placeholder="e.g., American Medical Association"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">Issue Date</label>
                      <div className="relative">
                        <Input 
                          type="date"
                          value={membership.issueDate}
                          onChange={(e) => handleDateChange('membership', membership.id, 'issueDate', e.target.value)}
                          className="bg-white/10 border-white/20 text-white focus:border-medsume-teal pl-10"
                        />
                        <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">Expiry Date</label>
                      <div className="relative">
                        <Input 
                          type="date"
                          value={membership.expiryDate}
                          onChange={(e) => handleDateChange('membership', membership.id, 'expiryDate', e.target.value)}
                          className="bg-white/10 border-white/20 text-white focus:border-medsume-teal pl-10"
                        />
                        <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">Remarks</label>
                    <Textarea 
                      value={membership.remarks}
                      onChange={(e) => updateMembership(membership.id, { remarks: e.target.value })}
                      className="bg-white/10 border-white/20 text-white focus:border-medsume-teal"
                      placeholder="Additional information"
                      rows={3}
                    />
                  </div>
                </div>
              ))}
              
              {resumeData.memberships.length === 0 && (
                <div className="text-center p-6 border border-dashed border-white/20 rounded-lg bg-white/5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-white/40 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                  <p className="text-white/60">No memberships or certifications added yet</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={addNewMembership}
                    className="mt-2 border-medsume-teal text-medsume-teal hover:bg-medsume-teal/10"
                  >
                    <Plus size={16} className="mr-1" /> Add Membership
                  </Button>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Languages Section */}
        {renderLanguagesSection()}
        
        {/* Hobbies Section */}
        {renderHobbiesSection()}
      </Accordion>
    </div>
  );
};

export default ResumeForm;
