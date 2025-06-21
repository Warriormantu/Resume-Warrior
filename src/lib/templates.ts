export interface Template {
    id: string;
    name: string;
    price: number; // in INR
}

export const templates: Template[] = [
  {
    id: 'classic-professional',
    name: 'Classic Professional',
    price: 0,
  },
  {
    id: 'modern-creative',
    name: 'Modern Creative',
    price: 49,
  },
  {
    id: 'bold-minimalist',
    name: 'Bold Minimalist',
    price: 0,
  },
  {
    id: 'corporate-ladder',
    name: 'Corporate Ladder',
    price: 49,
  },
   {
    id: 'sleek-tech',
    name: 'Sleek Tech',
    price: 49,
  },
  {
    id: 'academic-researcher',
    name: 'Academic Researcher',
    price: 0,
  },
];

export const getTemplateById = (id: string | undefined) => templates.find(t => t.id === id);
