
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Template = 'professional' | 'executive';

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
  issuedBy?: string;
  remarks: string;
};

export type Language = {
  id: string;
  name: string;
  proficiency: 'Native' | 'Fluent' | 'Intermediate' | 'Basic';
};

export type IdType = 
  | 'NMC – Nepal Medical Council (Regulatory body for medical professionals in Nepal)'
  | 'GMC – General Medical Council (UK regulatory body for medical practitioners)'
  | 'USMLE – United States Medical Licensing Examination (Licensing exam for the USA)'
  | 'MCI – Medical Council of India (Now replaced by National Medical Commission - NMC India)'
  | 'AMC – Australian Medical Council (Regulates medical practitioners in Australia)'
  | 'HPCSA – Health Professions Council of South Africa (Regulatory body for health professionals in South Africa)'
  | 'PMDC – Pakistan Medical & Dental Council (Now replaced by Pakistan Medical Commission - PMC)'
  | 'SMC – Singapore Medical Council (Regulates medical practitioners in Singapore)'
  | 'SMD – Saudi Medical Diploma (Certification for medical professionals in Saudi Arabia)'
  | 'SMD1/SMD2 – Saudi Medical Diploma – Level 1 & 2 (Progressive certification levels in Saudi training)'
  | 'BMDC – Bangladesh Medical & Dental Council (Regulates medical practitioners in Bangladesh)'
  | 'SLMC – Sri Lanka Medical Council (Regulatory body for medical professionals in Sri Lanka)'
  | 'MMC – Malaysian Medical Council (Regulatory authority for medical professionals in Malaysia)'
  | 'NBME – National Board of Medical Examiners (Develops assessment exams for US physicians, including USMLE)'
  | 'ECFMG – Educational Commission for Foreign Medical Graduates (Certifies foreign medical graduates for the US)'
  | 'FSMB – Federation of State Medical Boards (Oversees state-specific licensing in the US)'
  | 'CFPC – College of Family Physicians of Canada (Certifies family physicians in Canada)'
  | 'RCPSC – Royal College of Physicians and Surgeons of Canada (Certifying body for specialist physicians in Canada)'
  | 'DHA – Dubai Health Authority (Regulates healthcare professionals in Dubai, UAE)'
  | 'MOH UAE – Ministry of Health United Arab Emirates (Regulates healthcare professionals across UAE)'
  | 'HAAD – Health Authority Abu Dhabi (Regulates medical professionals in Abu Dhabi, UAE)'
  | 'OMSB – Oman Medical Specialty Board (Regulates medical training in Oman)'
  | 'QCHP – Qatar Council for Healthcare Practitioners (Regulatory body for medical professionals in Qatar)'
  | 'IMC – Irish Medical Council (Regulates medical professionals in Ireland)'
  | 'SMC (Sweden) – Swedish Medical Council (Licensing authority for medical professionals in Sweden)'
  | 'NVMSR – Norwegian Registration Authority for Health Personnel (Medical licensing in Norway)'
  | 'NLMC – Netherlands Medical Council (Regulatory body for medical professionals in the Netherlands)'
  | 'AMC-NZ – Medical Council of New Zealand (Regulatory body for medical professionals in New Zealand)'
  | 'Others';

export type PersonalDetails = {
  photoUrl?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  organization?: string;
  idType?: IdType;
  customIdType?: string;
  idNumber?: string;
  hasAccreditedId: boolean;
  accreditedOrg?: string;
  accreditedIdNumber?: string;
  mailingAddress?: string;
  countryCode?: string;
  phoneNumber?: string;
  email?: string;
  socialMediaUrl?: string;
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
  getIdTypeList: () => { value: IdType; label: string }[];
  getIdDisplay: (idType: IdType, customIdType?: string) => string;
};

export const idTypeOptions: { value: IdType; label: string }[] = [
  { value: 'NMC – Nepal Medical Council (Regulatory body for medical professionals in Nepal)', label: 'NMC – Nepal Medical Council' },
  { value: 'GMC – General Medical Council (UK regulatory body for medical practitioners)', label: 'GMC – General Medical Council' },
  { value: 'USMLE – United States Medical Licensing Examination (Licensing exam for the USA)', label: 'USMLE – United States Medical Licensing Examination' },
  { value: 'MCI – Medical Council of India (Now replaced by National Medical Commission - NMC India)', label: 'MCI – Medical Council of India' },
  { value: 'AMC – Australian Medical Council (Regulates medical practitioners in Australia)', label: 'AMC – Australian Medical Council' },
  { value: 'HPCSA – Health Professions Council of South Africa (Regulatory body for health professionals in South Africa)', label: 'HPCSA – Health Professions Council of South Africa' },
  { value: 'PMDC – Pakistan Medical & Dental Council (Now replaced by Pakistan Medical Commission - PMC)', label: 'PMDC – Pakistan Medical & Dental Council' },
  { value: 'SMC – Singapore Medical Council (Regulates medical practitioners in Singapore)', label: 'SMC – Singapore Medical Council' },
  { value: 'SMD – Saudi Medical Diploma (Certification for medical professionals in Saudi Arabia)', label: 'SMD – Saudi Medical Diploma' },
  { value: 'SMD1/SMD2 – Saudi Medical Diploma – Level 1 & 2 (Progressive certification levels in Saudi training)', label: 'SMD1/SMD2 – Saudi Medical Diploma – Level 1 & 2' },
  { value: 'BMDC – Bangladesh Medical & Dental Council (Regulates medical practitioners in Bangladesh)', label: 'BMDC – Bangladesh Medical & Dental Council' },
  { value: 'SLMC – Sri Lanka Medical Council (Regulatory body for medical professionals in Sri Lanka)', label: 'SLMC – Sri Lanka Medical Council' },
  { value: 'MMC – Malaysian Medical Council (Regulatory authority for medical professionals in Malaysia)', label: 'MMC – Malaysian Medical Council' },
  { value: 'NBME – National Board of Medical Examiners (Develops assessment exams for US physicians, including USMLE)', label: 'NBME – National Board of Medical Examiners' },
  { value: 'ECFMG – Educational Commission for Foreign Medical Graduates (Certifies foreign medical graduates for the US)', label: 'ECFMG – Educational Commission for Foreign Medical Graduates' },
  { value: 'FSMB – Federation of State Medical Boards (Oversees state-specific licensing in the US)', label: 'FSMB – Federation of State Medical Boards' },
  { value: 'CFPC – College of Family Physicians of Canada (Certifies family physicians in Canada)', label: 'CFPC – College of Family Physicians of Canada' },
  { value: 'RCPSC – Royal College of Physicians and Surgeons of Canada (Certifying body for specialist physicians in Canada)', label: 'RCPSC – Royal College of Physicians and Surgeons of Canada' },
  { value: 'DHA – Dubai Health Authority (Regulates healthcare professionals in Dubai, UAE)', label: 'DHA – Dubai Health Authority' },
  { value: 'MOH UAE – Ministry of Health United Arab Emirates (Regulates healthcare professionals across UAE)', label: 'MOH UAE – Ministry of Health United Arab Emirates' },
  { value: 'HAAD – Health Authority Abu Dhabi (Regulates medical professionals in Abu Dhabi, UAE)', label: 'HAAD – Health Authority Abu Dhabi' },
  { value: 'OMSB – Oman Medical Specialty Board (Regulates medical training in Oman)', label: 'OMSB – Oman Medical Specialty Board' },
  { value: 'QCHP – Qatar Council for Healthcare Practitioners (Regulatory body for medical professionals in Qatar)', label: 'QCHP – Qatar Council for Healthcare Practitioners' },
  { value: 'IMC – Irish Medical Council (Regulates medical professionals in Ireland)', label: 'IMC – Irish Medical Council' },
  { value: 'SMC (Sweden) – Swedish Medical Council (Licensing authority for medical professionals in Sweden)', label: 'SMC (Sweden) – Swedish Medical Council' },
  { value: 'NVMSR – Norwegian Registration Authority for Health Personnel (Medical licensing in Norway)', label: 'NVMSR – Norwegian Registration Authority for Health Personnel' },
  { value: 'NLMC – Netherlands Medical Council (Regulatory body for medical professionals in the Netherlands)', label: 'NLMC – Netherlands Medical Council' },
  { value: 'AMC-NZ – Medical Council of New Zealand (Regulatory body for medical professionals in New Zealand)', label: 'AMC-NZ – Medical Council of New Zealand' },
  { value: 'Others', label: 'Others' },
];

const defaultResumeData: ResumeData = {
  personalDetails: {
    firstName: '',
    lastName: '',
    hasAccreditedId: false,
    socialMediaUrl: '',
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

  // ID Type helpers
  const getIdTypeList = () => idTypeOptions;
  
  const getIdDisplay = (idType: IdType, customIdType?: string) => {
    if (idType === 'Others' && customIdType) {
      return customIdType;
    }
    
    // For regular IDs, extract just the short form for display
    if (idType) {
      const match = idType.match(/^([^–]+)/);
      return match ? match[1].trim() : idType;
    }
    
    return '';
  };

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
      updateHobbies,
      getIdTypeList,
      getIdDisplay
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
