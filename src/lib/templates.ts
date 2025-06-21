export interface Template {
    id: string;
    name: string;
    price: number; // in INR
    image: string;
    hint: string;
}

export const templates: Template[] = [
  {
    id: 'classic-professional',
    name: 'Classic Professional',
    price: 0,
    image: 'https://placehold.co/400x566.png',
    hint: 'resume professional',
  },
  {
    id: 'modern-creative',
    name: 'Modern Creative',
    price: 49,
    image: 'https://placehold.co/400x566.png',
    hint: 'resume modern',
  },
  {
    id: 'bold-minimalist',
    name: 'Bold Minimalist',
    price: 0,
    image: 'https://placehold.co/400x566.png',
    hint: 'resume minimalist',
  },
  {
    id: 'corporate-ladder',
    name: 'Corporate Ladder',
    price: 49,
    image: 'https://placehold.co/400x566.png',
    hint: 'resume corporate',
  },
   {
    id: 'sleek-tech',
    name: 'Sleek Tech',
    price: 49,
    image: 'https://placehold.co/400x566.png',
    hint: 'resume tech',
  },
  {
    id: 'academic-researcher',
    name: 'Academic Researcher',
    price: 0,
    image: 'https://placehold.co/400x566.png',
    hint: 'resume academic',
  },
];

export const getTemplateById = (id: string | undefined) => templates.find(t => t.id === id);
