
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

export const hobbiesOptions = [
  'Reading', 'Writing', 'Hiking', 'Photography', 'Cooking', 'Baking',
  'Traveling', 'Swimming', 'Running', 'Cycling', 'Yoga', 'Meditation',
  'Painting', 'Drawing', 'Sculpture', 'Music', 'Singing', 'Dancing',
  'Theatre', 'Film', 'Gaming', 'Programming', 'Gardening', 'Volunteering',
  'Chess', 'Puzzles', 'Bird Watching', 'Astronomy', 'History', 'Languages'
];

export const languageOptions = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian',
  'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Bengali', 'Urdu',
  'Nepali', 'Thai', 'Vietnamese', 'Indonesian', 'Malay', 'Dutch', 'Greek',
  'Turkish', 'Swedish', 'Norwegian', 'Danish', 'Finnish', 'Polish', 'Czech',
  'Hungarian', 'Romanian'
];

export const degreeOptions = [
  'MBBS', 'MD', 'MS', 'DM', 'MCh', 'DNB', 'FRCS', 'MRCP', 'MPH', 'PhD',
  'DrPH', 'DO', 'MSc', 'MPhil', 'BDS', 'DDS', 'DMD', 'PharmD'
];

export const jobTypeOptions = [
  'Full-Time', 'Part-Time', 'Fellowship', 'Clinical Observership',
  'Research Scholar', 'Research Fellow', 'Residency', 'Internship',
  'Visiting Physician', 'Consultant', 'Locum'
];

export const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhoneNumber = (phone: string) => {
  const re = /^\d{7,15}$/;
  return re.test(phone);
};
