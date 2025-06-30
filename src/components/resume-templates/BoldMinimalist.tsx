
import type { ResumeData } from '@/lib/types';

export function BoldMinimalist({ data }: { data: ResumeData }) {
    const { personalInfo, summary, experience, education, projects, skills, custom } = data;
    return (
        <div className="font-sans text-gray-800 p-4 break-words leading-relaxed">
            <header className="text-center mb-10">
                <h1 className="text-5xl font-extrabold font-headline tracking-tighter text-gray-900">{personalInfo.name}</h1>
                {personalInfo.jobTitle && <p className="text-xl text-gray-700 mt-1">{personalInfo.jobTitle}</p>}
                <p className="text-sm text-gray-500 mt-2">
                    {personalInfo.email} &bull; {personalInfo.phone} &bull; {personalInfo.address}
                </p>
                <div className="flex justify-center gap-4 text-sm text-gray-500 mt-1">
                    {personalInfo.linkedin && <a href={personalInfo.linkedin} className="hover:text-black">{personalInfo.linkedin}</a>}
                    {personalInfo.portfolio && <a href={personalInfo.portfolio} className="hover:text-black">{personalInfo.portfolio}</a>}
                </div>
            </header>
            
            <section className="mb-6">
                <h2 className="text-sm font-bold font-headline uppercase tracking-widest border-b border-gray-300 pb-2 mb-3 text-gray-600">Summary</h2>
                <p className="text-sm text-gray-700">{summary}</p>
            </section>

            <section className="mb-6">
                <h2 className="text-sm font-bold font-headline uppercase tracking-widest border-b border-gray-300 pb-2 mb-3 text-gray-600">Experience</h2>
                {experience.map(exp => (
                    <div key={exp.id} className="mb-4">
                        <div className="flex justify-between items-start gap-4">
                             <h3 className="text-md font-bold text-gray-800">{exp.title} at {exp.company}</h3>
                             <p className="text-xs text-gray-500 whitespace-nowrap pt-1 flex-shrink-0">{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</p>
                        </div>
                        <ul className="mt-1 text-sm text-gray-700 list-none space-y-1">
                            {exp.points?.map((point, i) => (
                                <li key={i} className="flex gap-2">
                                    <span>-</span>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>
            
            <section className="mb-6">
                <h2 className="text-sm font-bold font-headline uppercase tracking-widest border-b border-gray-300 pb-2 mb-3 text-gray-600">Education</h2>
                {education.map(edu => (
                     <div key={edu.id} className="mb-2">
                        <div className="flex justify-between items-start gap-4">
                           <h3 className="text-md font-bold text-gray-800">{edu.degree}</h3>
                           <p className="text-xs text-gray-500 whitespace-nowrap pt-1 flex-shrink-0">{edu.startDate} - {edu.endDate}</p>
                        </div>
                        <p className="text-sm text-gray-600">{edu.institution}</p>
                     </div>
                ))}
            </section>
            
            {projects && projects.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-sm font-bold font-headline uppercase tracking-widest border-b border-gray-300 pb-2 mb-3 text-gray-600">Projects</h2>
                    {projects.map(proj => (
                        <div key={proj.id} className="mb-4">
                            <h3 className="text-md font-bold text-gray-800">{proj.name}</h3>
                             {proj.url && <p className="text-xs text-gray-500">{proj.url}</p>}
                            <ul className="mt-1 text-sm text-gray-700 list-none space-y-1">
                                {proj.points?.map((point, i) => (
                                    <li key={i} className="flex gap-2">
                                        <span>-</span>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
            )}

            {custom?.map(section => (
                section.title && section.content && (
                    <section key={section.id} className="mb-6">
                        <h2 className="text-sm font-bold font-headline uppercase tracking-widest border-b border-gray-300 pb-2 mb-3 text-gray-600">{section.title.toUpperCase()}</h2>
                        <ul className="mt-1 text-sm text-gray-700 list-none space-y-1">
                             {section.content.split('\n').filter(p => p).map((point, i) => (
                                <li key={i} className="flex gap-2">
                                    <span>-</span>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                )
            ))}

            <section>
                 <h2 className="text-sm font-bold font-headline uppercase tracking-widest border-b border-gray-300 pb-2 mb-3 text-gray-600">Skills</h2>
                 <p className="text-sm text-gray-700">{skills.map(s => s.name).join(', ')}</p>
            </section>
        </div>
    );
}
