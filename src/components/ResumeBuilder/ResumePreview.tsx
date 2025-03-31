
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useResume } from './ResumeContext';
import { formatDate } from './utils';
import { toast } from "sonner";
import html2pdf from 'html2pdf.js';

interface TemplateProps {
  data: any;
}

const ProfessionalTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="font-times text-black">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">
          {data.personalDetails.firstName} {data.personalDetails.middleName} {data.personalDetails.lastName}
        </h1>
        {data.personalDetails.organization && (
          <p className="text-md">{data.personalDetails.organization}</p>
        )}
        <div className="flex justify-center items-center flex-wrap gap-2 mt-2">
          {data.personalDetails.email && <span className="text-sm">{data.personalDetails.email}</span>}
          {data.personalDetails.phoneNumber && (
            <span className="text-sm">
              {data.personalDetails.countryCode && `${data.personalDetails.countryCode} `}
              {data.personalDetails.phoneNumber}
            </span>
          )}
        </div>
        {data.personalDetails.mailingAddress && (
          <p className="text-sm mt-1">{data.personalDetails.mailingAddress}</p>
        )}
      </div>
      
      {/* Education */}
      {(data.medicalEducation.length > 0 || data.otherEducation.length > 0) && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">Education</h2>
          
          {data.medicalEducation.map((edu: any) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between">
                <span className="font-bold">{edu.institution}</span>
                <span className="text-sm">
                  {edu.startDate && formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : "Present"}
                </span>
              </div>
              <p>{edu.degree}{edu.location ? `, ${edu.location}` : ''}</p>
              {edu.remarks && <p className="text-sm italic">{edu.remarks}</p>}
            </div>
          ))}
          
          {data.otherEducation.map((edu: any) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between">
                <span className="font-bold">{edu.institution}</span>
                <span className="text-sm">
                  {edu.startDate && formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : "Present"}
                </span>
              </div>
              <p>{edu.degree}{edu.location ? `, ${edu.location}` : ''}</p>
              {edu.remarks && <p className="text-sm italic">{edu.remarks}</p>}
            </div>
          ))}
        </div>
      )}
      
      {/* Experience */}
      {data.experiences.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">Experience</h2>
          
          {data.experiences.map((exp: any) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between">
                <span className="font-bold">{exp.role}</span>
                <span className="text-sm">
                  {exp.startDate && formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}
                </span>
              </div>
              <p className="mb-1">{exp.department}, {exp.institution}</p>
              <p className="text-sm">{exp.description}</p>
            </div>
          ))}
        </div>
      )}
      
      {/* Publications */}
      {((data.publications && data.publications.length > 0) || data.publicationsText) && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">Publications</h2>
          
          {data.publicationsText ? (
            <div className="whitespace-pre-line">{data.publicationsText}</div>
          ) : (
            <div>
              {data.publications.map((pub: any, index: number) => (
                <div key={pub.id} className="mb-2 text-sm">
                  {pub.authors}. <span className="italic">{pub.title}</span>. {pub.journal}. {pub.date && formatDate(pub.date)}.
                  {pub.doi && <span> DOI: {pub.doi}</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Awards */}
      {data.awards.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">Honors & Awards</h2>
          
          {data.awards.map((award: any) => (
            <div key={award.id} className="mb-3">
              <div className="flex justify-between">
                <span className="font-bold">{award.title}</span>
                <span className="text-sm">{award.date && formatDate(award.date)}</span>
              </div>
              <p className="mb-1">{award.organization}</p>
              {award.description && <p className="text-sm">{award.description}</p>}
            </div>
          ))}
        </div>
      )}
      
      {/* Memberships */}
      {data.memberships.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">Professional Memberships</h2>
          
          {data.memberships.map((membership: any) => (
            <div key={membership.id} className="mb-2">
              <span className="font-bold">{membership.name}</span>
              <span className="text-sm ml-2">
                {membership.issueDate && formatDate(membership.issueDate)}
                {membership.expiryDate && ` - ${formatDate(membership.expiryDate)}`}
              </span>
              {membership.remarks && <p className="text-sm">{membership.remarks}</p>}
            </div>
          ))}
        </div>
      )}
      
      {/* Languages */}
      {data.languages.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">Languages</h2>
          
          <div className="flex flex-wrap">
            {data.languages.map((language: any, index: number) => (
              <div key={language.id} className="mr-6 mb-2">
                <span className="font-bold">{language.name}</span>: {language.proficiency}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Hobbies */}
      {data.hobbies.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">Hobbies & Interests</h2>
          
          <div className="flex flex-wrap">
            {data.hobbies.map((hobby: string, index: number) => (
              <span key={hobby} className="mr-3 mb-1">
                {hobby}{index < data.hobbies.length - 1 ? ',' : ''}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Footer */}
      <div className="text-center mt-8 text-xs text-gray-400">
        Created by Medsume by Shank
      </div>
    </div>
  );
};

const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="font-arial text-black grid grid-cols-10 gap-4">
      {/* Sidebar */}
      <div className="col-span-3 bg-gray-100 p-4 min-h-full">
        {data.personalDetails.photoUrl && (
          <div className="mb-6 flex justify-center">
            <img 
              src={data.personalDetails.photoUrl} 
              alt="Profile" 
              className="w-32 h-32 rounded-full object-cover border-2 border-medsume-darkBlue"
            />
          </div>
        )}
        
        <div className="mb-6">
          <h2 className="text-medsume-darkBlue font-bold text-lg mb-2 border-b border-medsume-darkBlue pb-1">
            Contact
          </h2>
          {data.personalDetails.email && (
            <div className="mb-1 text-sm">
              <span className="font-bold">Email:</span> {data.personalDetails.email}
            </div>
          )}
          {data.personalDetails.phoneNumber && (
            <div className="mb-1 text-sm">
              <span className="font-bold">Phone:</span> {data.personalDetails.countryCode} {data.personalDetails.phoneNumber}
            </div>
          )}
          {data.personalDetails.mailingAddress && (
            <div className="mb-1 text-sm">
              <span className="font-bold">Address:</span> {data.personalDetails.mailingAddress}
            </div>
          )}
        </div>
        
        {/* Languages */}
        {data.languages.length > 0 && (
          <div className="mb-6">
            <h2 className="text-medsume-darkBlue font-bold text-lg mb-2 border-b border-medsume-darkBlue pb-1">
              Languages
            </h2>
            
            {data.languages.map((language: any) => (
              <div key={language.id} className="mb-1 text-sm">
                <span className="font-bold">{language.name}:</span> {language.proficiency}
              </div>
            ))}
          </div>
        )}
        
        {/* Hobbies */}
        {data.hobbies.length > 0 && (
          <div className="mb-6">
            <h2 className="text-medsume-darkBlue font-bold text-lg mb-2 border-b border-medsume-darkBlue pb-1">
              Hobbies & Interests
            </h2>
            
            <div className="text-sm">
              {data.hobbies.join(', ')}
            </div>
          </div>
        )}
        
        {/* Memberships */}
        {data.memberships.length > 0 && (
          <div className="mb-6">
            <h2 className="text-medsume-darkBlue font-bold text-lg mb-2 border-b border-medsume-darkBlue pb-1">
              Professional Memberships
            </h2>
            
            {data.memberships.map((membership: any) => (
              <div key={membership.id} className="mb-2 text-sm">
                <div className="font-bold">{membership.name}</div>
                <div className="text-xs">
                  {membership.issueDate && formatDate(membership.issueDate)}
                  {membership.expiryDate && ` - ${formatDate(membership.expiryDate)}`}
                </div>
                {membership.remarks && <div className="text-xs mt-1">{membership.remarks}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Main Content */}
      <div className="col-span-7 p-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-medsume-darkBlue">
            {data.personalDetails.firstName} {data.personalDetails.middleName} {data.personalDetails.lastName}
          </h1>
          {data.personalDetails.organization && (
            <p className="text-lg mb-2">{data.personalDetails.organization}</p>
          )}
          {data.personalDetails.idNumber && (
            <p className="text-sm">
              {data.personalDetails.idType}: {data.personalDetails.idNumber}
            </p>
          )}
        </div>
        
        {/* Education */}
        {(data.medicalEducation.length > 0 || data.otherEducation.length > 0) && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-medsume-darkBlue border-b-2 border-medsume-darkBlue pb-1 mb-3">
              Education
            </h2>
            
            {data.medicalEducation.map((edu: any) => (
              <div key={edu.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold">{edu.institution}</div>
                    <div>{edu.degree}{edu.location ? `, ${edu.location}` : ''}</div>
                  </div>
                  <div className="text-sm">
                    {edu.startDate && formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : "Present"}
                  </div>
                </div>
                {edu.remarks && <p className="text-sm mt-1">{edu.remarks}</p>}
              </div>
            ))}
            
            {data.otherEducation.map((edu: any) => (
              <div key={edu.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold">{edu.institution}</div>
                    <div>{edu.degree}{edu.location ? `, ${edu.location}` : ''}</div>
                  </div>
                  <div className="text-sm">
                    {edu.startDate && formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : "Present"}
                  </div>
                </div>
                {edu.remarks && <p className="text-sm mt-1">{edu.remarks}</p>}
              </div>
            ))}
          </div>
        )}
        
        {/* Experience */}
        {data.experiences.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-medsume-darkBlue border-b-2 border-medsume-darkBlue pb-1 mb-3">
              Experience
            </h2>
            
            {data.experiences.map((exp: any) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold">{exp.role}</div>
                    <div>{exp.department}, {exp.institution}</div>
                  </div>
                  <div className="text-sm">
                    {exp.startDate && formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}
                  </div>
                </div>
                <p className="text-sm mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        )}
        
        {/* Awards */}
        {data.awards.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-medsume-darkBlue border-b-2 border-medsume-darkBlue pb-1 mb-3">
              Honors & Awards
            </h2>
            
            {data.awards.map((award: any) => (
              <div key={award.id} className="mb-3">
                <div className="flex justify-between">
                  <div className="font-bold">{award.title}</div>
                  <div className="text-sm">{award.date && formatDate(award.date)}</div>
                </div>
                <div>{award.organization}</div>
                {award.description && <p className="text-sm mt-1">{award.description}</p>}
              </div>
            ))}
          </div>
        )}
        
        {/* Publications */}
        {((data.publications && data.publications.length > 0) || data.publicationsText) && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-medsume-darkBlue border-b-2 border-medsume-darkBlue pb-1 mb-3">
              Publications
            </h2>
            
            {data.publicationsText ? (
              <div className="whitespace-pre-line text-sm">{data.publicationsText}</div>
            ) : (
              <div className="space-y-2">
                {data.publications.map((pub: any) => (
                  <div key={pub.id} className="text-sm">
                    {pub.authors}. <span className="italic">{pub.title}</span>. {pub.journal}. {pub.date && formatDate(pub.date)}.
                    {pub.doi && <span> DOI: {pub.doi}</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="col-span-10 text-center mt-4 text-xs text-gray-400">
        Created by Medsume by Shank
      </div>
    </div>
  );
};

const ExecutiveTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="font-garamond text-medsume-navyBlue">
      {/* Header */}
      <div className="text-center mb-8 border-b-2 border-medsume-gold pb-4">
        <h1 className="text-3xl font-bold mb-2">
          {data.personalDetails.firstName} {data.personalDetails.middleName} {data.personalDetails.lastName}
        </h1>
        {data.personalDetails.organization && (
          <p className="text-xl">{data.personalDetails.organization}</p>
        )}
        <div className="flex justify-center items-center flex-wrap gap-4 mt-3">
          {data.personalDetails.email && (
            <span className="text-base border-r pr-4 border-medsume-gold last:border-r-0">
              {data.personalDetails.email}
            </span>
          )}
          {data.personalDetails.phoneNumber && (
            <span className="text-base border-r pr-4 border-medsume-gold last:border-r-0">
              {data.personalDetails.countryCode} {data.personalDetails.phoneNumber}
            </span>
          )}
          {data.personalDetails.mailingAddress && (
            <span className="text-base last:border-r-0">
              {data.personalDetails.mailingAddress}
            </span>
          )}
        </div>
      </div>
      
      {/* Education */}
      {(data.medicalEducation.length > 0 || data.otherEducation.length > 0) && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-medsume-gold border-b border-medsume-navyBlue pb-2 mb-4">
            Education
          </h2>
          
          {data.medicalEducation.map((edu: any) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between">
                <div className="font-bold text-lg">{edu.institution}</div>
                <div className="text-base">
                  {edu.startDate && formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : "Present"}
                </div>
              </div>
              <div className="text-lg">{edu.degree}{edu.location ? `, ${edu.location}` : ''}</div>
              {edu.remarks && <p className="text-base mt-1">{edu.remarks}</p>}
            </div>
          ))}
          
          {data.otherEducation.map((edu: any) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between">
                <div className="font-bold text-lg">{edu.institution}</div>
                <div className="text-base">
                  {edu.startDate && formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : "Present"}
                </div>
              </div>
              <div className="text-lg">{edu.degree}{edu.location ? `, ${edu.location}` : ''}</div>
              {edu.remarks && <p className="text-base mt-1">{edu.remarks}</p>}
            </div>
          ))}
        </div>
      )}
      
      {/* Awards */}
      {data.awards.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-medsume-gold border-b border-medsume-navyBlue pb-2 mb-4">
            Honors & Awards
          </h2>
          
          {data.awards.map((award: any) => (
            <div key={award.id} className="mb-4">
              <div className="flex justify-between">
                <div className="font-bold text-lg">{award.title}</div>
                <div className="text-base">{award.date && formatDate(award.date)}</div>
              </div>
              <div className="text-lg">{award.organization}</div>
              {award.description && <p className="text-base mt-1">{award.description}</p>}
            </div>
          ))}
        </div>
      )}
      
      {/* Experience */}
      {data.experiences.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-medsume-gold border-b border-medsume-navyBlue pb-2 mb-4">
            Experience
          </h2>
          
          {data.experiences.map((exp: any) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between">
                <div className="font-bold text-lg">{exp.role}</div>
                <div className="text-base">
                  {exp.startDate && formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}
                </div>
              </div>
              <div className="text-lg mb-1">{exp.department}, {exp.institution}</div>
              <p className="text-base">{exp.description}</p>
            </div>
          ))}
        </div>
      )}
      
      {/* Publications */}
      {((data.publications && data.publications.length > 0) || data.publicationsText) && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-medsume-gold border-b border-medsume-navyBlue pb-2 mb-4">
            Publications
          </h2>
          
          {data.publicationsText ? (
            <div className="whitespace-pre-line text-base">{data.publicationsText}</div>
          ) : (
            <div className="space-y-3">
              {data.publications.map((pub: any) => (
                <div key={pub.id} className="text-base">
                  {pub.authors}. <span className="italic">{pub.title}</span>. {pub.journal}. {pub.date && formatDate(pub.date)}.
                  {pub.doi && <span> DOI: {pub.doi}</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Memberships */}
      {data.memberships.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-medsume-gold border-b border-medsume-navyBlue pb-2 mb-4">
            Professional Memberships
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.memberships.map((membership: any) => (
              <div key={membership.id} className="mb-2">
                <div className="font-bold text-lg">{membership.name}</div>
                <div className="text-base">
                  {membership.issueDate && formatDate(membership.issueDate)}
                  {membership.expiryDate && ` - ${formatDate(membership.expiryDate)}`}
                </div>
                {membership.remarks && <div className="text-base mt-1">{membership.remarks}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Languages and Hobbies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Languages */}
        {data.languages.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-medsume-gold border-b border-medsume-navyBlue pb-2 mb-4">
              Languages
            </h2>
            
            <div className="space-y-2">
              {data.languages.map((language: any) => (
                <div key={language.id} className="text-base">
                  <span className="font-bold">{language.name}:</span> {language.proficiency}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Hobbies */}
        {data.hobbies.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-medsume-gold border-b border-medsume-navyBlue pb-2 mb-4">
              Hobbies & Interests
            </h2>
            
            <div className="text-base">
              {data.hobbies.join(', ')}
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="text-center mt-8 text-sm text-medsume-gold border-t border-medsume-navyBlue pt-4">
        Created by Medsume by Shank
      </div>
    </div>
  );
};

const ResumePreview = () => {
  const { template, resumeData } = useResume();
  
  const handleDownloadPDF = () => {
    const element = document.getElementById('resume-preview');
    if (!element) return;
    
    const opt = {
      margin: [10, 10, 10, 10],
      filename: `${resumeData.personalDetails.firstName}_${resumeData.personalDetails.lastName}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    toast.info("Generating PDF...");
    
    setTimeout(() => {
      html2pdf().set(opt).from(element).save().then(() => {
        toast.success("PDF downloaded successfully!");
      }).catch(error => {
        console.error("PDF generation failed:", error);
        toast.error("Failed to generate PDF. Please try again.");
      });
    }, 500);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Resume Preview</h2>
        <Button onClick={handleDownloadPDF} className="bg-medsume-teal hover:bg-medsume-tealLight">
          <Download size={16} className="mr-2" />
          Download PDF
        </Button>
      </div>
      
      <div className="p-8 max-h-[800px] overflow-y-auto">
        <div 
          id="resume-preview" 
          className="bg-white p-8 shadow-sm border rounded-md w-full max-w-[210mm] mx-auto"
          style={{ minHeight: '29.7cm' }}
        >
          {template === 'professional' && <ProfessionalTemplate data={resumeData} />}
          {template === 'modern' && <ModernTemplate data={resumeData} />}
          {template === 'executive' && <ExecutiveTemplate data={resumeData} />}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
