
import React from 'react';

// Placeholder function for images (when real images are uploaded)
const getImageUrl = (name: string) => {
  return `https://via.placeholder.com/80?text=${name.charAt(0)}`;
};

const FoundingTeam = () => {
  const teamMembers = [
    {
      name: "Shashank Neupane",
      designation: "MBBS - Creator & Lead Developer",
      image: "Shashank.jpg"
    },
    {
      name: "Prasamsa Pudasaini",
      designation: "MBBS - Product Design & Quality Lead",
      image: "Prasamsa.jpg"
    },
    {
      name: "Aashriya Neupane",
      designation: "BBA-Finance - Template & Operations Manager",
      image: "Aashriya.jpg"
    }
  ];

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold text-medsume-textDark mb-6">Meet Our Founding Team</h2>
      
      <div className="flex flex-wrap justify-center gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 bg-white">
              <img 
                src={getImageUrl(member.name)} 
                alt={member.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="mt-2 text-sm font-bold text-medsume-textDark text-center">{member.name}</h3>
            <p className="text-xs text-medsume-textMedium text-center">{member.designation}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex items-center">
        <a href="https://creative-cubicle-portal.lovable.app/" target="_blank" rel="noopener noreferrer" className="flex items-center">
          <span className="text-sm text-medsume-textDark">Creative Cubicle Nepal Medicos</span>
          <img 
            src="https://via.placeholder.com/28x28?text=CC" 
            alt="Creative Cubicle Logo" 
            className="ml-2 h-7"
          />
        </a>
      </div>
    </div>
  );
};

export default FoundingTeam;
