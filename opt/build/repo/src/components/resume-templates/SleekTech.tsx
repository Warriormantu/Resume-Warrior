
import type { ResumeData } from '@/lib/types';

export function SleekTech({ data }: { data: ResumeData }) {
    const { personalInfo, summary, experience, education, projects, skills, custom } = data;
    return (
        <div className="font-sans text-white bg-[#1a1a1a] flex break-words leading-relaxed p-8">
            <div className="w-1/3 bg-[#2a2a2a] p-6 flex flex-col">
                 <header className="text-center mb-8 resume-section">
                    <h1 className="text-4xl font-bold font-headline" style={{ color: 'var(--resume-accent-color)' }}>{personalInfo.name}</h1>
                    {personalInfo.jobTitle && <p className="text-lg mt-1" style={{ color: 'var(--resume-accent-color)', opacity: 0.9 }}>{personalInfo.jobTitle}</p>}
                </header>
                <div className="text-sm space-y-3 text-gray-300">
                    <div className="flex items-start gap-2">
                        <strong className="w-16 flex-shrink-0 font-semibold" style={{ color: 'var(--resume-accent-color)' }}>Phone:</strong>
                        <span>{personalInfo.phone}</span>
                    </div>
                     <div className="flex items-start gap-2">
                        <strong className="w-16 flex-shrink-0 font-semibold" style={{ color: 'var(--resume-accent-color)' }}>Email:</strong>
                        <span className="break-all">{personalInfo.email}</span>
                    </div>
                     <div className="flex items-start gap-2">
                        <strong className="w-16 flex-shrink-0 font-semibold" style={{ color: 'var(--resume-accent-color)' }}>Address:</strong>
                        <span>{personalInfo.address}</span>
                    </div>
                    {personalInfo.linkedin && (
                        <div className="flex items-start gap-2">
                            <strong className="w-16 flex-shrink-0 font-semibold" style={{ color: 'var(--resume-accent-color)' }}>LinkedIn:</strong>
                            <span className="break-all">{personalInfo.linkedin}</span>
                        </div>
                    )}
                    {personalInfo.portfolio && (
                         <div className="flex items-start gap-2">
                            <strong className="w-16 flex-shrink-0 font-semibold" style={{ color: 'var(--resume-accent-color)' }}>Web:</strong>
                            <span className="break-all">{personalInfo.portfolio}</span>
                        </div>
                    )}
                </div>

                <section className="mt-8 resume-section">
                    <h2 className="text-lg font-semibold font-headline mb-3 border-b-2 pb-1" style={{ color: 'var(--resume-accent-color)', borderColor: 'var(--resume-accent-color)' }}>SKILLS</h2>
                    <div className="flex flex-wrap gap-2">
                        {skills.map(skill => (
                            <span key={skill.id} className="bg-gray-700 text-xs font-mono px-2 py-1 rounded" style={{ color: 'var(--resume-accent-color)' }}>
                                {skill.name}
                            </span>
                        ))}
                    </div>
                </section>

                 <section className="mt-8 resume-section">
                    <h2 className="text-lg font-semibold font-headline mb-3 border-b-2 pb-1" style={{ color: 'var(--resume-accent-color)', borderColor: 'var(--resume-accent-color)' }}>EDUCATION</h2>
                    {education.map(edu => (
                         <div key={edu.id} className="mb-3">
                           <h3 className="text-md font-bold text-gray-100">{edu.degree}</h3>
                           <p className="text-sm text-gray-300">{edu.institution}</p>
                           <p className="text-xs text-gray-400">{edu.startDate} - {edu.endDate}</p>
                         </div>
                    ))}
                </section>
            </div>

            <div className="w-2/3 p-6">
                <section className="mb-6 resume-section">
                    <h2 className="text-xl font-bold font-headline mb-2" style={{ color: 'var(--resume-accent-color)' }}>SUMMARY</h2>
                    <p className="text-sm text-gray-300">{summary}</p>
                </section>
                <section className="mb-6 resume-section">
                    <h2 className="text-xl font-bold font-headline mb-2" style={{ color: 'var(--resume-accent-color)' }}>EXPERIENCE</h2>
                    {experience.map(exp => (
                        <div key={exp.id} className="mb-4 flex items-start gap-3">
                            <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: 'var(--resume-accent-color)' }} />
                            <div className="flex-grow">
                                <div className="grid grid-cols-[1fr_auto] items-baseline gap-x-2">
                                    <h3 className="text-md font-bold text-gray-100">{exp.title}</h3>
                                    <p className="text-xs text-gray-400 whitespace-nowrap">{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</p>
                                </div>
                                <p className="text-sm font-semibold text-gray-300">{exp.company}</p>
                                <ul className="list-none mt-1 text-sm text-gray-400 space-y-1">
                                    {exp.points?.map((point, i) => <li key={i}>{point}</li>)}
                                </ul>
                            </div>
                        </div>
                    ))}
                </section>
                 {projects && projects.length > 0 && (
                    <section className="mb-6 resume-section">
                        <h2 className="text-xl font-bold font-headline mb-2" style={{ color: 'var(--resume-accent-color)' }}>PROJECTS</h2>
                        {projects.map(proj => (
                            <div key={proj.id} className="mb-4 flex items-start gap-3">
                                <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: 'var(--resume-accent-color)' }} />
                                <div className="flex-grow">
                                    <h3 className="text-md font-bold text-gray-100">{proj.name}</h3>
                                    {proj.url && <p className="text-sm break-all" style={{ color: 'var(--resume-accent-color)', opacity: 0.9 }}>{proj.url}</p>}
                                    <p className="text-sm text-gray-300 my-1">{proj.description}</p>
                                    <ul className="list-none mt-1 text-sm text-gray-400 space-y-1">
                                        {proj.points?.map((point, i) => <li key={i}>{point}</li>)}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </section>
                 )}
                 {custom?.map(section => (
                    section.title && section.content && (
                        <section key={section.id} className="mb-6 resume-section">
                            <h2 className="text-xl font-bold font-headline mb-2" style={{ color: 'var(--resume-accent-color)' }}>{section.title.toUpperCase()}</h2>
                            <ul className="list-none space-y-1">
                                {section.content.split('\n').filter(p => p).map((point, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: 'var(--resume-accent-color)' }} />
                                        <span className="flex-grow text-sm text-gray-400">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )
                ))}
            </div>
        </div>
    );
}
