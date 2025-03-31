
import React, { useState, useEffect, useRef } from 'react';
import { createYearArray, createDayArray, getDaysInMonth, months } from './utils';

interface DateSelectorProps {
  onChange: (dateString: string) => void;
  value?: string;
  startYear?: number;
  endYear?: number;
  label?: string;
}

const DateSelector: React.FC<DateSelectorProps> = ({ 
  onChange, 
  value = '',
  startYear = 1980,
  endYear = new Date().getFullYear(),
  label = 'Date'
}) => {
  const [selectedYear, setSelectedYear] = useState<number>(endYear);
  const [selectedMonth, setSelectedMonth] = useState<number>(1);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  
  const yearRef = useRef<HTMLDivElement>(null);
  const monthRef = useRef<HTMLDivElement>(null);
  const dayRef = useRef<HTMLDivElement>(null);
  
  const years = createYearArray(startYear, endYear);
  const [days, setDays] = useState(createDayArray(31));
  
  // Initialize from value prop
  useEffect(() => {
    if (value) {
      const [year, month, day] = value.split('-').map(Number);
      if (year && month && day) {
        setSelectedYear(year);
        setSelectedMonth(month);
        setSelectedDay(day);
      }
    }
  }, [value]);
  
  // Update days when month/year changes
  useEffect(() => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    setDays(createDayArray(daysInMonth));
    if (selectedDay > daysInMonth) {
      setSelectedDay(daysInMonth);
    }
  }, [selectedYear, selectedMonth, selectedDay]);
  
  // Update output date when selections change
  useEffect(() => {
    const formattedMonth = selectedMonth.toString().padStart(2, '0');
    const formattedDay = selectedDay.toString().padStart(2, '0');
    onChange(`${selectedYear}-${formattedMonth}-${formattedDay}`);
  }, [selectedYear, selectedMonth, selectedDay, onChange]);
  
  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };
  
  const handleMonthChange = (monthIndex: number) => {
    setSelectedMonth(monthIndex + 1);
  };
  
  const handleDayChange = (day: number) => {
    setSelectedDay(day);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div className="flex space-x-4">
        <div className="w-24">
          <div className="text-xs text-gray-400 mb-1">Year</div>
          <div 
            ref={yearRef}
            className="h-24 overflow-y-auto dial-container bg-medsume-lightGray rounded"
          >
            {years.map((year) => (
              <div 
                key={year} 
                className={`dial-item h-8 flex items-center justify-center cursor-pointer text-sm
                          ${selectedYear === year ? 'bg-medsume-teal text-white font-bold' : 'text-gray-700'}`}
                onClick={() => handleYearChange(year)}
              >
                {year}
              </div>
            ))}
          </div>
        </div>
        
        <div className="w-24">
          <div className="text-xs text-gray-400 mb-1">Month</div>
          <div 
            ref={monthRef}
            className="h-24 overflow-y-auto dial-container bg-medsume-lightGray rounded"
          >
            {months.map((month, index) => (
              <div 
                key={month} 
                className={`dial-item h-8 flex items-center justify-center cursor-pointer text-sm
                          ${selectedMonth === index + 1 ? 'bg-medsume-teal text-white font-bold' : 'text-gray-700'}`}
                onClick={() => handleMonthChange(index)}
              >
                {month}
              </div>
            ))}
          </div>
        </div>
        
        <div className="w-16">
          <div className="text-xs text-gray-400 mb-1">Day</div>
          <div 
            ref={dayRef}
            className="h-24 overflow-y-auto dial-container bg-medsume-lightGray rounded"
          >
            {days.map((day) => (
              <div 
                key={day} 
                className={`dial-item h-8 flex items-center justify-center cursor-pointer text-sm
                          ${selectedDay === day ? 'bg-medsume-teal text-white font-bold' : 'text-gray-700'}`}
                onClick={() => handleDayChange(day)}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateSelector;
