import type { ResumeData } from '@/lib/types';

export function CorporateLadder({ data }: { data: ResumeData }) {
    const { personalInfo, summary, experience, education, projects, skills } = data;
    return (
        <div className="font-serif text-gray-900 flex" style={{ fontFamily: 'var(--resume-font-family, "serif")' }}>
            <div className="w-1/3 bg-gray-50 p-6 border-r border-gray-200">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold font-headline text-gray-800">{personalInfo.name}</h1>
                    {personalInfo.jobTitle && <p className="text-lg text-gray-600 mt-1">{personalInfo.jobTitle}</p>}
                </header>

                <section className="mb-6">
                    <h2 className="text-md font-bold text-gray-700 border-b-2 border-gray-300 pb-1 mb-2 font-headline uppercase tracking-wider">Contact</h2>
                    <div className="text-xs space-y-1 text-gray-600">
                        <p>{personalInfo.phone}</p>
                        <p>{personalInfo.email}</p>
                        <p>{personalInfo.address}</p>
                        {personalInfo.linkedin && <p>{personalInfo.linkedin}</p>}
                        {personalInfo.portfolio && <p>{personalInfo.portfolio}</p>}
                    </div>
                </section>
                
                <section className="mb-6">
                    <h2 className="text-md font-bold text-gray-700 border-b-2 border-gray-300 pb-1 mb-2 font-headline uppercase tracking-wider">Education</h2>
                    {education.map(edu => (
                         <div key={edu.id} className="mb-3">
                           <h3 className="text-sm font-bold text-gray-800">{edu.degree}</h3>
                           <p className="text-xs text-gray-600">{edu.institution}</p>
                           <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                         </div>
                    ))}
                </section>

                <section>
                    <h2 className="text-md font-bold text-gray-700 border-b-2 border-gray-300 pb-1 mb-2 font-headline uppercase tracking-wider">Skills</h2>
                    <ul className="text-sm space-y-1 text-gray-700">
                      {skills.map(skill => <li key={skill}>{skill}</li>)}
                    </ul>
                </section>

            </div>
            <div className="w-2/3 p-6">
                 <section className="mb-6">
                    <h2 className="text-xl font-bold font-headline text-gray-700 border-b-4 border-gray-700 pb-1 mb-3">Professional Summary</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">{summary}</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-bold font-headline text-gray-700 border-b-4 border-gray-700 pb-1 mb-3">Work Experience</h2>
                    {experience.map(exp => (
                        <div key={exp.id} className="mb-4">
                            <div className="flex justify-between items-baseline">
                                 <h3 className="text-md font-bold text-gray-800">{exp.title}</h3>
                                 <p className="text-xs text-gray-500">{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</p>
                            </div>
                            <p className="text-sm font-semibold text-gray-600">{exp.company}{exp.location && `, ${exp.location}`}</p>
                            <ul className="list-disc list-inside mt-1 text-sm text-gray-600 space-y-1">
                                {exp.points?.map((point, i) => <li key={i}>{point}</li>)}
                            </ul>
                        </div>
                    ))}
                </section>

                {projects && projects.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold font-headline text-gray-700 border-b-4 border-gray-700 pb-1 mb-3">Projects</h2>
                        {projects.map(proj => (
                            <div key={proj.id} className="mb-4">
                                <h3 className="text-md font-bold text-gray-800">{proj.name}</h3>
                                {proj.url && <p className="text-sm text-gray-500 italic">{proj.url}</p>}
                                <ul className="list-disc list-inside mt-1 text-sm text-gray-600 space-y-1">
                                    {proj.points?.map((point, i) => <li key={i}>{point}</li>)}
                                </ul>
                            </div>
                        ))}
                    </section>
                )}
            </div>
        </div>
    );
}
