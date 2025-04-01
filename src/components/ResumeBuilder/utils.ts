
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
  'NMC', // Nepal Medical Council
  'GMC', // General Medical Council (UK)
  'USMLE', // United States Medical Licensing Examination
  'MCI', // Medical Council of India
  'AMC', // Australian Medical Council
  'HPCSA', // Health Professions Council of South Africa
  'PMDC', // Pakistan Medical and Dental Council
  'SMC', // Singapore Medical Council
  'BMDC', // Bangladesh Medical and Dental Council
  'SLMC', // Sri Lanka Medical Council
  'MMC', // Malaysian Medical Council
  'SCFHS', // Saudi Commission for Health Specialties
  'DHA', // Dubai Health Authority
  'HAAD', // Health Authority Abu Dhabi
  'QCHP', // Qatar Council for Healthcare Practitioners
  'OMSB', // Oman Medical Specialty Board
  'MBBS', // Bachelor of Medicine, Bachelor of Surgery
  'MD', // Doctor of Medicine
  'DO', // Doctor of Osteopathic Medicine
  'FMGE', // Foreign Medical Graduate Examination (India)
  'PLAB', // Professional and Linguistic Assessments Board (UK)
  'NPI', // National Provider Identifier (US)
  'Other'
];

export const degreeOptions = [
  'MBBS', 'MD', 'MS', 'DM', 'MCh', 'DNB', 'FRCS', 'MRCP', 'MPH', 'PhD',
  'DrPH', 'DO', 'MSc', 'MPhil', 'BDS', 'DDS', 'DMD', 'PharmD',
  'BSc', 'BA', 'BBA', 'MBA', 'MHA', 'MPH', 'BN', 'RN', 'BSN',
  'MBCHB', 'MBBCh', 'MBBCh BAO'
];

export const jobTypeOptions = [
  'Full-Time', 'Part-Time', 'Fellowship', 'Clinical Observership',
  'Research Scholar', 'Research Fellow', 'Residency', 'Internship',
  'Visiting Physician', 'Consultant', 'Locum', 'Contract',
  'Temporary', 'Permanent', 'Remote', 'Hybrid'
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
