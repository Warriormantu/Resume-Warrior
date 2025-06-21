import type { ResumeData } from '@/lib/types';

export const sampleResumeData: ResumeData = {
  personalInfo: {
    name: 'Your Name',
    email: 'your.email@example.com',
    phone: '123-456-7890',
    address: 'Your City, State',
    linkedin: 'linkedin.com/in/yourprofile',
    portfolio: 'yourportfolio.com',
  },
  summary:
    'A brief summary about your professional background, skills, and career goals. Tailor this to the job you are applying for.',
  experience: [
    {
      id: '1',
      title: 'Job Title',
      company: 'Company Name',
      location: 'City, State',
      startDate: '2020-01',
      endDate: 'Present',
      isCurrent: true,
      points: [
        'Accomplishment or responsibility 1',
        'Accomplishment or responsibility 2',
      ],
    },
  ],
  education: [
    {
      id: '1',
      institution: 'University Name',
      degree: 'Degree or Certificate',
      fieldOfStudy: 'Field of Study',
      startDate: '2016-09',
      endDate: '2020-05',
    },
  ],
  skills: ['Skill 1', 'Skill 2', 'Skill 3', 'Data Analysis', 'Project Management'],
};
