import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useResume } from './ResumeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { DateSelector } from './DateSelector';
import { Education, Experience } from './ResumeContext';
import { X, Plus, ArrowDown, ArrowUp } from 'lucide-react';
import { generateId } from './utils';

const formSchema = z.object({
  // Form schema remains the same
});

export const ResumeForm: React.FC = () => {
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
    updateHobbies,
  } = useResume();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // Default values remain the same
    },
  });

  const [newHobby, setNewHobby] = useState<string>('');
  const [hobbies, setHobbies] = useState<string[]>(resumeData.hobbies || []);
  const [showOtherIdType, setShowOtherIdType] = useState<boolean>(
    resumeData.personalDetails.idType === 'Other'
  );
  
  const handlePersonalDetailsChange = (field: string, value: any) => {
    if (field === 'idType') {
      setShowOtherIdType(value === 'Other');
      updatePersonalDetails({ [field]: value });
    } else {
      updatePersonalDetails({ [field]: value });
    }
  };

  const handleAddHobby = () => {
    if (newHobby.trim()) {
      const updatedHobbies = [...hobbies, newHobby.trim()];
      setHobbies(updatedHobbies);
      updateHobbies(updatedHobbies);
      setNewHobby('');
    }
  };

  const handleRemoveHobby = (hobbyToRemove: string) => {
    const updatedHobbies = hobbies.filter(hobby => hobby !== hobbyToRemove);
    setHobbies(updatedHobbies);
    updateHobbies(updatedHobbies);
  };

  // Other state hooks for medical education, other education, experiences, etc.
  const [newMedicalEducation, setNewMedicalEducation] = useState<Education>({
    id: generateId(),
    institution: '',
    location: '',
    degree: '',
    degreeOther: '',
    startDate: '',
    endDate: '',
    graduationYear: '',
    score: '',
    remarks: '',
  });

  const [newOtherEducation, setNewOtherEducation] = useState<Education>({
    id: generateId(),
    institution: '',
    location: '',
    degree: '',
    degreeOther: '',
    startDate: '',
    endDate: '',
    graduationYear: '',
    score: '',
    remarks: '',
  });

  const [newExperience, setNewExperience] = useState<Experience>({
    id: generateId(),
    role: '',
    department: '',
    institution: '',
    startDate: '',
    endDate: '',
    type: '',
    typeOther: '',
    description: '',
  });

  // Personal Details section
  const renderPersonalDetailsSection = () => (
    <AccordionItem value="personal-details" className="border p-4 rounded-md mb-4">
      <AccordionTrigger className="text-lg font-medium">
        Personal Details
      </AccordionTrigger>
      <AccordionContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              value={resumeData.personalDetails.firstName || ''}
              onChange={(e) => handlePersonalDetailsChange('firstName', e.target.value)}
              className="w-full"
              required
            />
          </div>
          <div>
            <Label htmlFor="middleName">Middle Name</Label>
            <Input
              id="middleName"
              value={resumeData.personalDetails.middleName || ''}
              onChange={(e) => handlePersonalDetailsChange('middleName', e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              value={resumeData.personalDetails.lastName || ''}
              onChange={(e) => handlePersonalDetailsChange('lastName', e.target.value)}
              className="w-full"
              required
            />
          </div>
          <div>
            <Label htmlFor="organization">Organization</Label>
            <Input
              id="organization"
              value={resumeData.personalDetails.organization || ''}
              onChange={(e) => handlePersonalDetailsChange('organization', e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="idType">ID Type</Label>
            <Select
              value={resumeData.personalDetails.idType || ''}
              onValueChange={(value) => handlePersonalDetailsChange('idType', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select ID Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NMC">NMC</SelectItem>
                <SelectItem value="GMC">GMC</SelectItem>
                <SelectItem value="USMLE">USMLE</SelectItem>
                <SelectItem value="PLAB">PLAB</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {showOtherIdType && (
            <div>
              <Label htmlFor="idTypeOther">Specify ID Type</Label>
              <Input
                id="idTypeOther"
                value={resumeData.personalDetails.idTypeOther || ''}
                onChange={(e) => handlePersonalDetailsChange('idTypeOther', e.target.value)}
                className="w-full"
                placeholder="Enter your ID type"
              />
            </div>
          )}
          
          <div>
            <Label htmlFor="idNumber">ID Number</Label>
            <Input
              id="idNumber"
              value={resumeData.personalDetails.idNumber || ''}
              onChange={(e) => handlePersonalDetailsChange('idNumber', e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Checkbox
              id="hasAccreditedId"
              checked={resumeData.personalDetails.hasAccreditedId}
              onCheckedChange={(checked) => 
                handlePersonalDetailsChange('hasAccreditedId', Boolean(checked))
              }
            />
            <Label htmlFor="hasAccreditedId">I have an accredited ID</Label>
          </div>

          {resumeData.personalDetails.hasAccreditedId && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <Label htmlFor="accreditedOrg">Accredited Organization</Label>
                <Input
                  id="accreditedOrg"
                  value={resumeData.personalDetails.accreditedOrg || ''}
                  onChange={(e) => 
                    handlePersonalDetailsChange('accreditedOrg', e.target.value)
                  }
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="accreditedIdNumber">Accredited ID Number</Label>
                <Input
                  id="accreditedIdNumber"
                  value={resumeData.personalDetails.accreditedIdNumber || ''}
                  onChange={(e) => 
                    handlePersonalDetailsChange('accreditedIdNumber', e.target.value)
                  }
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>

        <div className="mb-4">
          <Label htmlFor="mailingAddress">Mailing Address</Label>
          <Textarea
            id="mailingAddress"
            value={resumeData.personalDetails.mailingAddress || ''}
            onChange={(e) => handlePersonalDetailsChange('mailingAddress', e.target.value)}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="countryCode">Country Code</Label>
            <Input
              id="countryCode"
              value={resumeData.personalDetails.countryCode || ''}
              onChange={(e) => handlePersonalDetailsChange('countryCode', e.target.value)}
              className="w-full"
              placeholder="+1, +44, +91, etc."
            />
          </div>
          <div>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              value={resumeData.personalDetails.phoneNumber || ''}
              onChange={(e) => handlePersonalDetailsChange('phoneNumber', e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={resumeData.personalDetails.email || ''}
              onChange={(e) => handlePersonalDetailsChange('email', e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
            <Input
              id="linkedinUrl"
              value={resumeData.personalDetails.linkedinUrl || ''}
              onChange={(e) => handlePersonalDetailsChange('linkedinUrl', e.target.value)}
              className="w-full"
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );

  // Medical Education section with "Other" option
  const renderMedicalEducationSection = () => {
    const [showOtherDegree, setShowOtherDegree] = useState<{[key: string]: boolean}>({});
    
    const handleMedicalEducationChange = (id: string, field: string, value: any) => {
      if (field === 'degree') {
        setShowOtherDegree({
          ...showOtherDegree,
          [id]: value === 'Other'
        });
      }
      updateMedicalEducation(id, { [field]: value });
    };
    
    const handleNewMedicalEducationChange = (field: string, value: any) => {
      if (field === 'degree') {
        setShowOtherDegree({
          ...showOtherDegree,
          'new': value === 'Other'
        });
      }
      setNewMedicalEducation({ ...newMedicalEducation, [field]: value });
    };

    return (
      <AccordionItem value="medical-education" className="border p-4 rounded-md mb-4">
        <AccordionTrigger className="text-lg font-medium">
          Medical Education
        </AccordionTrigger>
        <AccordionContent>
          {resumeData.medicalEducation.map((education, index) => {
            // Initialize showOtherDegree for existing items
            if (education.degree === 'Other' && !showOtherDegree[education.id]) {
              setShowOtherDegree({
                ...showOtherDegree,
                [education.id]: true
              });
            }
            
            return (
              <div key={education.id} className="border p-4 rounded-md mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-md font-medium">
                    Medical Education {index + 1}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeMedicalEducation(education.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor={`med-institution-${education.id}`}>Institution</Label>
                    <Input
                      id={`med-institution-${education.id}`}
                      value={education.institution}
                      onChange={(e) => 
                        handleMedicalEducationChange(education.id, 'institution', e.target.value)
                      }
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`med-location-${education.id}`}>Location</Label>
                    <Input
                      id={`med-location-${education.id}`}
                      value={education.location}
                      onChange={(e) => 
                        handleMedicalEducationChange(education.id, 'location', e.target.value)
                      }
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`med-degree-${education.id}`}>Degree</Label>
                    <Select
                      value={education.degree}
                      onValueChange={(value) => 
                        handleMedicalEducationChange(education.id, 'degree', value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Degree" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MBBS">MBBS</SelectItem>
                        <SelectItem value="MD">MD</SelectItem>
                        <SelectItem value="MS">MS</SelectItem>
                        <SelectItem value="DM">DM</SelectItem>
                        <SelectItem value="MCh">MCh</SelectItem>
                        <SelectItem value="DNB">DNB</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {showOtherDegree[education.id] && (
                    <div>
                      <Label htmlFor={`med-degree-other-${education.id}`}>Specify Degree</Label>
                      <Input
                        id={`med-degree-other-${education.id}`}
                        value={education.degreeOther || ''}
                        onChange={(e) => 
                          handleMedicalEducationChange(education.id, 'degreeOther', e.target.value)
                        }
                        className="w-full"
                        placeholder="Enter your degree"
                      />
                    </div>
                  )}
                  
                  <div>
                    <Label htmlFor={`med-start-date-${education.id}`}>Start Date</Label>
                    <DateSelector
                      id={`med-start-date-${education.id}`}
                      value={education.startDate}
                      onChange={(value) => 
                        handleMedicalEducationChange(education.id, 'startDate', value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor={`med-end-date-${education.id}`}>End Date</Label>
                    <DateSelector
                      id={`med-end-date-${education.id}`}
                      value={education.endDate}
                      onChange={(value) => 
                        handleMedicalEducationChange(education.id, 'endDate', value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor={`med-graduation-year-${education.id}`}>Graduation Year</Label>
                    <Input
                      id={`med-graduation-year-${education.id}`}
                      value={education.graduationYear}
                      onChange={(e) => 
                        handleMedicalEducationChange(education.id, 'graduationYear', e.target.value)
                      }
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`med-score-${education.id}`}>Score/Grade</Label>
                    <Input
                      id={`med-score-${education.id}`}
                      value={education.score || ''}
                      onChange={(e) => 
                        handleMedicalEducationChange(education.id, 'score', e.target.value)
                      }
                      className="w-full"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor={`med-remarks-${education.id}`}>Remarks</Label>
                  <Textarea
                    id={`med-remarks-${education.id}`}
                    value={education.remarks || ''}
                    onChange={(e) => 
                      handleMedicalEducationChange(education.id, 'remarks', e.target.value)
                    }
                    className="w-full"
                  />
                </div>
              </div>
            );
          })}
  
          <div className="border p-4 rounded-md mb-4">
            <h3 className="text-md font-medium mb-4">Add New Medical Education</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="new-med-institution">Institution</Label>
                <Input
                  id="new-med-institution"
                  value={newMedicalEducation.institution}
                  onChange={(e) => 
                    handleNewMedicalEducationChange('institution', e.target.value)
                  }
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="new-med-location">Location</Label>
                <Input
                  id="new-med-location"
                  value={newMedicalEducation.location}
                  onChange={(e) => 
                    handleNewMedicalEducationChange('location', e.target.value)
                  }
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="new-med-degree">Degree</Label>
                <Select
                  value={newMedicalEducation.degree}
                  onValueChange={(value) => 
                    handleNewMedicalEducationChange('degree', value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Degree" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MBBS">MBBS</SelectItem>
                    <SelectItem value="MD">MD</SelectItem>
                    <SelectItem value="MS">MS</SelectItem>
                    <SelectItem value="DM">DM</SelectItem>
                    <SelectItem value="MCh">MCh</SelectItem>
                    <SelectItem value="DNB">DNB</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {showOtherDegree['new'] && (
                <div>
                  <Label htmlFor="new-med-degree-other">Specify Degree</Label>
                  <Input
                    id="new-med-degree-other"
                    value={newMedicalEducation.degreeOther || ''}
                    onChange={(e) => 
                      handleNewMedicalEducationChange('degreeOther', e.target.value)
                    }
                    className="w-full"
                    placeholder="Enter your degree"
                  />
                </div>
              )}
              
              <div>
                <Label htmlFor="new-med-start-date">Start Date</Label>
                <DateSelector
                  id="new-med-start-date"
                  value={newMedicalEducation.startDate}
                  onChange={(value) => 
                    handleNewMedicalEducationChange('startDate', value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="new-med-end-date">End Date</Label>
                <DateSelector
                  id="new-med-end-date"
                  value={newMedicalEducation.endDate}
                  onChange={(value) => 
                    handleNewMedicalEducationChange('endDate', value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="new-med-graduation-year">Graduation Year</Label>
                <Input
                  id="new-med-graduation-year"
                  value={newMedicalEducation.graduationYear}
                  onChange={(e) => 
                    handleNewMedicalEducationChange('graduationYear', e.target.value)
                  }
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="new-med-score">Score/Grade</Label>
                <Input
                  id="new-med-score"
                  value={newMedicalEducation.score || ''}
                  onChange={(e) => 
                    handleNewMedicalEducationChange('score', e.target.value)
                  }
                  className="w-full"
                />
              </div>
            </div>
            <div className="mb-4">
              <Label htmlFor="new-med-remarks">Remarks</Label>
              <Textarea
                id="new-med-remarks"
                value={newMedicalEducation.remarks || ''}
                onChange={(e) => 
                  handleNewMedicalEducationChange('remarks', e.target.value)
                }
                className="w-full"
              />
            </div>
            <Button 
              onClick={() => {
                addMedicalEducation(newMedicalEducation);
                setNewMedicalEducation({
                  id: generateId(),
                  institution: '',
                  location: '',
                  degree: '',
                  degreeOther: '',
                  startDate: '',
                  endDate: '',
                  graduationYear: '',
                  score: '',
                  remarks: '',
                });
                setShowOtherDegree({
                  ...showOtherDegree,
                  'new': false
                });
              }}
              disabled={!newMedicalEducation.institution || 
                !newMedicalEducation.degree || 
                !newMedicalEducation.startDate
              }
            >
              Add Medical Education
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  };

  // Other Education section
  const renderOtherEducationSection = () => {
    const [showOtherDegree, setShowOtherDegree] = useState<{[key: string]: boolean}>({});
    
    const handleOtherEducationChange = (id: string, field: string, value: any) => {
      if (field === 'degree') {
        setShowOtherDegree({
          ...showOtherDegree,
          [id]: value === 'Other'
        });
      }
      updateOtherEducation(id, { [field]: value });
    };
    
    const handleNewOtherEducationChange = (field: string, value: any) => {
      if (field === 'degree') {
        setShowOtherDegree({
          ...showOtherDegree,
          'new': value === 'Other'
        });
      }
      setNewOtherEducation({ ...newOtherEducation, [field]: value });
    };

    return (
      <AccordionItem value="other-education" className="border p-4 rounded-md mb-4">
        <AccordionTrigger className="text-lg font-medium">
          Other Education
        </AccordionTrigger>
        <AccordionContent>
          {resumeData.otherEducation.map((education, index) => {
            // Initialize showOtherDegree for existing items
            if (education.degree === 'Other' && !showOtherDegree[education.id]) {
              setShowOtherDegree({
                ...showOtherDegree,
                [education.id]: true
              });
            }
            
            return (
              <div key={education.id} className="border p-4 rounded-md mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-md font-medium">
                    Other Education {index + 1}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeOtherEducation(education.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor={`other-institution-${education.id}`}>Institution</Label>
                    <Input
                      id={`other-institution-${education.id}`}
                      value={education.institution}
                      onChange={(e) => 
                        handleOtherEducationChange(education.id, 'institution', e.target.value)
                      }
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`other-location-${education.id}`}>Location</Label>
                    <Input
                      id={`other-location-${education.id}`}
                      value={education.location}
                      onChange={(e) => 
                        handleOtherEducationChange(education.id, 'location', e.target.value)
                      }
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`other-degree-${education.id}`}>Degree</Label>
                    <Select
                      value={education.degree}
                      onValueChange={(value) => 
                        handleOtherEducationChange(education.id, 'degree', value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Degree" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bachelor's">Bachelor's</SelectItem>
                        <SelectItem value="Master's">Master's</SelectItem>
                        <SelectItem value="PhD">PhD</SelectItem>
                        <SelectItem value="Diploma">Diploma</SelectItem>
                        <SelectItem value="Certificate">Certificate</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {showOtherDegree[education.id] && (
                    <div>
                      <Label htmlFor={`other-degree-other-${education.id}`}>Specify Degree</Label>
                      <Input
                        id={`other-degree-other-${education.id}`}
                        value={education.degreeOther || ''}
                        onChange={(e) => 
                          handleOtherEducationChange(education.id, 'degreeOther', e.target.value)
                        }
                        className="w-full"
                        placeholder="Enter your degree"
                      />
                    </div>
                  )}
                  
                  <div>
                    <Label htmlFor={`other-start-date-${education.id}`}>Start Date</Label>
                    <DateSelector
                      id={`other-start-date-${education.id}`}
                      value={education.startDate}
                      onChange={(value) => 
                        handleOtherEducationChange(education.id, 'startDate', value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor={`other-end-date-${education.id}`}>End Date</Label>
                    <DateSelector
                      id={`other-end-date-${education.id}`}
                      value={education.endDate}
                      onChange={(value) => 
                        handleOtherEducationChange(education.id, 'endDate', value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor={`other-graduation-year-${education.id}`}>Graduation Year</Label>
                    <Input
                      id={`other-graduation-year-${education.id}`}
                      value={education.graduationYear}
                      onChange={(e) => 
                        handleOtherEducationChange(education.id, 'graduationYear', e.target.value)
                      }
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`other-score-${education.id}`}>Score/Grade</Label>
                    <Input
                      id={`other-score-${education.id}`}
                      value={education.score || ''}
                      onChange={(e) => 
                        handleOtherEducationChange(education.id, 'score', e.target.value)
                      }
                      className="w-full"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor={`other-remarks-${education.id}`}>Remarks</Label>
                  <Textarea
                    id={`other-remarks-${education.id}`}
                    value={education.remarks || ''}
                    onChange={(e) => 
                      handleOtherEducationChange(education.id, 'remarks', e.target.value)
                    }
                    className="w-full"
                  />
                </div>
              </div>
            );
          })}
  
          <div className="border p-4 rounded-md mb-4">
            <h3 className="text-md font-medium mb-4">Add New Other Education</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="new-other-institution">Institution</Label>
                <Input
                  id="new-other-institution"
                  value={newOtherEducation.institution}
                  onChange={(e) => 
                    handleNewOtherEducationChange('institution', e.target.value)
                  }
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="new-other-location">Location</Label>
                <Input
                  id="new-other-location"
                  value={newOtherEducation.location}
                  onChange={(e) => 
                    handleNewOtherEducationChange('location', e.target.value)
                  }
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="new-other-degree">Degree</Label>
                <Select
                  value={newOtherEducation.degree}
                  onValueChange={(value) => 
                    handleNewOtherEducationChange('degree', value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Degree" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bachelor's">Bachelor's</SelectItem>
                    <SelectItem value="Master's">Master's</SelectItem>
                    <SelectItem value="PhD">PhD</SelectItem>
                    <SelectItem value="Diploma">Diploma</SelectItem>
                    <SelectItem value="Certificate">Certificate</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {showOtherDegree['new'] && (
                <div>
                  <Label htmlFor="new-other-degree-other">Specify Degree</Label>
                  <Input
                    id="new-other-degree-other"
                    value={newOtherEducation.degreeOther || ''}
                    onChange={(e) => 
                      handleNewOtherEducationChange('degreeOther', e.target.value)
                    }
                    className="w-full"
                    placeholder="Enter your degree"
                  />
                </div>
              )}
              
              <div>
                <Label htmlFor="new-other-start-date">Start Date</Label>
                <DateSelector
                  id="new-other-start-date"
                  value={newOtherEducation.startDate}
                  onChange={(value) => 
                    handleNewOtherEducationChange('startDate', value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="new-other-end-date">End Date</Label>
                <DateSelector
                  id="new-other-end-date"
                  value={newOtherEducation.endDate}
                  onChange={(value) => 
                    handleNewOtherEducationChange('endDate', value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="new-other-graduation-year">Graduation Year</Label>
                <Input
                  id="new-other-graduation-year"
                  value={newOtherEducation.graduationYear}
                  onChange={(e) => 
                    handleNewOtherEducationChange('graduationYear', e.target.value)
                  }
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="new-other-score">Score/Grade</Label>
                <Input
                  id="new-other-score"
                  value={newOtherEducation.score || ''}
                  onChange={(e) => 
                    handleNewOtherEducationChange('score', e.target.value)
                  }
                  className="w-full"
                />
              </div>
            </div>
            <div className="mb-4">
              <Label htmlFor="new-other-remarks">Remarks</Label>
              <Textarea
                id="new-other-remarks"
                value={newOtherEducation.remarks || ''}
                onChange={(e) => 
                  handleNewOtherEducationChange('remarks', e.target.value)
                }
                className="w-full"
              />
            </div>
            <Button 
              onClick={() => {
                addOtherEducation(newOtherEducation);
                setNewOtherEducation({
                  id: generateId(),
                  institution: '',
                  location: '',
                  degree: '',
                  degreeOther: '',
                  startDate: '',
                  endDate: '',
                  graduationYear: '',
                  score: '',
                  remarks: '',
                });
                setShowOtherDegree({
                  ...showOtherDegree,
                  'new': false
                });
              }}
              disabled={!newOtherEducation.institution || 
                !newOtherEducation.degree || 
                !newOtherEducation.startDate
              }
            >
              Add Other Education
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  };

  // Experience section with "Other" option for type
  const renderExperienceSection = () => {
    const [showOtherType, setShowOtherType] = useState<{[key: string]: boolean}>({});
    
    const handleExperienceChange = (id: string, field: string, value: any) => {
      if (field === 'type') {
        setShowOtherType({
          ...showOtherType,
          [id]: value === 'Other'
        });
      }
      updateExperience(id, { [field]: value });
    };
    
    const handleNewExperienceChange = (field: string, value: any) => {
      if (field === 'type') {
        setShowOtherType({
          ...showOtherType,
          'new': value === 'Other'
        });
      }
      setNewExperience({ ...newExperience, [field]: value });
    };

    return (
      <AccordionItem value="experience" className="border p-4 rounded-md mb-4">
        <AccordionTrigger className="text-lg font-medium">
          Experience
        </AccordionTrigger>
        <AccordionContent>
          {resumeData.experiences.map((experience, index) => {
            // Initialize showOtherType for existing items
            if (experience.type === 'Other' && !showOtherType[experience.id]) {
              setShowOtherType({
                ...showOtherType,
                [experience.id]: true
              });
            }
            
            return (
              <div key={experience.id} className="border p-4 rounded-md mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-md font-medium">
                    Experience {index + 1}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeExperience(experience.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor={`exp-role-${experience.id}`}>Role/Position</Label>
                    <Input
                      id={`exp-role-${experience.id}`}
                      value={experience.role}
                      onChange={(e) => 
                        handleExperienceChange(experience.id, 'role', e.target.value)
                      }
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`exp-department-${experience.id}`}>Department</Label>
                    <Input
                      id={`exp-department-${experience.id}`}
                      value={experience.department}
                      onChange={(e) => 
                        handleExperienceChange(experience.id, 'department', e.target.value)
                      }
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`exp-institution-${experience.id}`}>Institution</Label>
                    <Input
                      id={`exp-institution-${experience.id}`}
                      value={experience.institution}
                      onChange={(e) => 
                        handleExperienceChange(experience.id, 'institution', e.target.value)
                      }
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`exp-type-${experience.id}`}>Type</Label>
                    <Select
                      value={experience.type}
                      onValueChange={(value) => 
                        handleExperienceChange(experience.id, 'type', value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                        <SelectItem value="Residency">Residency</SelectItem>
                        <SelectItem value="Fellowship">Fellowship</SelectItem>
                        <SelectItem value="Volunteer">Volunteer</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {showOtherType[experience.id] && (
                    <div>
                      <Label htmlFor={`exp-type-other-${experience.id}`}>Specify Type</Label>
                      <Input
                        id={`exp-type-other-${experience.id}`}
                        value={experience.typeOther || ''}
                        onChange={(e) => 
                          handleExperienceChange(experience.id, 'typeOther', e.target.value)
                        }
                        className="w-full"
                        placeholder="Enter employment type"
                      />
                    </div>
                  )}
                  
                  <div>
                    <Label htmlFor={`exp-start-date-${experience.id}`}>Start Date</Label>
                    <DateSelector
                      id={`exp-start-date-${experience.id}`}
                      value={experience.startDate}
                      onChange={(value) => 
                        handleExperienceChange(experience.id, 'startDate', value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor={`exp-end-date-${experience.id}`}>End Date</Label>
                    <DateSelector
                      id={`exp-end-date-${experience.id}`}
                      value={experience.endDate}
                      onChange={(value) => 
                        handleExperienceChange(experience.id, 'endDate', value)
                      }
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <Label htmlFor={`exp-description-${experience.id}`}>Description</Label>
                  <Textarea
                    id={`exp-description-${experience.id}`}
                    value={experience.description}
                    onChange={(e) => 
                      handleExperienceChange(experience.id, 'description', e.target.value)
                    }
                    className="w-full"
                  />
                </div>
              </div>
            );
          })}
  
          <div className="border p-4 rounded-md mb-4">
            <h3 className="text-md font-medium mb-4">Add New Experience</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="new-exp-role">Role/Position</Label>
                <Input
                  id="new-exp-role"
                  value={newExperience.role}
                  onChange={(e) => 
                    handleNewExperienceChange('role', e.target.value)
                  }
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="new-exp-department">Department</Label>
                <Input
                  id="new-exp-department"
                  value={newExperience.department}
                  onChange={(e) => 
                    handleNewExperienceChange('department', e.target.value)
                  }
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="new-exp-institution">Institution</Label>
                <Input
                  id="new-exp-institution"
                  value={newExperience.institution}
                  onChange={(e) => 
                    handleNewExperienceChange('institution', e.target.value)
                  }
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="new-exp-type">Type</Label>
                <Select
                  value={newExperience.type}
                  onValueChange={(value) => 
                    handleNewExperienceChange('type', value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="Residency">Residency</SelectItem>
                    <SelectItem value="Fellowship">Fellowship</SelectItem>
                    <SelectItem value="Volunteer">Volunteer</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {showOtherType['new'] && (
                <div>
                  <Label htmlFor="new-exp-type-other">Specify Type</Label>
                  <Input
                    id="new-exp-type-other"
                    value={newExperience.typeOther || ''}
                    onChange={(e) => 
                      handleNewExperienceChange('typeOther', e.target.value)
                    }
                    className="w-full"
                    placeholder="Enter employment type"
                  />
                </div>
              )}
              
              <div>
                <Label htmlFor="new-exp-start-date">Start Date</Label>
                <DateSelector
                  id="new-exp-start-date"
                  value={newExperience.startDate}
                  onChange={(value) => 
                    handleNewExperienceChange('startDate', value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="new-exp-end-date">End Date</Label>
                <DateSelector
                  id="new-exp-end-date"
                  value={newExperience.endDate}
                  onChange={(value) => 
                    handleNewExperienceChange('endDate', value)
                  }
                />
              </div>
            </div>
            <div className="mb-4">
              <Label htmlFor="new-exp-description">Description</Label>
              <Textarea
                id="new-exp-description"
                value={newExperience.description}
                onChange={(e) => 
                  handleNewExperienceChange('description', e.target.value)
                }
                className="w-full"
              />
            </div>
            <Button 
              onClick={() => {
                addExperience(newExperience);
                setNewExperience({
                  id: generateId(),
                  role: '',
                  department: '',
                  institution: '',
                  startDate: '',
                  endDate: '',
                  type: '',
                  typeOther: '',
                  description: '',
                });
                setShowOtherType({
                  ...showOtherType,
                  'new': false
                });
              }}
              disabled={!newExperience.role || 
                !newExperience.institution || 
                !newExperience.startDate
              }
            >
              Add Experience
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  };

  // Awards section
  const renderAwardsSection = () => {
    const [newAward, setNewAward] = useState({
      id: generateId(),
      title: '',
      organization: '',
      date: '',
      description: '',
    });

    const handleAwardChange = (id: string, field: string, value: any) => {
      updateAward(id, { [field]: value });
    };

    const handleNewAwardChange = (field: string, value: any) => {
      setNewAward({ ...newAward, [field]: value });
    };

    return (
      <AccordionItem value="awards" className="border p-4 rounded-md mb-4">
        <AccordionTrigger className="text-lg font-medium">
          Awards & Honors
        </AccordionTrigger>
        <AccordionContent>
          {resumeData.awards.map((award, index) => (
            <div key={award.id} className="border p-4 rounded-md mb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-medium">
                  Award {index + 1}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeAward(award.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor={`award-title-${award.id}`}>Title</Label>
                  <Input
                    id={`award-title-${award.id}`}
                    value={award.title}
                    onChange={(e) => 
                      handleAwardChange(award.id, 'title', e.target.value)
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor={`award-organization-${award.id}`}>Organization</Label>
                  <Input
                    id={`award-organization-${award.id}`}
                    value={award.organization}
                    onChange={(e) => 
                      handleAwardChange(award.id, 'organization', e.target.value)
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor={`award-date-${award.id}`}>Date</Label>
                  <DateSelector
                    id={`award-date-${award.id}`}
                    value={award.date}
                    onChange={(value) => 
                      handleAwardChange(award.id, 'date', value)
                    }
                  />
                </div>
              </div>
              <div className="mb-4">
                <Label htmlFor={`award-description-${award.id}`}>Description</Label>
                <Textarea
                  id={`award-description-${award.id}`}
                  value={award.description}
                  onChange={(e) => 
                    handleAwardChange(award.id, 'description', e.target.value)
                  }
                  className="w-full"
                />
              </div>
            </div>
          ))}

          <div className="border p-4 rounded-md mb-4">
            <h3 className="text-md font-medium mb-4">Add New Award</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="new-award-title">Title</Label>
                <Input
                  id="new-award-title"
                  value={newAward.title}
                  onChange={(e) => 
                    handleNewAwardChange('title', e.target.value)
                  }
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="new-award-organization">Organization</Label>
                <Input
                  id="new-award-organization"
                  value={newAward.organization}
                  onChange={(e) => 
                    handleNewAwardChange('organization', e.target.value)
                  }
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="new-award-date">Date</Label>
                <DateSelector
                  id="new-award-date"
                  value={newAward.date}
                  onChange={(value) => 
                    handleNewAwardChange('date', value)
                  }
                />
              </div>
            </div>
            <div className="mb-4">
              <Label htmlFor="new-award-description">Description</Label>
              <Textarea
                id="new-award-description"
                value={newAward.description}
                onChange={(e) => 
                  handleNewAwardChange('description', e.target.value)
                }
                className="w-full"
              />
            </div>
            <Button 
              onClick={() => {
                addAward(newAward);
                setNewAward({
                  id: generateId(),
                  title: '',
                  organization: '',
                  date: '',
                  description: '',
                });
              }}
              disabled={!newAward.title}
            >
              Add Award
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  };

  // Publications section with improved text input format
  const renderPublicationsSection = () => {
    const [newPublication, setNewPublication] = useState({
      id: generateId(),
      authors: '',
      title: '',
      journal: '',
      date: '',
      doi: '',
    });

    const handlePublicationChange = (id: string, field: string, value: any) => {
      updatePublication(id, { [field]: value });
    };

    const handleNewPublicationChange = (field: string, value: any) => {
      setNewPublication({ ...newPublication, [field]: value });
    };

    return (
      <AccordionItem value="publications" className="border p-4 rounded-md mb-4">
        <AccordionTrigger className="text-lg font-medium">
          Publications
        </AccordionTrigger>
        <AccordionContent>
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Label className="text-md font-medium">Manual Entry Format</Label>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Enter your publications in the text area below. Please enter one publication per line for better formatting.
            </p>
            <Textarea
              value={resumeData.publicationsText || ''}
              onChange={(e) => updatePublicationsText(e.target.value)}
              className="w-full min-h-[200px]"
              placeholder="Enter each publication on a new line. For example:&#10;Smith J, Jones A, et al. Title of Paper 1. Journal of Medicine. 2020;10(2):123-135.&#10;Jones A, Smith J, et al. Title of Paper 2. Journal of Surgery. 2021;15(4):243-250."
            />
          </div>

          <Separator className="my-6" />

          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Label className="text-md font-medium">Structured Entry Format</Label>
            </div>
            
            {resumeData.publications.map((publication, index) => (
              <div key={publication.id} className="border p-4 rounded-md mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-md font-medium">
                    Publication {index + 1}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removePublication(publication.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor={`pub-authors-${publication.id}`}>Authors</Label>
                    <Input
                      id={`pub-authors-${publication.id}`}
                      value={publication.authors}
                      onChange={(e) => 
                        handlePublicationChange(publication.id, 'authors', e.target.value)
                      }
                      className="w-full"
                      placeholder="e.g., Smith J, Jones A, et al."
                    />
                  </div>
                  <div>
                    <Label htmlFor={`pub-title-${publication.id}`}>Title</Label>
                    <Input
                      id={`pub-title-${publication.id}`}
                      value={publication.title}
                      onChange={(e) => 
                        handlePublicationChange(publication.id, 'title', e.target.value)
                      }
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`pub-journal-${publication.id}`}>Journal</Label>
                    <Input
                      id={`pub-journal-${publication.id}`}
                      value={publication.journal}
                      onChange={(e) => 
                        handlePublicationChange(publication.id, 'journal', e.target.value)
                      }
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`pub-date-${publication.id}`}>Date</Label>
                    <DateSelector
                      id={`pub-date-${publication.id}`}
                      value={publication.date}
                      onChange={(value) => 
                        handlePublicationChange(publication.id, 'date', value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor={`pub-doi-${publication.id}`}>DOI</Label>
                    <Input
                      id={`pub-doi-${publication.id}`}
                      value={publication.doi}
                      onChange={(e) => 
                        handlePublicationChange(publication.id, 'doi', e.target.value)
                      }
                      className="w-full"
                      placeholder="e.g., 10.1000/xyz123"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <div className="border p-4 rounded-md mb-4">
              <h3 className="text-md font-medium mb-4">Add New Publication</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="new-pub-authors">Authors</Label>
                  <Input
                    id="new-pub-authors"
                    value={newPublication.authors}
                    onChange={(e) => 
                      handleNewPublicationChange('authors', e.target.value)
                    }
                    className="w-full"
                    placeholder="e.g., Smith J, Jones A, et al."
                  />
                </div>
                <div>
                  <Label htmlFor="new-pub-title">Title</Label>
                  <Input
                    id="new-pub-title"
                    value={newPublication.title}
                    onChange={(e) => 
                      handleNewPublicationChange('title', e.target.value)
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="new-pub-journal">Journal</Label>
                  <Input
                    id="new-pub-journal"
                    value={newPublication.journal}
                    onChange={(e) => 
                      handleNewPublicationChange('journal', e.target.value)
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="new-pub-date">Date</Label>
                  <DateSelector
                    id="new-pub-date"
                    value={newPublication.date}
                    onChange={(value) => 
                      handleNewPublicationChange('date', value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="new-pub-doi">DOI</Label>
                  <Input
                    id="new-pub-doi"
                    value={newPublication.doi}
                    onChange={(e) => 
                      handleNewPublicationChange('doi', e.target.value)
                    }
                    className="w-full"
                    placeholder="e.g., 10.1000/xyz123"
                  />
                </div>
              </div>
              <Button 
                onClick={() => {
                  addPublication(newPublication);
                  setNewPublication({
                    id: generateId(),
                    authors: '',
                    title: '',
                    journal: '',
                    date: '',
                    doi: '',
                  });
                }}
                disabled={!newPublication.title || !newPublication.authors}
              >
                Add Publication
              </Button>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  };

  // Memberships section
  const renderMembershipsSection = () => {
    const [newMembership, setNewMembership] = useState({
      id: generateId(),
      name: '',
      issueDate: '',
      expiryDate: '',
      issuedBy: '',
      remarks: '',
    });

    const handleMembershipChange = (id: string, field: string, value: any) => {
      updateMembership(id, { [field]: value });
    };

    const handleNewMembershipChange = (field: string, value: any) => {
      setNewMembership({ ...newMembership, [field]: value });
    };

    return (
      <AccordionItem value="memberships" className="border p-4 rounded-md mb-4">
        <AccordionTrigger className="text-lg font-medium">
          Memberships
        </AccordionTrigger>
        <AccordionContent>
          {resumeData.memberships.map((membership, index) => (
            <div key={membership.id} className="border p-4 rounded-md mb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-medium">
                  Membership {index + 1}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeMembership(membership.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor={`mem-name-${membership.id}`}>Name</Label>
                  <Input
                    id={`mem-name-${membership.id}`}
                    value={membership.name}
                    onChange={(e) => 
                      handleMembershipChange(membership.id, 'name', e.target.value)
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor={`mem-issued-by-${membership.id}`}>Issued By</Label>
                  <Input
                    id={`mem-issued-by-${membership.id}`}
                    value={membership.issuedBy || ''}
                    onChange={(e) => 
                      handleMembershipChange(membership.id, 'issuedBy', e.target.value)
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor={`mem-issue-date-${membership.id}`}>Issue Date</Label>
                  <DateSelector
                    id={`mem-issue-date-${membership.id}`}
                    value={membership.issueDate}
                    onChange={(value) => 
                      handleMembershipChange(membership.id, 'issueDate', value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor={`mem-expiry-date-${membership.id}`}>Expiry Date (if applicable)</Label>
                  <DateSelector
                    id={`mem-expiry-date-${membership.id}`}
                    value={membership.expiryDate || ''}
                    onChange={(value) => 
                      handleMembershipChange(membership.id, 'expiryDate', value)
                    }
                  />
                </div>
              </div>
              <div className="mb-4">
                <Label htmlFor={`mem-remarks-${membership.id}`}>Remarks</Label>
                <Textarea
                  id={`mem-remarks-${membership.id}`}
                  value={membership.remarks}
                  onChange={(e) => 
                    handleMembershipChange(membership.id, 'remarks', e.target.value)
                  }
                  className="w-full"
                />
              </div>
            </div>
          ))}

          <div className="border p-4 rounded-md mb-4">
            <h3 className="text-md font-medium mb-4">Add New Membership</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="new-mem-name">Name</Label>
                <Input
                  id="new-mem-name"
                  value={newMembership.name}
                  onChange={(e) => 
                    handleNewMembershipChange('name', e.target.value)
                  }
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="new-mem-issued-by">Issued By</Label>
                <Input
                  id="new-mem-issued-by"
                  value={newMembership.issuedBy || ''}
                  onChange={(e) => 
                    handleNewMembershipChange('issuedBy', e.target.value)
                  }
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="new-mem-issue-date">Issue Date</Label>
                <DateSelector
                  id="new-mem-issue-date"
                  value={newMembership.issueDate}
                  onChange={(value) => 
                    handleNewMembershipChange('issueDate', value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="new-mem-expiry-date">Expiry Date (if applicable)</Label>
                <DateSelector
                  id="new-mem-expiry-date"
                  value={newMembership.expiryDate || ''}
                  onChange={(value) => 
                    handleNewMembershipChange('expiryDate', value)
                  }
                />
              </div>
            </div>
            <div className="mb-4">
              <Label htmlFor="new-mem-remarks">Remarks</Label>
              <Textarea
                id="new-mem-remarks"
                value={newMembership.remarks}
                onChange={(e) => 
                  handleNewMembershipChange('remarks', e.target.value)
                }
                className="w-full"
              />
            </div>
            <Button 
              onClick={() => {
                addMembership(newMembership);
                setNewMembership({
                  id: generateId(),
                  name: '',
                  issueDate: '',
                  expiryDate: '',
                  issuedBy: '',
                  remarks: '',
                });
              }}
              disabled={!newMembership.name || !newMembership.issueDate}
            >
              Add Membership
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  };

  // Languages section
  const renderLanguagesSection = () => {
    const [newLanguage, setNewLanguage] = useState({
      id: generateId(),
      name: '',
      proficiency: 'Intermediate' as 'Native' | 'Fluent' | 'Intermediate' | 'Basic',
    });

    const handleLanguageChange = (id: string, field: string, value: any) => {
      updateLanguage(id, { [field]: value });
    };

    const handleNewLanguageChange = (field: string, value: any) => {
      setNewLanguage({ ...newLanguage, [field]: value });
    };

    return (
      <AccordionItem value="languages" className="border p-4 rounded-md mb-4">
        <AccordionTrigger className="text-lg font-medium">
          Languages
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {resumeData.languages.map((language) => (
              <div key={language.id} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                <span>{language.name} - {language.proficiency}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 ml-1"
                  onClick={() => removeLanguage(language.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>

          <div className="border p-4 rounded-md mb-4">
            <h3 className="text-md font-medium mb-4">Add New Language</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="new-lang-name">Language</Label>
                <Input
                  id="new-lang-name"
                  value={newLanguage.name}
                  onChange={(e) => 
                    handleNewLanguageChange('name', e.target.value)
                  }
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="new-lang-proficiency">Proficiency</Label>
                <Select
                  value={newLanguage.proficiency}
                  onValueChange={(value: 'Native' | 'Fluent' | 'Intermediate' | 'Basic') => 
                    handleNewLanguageChange('proficiency', value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Proficiency" />
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
            <Button 
              onClick={() => {
                addLanguage(newLanguage);
                setNewLanguage({
                  id: generateId(),
                  name: '',
                  proficiency: 'Intermediate',
                });
              }}
              disabled={!newLanguage.name}
            >
              Add Language
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  };

  // Hobbies section
  const renderHobbiesSection = () => {
    return (
      <AccordionItem value="hobbies" className="border p-4 rounded-md mb-4">
        <AccordionTrigger className="text-lg font-medium">
          Hobbies & Interests
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {hobbies.map((hobby, index) => (
              <div key={index} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                <span>{hobby}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 ml-1"
                  onClick={() => handleRemoveHobby(hobby)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mb-4">
            <Input
              value={newHobby}
              onChange={(e) => setNewHobby(e.target.value)}
              placeholder="Add a hobby or interest"
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddHobby();
                }
              }}
            />
            <Button onClick={handleAddHobby} disabled={!newHobby.trim()}>
              Add
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Accordion type="multiple" defaultValue={['personal-details']} className="w-full">
        {renderPersonalDetailsSection()}
        {renderMedicalEducationSection()}
        {renderOtherEducationSection()}
        {renderExperienceSection()}
        {renderAwardsSection()}
        {renderPublicationsSection()}
        {renderMembershipsSection()}
        {renderLanguagesSection()}
        {renderHobbiesSection()}
      </Accordion>
    </div>
  );
};
