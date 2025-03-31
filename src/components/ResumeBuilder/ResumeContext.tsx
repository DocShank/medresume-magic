import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Template = 'professional' | 'modern' | 'executive';

export type Education = {
  id: string;
  institution: string;
  location: string;
  degree: string;
  startDate: string;
  endDate: string;
  graduationYear: string;
  score?: string;
  remarks?: string;
};

export type Experience = {
  id: string;
  role: string;
  department: string;
  institution: string;
  startDate: string;
  endDate: string;
  type: string;
  description: string;
};

export type Award = {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
};

export type Publication = {
  id: string;
  authors: string;
  title: string;
  journal: string;
  date: string;
  doi: string;
};

export type Membership = {
  id: string;
  name: string;
  issueDate: string;
  expiryDate?: string;
  remarks: string;
};

export type Language = {
  id: string;
  name: string;
  proficiency: 'Native' | 'Fluent' | 'Intermediate' | 'Basic';
};

export type PersonalDetails = {
  photoUrl?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  organization?: string;
  idType?: string;
  idNumber?: string;
  hasAccreditedId: boolean;
  accreditedOrg?: string;
  accreditedIdNumber?: string;
  mailingAddress?: string;
  countryCode?: string;
  phoneNumber?: string;
  email?: string;
};

export type ResumeData = {
  personalDetails: PersonalDetails;
  medicalEducation: Education[];
  otherEducation: Education[];
  experiences: Experience[];
  awards: Award[];
  publications: Publication[];
  publicationsText?: string;
  memberships: Membership[];
  languages: Language[];
  hobbies: string[];
};

export type ResumeContextType = {
  template: Template;
  setTemplate: (template: Template) => void;
  resumeData: ResumeData;
  updatePersonalDetails: (details: Partial<PersonalDetails>) => void;
  addMedicalEducation: (education: Education) => void;
  updateMedicalEducation: (id: string, education: Partial<Education>) => void;
  removeMedicalEducation: (id: string) => void;
  addOtherEducation: (education: Education) => void;
  updateOtherEducation: (id: string, education: Partial<Education>) => void;
  removeOtherEducation: (id: string) => void;
  addExperience: (experience: Experience) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addAward: (award: Award) => void;
  updateAward: (id: string, award: Partial<Award>) => void;
  removeAward: (id: string) => void;
  addPublication: (publication: Publication) => void;
  updatePublication: (id: string, publication: Partial<Publication>) => void;
  removePublication: (id: string) => void;
  updatePublicationsText: (text: string) => void;
  addMembership: (membership: Membership) => void;
  updateMembership: (id: string, membership: Partial<Membership>) => void;
  removeMembership: (id: string) => void;
  addLanguage: (language: Language) => void;
  updateLanguage: (id: string, language: Partial<Language>) => void;
  removeLanguage: (id: string) => void;
  updateHobbies: (hobbies: string[]) => void;
};

const defaultResumeData: ResumeData = {
  personalDetails: {
    firstName: '',
    lastName: '',
    hasAccreditedId: false,
  },
  medicalEducation: [],
  otherEducation: [],
  experiences: [],
  awards: [],
  publications: [],
  publicationsText: '',
  memberships: [],
  languages: [],
  hobbies: [],
};

export const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [template, setTemplate] = useState<Template>('professional');
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);

  const updatePersonalDetails = (details: Partial<PersonalDetails>) => {
    setResumeData(prev => ({
      ...prev,
      personalDetails: {
        ...prev.personalDetails,
        ...details
      }
    }));
  };

  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Medical Education
  const addMedicalEducation = (education: Education) => {
    const newEducation = { ...education, id: education.id || generateId() };
    setResumeData(prev => ({
      ...prev,
      medicalEducation: [...prev.medicalEducation, newEducation]
    }));
  };

  const updateMedicalEducation = (id: string, education: Partial<Education>) => {
    setResumeData(prev => ({
      ...prev,
      medicalEducation: prev.medicalEducation.map(item => 
        item.id === id ? { ...item, ...education } : item
      )
    }));
  };

  const removeMedicalEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      medicalEducation: prev.medicalEducation.filter(item => item.id !== id)
    }));
  };

  // Other Education
  const addOtherEducation = (education: Education) => {
    const newEducation = { ...education, id: education.id || generateId() };
    setResumeData(prev => ({
      ...prev,
      otherEducation: [...prev.otherEducation, newEducation]
    }));
  };

  const updateOtherEducation = (id: string, education: Partial<Education>) => {
    setResumeData(prev => ({
      ...prev,
      otherEducation: prev.otherEducation.map(item => 
        item.id === id ? { ...item, ...education } : item
      )
    }));
  };

  const removeOtherEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      otherEducation: prev.otherEducation.filter(item => item.id !== id)
    }));
  };

  // Experience
  const addExperience = (experience: Experience) => {
    const newExperience = { ...experience, id: experience.id || generateId() };
    setResumeData(prev => ({
      ...prev,
      experiences: [...prev.experiences, newExperience]
    }));
  };

  const updateExperience = (id: string, experience: Partial<Experience>) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map(item => 
        item.id === id ? { ...item, ...experience } : item
      )
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(item => item.id !== id)
    }));
  };

  // Awards
  const addAward = (award: Award) => {
    const newAward = { ...award, id: award.id || generateId() };
    setResumeData(prev => ({
      ...prev,
      awards: [...prev.awards, newAward]
    }));
  };

  const updateAward = (id: string, award: Partial<Award>) => {
    setResumeData(prev => ({
      ...prev,
      awards: prev.awards.map(item => 
        item.id === id ? { ...item, ...award } : item
      )
    }));
  };

  const removeAward = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      awards: prev.awards.filter(item => item.id !== id)
    }));
  };

  // Publications
  const addPublication = (publication: Publication) => {
    const newPublication = { ...publication, id: publication.id || generateId() };
    setResumeData(prev => ({
      ...prev,
      publications: [...prev.publications, newPublication]
    }));
  };

  const updatePublication = (id: string, publication: Partial<Publication>) => {
    setResumeData(prev => ({
      ...prev,
      publications: prev.publications.map(item => 
        item.id === id ? { ...item, ...publication } : item
      )
    }));
  };

  const removePublication = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      publications: prev.publications.filter(item => item.id !== id)
    }));
  };

  const updatePublicationsText = (text: string) => {
    setResumeData(prev => ({
      ...prev,
      publicationsText: text
    }));
  };

  // Memberships
  const addMembership = (membership: Membership) => {
    const newMembership = { ...membership, id: membership.id || generateId() };
    setResumeData(prev => ({
      ...prev,
      memberships: [...prev.memberships, newMembership]
    }));
  };

  const updateMembership = (id: string, membership: Partial<Membership>) => {
    setResumeData(prev => ({
      ...prev,
      memberships: prev.memberships.map(item => 
        item.id === id ? { ...item, ...membership } : item
      )
    }));
  };

  const removeMembership = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      memberships: prev.memberships.filter(item => item.id !== id)
    }));
  };

  // Languages
  const addLanguage = (language: Language) => {
    const newLanguage = { ...language, id: language.id || generateId() };
    setResumeData(prev => ({
      ...prev,
      languages: [...prev.languages, newLanguage]
    }));
  };

  const updateLanguage = (id: string, language: Partial<Language>) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.map(item => 
        item.id === id ? { ...item, ...language } : item
      )
    }));
  };

  const removeLanguage = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.filter(item => item.id !== id)
    }));
  };

  // Hobbies
  const updateHobbies = (hobbies: string[]) => {
    setResumeData(prev => ({
      ...prev,
      hobbies
    }));
  };

  return (
    <ResumeContext.Provider value={{
      template,
      setTemplate,
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
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
