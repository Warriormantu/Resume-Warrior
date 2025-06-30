import type { ResumeData } from '@/lib/types';

export const sampleResumeData: ResumeData = {
  personalInfo: {
    name: 'Your Name',
    jobTitle: 'Professional Title',
    email: 'your.email@example.com',
    phone: '123-456-7890',
    address: 'Your City, State',
    linkedin: 'linkedin.com/in/yourprofile',
    portfolio: 'yourportfolio.com',
  },
  summary:
    'Highly-motivated and detail-oriented Software Engineer with 5+ years of experience developing and scaling web applications. Proficient in JavaScript, React, and Node.js with a proven track record of delivering high-quality code and collaborating effectively in agile environments. Seeking to leverage full-stack expertise to build innovative solutions at a forward-thinking company.',
  experience: [
    {
      id: '1',
      title: 'Job Title',
      company: 'Company Name',
      location: 'City, State',
      startDate: '2020-01',
      endDate: '',
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
  skills: [
    { id: '1', name: 'Skill 1' },
    { id: '2', name: 'Skill 2' },
    { id: '3', name: 'Skill 3' },
    { id: '4', name: 'Data Analysis' },
    { id: '5', name: 'Project Management' },
  ],
  projects: [
    {
        id: '1',
        name: 'Project Name',
        description: 'A brief description of your project, highlighting the technologies used and your role.',
        url: 'https://your-project-url.com',
        points: [
            'Key feature or contribution 1: e.g., Implemented a feature that improved performance by 20%.',
            'Key feature or contribution 2: e.g., Designed and built the user authentication system.',
        ]
    }
  ],
  custom: [
    {
        id: '1',
        title: 'Awards',
        content: 'First Place, National Design Competition (2021)\nEmployee of the Month (March 2022)'
    }
  ]
};
