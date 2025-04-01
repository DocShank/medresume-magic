
import React from 'react';

const teamMembers = [
  {
    name: "Shashank Neupane, MBBS",
    designation: "Creator & Lead Developer",
    image: "/lovable-uploads/3f161cb9-78bb-4954-b747-6004ff80385b.png"
  },
  {
    name: "Prasamsa, MBBS",
    designation: "Product Design & Quality Lead",
    image: "/lovable-uploads/34b4fc55-03e5-4ead-8e34-7c0961e476a3.png" // Swapped image
  },
  {
    name: "Aashriya Neupane, BBA Finance",
    designation: "Template & Operations Manager",
    image: "/lovable-uploads/d6a53a16-1e5e-4b10-a947-91254d354f2c.png" // Swapped image
  }
];

const FoundingTeam = () => {
  return (
    <div className="flex flex-col items-center backdrop-blur-sm bg-white/50 p-8 rounded-2xl shadow-apple">
      <h2 className="text-2xl font-bold text-medsume-textDark mb-8 font-sfpro">Meet Our Founding Team</h2>
      
      <div className="flex flex-wrap justify-center gap-10">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col items-center transition-all duration-300 hover:scale-105 hover:shadow-lg p-4 rounded-xl bg-white/30">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden border-2 border-white shadow-apple bg-gradient-to-br from-white to-gray-100">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="mt-4 text-base md:text-lg font-bold text-medsume-textDark text-center font-sfpro">{member.name}</h3>
            <p className="text-sm text-medsume-textMedium text-center">{member.designation}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-12 flex flex-col items-center border-t border-gray-200 pt-8 w-full">
        <p className="text-lg font-medium text-medsume-textDark mb-4">Creative Cubicle Nepal Medicos</p>
        <a 
          href="https://creative-cubicle-portal.lovable.app/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center justify-center transition-all duration-300 hover:scale-105 w-full"
        >
          <img 
            src="/lovable-uploads/b375dcb1-113f-443b-9a36-79272e3c164e.png"
            alt="Creative Cubicle Logo" 
            className="h-32 object-contain"
          />
        </a>
        <p className="mt-4 text-sm text-medsume-textMedium max-w-md text-center">
          Prevention is the cure, stay healthy for sure
        </p>
      </div>
    </div>
  );
};

export default FoundingTeam;
