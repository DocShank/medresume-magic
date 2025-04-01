
import React from 'react';

const FoundingTeam = () => {
  const teamMembers = [
    {
      name: "Shashank Neupane",
      designation: "MBBS - Creator & Lead Developer",
      image: "/lovable-uploads/a67a7314-a411-4a3b-9aff-1f8451d09fde.png"
    },
    {
      name: "Prasamsa Pudasaini",
      designation: "MBBS - Product Design & Quality Lead",
      image: "/lovable-uploads/34b4fc55-03e5-4ead-8e34-7c0961e476a3.png"
    },
    {
      name: "Aashriya Neupane",
      designation: "BBA-Finance - Template & Operations Manager",
      image: "/lovable-uploads/30ab6e7d-04c5-4872-b185-b0479554a100.png"
    }
  ];

  return (
    <div className="flex flex-col items-center backdrop-blur-sm bg-white/50 p-8 rounded-2xl shadow-apple">
      <h2 className="text-2xl font-bold text-medsume-textDark mb-8 font-sfpro">Meet Our Founding Team</h2>
      
      <div className="flex flex-wrap justify-center gap-12">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col items-center transition-transform hover:scale-105 duration-300">
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
      
      <div className="mt-12 flex flex-col items-center">
        <p className="text-lg font-medium text-medsume-textDark mb-4">Creative Cubicle Nepal Medicos</p>
        <a 
          href="https://creative-cubicle-portal.lovable.app/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center justify-center transition-transform hover:scale-105 duration-300 w-full"
        >
          <img 
            src="/lovable-uploads/70749cd8-8731-40f1-a68d-a8ffcaced06f.png"
            alt="Creative Cubicle Logo" 
            className="h-28 object-contain"
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
