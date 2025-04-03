import React from 'react';
import { useResume } from './ResumeContext';
import html2pdf from 'html2pdf.js';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';

export const ResumePreview: React.FC = () => {
  const { resumeData, template } = useResume();

  const handleDownloadPDF = () => {
    const element = document.getElementById('resume-preview');
    const opt = {
      margin: 10,
      filename: `${resumeData.personalDetails.firstName}_${resumeData.personalDetails.lastName}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
  };

  // Helper function to display ID Type with support for custom "Other" type
  const displayIdType = () => {
    if (resumeData.personalDetails.idType === 'Other' && resumeData.personalDetails.idTypeOther) {
      return resumeData.personalDetails.idTypeOther;
    }
    return resumeData.personalDetails.idType;
  };

  // Helper function to display Degree with support for custom "Other" degree
  const displayDegree = (education: any) => {
    if (education.degree === 'Other' && education.degreeOther) {
      return education.degreeOther;
    }
    return education.degree;
  };

  // Helper function to display Experience Type with support for custom "Other" type
  const displayExperienceType = (experience: any) => {
    if (experience.type === 'Other' && experience.typeOther) {
      return experience.typeOther;
    }
    return experience.type;
  };

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4">
        <Button onClick={handleDownloadPDF} className="flex items-center gap-2">
          <FileDown className="h-4 w-4" />
          Download PDF
        </Button>
      </div>
      <div id="resume-preview" className={`bg-white p-6 shadow-md rounded-lg ${template === 'executive' ? 'border-t-8 border-blue-600' : ''}`}>
        {/* Header */}
        <div className={`mb-6 ${template === 'executive' ? 'border-b pb-4' : ''}`}>
          <h1 className="text-2xl font-bold text-gray-800">
            {resumeData.personalDetails.firstName} {resumeData.personalDetails.middleName ? `${resumeData.personalDetails.middleName} ` : ''}
            {resumeData.personalDetails.lastName}
          </h1>
          {resumeData.personalDetails.organization && (
            <p className="text-md text-gray-600">{resumeData.personalDetails.organization}</p>
          )}
          
          <div className="flex flex-wrap gap-2 mt-2 text-sm">
            {resumeData.personalDetails.email && (
              <span className="text-gray-600">{resumeData.personalDetails.email}</span>
            )}
            {resumeData.personalDetails.phoneNumber && (
              <span className="text-gray-600">
                {resumeData.personalDetails.countryCode ? resumeData.personalDetails.countryCode : ''} {resumeData.personalDetails.phoneNumber}
              </span>
            )}
            {resumeData.personalDetails.linkedinUrl && (
              <a href={resumeData.personalDetails.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                LinkedIn
              </a>
            )}
          </div>
          
          {resumeData.personalDetails.mailingAddress && (
            <p className="text-sm text-gray-600 mt-1">{resumeData.personalDetails.mailingAddress}</p>
          )}
          
          <div className="flex flex-wrap gap-2 mt-2 text-sm">
            {displayIdType() && resumeData.personalDetails.idNumber && (
              <span className="text-gray-700">
                {displayIdType()}: {resumeData.personalDetails.idNumber}
              </span>
            )}
            {resumeData.personalDetails.hasAccreditedId && resumeData.personalDetails.accreditedOrg && resumeData.personalDetails.accreditedIdNumber && (
              <span className="text-gray-700">
                {resumeData.personalDetails.accreditedOrg}: {resumeData.personalDetails.accreditedIdNumber}
              </span>
            )}
          </div>
        </div>

        {/* Medical Education */}
        {resumeData.medicalEducation.length > 0 && (
          <div className="mb-6">
            <h2 className={`text-lg font-semibold mb-2 ${template === 'executive' ? 'text-blue-700' : 'text-gray-800'}`}>
              Medical Education
            </h2>
            {resumeData.medicalEducation.map((education) => (
              <div key={education.id} className="mb-3">
                <div className="flex justify-between">
                  <div>
                    <span className="font-medium">{displayDegree(education)}</span>
                    {education.institution && (
                      <span> - {education.institution}</span>
                    )}
                    {education.location && (
                      <span>, {education.location}</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {education.startDate} - {education.endDate || 'Present'}
                  </div>
                </div>
                {education.graduationYear && (
                  <p className="text-sm">Graduation: {education.graduationYear}</p>
                )}
                {education.score && (
                  <p className="text-sm">Score/Grade: {education.score}</p>
                )}
                {education.remarks && (
                  <p className="text-sm italic">{education.remarks}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Other Education */}
        {resumeData.otherEducation.length > 0 && (
          <div className="mb-6">
            <h2 className={`text-lg font-semibold mb-2 ${template === 'executive' ? 'text-blue-700' : 'text-gray-800'}`}>
              Other Education
            </h2>
            {resumeData.otherEducation.map((education) => (
              <div key={education.id} className="mb-3">
                <div className="flex justify-between">
                  <div>
                    <span className="font-medium">{displayDegree(education)}</span>
                    {education.institution && (
                      <span> - {education.institution}</span>
                    )}
                    {education.location && (
                      <span>, {education.location}</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {education.startDate} - {education.endDate || 'Present'}
                  </div>
                </div>
                {education.graduationYear && (
                  <p className="text-sm">Graduation: {education.graduationYear}</p>
                )}
                {education.score && (
                  <p className="text-sm">Score/Grade: {education.score}</p>
                )}
                {education.remarks && (
                  <p className="text-sm italic">{education.remarks}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Experience */}
        {resumeData.experiences.length > 0 && (
          <div className="mb-6">
            <h2 className={`text-lg font-semibold mb-2 ${template === 'executive' ? 'text-blue-700' : 'text-gray-800'}`}>
              Professional Experience
            </h2>
            {resumeData.experiences.map((experience) => (
              <div key={experience.id} className="mb-3">
                <div className="flex justify-between">
                  <div>
                    <span className="font-medium">{experience.role}</span>
                    {experience.department && (
                      <span>, {experience.department}</span>
                    )}
                    {experience.institution && (
                      <span> - {experience.institution}</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {experience.startDate} - {experience.endDate || 'Present'}
                  </div>
                </div>
                {displayExperienceType(experience) && (
                  <p className="text-sm">{displayExperienceType(experience)}</p>
                )}
                {experience.description && (
                  <p className="text-sm mt-1">{experience.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Awards */}
        {resumeData.awards.length > 0 && (
          <div className="mb-6">
            <h2 className={`text-lg font-semibold mb-2 ${template === 'executive' ? 'text-blue-700' : 'text-gray-800'}`}>
              Awards & Honors
            </h2>
            {resumeData.awards.map((award) => (
              <div key={award.id} className="mb-3">
                <div className="flex justify-between">
                  <span className="font-medium">{award.title}</span>
                  <span className="text-sm text-gray-600">{award.date}</span>
                </div>
                {award.organization && (
                  <p className="text-sm">{award.organization}</p>
                )}
                {award.description && (
                  <p className="text-sm mt-1">{award.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Publications */}
        {(resumeData.publications.length > 0 || resumeData.publicationsText) && (
          <div className="mb-6">
            <h2 className={`text-lg font-semibold mb-2 ${template === 'executive' ? 'text-blue-700' : 'text-gray-800'}`}>
              Publications
            </h2>
            
            {/* Display text format publications */}
            {resumeData.publicationsText && (
              <div className="text-sm space-y-2">
                {resumeData.publicationsText.split('\n').map((pub, index) => (
                  pub.trim() ? <p key={index}>{pub.trim()}</p> : null
                ))}
              </div>
            )}
            
            {/* Display structured publications */}
            {resumeData.publications.length > 0 && (
              <div className="space-y-3 mt-2">
                {resumeData.publications.map((publication) => (
                  <div key={publication.id} className="text-sm">
                    <p>
                      {publication.authors}. {publication.title}. <em>{publication.journal}</em>. {publication.date}.
                      {publication.doi && ` doi: ${publication.doi}`}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Memberships */}
        {resumeData.memberships.length > 0 && (
          <div className="mb-6">
            <h2 className={`text-lg font-semibold mb-2 ${template === 'executive' ? 'text-blue-700' : 'text-gray-800'}`}>
              Memberships
            </h2>
            {resumeData.memberships.map((membership) => (
              <div key={membership.id} className="mb-3">
                <div className="flex justify-between">
                  <span className="font-medium">{membership.name}</span>
                  <span className="text-sm text-gray-600">
                    {membership.issueDate} 
                    {membership.expiryDate ? ` - ${membership.expiryDate}` : ''}
                  </span>
                </div>
                {membership.issuedBy && (
                  <p className="text-sm">Issued by: {membership.issuedBy}</p>
                )}
                {membership.remarks && (
                  <p className="text-sm mt-1">{membership.remarks}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {resumeData.languages.length > 0 && (
          <div className="mb-6">
            <h2 className={`text-lg font-semibold mb-2 ${template === 'executive' ? 'text-blue-700' : 'text-gray-800'}`}>
              Languages
            </h2>
            <div className="flex flex-wrap gap-2">
              {resumeData.languages.map((language) => (
                <span key={language.id} className="text-sm bg-gray-100 px-2 py-1 rounded">
                  {language.name} - {language.proficiency}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Hobbies */}
        {resumeData.hobbies.length > 0 && (
          <div className="mb-6">
            <h2 className={`text-lg font-semibold mb-2 ${template === 'executive' ? 'text-blue-700' : 'text-gray-800'}`}>
              Hobbies & Interests
            </h2>
            <div className="flex flex-wrap gap-2">
              {resumeData.hobbies.map((hobby, index) => (
                <span key={index} className="text-sm bg-gray-100 px-2 py-1 rounded">
                  {hobby}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
