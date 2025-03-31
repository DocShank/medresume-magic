
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Plus 
} from "lucide-react";
import { hobbiesOptions, languageOptions, degreeOptions, jobTypeOptions, validateEmail, validatePhoneNumber } from './utils';

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
  
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalDetails({ photoUrl: reader.result as string });
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
  
  const validatePersonalDetails = () => {
    const { firstName, lastName, email, phoneNumber } = resumeData.personalDetails;
    
    if (!firstName || !lastName) {
      toast.error("First and last name are required");
      return false;
    }
    
    if (email && !validateEmail(email)) {
      toast.error("Please enter a valid email");
      return false;
    }
    
    if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
      toast.error("Please enter a valid phone number");
      return false;
    }
    
    return true;
  };
  
  return (
    <div className="bg-medsume-darkGray/80 backdrop-blur-md p-4 rounded-lg shadow-lg overflow-y-auto max-h-[800px]">
      <Accordion type="single" collapsible defaultValue="personal">
        {/* Personal Details */}
        <AccordionItem value="personal">
          <AccordionTrigger className="hover:bg-white/5 px-2 rounded-md">
            <div className="flex items-center">
              <User size={18} className="mr-2" />
              <span>Personal Details</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-2 pb-4">
            <div className="space-y-4">
              {/* Photo Upload */}
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-gray-300 bg-gray-100 flex items-center justify-center">
                    {resumeData.personalDetails.photoUrl ? (
                      <img 
                        src={resumeData.personalDetails.photoUrl} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={48} className="text-gray-400" />
                    )}
                  </div>
                  <label 
                    htmlFor="photo-upload" 
                    className="absolute bottom-0 right-0 bg-medsume-teal text-white p-2 rounded-full cursor-pointer"
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
                  <label className="block text-sm font-medium mb-2">First Name*</label>
                  <Input 
                    value={resumeData.personalDetails.firstName}
                    onChange={(e) => updatePersonalDetails({ firstName: e.target.value })}
                    className="bg-white/10 border-gray-600 text-white"
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Middle Name</label>
                  <Input 
                    value={resumeData.personalDetails.middleName}
                    onChange={(e) => updatePersonalDetails({ middleName: e.target.value })}
                    className="bg-white/10 border-gray-600 text-white"
                    placeholder="Middle name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name*</label>
                  <Input 
                    value={resumeData.personalDetails.lastName}
                    onChange={(e) => updatePersonalDetails({ lastName: e.target.value })}
                    className="bg-white/10 border-gray-600 text-white"
                    placeholder="Last name"
                  />
                </div>
              </div>
              
              {/* Organization */}
              <div>
                <label className="block text-sm font-medium mb-2">Organization</label>
                <Input 
                  value={resumeData.personalDetails.organization}
                  onChange={(e) => updatePersonalDetails({ organization: e.target.value })}
                  className="bg-white/10 border-gray-600 text-white"
                  placeholder="e.g., Mayo Clinic"
                />
              </div>
              
              {/* ID Type & Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">ID Type</label>
                  <Select 
                    value={resumeData.personalDetails.idType} 
                    onValueChange={(value) => updatePersonalDetails({ idType: value })}
                  >
                    <SelectTrigger className="bg-white/10 border-gray-600 text-white">
                      <SelectValue placeholder="Select ID type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NMC">NMC</SelectItem>
                      <SelectItem value="GMC">GMC</SelectItem>
                      <SelectItem value="USMLE">USMLE</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">ID Number</label>
                  <Input 
                    value={resumeData.personalDetails.idNumber}
                    onChange={(e) => updatePersonalDetails({ idNumber: e.target.value })}
                    className="bg-white/10 border-gray-600 text-white"
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
                />
                <label 
                  htmlFor="accredited-id" 
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  I have an accredited ID
                </label>
              </div>
              
              {/* Accredited Organization & ID (conditional) */}
              {resumeData.personalDetails.hasAccreditedId && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 pl-6 border-l-2 border-medsume-teal">
                  <div>
                    <label className="block text-sm font-medium mb-2">Accredited Organization</label>
                    <Input 
                      value={resumeData.personalDetails.accreditedOrg}
                      onChange={(e) => updatePersonalDetails({ accreditedOrg: e.target.value })}
                      className="bg-white/10 border-gray-600 text-white"
                      placeholder="Organization name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Accredited ID Number</label>
                    <Input 
                      value={resumeData.personalDetails.accreditedIdNumber}
                      onChange={(e) => updatePersonalDetails({ accreditedIdNumber: e.target.value })}
                      className="bg-white/10 border-gray-600 text-white"
                      placeholder="ID number"
                    />
                  </div>
                </div>
              )}
              
              {/* Contact Information */}
              <div>
                <label className="block text-sm font-medium mb-2">Mailing Address</label>
                <Textarea 
                  value={resumeData.personalDetails.mailingAddress}
                  onChange={(e) => updatePersonalDetails({ mailingAddress: e.target.value })}
                  className="bg-white/10 border-gray-600 text-white"
                  placeholder="Your complete address"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <div className="flex">
                    <Select 
                      value={resumeData.personalDetails.countryCode} 
                      onValueChange={(value) => updatePersonalDetails({ countryCode: value })}
                    >
                      <SelectTrigger className="w-24 bg-white/10 border-gray-600 text-white">
                        <SelectValue placeholder="+1" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+1">+1</SelectItem>
                        <SelectItem value="+44">+44</SelectItem>
                        <SelectItem value="+91">+91</SelectItem>
                        <SelectItem value="+977">+977</SelectItem>
                        <SelectItem value="+81">+81</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input 
                      value={resumeData.personalDetails.phoneNumber}
                      onChange={(e) => updatePersonalDetails({ phoneNumber: e.target.value })}
                      className="flex-1 ml-2 bg-white/10 border-gray-600 text-white"
                      placeholder="Phone number"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input 
                    type="email"
                    value={resumeData.personalDetails.email}
                    onChange={(e) => updatePersonalDetails({ email: e.target.value })}
                    className="bg-white/10 border-gray-600 text-white"
                    placeholder="Your email address"
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Medical Education */}
        <AccordionItem value="medical-education">
          <AccordionTrigger className="hover:bg-white/5 px-2 rounded-md">
            <div className="flex items-center">
              <GraduationCap size={18} className="mr-2" />
              <span>Medical Education</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-2 pb-4">
            {resumeData.medicalEducation.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-gray-400 mb-4">No medical education added yet</p>
              </div>
            ) : (
              <div className="space-y-6">
                {resumeData.medicalEducation.map((education, index) => (
                  <div key={education.id} className="border border-gray-700 rounded-md p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-semibold">Medical Education #{index + 1}</h3>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => {
                          removeMedicalEducation(education.id);
                          toast.info("Medical education removed");
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Institution</label>
                        <Input 
                          value={education.institution}
                          onChange={(e) => updateMedicalEducation(education.id, { institution: e.target.value })}
                          className="bg-white/10 border-gray-600 text-white"
                          placeholder="Institution name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Location</label>
                        <Input 
                          value={education.location}
                          onChange={(e) => updateMedicalEducation(education.id, { location: e.target.value })}
                          className="bg-white/10 border-gray-600 text-white"
                          placeholder="e.g., Boston, USA"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">Degree</label>
                      <Select 
                        value={education.degree} 
                        onValueChange={(value) => updateMedicalEducation(education.id, { degree: value })}
                      >
                        <SelectTrigger className="bg-white/10 border-gray-600 text-white">
                          <SelectValue placeholder="Select degree" />
                        </SelectTrigger>
                        <SelectContent>
                          {degreeOptions.map(degree => (
                            <SelectItem key={degree} value={degree}>{degree}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <DateSelector 
                        label="Start Date"
                        value={education.startDate}
                        onChange={(date) => updateMedicalEducation(education.id, { startDate: date })}
                      />
                      <DateSelector 
                        label="End Date"
                        value={education.endDate}
                        onChange={(date) => updateMedicalEducation(education.id, { endDate: date })}
                      />
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">Score (Optional)</label>
                      <Input 
                        type="number"
                        min="0"
                        max="100"
                        value={education.score}
                        onChange={(e) => updateMedicalEducation(education.id, { score: e.target.value })}
                        className="bg-white/10 border-gray-600 text-white"
                        placeholder="e.g., 85"
                      />
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">Remarks</label>
                      <Textarea 
                        value={education.remarks}
                        onChange={(e) => updateMedicalEducation(education.id, { remarks: e.target.value })}
                        className="bg-white/10 border-gray-600 text-white"
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
              className="mt-4 bg-medsume-teal hover:bg-medsume-tealLight"
            >
              <Plus size={16} className="mr-2" />
              Add Medical Education
            </Button>
          </AccordionContent>
        </AccordionItem>

        {/* Additional Education */}
        <AccordionItem value="other-education">
          <AccordionTrigger className="hover:bg-white/5 px-2 rounded-md">
            <div className="flex items-center">
              <GraduationCap size={18} className="mr-2" />
              <span>Additional Education</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-2 pb-4">
            {resumeData.otherEducation.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-gray-400 mb-4">No additional education added yet</p>
              </div>
            ) : (
              <div className="space-y-6">
                {resumeData.otherEducation.map((education, index) => (
                  <div key={education.id} className="border border-gray-700 rounded-md p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-semibold">Other Education #{index + 1}</h3>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => {
                          removeOtherEducation(education.id);
                          toast.info("Education removed");
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                    
                    {/* Same fields as Medical Education */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Institution</label>
                        <Input 
                          value={education.institution}
                          onChange={(e) => updateOtherEducation(education.id, { institution: e.target.value })}
                          className="bg-white/10 border-gray-600 text-white"
                          placeholder="Institution name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Location</label>
                        <Input 
                          value={education.location}
                          onChange={(e) => updateOtherEducation(education.id, { location: e.target.value })}
                          className="bg-white/10 border-gray-600 text-white"
                          placeholder="e.g., Boston, USA"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">Degree</label>
                      <Input 
                        value={education.degree}
                        onChange={(e) => updateOtherEducation(education.id, { degree: e.target.value })}
                        className="bg-white/10 border-gray-600 text-white"
                        placeholder="e.g., BSc Biology"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <DateSelector 
                        label="Start Date"
                        value={education.startDate}
                        onChange={(date) => updateOtherEducation(education.id, { startDate: date })}
                      />
                      <DateSelector 
                        label="End Date"
                        value={education.endDate}
                        onChange={(date) => updateOtherEducation(education.id, { endDate: date })}
                      />
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">Score (Optional)</label>
                      <Input 
                        value={education.score}
                        onChange={(e) => updateOtherEducation(education.id, { score: e.target.value })}
                        className="bg-white/10 border-gray-600 text-white"
                        placeholder="e.g., 85"
                      />
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">Remarks</label>
                      <Textarea 
                        value={education.remarks}
                        onChange={(e) => updateOtherEducation(education.id, { remarks: e.target.value })}
                        className="bg-white/10 border-gray-600 text-white"
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
              className="mt-4 bg-medsume-teal hover:bg-medsume-tealLight"
            >
              <Plus size={16} className="mr-2" />
              Add Other Education
            </Button>
          </AccordionContent>
        </AccordionItem>
        
        {/* Honors & Awards */}
        <AccordionItem value="awards">
          <AccordionTrigger className="hover:bg-white/5 px-2 rounded-md">
            <div className="flex items-center">
              <Award size={18} className="mr-2" />
              <span>Honors & Awards</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-2 pb-4">
            {resumeData.awards.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-gray-400 mb-4">No awards added yet</p>
              </div>
            ) : (
              <div className="space-y-6">
                {resumeData.awards.map((award, index) => (
                  <div key={award.id} className="border border-gray-700 rounded-md p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-semibold">Award #{index + 1}</h3>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => {
                          removeAward(award.id);
                          toast.info("Award removed");
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Award Title</label>
                      <Input 
                        value={award.title}
                        onChange={(e) => updateAward(award.id, { title: e.target.value })}
                        className="bg-white/10 border-gray-600 text-white"
                        placeholder="Title of the award"
                      />
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">Issuing Organization</label>
                      <Input 
                        value={award.organization}
                        onChange={(e) => updateAward(award.id, { organization: e.target.value })}
                        className="bg-white/10 border-gray-600 text-white"
                        placeholder="Organization name"
                      />
                    </div>
                    
                    <div className="mt-4">
                      <DateSelector 
                        label="Date Awarded"
                        value={award.date}
                        onChange={(date) => updateAward(award.id, { date })}
                      />
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <Textarea 
                        value={award.description}
                        onChange={(e) => updateAward(award.id, { description: e.target.value })}
                        className="bg-white/10 border-gray-600 text-white"
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
              className="mt-4 bg-medsume-teal hover:bg-medsume-tealLight"
            >
              <Plus size={16} className="mr-2" />
              Add Award
            </Button>
          </AccordionContent>
        </AccordionItem>
        
        {/* Experience Section */}
        <AccordionItem value="experience">
          <AccordionTrigger className="hover:bg-white/5 px-2 rounded-md">
            <div className="flex items-center">
              <Briefcase size={18} className="mr-2" />
              <span>Experience</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-2 pb-4">
            {resumeData.experiences.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-gray-400 mb-4">No experience added yet</p>
              </div>
            ) : (
              <div className="space-y-6">
                {resumeData.experiences.map((experience, index) => (
                  <div key={experience.id} className="border border-gray-700 rounded-md p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-semibold">Experience #{index + 1}</h3>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => {
                          removeExperience(experience.id);
                          toast.info("Experience removed");
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Role</label>
                        <Input 
                          value={experience.role}
                          onChange={(e) => updateExperience(experience.id, { role: e.target.value })}
                          className="bg-white/10 border-gray-600 text-white"
                          placeholder="e.g., Resident Physician"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Department</label>
                        <Input 
                          value={experience.department}
                          onChange={(e) => updateExperience(experience.id, { department: e.target.value })}
                          className="bg-white/10 border-gray-600 text-white"
                          placeholder="e.g., Cardiology"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">Institution</label>
                      <Input 
                        value={experience.institution}
                        onChange={(e) => updateExperience(experience.id, { institution: e.target.value })}
                        className="bg-white/10 border-gray-600 text-white"
                        placeholder="Institution name"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <DateSelector 
                        label="Start Date"
                        value={experience.startDate}
                        onChange={(date) => updateExperience(experience.id, { startDate: date })}
                      />
                      <DateSelector 
                        label="End Date"
                        value={experience.endDate}
                        onChange={(date) => updateExperience(experience.id, { endDate: date })}
                      />
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">Type</label>
                      <Select 
                        value={experience.type} 
                        onValueChange={(value) => updateExperience(experience.id, { type: value })}
                      >
                        <SelectTrigger className="bg-white/10 border-gray-600 text-white">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {jobTypeOptions.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <Textarea 
                        value={experience.description}
                        onChange={(e) => updateExperience(experience.id, { description: e.target.value })}
                        className="bg-white/10 border-gray-600 text-white"
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
              className="mt-4 bg-medsume-teal hover:bg-medsume-tealLight"
            >
              <Plus size={16} className="mr-2" />
              Add Experience
            </Button>
          </AccordionContent>
        </AccordionItem>
        
        {/* Publications */}
        <AccordionItem value="publications">
          <AccordionTrigger className="hover:bg-white/5 px-2 rounded-md">
            <div className="flex items-center">
              <FileText size={18} className="mr-2" />
              <span>Publications</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-2 pb-4">
            <div className="mb-4">
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="detailed-pubs" 
                    name="pub-type" 
                    checked={detailedPublications} 
                    onChange={() => setDetailedPublications(true)}
                    className="mr-2"
                  />
                  <label htmlFor="detailed-pubs" className="text-sm">Detailed Publications</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="simple-pubs" 
                    name="pub-type" 
                    checked={!detailedPublications} 
                    onChange={() => setDetailedPublications(false)}
                    className="mr-2"
                  />
                  <label htmlFor="simple-pubs" className="text-sm">Simple Text Format</label>
                </div>
              </div>
              
              {detailedPublications ? (
                <>
                  {resumeData.publications.length === 0 ? (
                    <div className="text-center py-6">
                      <p className="text-gray-400 mb-4">No publications added yet</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {resumeData.publications.map((publication, index) => (
                        <div key={publication.id} className="border border-gray-700 rounded-md p-4">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-semibold">Publication #{index + 1}</h3>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => {
                                removePublication(publication.id);
                                toast.info("Publication removed");
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2">Authors</label>
                            <Input 
                              value={publication.authors}
                              onChange={(e) => updatePublication(publication.id, { authors: e.target.value })}
                              className="bg-white/10 border-gray-600 text-white"
                              placeholder="e.g., Smith J, Doe A, et al."
                            />
                          </div>
                          
                          <div className="mt-4">
                            <label className="block text-sm font-medium mb-2">Title</label>
                            <Input 
                              value={publication.title}
                              onChange={(e) => updatePublication(publication.id, { title: e.target.value })}
                              className="bg-white/10 border-gray-600 text-white"
                              placeholder="Publication title"
                            />
                          </div>
                          
                          <div className="mt-4">
                            <label className="block text-sm font-medium mb-2">Journal</label>
                            <Input 
                              value={publication.journal}
                              onChange={(e) => updatePublication(publication.id, { journal: e.target.value })}
                              className="bg-white/10 border-gray-600 text-white"
                              placeholder="Journal name"
                            />
                          </div>
                          
                          <div className="mt-4">
                            <DateSelector 
                              label="Publication Date"
                              value={publication.date}
                              onChange={(date) => updatePublication(publication.id, { date })}
                            />
                          </div>
                          
                          <div className="mt-4">
                            <label className="block text-sm font-medium mb-2">DOI</label>
                            <Input 
                              value={publication.doi}
                              onChange={(e) => updatePublication(publication.id, { doi: e.target.value })}
                              className="bg-white/10 border-gray-600 text-white"
                              placeholder="DOI number"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <Button 
                    onClick={addNewPublication}
                    className="mt-4 bg-medsume-teal hover:bg-medsume-tealLight"
                  >
                    <Plus size={16} className="mr-2" />
                    Add Publication
                  </Button>
                </>
              ) : (
                <div>
                  <label className="block text-sm font-medium mb-2">Publications</label>
                  <Textarea 
                    value={resumeData.publicationsText}
                    onChange={(e) => updatePublicationsText(e.target.value)}
                    className="bg-white/10 border-gray-600 text-white"
                    placeholder="List your publications here in your preferred format"
                    rows={10}
                    maxLength={2000}
                  />
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Memberships & Certifications */}
        <AccordionItem value="memberships">
          <AccordionTrigger className="hover:bg-white/5 px-2 rounded-md">
            <div className="flex items-center">
              <FileText size={18} className="mr-2" />
              <span>Professional Memberships</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-2 pb-4">
            {resumeData.memberships.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-gray-400 mb-4">No memberships added yet</p>
              </div>
            ) : (
              <div className="space-y-6">
                {resumeData.memberships.map((membership, index) => (
                  <div key={membership.id} className="border border-gray-700 rounded-md p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-semibold">Membership #{index + 1}</h3>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => {
                          removeMembership(membership.id);
                          toast.info("Membership removed");
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <Input 
                        value={membership.name}
                        onChange={(e) => updateMembership(membership.id, { name: e.target.value })}
                        className="bg-white/10 border-gray-600 text-white"
                        placeholder="Membership or certification name"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <DateSelector 
                        label="Issue Date"
                        value={membership.issueDate}
                        onChange={(date) => updateMembership(membership.id, { issueDate: date })}
                      />
                      <div>
                        <label className="block text-sm font-medium mb-2">Expiry Date (Optional)</label>
                        <DateSelector 
                          value={membership.expiryDate}
                          onChange={(date) => updateMembership(membership.id, { expiryDate: date })}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">Remarks</label>
                      <Textarea 
                        value={membership.remarks}
                        onChange={(e) => updateMembership(membership.id, { remarks: e.target.value })}
                        className="bg-white/10 border-gray-600 text-white"
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
              className="mt-4 bg-medsume-teal hover:bg-medsume-tealLight"
            >
              <Plus size={16} className="mr-2" />
              Add Membership
            </Button>
          </AccordionContent>
        </AccordionItem>
        
        {/* Languages */}
        <AccordionItem value="languages">
          <AccordionTrigger className="hover:bg-white/5 px-2 rounded-md">
            <div className="flex items-center">
              <Languages size={18} className="mr-2" />
              <span>Languages</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-2 pb-4">
            {resumeData.languages.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-gray-400 mb-4">No languages added yet</p>
              </div>
            ) : (
              <div className="space-y-6">
                {resumeData.languages.map((language, index) => (
                  <div key={language.id} className="border border-gray-700 rounded-md p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-semibold">Language #{index + 1}</h3>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => {
                          removeLanguage(language.id);
                          toast.info("Language removed");
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Language</label>
                        <Select 
                          value={language.name} 
                          onValueChange={(value) => updateLanguage(language.id, { name: value })}
                        >
                          <SelectTrigger className="bg-white/10 border-gray-600 text-white">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            {languageOptions.map(lang => (
                              <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Proficiency</label>
                        <Select 
                          value={language.proficiency} 
                          onValueChange={(value: 'Native' | 'Fluent' | 'Intermediate' | 'Basic') => 
                            updateLanguage(language.id, { proficiency: value })
                          }
                        >
                          <SelectTrigger className="bg-white/10 border-gray-600 text-white">
                            <SelectValue placeholder="Select proficiency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Native">Native</SelectItem>
                            <SelectItem value="Fluent">Fluent</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Basic">Basic</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <Button 
              onClick={addNewLanguage}
              className="mt-4 bg-medsume-teal hover:bg-medsume-tealLight"
            >
              <Plus size={16} className="mr-2" />
              Add Language
            </Button>
          </AccordionContent>
        </AccordionItem>
        
        {/* Hobbies & Interests */}
        <AccordionItem value="hobbies">
          <AccordionTrigger className="hover:bg-white/5 px-2 rounded-md">
            <div className="flex items-center">
              <Heart size={18} className="mr-2" />
              <span>Hobbies & Interests</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-2 pb-4">
            <div>
              <label className="block text-sm font-medium mb-4">Select your hobbies and interests</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {hobbiesOptions.map((hobby) => (
                  <div key={hobby} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`hobby-${hobby}`} 
                      checked={resumeData.hobbies.includes(hobby)}
                      onCheckedChange={() => handleHobbyToggle(hobby)}
                    />
                    <label 
                      htmlFor={`hobby-${hobby}`}
                      className="text-sm cursor-pointer"
                    >
                      {hobby}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ResumeForm;
