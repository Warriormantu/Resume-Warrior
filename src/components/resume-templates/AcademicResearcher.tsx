
import type { ResumeData } from '@/lib/types';

export function AcademicResearcher({ data }: { data: ResumeData }) {
    const { personalInfo, summary, experience, education, projects, skills, custom } = data;
    return (
        <div className="font-serif text-gray-800 break-words leading-relaxed p-8">
            <header className="text-center mb-6 pb-4 border-b border-gray-300">
                <h1 className="text-4xl font-bold text-gray-900">{personalInfo.name}</h1>
                {personalInfo.jobTitle && <p className="text-xl font-semibold text-gray-700 mt-1">{personalInfo.jobTitle}</p>}
                <p className="text-sm text-gray-600 mt-2">
                    {personalInfo.address} | {personalInfo.phone} | {personalInfo.email}
                </p>
                 <p className="text-sm text-gray-600 mt-1">
                    {personalInfo.linkedin && `LinkedIn: ${personalInfo.linkedin}`}
                    {personalInfo.portfolio && ` | Portfolio: ${personalInfo.portfolio}`}
                </p>
            </header>

            <section className="mb-4 resume-section">
                <h2 className="text-lg font-bold text-gray-800 pb-1 mb-2">Research Interests</h2>
                <p className="text-sm text-gray-700">{summary}</p>
            </section>
            
            <section className="mb-4 resume-section">
                <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2 text-gray-800">Education</h2>
                {education.map(edu => (
                     <div key={edu.id} className="mb-2">
                        <div className="grid grid-cols-[1fr_auto] items-start gap-x-2">
                           <h3 className="text-md font-bold text-gray-800">{edu.degree}{edu.fieldOfStudy && `, ${edu.fieldOfStudy}`}</h3>
                           <p className="text-xs text-gray-600 whitespace-nowrap text-right">{edu.startDate} - {edu.endDate}</p>
                        </div>
                        <p className="text-sm text-gray-600">{edu.institution}</p>
                     </div>
                ))}
            </section>

            <section className="mb-4 resume-section">
                <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2 text-gray-800">Research Experience</h2>
                {experience.map(exp => (
                    <div key={exp.id} className="mb-3">
                        <div className="grid grid-cols-[1fr_auto] items-start gap-x-2">
                             <h3 className="text-md font-bold text-gray-800">{exp.title}</h3>
                             <p className="text-xs text-gray-600 whitespace-nowrap text-right">{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</p>
                        </div>
                        <p className="text-sm font-semibold text-gray-600">{exp.company}{exp.location && `, ${exp.location}`}</p>
                        <ul className="list-disc list-inside mt-1 text-sm text-gray-700">
                            {exp.points?.map((point, i) => <li key={i}>{point}</li>)}
                        </ul>
                    </div>
                ))}
            </section>

            {projects && projects.length > 0 && (
                <section className="mb-4 resume-section">
                    <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2 text-gray-800">Projects</h2>
                    {projects.map(proj => (
                        <div key={proj.id} className="mb-3">
                            <h3 className="text-md font-bold text-gray-800">{proj.name}</h3>
                            <p className="text-sm text-gray-700">{proj.description}</p>
                            <ul className="list-disc list-inside mt-1 text-sm text-gray-700">
                                {proj.points?.map((point, i) => <li key={i}>{point}</li>)}
                            </ul>
                        </div>
                    ))}
                </section>
            )}

            {custom?.map(section => (
                section.title && section.content && (
                    <section key={section.id} className="mb-4 resume-section">
                        <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2 text-gray-800">{section.title.toUpperCase()}</h2>
                        <ul className="list-disc list-inside mt-1 text-sm text-gray-700">
                            {section.content.split('\n').filter(p => p).map((point, i) => <li key={i}>{point}</li>)}
                        </ul>
                    </section>
                )
            ))}

             <section className="mb-4 resume-section">
                <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2 text-gray-800">Skills</h2>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  {skills.map(skill => (
                      <p key={skill.id} className="text-sm text-gray-700">{skill.name}</p>
                  ))}
                </div>
            </section>
        </div>
    );
}
