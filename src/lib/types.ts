import { z } from 'zod';

export const ExperienceSchema = z.object({
    id: z.string(),
    title: z.string().min(1, "Title is required"),
    company: z.string().min(1, "Company is required"),
    location: z.string().optional(),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
    isCurrent: z.boolean().optional(),
    points: z.array(z.string()).optional(),
});

export const EducationSchema = z.object({
    id: z.string(),
    institution: z.string().min(1, "Institution is required"),
    degree: z.string().min(1, "Degree is required"),
    fieldOfStudy: z.string().optional(),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
});

export const ProjectSchema = z.object({
    id: z.string(),
    name: z.string().min(1, "Project name is required"),
    description: z.string().optional(),
    url: z.string().url().optional().or(z.literal('')),
    points: z.array(z.string()).optional(),
});

export const PublicationSchema = z.object({
    id: z.string(),
    title: z.string().min(1, "Title is required"),
    authors: z.array(z.string()).min(1, "At least one author is required"),
    journal: z.string().min(1, "Journal or conference name is required"),
    year: z.string().min(4, "Year is required"),
    url: z.string().url().optional().or(z.literal('')),
});

export const SkillSchema = z.object({
    id: z.string(),
    name: z.string().min(1, "Skill name is required"),
});

export const ResumeSchema = z.object({
  personalInfo: z.object({
    name: z.string().min(1, "Name is required"),
    jobTitle: z.string().optional(),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    address: z.string().min(1, "Address is required"),
    linkedin: z.string().url().optional().or(z.literal('')),
    portfolio: z.string().url().optional().or(z.literal('')),
  }),
  summary: z.string().min(1, "A summary is required."),
  experience: z.array(ExperienceSchema),
  education: z.array(EducationSchema),
  projects: z.array(ProjectSchema).optional(),
  publications: z.array(PublicationSchema).optional(),
  skills: z.array(SkillSchema).min(1, "At least one skill is required."),
});

export type ResumeData = z.infer<typeof ResumeSchema>;
export type ExperienceData = z.infer<typeof ExperienceSchema>;
export type EducationData = z.infer<typeof EducationSchema>;
export type ProjectData = z.infer<typeof ProjectSchema>;
export type PublicationData = z.infer<typeof PublicationSchema>;
export type SkillData = z.infer<typeof SkillSchema>;
