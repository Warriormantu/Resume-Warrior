import type { ResumeData } from '@/lib/types';

export const sampleResumeData: ResumeData = {
  personalInfo: {
    name: 'Arjun Kumar',
    jobTitle: 'Full-Stack Developer',
    email: 'arjun.kumar@example.com',
    phone: '+91 98765 43210',
    address: 'Lucknow, Uttar Pradesh',
    linkedin: 'linkedin.com/in/arjun-kumar-dev',
    portfolio: 'github.com/arjun-kumar',
  },
  summary:
    'Results-driven Full-Stack Developer with 5+ years of experience in designing, developing, and deploying scalable web applications. Proficient in MERN stack (MongoDB, Express, React, Node.js) and dedicated to creating seamless user experiences. Proven ability to lead projects, mentor junior developers, and collaborate effectively in fast-paced Agile environments.',
  experience: [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'Innovate Solutions Inc.',
      location: 'Bengaluru, Karnataka',
      startDate: '2021-06',
      endDate: '',
      isCurrent: true,
      points: [
        'Led the development of a new client-facing analytics dashboard using React and D3.js, resulting in a 30% increase in user engagement.',
        'Architected and implemented a new RESTful API service with Node.js and Express, improving data retrieval times by 40%.',
        'Mentored and coached a team of 3 junior developers, improving team velocity and code quality.',
      ],
    },
    {
      id: '2',
      title: 'Software Engineer',
      company: 'Tech Genesis LLC',
      location: 'Pune, Maharashtra',
      startDate: '2018-07',
      endDate: '2021-05',
      isCurrent: false,
      points: [
        'Developed and maintained features for a large-scale e-commerce platform using the MERN stack.',
        'Collaborated with the product team to design and implement new user-facing features, contributing to a 15% growth in user base.',
        'Wrote unit and integration tests using Jest and React Testing Library, achieving 90% test coverage for critical components.',
      ],
    },
  ],
  education: [
    {
      id: '1',
      institution: 'Indian Institute of Technology, Kanpur',
      degree: 'Bachelor of Technology (B.Tech)',
      fieldOfStudy: 'Computer Science and Engineering',
      startDate: '2014-08',
      endDate: '2018-05',
    },
  ],
  skills: [
    { id: '1', name: 'JavaScript (ES6+)' },
    { id: '2', name: 'React.js' },
    { id: '3', name: 'Node.js' },
    { id: '4', name: 'Express.js' },
    { id: '5', name: 'MongoDB' },
    { id: '6', name: 'RESTful APIs' },
    { id: '7', name: 'GraphQL' },
    { id: '8', name: 'TypeScript' },
    { id: '9', name: 'Git & GitHub' },
    { id: '10', name: 'Docker' },
    { id: '11', name: 'Jest & RTL' },
    { id: '12', name: 'Agile Methodologies' },
  ],
  projects: [
    {
        id: '1',
        name: 'ProjectFlow - Project Management Tool',
        description: 'A comprehensive project management application built with the MERN stack, featuring real-time collaboration with Socket.IO.',
        url: 'github.com/arjun-kumar/projectflow',
        points: [
            'Implemented a drag-and-drop task board using React-Beautiful-DND.',
            'Designed a secure user authentication and authorization system with JWT.',
        ]
    }
  ],
  custom: [
    {
        id: '1',
        title: 'Certifications',
        content: 'AWS Certified Solutions Architect – Associate (2022)'
    }
  ]
};
