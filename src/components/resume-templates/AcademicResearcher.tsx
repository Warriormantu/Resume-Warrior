import type { ResumeData } from '@/lib/types';

export function AcademicResearcher({ data }: { data: ResumeData }) {
    const { personalInfo, summary, experience, education, projects, skills } = data;
    return (
        <div className="font-serif text-gray-800">
            <header className="text-center mb-6 pb-4 border-b border-gray-300">
                <h1 className="text-4xl font-bold text-gray-900">{personalInfo.name}</h1>
                <p className="text-sm text-gray-600 mt-2">
                    {personalInfo.address} | {personalInfo.phone} | {personalInfo.email}
                </p>
                 <p className="text-sm text-gray-600 mt-1">
                    {personalInfo.linkedin && `LinkedIn: ${personalInfo.linkedin}`}
                    {personalInfo.portfolio && ` | Portfolio: ${personalInfo.portfolio}`}
                </p>
            </header>

            <section className="mb-4">
                <h2 className="text-lg font-bold text-gray-800 pb-1 mb-2">Research Interests</h2>
                <p className="text-sm text-gray-700">{summary}</p>
            </section>
            
            <section className="mb-4">
                <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2 text-gray-800">Education</h2>
                {education.map(edu => (
                     <div key={edu.id} className="mb-2">
                        <div className="flex justify-between items-baseline">
                           <h3 className="text-md font-bold text-gray-800">{edu.degree}{edu.fieldOfStudy && `, ${edu.fieldOfStudy}`}</h3>
                           <p className="text-xs text-gray-600">{edu.startDate} - {edu.endDate}</p>
                        </div>
                        <p className="text-sm text-gray-600">{edu.institution}</p>
                     </div>
                ))}
            </section>

            <section className="mb-4">
                <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2 text-gray-800">Research Experience</h2>
                {experience.map(exp => (
                    <div key={exp.id} className="mb-3">
                        <div className="flex justify-between items-baseline">
                             <h3 className="text-md font-bold text-gray-800">{exp.title}</h3>
                             <p className="text-xs text-gray-600">{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</p>
                        </div>
                        <p className="text-sm font-semibold text-gray-600">{exp.company}{exp.location && `, ${exp.location}`}</p>
                        <ul className="list-disc list-inside mt-1 text-sm text-gray-700">
                            {exp.points?.map((point, i) => <li key={i}>{point}</li>)}
                        </ul>
                    </div>
                ))}
            </section>

            {projects && projects.length > 0 && (
                <section className="mb-4">
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

             <section className="mb-4">
                <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2 text-gray-800">Skills</h2>
                <ul className="columns-2 text-sm text-gray-700">
                  {skills.map(skill => <li key={skill}>{skill}</li>)}
                </ul>
            </section>

            {/* Dummy sections for Academic CV */}
            <section className="mb-4">
                <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2 text-gray-800">Publications</h2>
                <div className="text-sm text-gray-700 space-y-2">
                    <p>Doe, J. (2023). The Study of Placeholders in UI Design. *Journal of Virtual Studies*, 15(2), 123-145.</p>
                     <p>Doe, J. & Smith, A. (2022). Advanced Pattern Recognition in Sample Data. *Proceedings of the International Conference on AI*, 45-52.</p>
                </div>
            </section>
        </div>
    );
}
