
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Download, Eye, Linkedin } from "lucide-react";
import { useResume } from './ResumeContext';
import { formatDate } from './utils';
import { toast } from "sonner";
import html2pdf from 'html2pdf.js';
import { QRCodeSVG } from 'qrcode.react';

interface TemplateProps {
  data: any;
}

const ProfessionalTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="font-times text-slate-800 px-8 py-6">
      {/* Header - Enhanced Premium style */}
      <div className="text-center mb-8 pb-4 border-b-2 border-slate-300 relative">
        <h1 className="text-3xl font-bold tracking-tight mb-1">
          {data.personalDetails.firstName} {data.personalDetails.middleName} {data.personalDetails.lastName}
        </h1>
        {data.personalDetails.organization && (
          <p className="text-xl text-slate-600 mb-3">{data.personalDetails.organization}</p>
        )}
        <div className="flex justify-center items-center flex-wrap gap-6 mt-3">
          {data.personalDetails.email && 
            <span className="text-sm text-slate-600 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {data.personalDetails.email}
            </span>
          }
          {data.personalDetails.phoneNumber && (
            <span className="text-sm text-slate-600 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {data.personalDetails.phoneNumber}
            </span>
          )}
        </div>
        {data.personalDetails.mailingAddress && (
          <p className="text-sm text-slate-600 mt-2 flex justify-center items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {data.personalDetails.mailingAddress}
          </p>
        )}
        
        {/* QR Code for social media */}
        {data.personalDetails.socialMediaUrl && (
          <div className="absolute top-0 right-0">
            <QRCodeSVG 
              value={data.personalDetails.socialMediaUrl} 
              size={64} 
              level="H"
            />
          </div>
        )}
      </div>
      
      {/* Education */}
      {(data.medicalEducation.length > 0 || data.otherEducation.length > 0) && (
        <div className="mb-6">
          <h2 className="text-xl font-bold border-b border-slate-300 pb-2 mb-4 text-slate-700">Education</h2>
          
          {data.medicalEducation.map((edu: any) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-lg">{edu.institution}</span>
                <span className="text-sm text-slate-600 italic">
                  {edu.startDate && formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : "Present"}
                </span>
              </div>
              <p className="text-md">{edu.degree}{edu.location ? `, ${edu.location}` : ''}</p>
              {edu.remarks && <p className="text-sm text-slate-600 mt-1">{edu.remarks}</p>}
            </div>
          ))}
          
          {data.otherEducation.map((edu: any) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-lg">{edu.institution}</span>
                <span className="text-sm text-slate-600 italic">
                  {edu.startDate && formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : "Present"}
                </span>
              </div>
              <p className="text-md">{edu.degree}{edu.location ? `, ${edu.location}` : ''}</p>
              {edu.remarks && <p className="text-sm text-slate-600 mt-1">{edu.remarks}</p>}
            </div>
          ))}
        </div>
      )}
      
      {/* Experience */}
      {data.experiences.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold border-b border-slate-300 pb-2 mb-4 text-slate-700">Experience</h2>
          
          {data.experiences.map((exp: any) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-lg">{exp.role}</span>
                <span className="text-sm text-slate-600 italic">
                  {exp.startDate && formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}
                </span>
              </div>
              <p className="text-md mb-1">
                {exp.department ? `${exp.department}, ${exp.institution}` : exp.institution}
              </p>
              <p className="text-sm text-slate-700">{exp.description}</p>
            </div>
          ))}
        </div>
      )}
      
      {/* Publications */}
      {((data.publications && data.publications.length > 0) || data.publicationsText) && (
        <div className="mb-6">
          <h2 className="text-xl font-bold border-b border-slate-300 pb-2 mb-4 text-slate-700">Publications</h2>
          
          {data.publicationsText ? (
            <div className="whitespace-pre-line text-slate-700">{data.publicationsText}</div>
          ) : (
            <div className="space-y-3">
              {data.publications.map((pub: any, index: number) => (
                <div key={pub.id} className="text-sm text-slate-700 p-2 bg-slate-50 rounded-md">
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
          <h2 className="text-xl font-bold border-b border-slate-300 pb-2 mb-4 text-slate-700">Honors & Awards</h2>
          
          {data.awards.map((award: any) => (
            <div key={award.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-lg">{award.title}</span>
                <span className="text-sm text-slate-600 italic">{award.date && formatDate(award.date)}</span>
              </div>
              <p className="text-md mb-1">{award.organization}</p>
              {award.description && <p className="text-sm text-slate-700">{award.description}</p>}
            </div>
          ))}
        </div>
      )}
      
      {/* Memberships */}
      {data.memberships.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold border-b border-slate-300 pb-2 mb-4 text-slate-700">Professional Memberships</h2>
          
          {data.memberships.map((membership: any) => (
            <div key={membership.id} className="mb-3">
              <span className="font-bold">{membership.name}</span>
              {membership.issuedBy && <span className="text-sm text-slate-600 ml-2">Issued by: {membership.issuedBy}</span>}
              <span className="text-sm text-slate-600 ml-2">
                {membership.issueDate && formatDate(membership.issueDate)}
                {membership.expiryDate && ` - ${formatDate(membership.expiryDate)}`}
              </span>
              {membership.remarks && <p className="text-sm text-slate-700 mt-1">{membership.remarks}</p>}
            </div>
          ))}
        </div>
      )}
      
      {/* Two column section for Languages and Hobbies */}
      <div className="grid grid-cols-2 gap-6">
        {/* Languages */}
        {data.languages.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold border-b border-slate-300 pb-2 mb-4 text-slate-700">Languages</h2>
            
            <div className="space-y-2">
              {data.languages.map((language: any, index: number) => (
                <div key={language.id} className="flex justify-between">
                  <span className="font-semibold">{language.name}</span>
                  <span className="text-slate-700">{language.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Hobbies */}
        {data.hobbies.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold border-b border-slate-300 pb-2 mb-4 text-slate-700">Hobbies & Interests</h2>
            
            <div className="flex flex-wrap text-slate-700">
              {data.hobbies.map((hobby: string, index: number) => (
                <span key={hobby} className="mr-2 mb-1 bg-slate-100 px-2 py-1 rounded-full text-xs">
                  {hobby}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="text-center mt-8 pt-4 border-t border-slate-200 text-xs text-slate-400">
        Created with Medsume by Shank
      </div>
    </div>
  );
};

const ExecutiveTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="font-garamond text-medsume-resumeBlue bg-medsume-resumeWhite px-8 py-6">
      {/* Header - Enhanced Luxury style */}
      <div className="text-center mb-8 pb-6 relative">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-medsume-resumeGold via-medsume-resumeSilver to-medsume-resumeGold"></div>
        
        {/* QR Code for social media */}
        {data.personalDetails.socialMediaUrl && (
          <div className="absolute top-4 right-2">
            <div className="flex flex-col items-center">
              <QRCodeSVG 
                value={data.personalDetails.socialMediaUrl} 
                size={64} 
                level="H"
                fgColor="#8A7B52"
                bgColor="#FFFFFF"
              />
              <Linkedin size={14} className="text-medsume-resumeGold mt-1" />
            </div>
          </div>
        )}
        
        <h1 className="text-4xl font-bold tracking-wide mb-2 text-medsume-resumeBlue">
          {data.personalDetails.firstName} {data.personalDetails.middleName} {data.personalDetails.lastName}
        </h1>
        {data.personalDetails.organization && (
          <p className="text-xl text-medsume-resumeGold font-semibold mb-3">{data.personalDetails.organization}</p>
        )}
        <div className="flex justify-center items-center flex-wrap gap-8 mt-4">
          {data.personalDetails.email && (
            <span className="text-base flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-medsume-resumeGold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {data.personalDetails.email}
            </span>
          )}
          {data.personalDetails.phoneNumber && (
            <span className="text-base flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-medsume-resumeGold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {data.personalDetails.phoneNumber}
            </span>
          )}
          {data.personalDetails.mailingAddress && (
            <span className="text-base flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-medsume-resumeGold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {data.personalDetails.mailingAddress}
            </span>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-medsume-resumeGold via-medsume-resumeSilver to-medsume-resumeGold"></div>
      </div>
      
      {/* Education */}
      {(data.medicalEducation.length > 0 || data.otherEducation.length > 0) && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-medsume-resumeGold border-b border-medsume-resumeBlue pb-2 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
            Education
          </h2>
          
          {data.medicalEducation.map((edu: any) => (
            <div key={edu.id} className="mb-6 pl-4 border-l-2 border-medsume-resumeGold">
              <div className="flex justify-between">
                <div className="font-bold text-xl text-medsume-resumeBlue">{edu.institution}</div>
                <div className="text-base italic text-medsume-resumeGold">
                  {edu.startDate && formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : "Present"}
                </div>
              </div>
              <div className="text-lg mb-1">{edu.degree}{edu.location ? `, ${edu.location}` : ''}</div>
              {edu.remarks && <p className="text-base mt-1">{edu.remarks}</p>}
            </div>
          ))}
          
          {data.otherEducation.map((edu: any) => (
            <div key={edu.id} className="mb-6 pl-4 border-l-2 border-medsume-resumeGold">
              <div className="flex justify-between">
                <div className="font-bold text-xl text-medsume-resumeBlue">{edu.institution}</div>
                <div className="text-base italic text-medsume-resumeGold">
                  {edu.startDate && formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : "Present"}
                </div>
              </div>
              <div className="text-lg mb-1">{edu.degree}{edu.location ? `, ${edu.location}` : ''}</div>
              {edu.remarks && <p className="text-base mt-1">{edu.remarks}</p>}
            </div>
          ))}
        </div>
      )}
      
      {/* Awards */}
      {data.awards.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-medsume-resumeGold border-b border-medsume-resumeBlue pb-2 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Honors & Awards
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.awards.map((award: any) => (
              <div key={award.id} className="mb-4 pl-4 border-l-2 border-medsume-resumeGold">
                <div className="font-bold text-xl text-medsume-resumeBlue">{award.title}</div>
                <div className="text-lg mb-1">{award.organization}</div>
                <div className="text-base italic text-medsume-resumeGold">{award.date && formatDate(award.date)}</div>
                {award.description && <p className="text-base mt-1">{award.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Experience */}
      {data.experiences.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-medsume-resumeGold border-b border-medsume-resumeBlue pb-2 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Experience
          </h2>
          
          {data.experiences.map((exp: any) => (
            <div key={exp.id} className="mb-6 pl-4 border-l-2 border-medsume-resumeGold">
              <div className="flex justify-between">
                <div className="font-bold text-xl text-medsume-resumeBlue">{exp.role}</div>
                <div className="text-base italic text-medsume-resumeGold">
                  {exp.startDate && formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}
                </div>
              </div>
              <div className="text-lg mb-2">
                {exp.department ? `${exp.department}, ${exp.institution}` : exp.institution}
              </div>
              <p className="text-base">{exp.description}</p>
            </div>
          ))}
        </div>
      )}
      
      {/* Publications */}
      {((data.publications && data.publications.length > 0) || data.publicationsText) && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-medsume-resumeGold border-b border-medsume-resumeBlue pb-2 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Publications
          </h2>
          
          {data.publicationsText ? (
            <div className="whitespace-pre-line text-base pl-4 border-l-2 border-medsume-resumeGold">{data.publicationsText}</div>
          ) : (
            <div className="space-y-5">
              {data.publications.map((pub: any) => (
                <div key={pub.id} className="text-base pl-4 border-l-2 border-medsume-resumeGold bg-medsume-resumeGold/5 p-3 rounded-r-md">
                  <div className="italic text-lg mb-1">{pub.title}</div>
                  <div className="mb-1">{pub.authors}</div>
                  <div className="text-medsume-resumeBlue">{pub.journal}. {pub.date && formatDate(pub.date)}.</div>
                  {pub.doi && <div className="text-medsume-resumeGold mt-1">DOI: {pub.doi}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Memberships */}
      {data.memberships.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-medsume-resumeGold border-b border-medsume-resumeBlue pb-2 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Professional Memberships
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.memberships.map((membership: any) => (
              <div key={membership.id} className="pl-4 border-l-2 border-medsume-resumeGold bg-medsume-resumeGold/5 p-3 rounded-r-md">
                <div className="font-bold text-xl text-medsume-resumeBlue">{membership.name}</div>
                {membership.issuedBy && <div className="text-base text-medsume-resumeGold/80">Issued by: {membership.issuedBy}</div>}
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        {/* Languages */}
        {data.languages.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-medsume-resumeGold border-b border-medsume-resumeBlue pb-2 mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              Languages
            </h2>
            
            <div className="space-y-4 pl-4 border-l-2 border-medsume-resumeGold">
              {data.languages.map((language: any) => (
                <div key={language.id} className="flex justify-between items-center">
                  <span className="font-semibold text-lg">{language.name}</span>
                  <span className="px-3 py-1 bg-medsume-resumeGold/20 text-medsume-resumeBlue rounded-full">
                    {language.proficiency}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Hobbies */}
        {data.hobbies.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-medsume-resumeGold border-b border-medsume-resumeBlue pb-2 mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Hobbies & Interests
            </h2>
            
            <div className="flex flex-wrap gap-2 pl-4 border-l-2 border-medsume-resumeGold">
              {data.hobbies.map((hobby: string) => (
                <span key={hobby} className="px-3 py-1 bg-medsume-resumeGold/20 text-medsume-resumeBlue rounded-full">
                  {hobby}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="text-center mt-10 pt-4 border-t border-medsume-resumeGold/30 text-sm text-medsume-resumeGold flex justify-center items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Created with Medsume by Shank
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
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
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
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden preview-shadow">
      <div className="p-4 bg-gradient-to-r from-medsume-appleGrey to-white border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold text-medsume-appleDarkGrey flex items-center gap-2">
          <Eye size={18} className="text-medsume-appleBlue" />
          Resume Preview
        </h2>
        <Button 
          onClick={handleDownloadPDF} 
          className="apple-button"
        >
          <Download size={16} className="mr-2" />
          Download PDF
        </Button>
      </div>
      
      <div className="p-8 max-h-[800px] overflow-y-auto">
        <div 
          id="resume-preview" 
          className="bg-white p-8 shadow-lg border rounded-lg w-full max-w-[210mm] mx-auto"
          style={{ minHeight: '29.7cm' }}
        >
          {template === 'professional' && <ProfessionalTemplate data={resumeData} />}
          {template === 'executive' && <ExecutiveTemplate data={resumeData} />}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
