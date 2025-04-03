
export const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const formatDate = (dateString: string) => {
  if (!dateString) return '';
  
  const [year, month, day] = dateString.split('-').map(Number);
  if (!year || !month || !day) return '';
  
  return `${months[month - 1]} ${day}, ${year}`;
};

export const createYearArray = (startYear: number, endYear: number) => {
  return Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
};

export const createDayArray = (daysInMonth: number) => {
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
};

export const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

export const getCurrentDate = () => {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate()
  };
};

export const formatDateString = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

export const parseISODate = (isoString: string): Date | null => {
  if (!isoString) return null;
  const date = new Date(isoString);
  return isNaN(date.getTime()) ? null : date;
};

export const generateId = () => Math.random().toString(36).substr(2, 9);

export const hobbiesOptions = [
  'Reading', 'Writing', 'Hiking', 'Photography', 'Cooking', 'Baking',
  'Traveling', 'Swimming', 'Running', 'Cycling', 'Yoga', 'Meditation',
  'Painting', 'Drawing', 'Sculpture', 'Music', 'Singing', 'Dancing',
  'Theatre', 'Film', 'Gaming', 'Programming', 'Gardening', 'Volunteering',
  'Chess', 'Puzzles', 'Bird Watching', 'Astronomy', 'History', 'Languages',
  'Golf', 'Tennis', 'Basketball', 'Football', 'Soccer', 'Volleyball',
  'Skiing', 'Surfing', 'Martial Arts', 'Weightlifting', 'Crossfit',
  'Collecting', 'Genealogy', 'Knitting', 'Crafting', 'DIY Projects',
  'Wine Tasting', 'Brewing', 'Fishing', 'Hunting', 'Camping',
  'Podcasting', 'Blogging', 'Investing', 'Woodworking', 'Metalworking'
];

export const languageOptions = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian',
  'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Bengali', 'Urdu',
  'Nepali', 'Thai', 'Vietnamese', 'Indonesian', 'Malay', 'Dutch', 'Greek',
  'Turkish', 'Swedish', 'Norwegian', 'Danish', 'Finnish', 'Polish', 'Czech',
  'Hungarian', 'Romanian', 'Hebrew', 'Swahili', 'Tagalog', 'Farsi', 'Punjabi',
  'Tamil', 'Telugu', 'Marathi', 'Gujarati', 'Kannada', 'Malayalam',
  'Ukrainian', 'Serbian', 'Croatian', 'Bulgarian', 'Slovak',
  'Lithuanian', 'Latvian', 'Estonian', 'Icelandic'
];

export const idTypeOptions = [
  { value: 'NMC', label: 'Nepal Medical Council (Nepal)', description: 'Official medical registration body in Nepal' },
  { value: 'GMC', label: 'General Medical Council (UK)', description: 'Regulatory body for doctors in the United Kingdom' },
  { value: 'USMLE', label: 'United States Medical Licensing Examination (USA)', description: 'Three-step examination for medical licensure in the United States' },
  { value: 'MCI', label: 'Medical Council of India (India)', description: 'Statutory body regulating medical education and practitioners in India' },
  { value: 'PMDC', label: 'Pakistan Medical & Dental Council (Pakistan)', description: 'Statutory regulatory authority in Pakistan' },
  { value: 'AMC', label: 'Australian Medical Council (Australia)', description: 'National assessment body for international medical graduates' },
  { value: 'HPCSA', label: 'Health Professions Council of South Africa (South Africa)', description: 'Statutory body for healthcare professionals' },
  { value: 'SMC', label: 'Singapore Medical Council (Singapore)', description: 'Regulatory body for registered medical practitioners' },
  { value: 'BMDC', label: 'Bangladesh Medical & Dental Council (Bangladesh)', description: 'Registration authority for physicians in Bangladesh' },
  { value: 'SLMC', label: 'Sri Lanka Medical Council (Sri Lanka)', description: 'Statutory body for medical registration in Sri Lanka' },
  { value: 'MMC', label: 'Malaysian Medical Council (Malaysia)', description: 'Regulatory body for medical practitioners in Malaysia' },
  { value: 'SCFHS', label: 'Saudi Commission for Health Specialties (Saudi Arabia)', description: 'Regulatory body for health specialists in Saudi Arabia' },
  { value: 'DHA', label: 'Dubai Health Authority (UAE)', description: 'Regulatory body for healthcare sector in Dubai' },
  { value: 'HAAD', label: 'Health Authority Abu Dhabi (UAE)', description: 'Regulatory body for healthcare sector in Abu Dhabi' },
  { value: 'QCHP', label: 'Qatar Council for Healthcare Practitioners (Qatar)', description: 'National regulator of healthcare practitioners' },
  { value: 'OMSB', label: 'Oman Medical Specialty Board (Oman)', description: 'Regulatory body for medical specialties in Oman' },
  { value: 'MBBS', label: 'Bachelor of Medicine, Bachelor of Surgery (International)', description: 'Primary medical degree in many countries' },
  { value: 'MD', label: 'Doctor of Medicine (International)', description: 'Higher doctoral degree in medicine' },
  { value: 'DO', label: 'Doctor of Osteopathic Medicine (USA)', description: 'Professional doctoral degree for physicians in the US' },
  { value: 'FMGE', label: 'Foreign Medical Graduate Examination (India)', description: 'Screening test for foreign medical graduates' },
  { value: 'PLAB', label: 'Professional and Linguistic Assessments Board (UK)', description: 'Test for doctors who qualified abroad' },
  { value: 'NPI', label: 'National Provider Identifier (USA)', description: 'Unique identification number for healthcare providers' },
  { value: 'AHPRA', label: 'Australian Health Practitioner Regulation Agency (Australia)', description: 'National regulatory body for health practitioners' },
  { value: 'JMDC', label: 'Jordan Medical Doctor Council (Jordan)', description: 'Regulatory body for physicians in Jordan' },
  { value: 'MCCEE', label: 'Medical Council of Canada Evaluating Examination (Canada)', description: 'Assessment for international medical graduates' },
  { value: 'NMBI', label: 'Nursing and Midwifery Board of Ireland (Ireland)', description: 'Regulatory body for nurses and midwives' },
  { value: 'NMC-UK', label: 'Nursing and Midwifery Council (UK)', description: 'Regulatory body for nurses and midwives in the UK' },
  { value: 'NZMC', label: 'New Zealand Medical Council (New Zealand)', description: 'Regulatory authority for doctors' },
  { value: 'ECFMG', label: 'Educational Commission for Foreign Medical Graduates (USA)', description: 'Certification for international medical graduates' },
  { value: 'Other', label: 'Other Identification Type', description: 'Any other form of professional identification' }
];

export const degreeOptions = [
  'MBBS', 'MD', 'MS', 'DM', 'MCh', 'DNB', 'FRCS', 'MRCP', 'MPH', 'PhD',
  'DrPH', 'DO', 'MSc', 'MPhil', 'BDS', 'DDS', 'DMD', 'PharmD',
  'BSc', 'BA', 'BBA', 'MBA', 'MHA', 'MPH', 'BN', 'RN', 'BSN',
  'MBCHB', 'MBBCh', 'MBBCh BAO', 'Other'
];

export const jobTypeOptions = [
  'Full-Time', 'Part-Time', 'Fellowship', 'Clinical Observership',
  'Research Scholar', 'Research Fellow', 'Residency', 'Internship',
  'Visiting Physician', 'Consultant', 'Locum', 'Contract',
  'Temporary', 'Permanent', 'Remote', 'Hybrid', 'Other'
];

export const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhoneNumber = (phone: string) => {
  const re = /^\+?[\d\s-()+]+$/;
  return re.test(phone);
};

export const convertDateFormat = (dateString: string, format: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD' = 'YYYY-MM-DD') => {
  if (!dateString) return '';
  
  try {
    const [year, month, day] = dateString.split('-').map(Number);
    
    if (format === 'MM/DD/YYYY') {
      return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
    } else if (format === 'DD/MM/YYYY') {
      return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
    } else {
      return dateString; // Already in YYYY-MM-DD format
    }
  } catch (error) {
    return dateString;
  }
};

export const validateUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};

export const standardizeAddress = (address: string) => {
  // Simple function to try to format addresses in a standard way
  return address.trim();
};

export const getPlaceholderByField = (fieldName: string) => {
  const placeholders: Record<string, string> = {
    firstName: "John",
    middleName: "Alexander",
    lastName: "Smith",
    organization: "Mayo Clinic",
    email: "john.smith@example.com",
    mailingAddress: "123 Medical Center Dr, City, State, 12345, Country",
    phoneNumber: "+1 234 567 8900"
  };
  
  return placeholders[fieldName] || fieldName;
};
