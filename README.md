# Resume Warrior

Welcome to **Resume Warrior**, a powerful, open-source resume builder designed to help you conquer the job market. This AI-powered application streamlines the process of creating professional, modern resumes and cover letters, giving you the tools you need to stand out to recruiters.

![Resume Warrior Screenshot](https://placehold.co/1200x630.png "Resume Warrior application interface showing the editor and a resume preview.")

## ✨ Key Features

Resume Warrior is packed with features to make your job application process seamless and effective:

-   **🤖 AI-Powered Content Generation**:
    -   **Generate from Prompt**: Create a complete, well-structured resume draft from a simple text description of your experience.
    -   **AI Summary Writer**: Automatically generate a concise and impactful professional summary based on your experience and skills.
    -   **Point Rephrasing**: Enhance your work experience bullet points with AI suggestions to make them more professional and achievement-oriented.

-   **📝 Live Resume Editor**:
    -   **Real-Time Preview**: See your resume update instantly as you edit.
    -   **Drag & Drop Interface**: Easily reorder sections (experience, education, projects, skills) to tailor your resume for any application.
    -   **Theme Customization**: Personalize your resume's accent color and font family to match your style.

-   **📄 Professional Templates**:
    -   Choose from a variety of professionally designed, ATS-friendly templates, including options for creative, corporate, tech, and academic roles.
    -   All templates are free and fully customizable.

-   **🛠️ Career Tools**:
    -   **AI Resume Analyzer**: Paste your resume and a job description to get a "match score" (0-100), a list of matching and missing keywords, and actionable suggestions for improvement.
    -   **AI Cover Letter Generator**: Produce a tailored cover letter based on your resume and a job description, with options to adjust the tone.

-   **🚀 High-Quality Export**:
    -   Download your finished resume as a high-resolution, pixel-perfect PDF or PNG file, ready for submission.

## 🛠️ Tech Stack

This project is built with a modern, robust tech stack:

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **AI**: [Google's Genkit](https://firebase.google.com/docs/genkit)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
-   **State Management**: [React Hook Form](https://react-hook-form.com/)
-   **Deployment**: [Netlify](https://www.netlify.com/)

## 🚀 Getting Started

To get started with development, follow these steps:

### Prerequisites

-   Node.js (v20.11.1 or higher)
-   npm (or yarn/pnpm)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd resume-warrior
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Google AI API key. You can get a key from [Google AI Studio](https://aistudio.google.com/app/apikey).
    ```env
    # This key is used by Genkit for AI features.
    GOOGLE_API_KEY=your_google_api_key_here
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

This will start the Next.js application, typically on `http://localhost:9002`.

## 👨‍💻 Developer

This project was developed by **Mantu Gupta**.

## 📄 License

This project is licensed under the MIT License.
