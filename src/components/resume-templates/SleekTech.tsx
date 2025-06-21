import type { ResumeData } from '@/lib/types';
import { Phone, Mail, MapPin, Linkedin, Globe } from 'lucide-react';

export function SleekTech({ data }: { data: ResumeData }) {
    const { personalInfo, summary, experience, education, projects, skills } = data;
    return (
        <div className="font-sans text-white bg-[#1a1a1a] flex">
            <div className="w-1/3 bg-[#2a2a2a] p-6 flex flex-col">
                 <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold font-headline text-cyan-400">{personalInfo.name}</h1>
                    {personalInfo.jobTitle && <p className="text-lg text-cyan-300/90 mt-1">{personalInfo.jobTitle}</p>}
                </header>
                <div className="text-sm space-y-3 text-gray-300">
                    <div className="flex items-center gap-2"><Phone size={14} className="text-cyan-400"/><span>{personalInfo.phone}</span></div>
                    <div className="flex items-center gap-2"><Mail size={14} className="text-cyan-400"/><span>{personalInfo.email}</span></div>
                    <div className="flex items-center gap-2"><MapPin size={14} className="text-cyan-400"/><span>{personalInfo.address}</span></div>
                    {personalInfo.linkedin && <div className="flex items-center gap-2"><Linkedin size={14} className="text-cyan-400"/><span>{personalInfo.linkedin}</span></div>}
                    {personalInfo.portfolio && <div className="flex items-center gap-2"><Globe size={14} className="text-cyan-400"/><span>{personalInfo.portfolio}</span></div>}
                </div>

                <section className="mt-8">
                    <h2 className="text-lg font-semibold font-headline text-cyan-400 mb-3 border-b-2 border-cyan-400/50 pb-1">SKILLS</h2>
                    <div className="flex flex-wrap gap-2">
                        {skills.map(skill => <span key={skill} className="bg-gray-700 text-cyan-300 text-xs font-mono px-2 py-1 rounded">{skill}</span>)}
                    </div>
                </section>

                 <section className="mt-8">
                    <h2 className="text-lg font-semibold font-headline text-cyan-400 mb-3 border-b-2 border-cyan-400/50 pb-1">EDUCATION</h2>
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
                    <h2 className="text-xl font-bold font-headline text-cyan-400 mb-2">SUMMARY</h2>
                    <p className="text-sm text-gray-300 leading-relaxed">{summary}</p>
                </section>
                <section className="mb-6">
                    <h2 className="text-xl font-bold font-headline text-cyan-400 mb-2">EXPERIENCE</h2>
                    {experience.map(exp => (
                        <div key={exp.id} className="mb-4 relative pl-4 before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:bg-cyan-400 before:rounded-full">
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
                    <section>
                        <h2 className="text-xl font-bold font-headline text-cyan-400 mb-2">PROJECTS</h2>
                        {projects.map(proj => (
                            <div key={proj.id} className="mb-4 relative pl-4 before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:bg-cyan-400 before:rounded-full">
                                <h3 className="text-md font-bold text-gray-100">{proj.name}</h3>
                                {proj.url && <p className="text-sm text-cyan-400/80">{proj.url}</p>}
                                <p className="text-sm text-gray-300 my-1">{proj.description}</p>
                                <ul className="list-none mt-1 text-sm text-gray-400 space-y-1">
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
