import type { ResumeData } from '@/lib/types';

export function ClassicProfessional({ data }: { data: ResumeData }) {
    const { personalInfo, summary, experience, education, skills } = data;
    return (
        <div className="font-sans text-slate-800">
            <header className="text-center mb-6">
                <h1 className="text-4xl font-bold font-headline text-slate-800">{personalInfo.name}</h1>
                <p className="text-sm text-slate-600">
                    {personalInfo.address} | {personalInfo.phone} | {personalInfo.email}
                    {personalInfo.linkedin && ` | ${personalInfo.linkedin}`}
                    {personalInfo.portfolio && ` | ${personalInfo.portfolio}`}
                </p>
            </header>
            <section className="mb-4">
                <h2 className="text-lg font-bold font-headline border-b-2 border-slate-400 pb-1 mb-2 text-slate-700">SUMMARY</h2>
                <p className="text-sm text-slate-700">{summary}</p>
            </section>
            <section className="mb-4">
                <h2 className="text-lg font-bold font-headline border-b-2 border-slate-400 pb-1 mb-2 text-slate-700">EXPERIENCE</h2>
                {experience.map(exp => (
                    <div key={exp.id} className="mb-3">
                        <div className="flex justify-between items-baseline">
                             <h3 className="text-md font-bold text-slate-800">{exp.title}</h3>
                             <p className="text-xs text-slate-600">{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</p>
                        </div>
                        <p className="text-sm font-semibold text-slate-600">{exp.company}{exp.location && `, ${exp.location}`}</p>
                        <ul className="list-disc list-inside mt-1 text-sm text-slate-700">
                            {exp.points?.map((point, i) => <li key={i}>{point}</li>)}
                        </ul>
                    </div>
                ))}
            </section>
            <section className="mb-4">
                <h2 className="text-lg font-bold font-headline border-b-2 border-slate-400 pb-1 mb-2 text-slate-700">EDUCATION</h2>
                {education.map(edu => (
                     <div key={edu.id} className="mb-2">
                        <div className="flex justify-between items-baseline">
                           <h3 className="text-md font-bold text-slate-800">{edu.institution}</h3>
                           <p className="text-xs text-slate-600">{edu.startDate} - {edu.endDate}</p>
                        </div>
                        <p className="text-sm text-slate-600">{edu.degree}{edu.fieldOfStudy && `, ${edu.fieldOfStudy}`}</p>
                     </div>
                ))}
            </section>
            <section>
                 <h2 className="text-lg font-bold font-headline border-b-2 border-slate-400 pb-1 mb-2 text-slate-700">SKILLS</h2>
                 <p className="text-sm text-slate-700">{skills.join(' | ')}</p>
            </section>
        </div>
    );
}
