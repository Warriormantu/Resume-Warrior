import type { ResumeData } from '@/lib/types';
import { Phone, Mail, MapPin, Linkedin, Globe } from 'lucide-react';

export function SleekTech({ data }: { data: ResumeData }) {
    const { personalInfo, summary, experience, education, projects, skills, custom } = data;
    return (
        <div className="font-sans text-white bg-[#1a1a1a] flex break-words break-all" style={{ fontFamily: 'var(--resume-font-family, "sans-serif")' }}>
            <div className="w-1/3 bg-[#2a2a2a] p-6 flex flex-col">
                 <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold font-headline" style={{ color: 'var(--resume-accent-color)' }}>{personalInfo.name}</h1>
                    {personalInfo.jobTitle && <p className="text-lg mt-1" style={{ color: 'var(--resume-accent-color)', opacity: 0.9 }}>{personalInfo.jobTitle}</p>}
                </header>
                <div className="text-sm space-y-3 text-gray-300">
                    <div className="flex items-center gap-2"><Phone size={14} style={{ color: 'var(--resume-accent-color)' }}/><span>{personalInfo.phone}</span></div>
                    <div className="flex items-center gap-2"><Mail size={14} style={{ color: 'var(--resume-accent-color)' }}/><span>{personalInfo.email}</span></div>
                    <div className="flex items-center gap-2"><MapPin size={14} style={{ color: 'var(--resume-accent-color)' }}/><span>{personalInfo.address}</span></div>
                    {personalInfo.linkedin && <div className="flex items-center gap-2"><Linkedin size={14} style={{ color: 'var(--resume-accent-color)' }}/><span>{personalInfo.linkedin}</span></div>}
                    {personalInfo.portfolio && <div className="flex items-center gap-2"><Globe size={14} style={{ color: 'var(--resume-accent-color)' }}/><span>{personalInfo.portfolio}</span></div>}
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
                        <div key={exp.id} className="mb-4 relative pl-4 before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:rounded-full" style={{ '--before-bg': 'var(--resume-accent-color)' } as React.CSSProperties}>
                            <style>{`
                                .before\\:absolute::before {
                                    background-color: var(--before-bg) !important;
                                }
                            `}</style>
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-md font-bold text-gray-100">{exp.title}</h3>
                                <p className="text-xs text-gray-400">{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</p>
                            </div>
                            <p className="text-sm font-semibold text-gray-300">{exp.company}</p>
                            <ul className="list-none mt-1 text-sm text-gray-400 space-y-1">
                                {exp.points?.map((point, i) => <li key={i}>{point}</li>)}
                            </ul>
                        </div>
                    ))}
                </section>
                 {projects && projects.length > 0 && (
                    <section className="mb-6">
                        <h2 className="text-xl font-bold font-headline mb-2" style={{ color: 'var(--resume-accent-color)' }}>PROJECTS</h2>
                        {projects.map(proj => (
                            <div key={proj.id} className="mb-4 relative pl-4 before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:rounded-full" style={{ '--before-bg': 'var(--resume-accent-color)' } as React.CSSProperties}>
                                <h3 className="text-md font-bold text-gray-100">{proj.name}</h3>
                                {proj.url && <p className="text-sm" style={{ color: 'var(--resume-accent-color)', opacity: 0.9 }}>{proj.url}</p>}
                                <p className="text-sm text-gray-300 my-1">{proj.description}</p>
                                <ul className="list-none mt-1 text-sm text-gray-400 space-y-1">
                                    {proj.points?.map((point, i) => <li key={i}>{point}</li>)}
                                </ul>
                            </div>
                        ))}
                    </section>
                 )}
                 {custom?.map(section => (
                    section.title && section.content && (
                        <section key={section.id} className="mb-6">
                            <h2 className="text-xl font-bold font-headline mb-2" style={{ color: 'var(--resume-accent-color)' }}>{section.title.toUpperCase()}</h2>
                             <div className="relative pl-4 before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:rounded-full" style={{ '--before-bg': 'var(--resume-accent-color)' } as React.CSSProperties}>
                                <ul className="list-none mt-1 text-sm text-gray-400 space-y-1">
                                    {section.content.split('\n').filter(p => p).map((point, i) => <li key={i}>{point}</li>)}
                                </ul>
                            </div>
                        </section>
                    )
                ))}
            </div>
        </div>
    );
}
