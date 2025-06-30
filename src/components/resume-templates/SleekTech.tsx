import type { ResumeData } from '@/lib/types';

export function SleekTech({ data }: { data: ResumeData }) {
    const { personalInfo, summary, experience, education, projects, skills, custom } = data;
    return (
        <div className="font-sans text-white bg-[#1a1a1a] flex" style={{ fontFamily: 'var(--resume-font-family, "sans-serif")' }}>
            <div className="w-1/3 bg-[#2a2a2a] p-6 flex flex-col">
                 <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold font-headline" style={{ color: 'var(--resume-accent-color)' }}>{personalInfo.name}</h1>
                    {personalInfo.jobTitle && <p className="text-lg mt-1" style={{ color: 'var(--resume-accent-color)', opacity: 0.9 }}>{personalInfo.jobTitle}</p>}
                </header>
                <div className="text-sm space-y-3 text-gray-300">
                    <div className="flex items-center gap-2" style={{ color: 'var(--resume-accent-color)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        <span className="text-gray-300">{personalInfo.phone}</span>
                    </div>
                    <div className="flex items-center gap-2" style={{ color: 'var(--resume-accent-color)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                        <span className="text-gray-300">{personalInfo.email}</span>
                    </div>
                    <div className="flex items-center gap-2" style={{ color: 'var(--resume-accent-color)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                        <span className="text-gray-300">{personalInfo.address}</span>
                    </div>
                    {personalInfo.linkedin && <div className="flex items-center gap-2" style={{ color: 'var(--resume-accent-color)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                        <span className="text-gray-300">{personalInfo.linkedin}</span>
                    </div>}
                    {personalInfo.portfolio && <div className="flex items-center gap-2" style={{ color: 'var(--resume-accent-color)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                        <span className="text-gray-300">{personalInfo.portfolio}</span>
                    </div>}
                </div>

                <section className="mt-8">
                    <h2 className="text-lg font-semibold font-headline mb-3 border-b-2 pb-1" style={{ color: 'var(--resume-accent-color)', borderColor: 'var(--resume-accent-color)' }}>SKILLS</h2>
                    <div className="flex flex-wrap gap-2">
                        {skills.map(skill => (
                            <span key={skill.id} className="bg-gray-700 text-xs font-mono px-2 py-1 rounded" style={{ color: 'var(--resume-accent-color)' }}>
                                {skill.name}
                            </span>
                        ))}
                    </div>
                </section>

                 <section className="mt-8">
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
                <section className="mb-6">
                    <h2 className="text-xl font-bold font-headline mb-2" style={{ color: 'var(--resume-accent-color)' }}>SUMMARY</h2>
                    <p className="text-sm text-gray-300 leading-relaxed">{summary}</p>
                </section>
                <section className="mb-6">
                    <h2 className="text-xl font-bold font-headline mb-2" style={{ color: 'var(--resume-accent-color)' }}>EXPERIENCE</h2>
                    {experience.map(exp => (
                        <div key={exp.id} className="mb-4 flex items-start gap-3">
                            <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: 'var(--resume-accent-color)' }} />
                            <div className="flex-grow">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="text-md font-bold text-gray-100">{exp.title}</h3>
                                    <p className="text-xs text-gray-400">{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</p>
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
                    <section className="mb-6">
                        <h2 className="text-xl font-bold font-headline mb-2" style={{ color: 'var(--resume-accent-color)' }}>PROJECTS</h2>
                        {projects.map(proj => (
                            <div key={proj.id} className="mb-4 flex items-start gap-3">
                                <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: 'var(--resume-accent-color)' }} />
                                <div className="flex-grow">
                                    <h3 className="text-md font-bold text-gray-100">{proj.name}</h3>
                                    {proj.url && <p className="text-sm" style={{ color: 'var(--resume-accent-color)', opacity: 0.9 }}>{proj.url}</p>}
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
                        <section key={section.id} className="mb-6">
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
