## 📚 Overview

**E-Learning Platform** is a robust and scalable web application providing interactive online learning experiences for students and instructors. Built entirely with TypeScript and modern frontend technologies, this project is a **client-side only** (frontend) application—no backend or server-side code is included.

---

## ✨ Features

- **Course Management:** Browse, organize, and view courses with modules, lessons, and resources (UI mockups).
- **Progress Tracking:** Visualize student progress and reports (client-side only).
- **Responsive Design:** Seamless user experience across desktop, tablet, and mobile.
- **Dashboard:** UI for managing courses, and analytics (mocked).

---

## 🛠️ Tech Stack

- **TypeScript** (primary language)
- **React** (SPA, component-based architecture)
- **Vite** (build/bundle tool)
- **Tailwind CSS** (utility-first styling)
- **PostCSS** (CSS transformation)
- **React Router** (client-side routing)
- **No backend or database**—all data is from client-side mock modules

---

## 🏗️ Project Structure

```
├── public/
│   └── index.html
├── src/
│   ├── App.tsx
│   ├── components/       # Reusable UI components (auth, courses, dashboard, home, layout, lecture, ui)
│   ├── context/          # React Context providers (Theme, etc.)
│   ├── data/             # Mock data modules (courses, testimonials, userProgress)
│   ├── hooks/            # Custom React hooks (dashboard, course, lecture, etc.)
│   ├── lib/              # Utility libraries (axios, cookie)
│   ├── modal/            # Modal components (VideoLectureCompletionModal, ModalChat, ModalNote)
│   ├── pages/            # Routed pages (Home, Catalog, Detail, Quiz, Dashboard, Auth, Video, 404)
│   ├── services/         # Client-side service modules (cart, wishlist, recommend, ai, history)
│   ├── types/            # TypeScript interfaces and types
│   ├── utils/            # Utility functions (autoFakeData)
│   └── vite-env.d.ts
├── public/
│   └── images/
├── ai/                   # AI scripts and data (cli.txt, course.json, recommend_courses.py)
├── dist/                 # Build output (assets, images, index.html, logo.svg)
├── node_modules/         # Project dependencies
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── LICENSE
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/shegga9x/Antoree-Intern-Project.git
   cd Antoree-Intern-Project
   ```

2. **Install dependencies:**

   ```bash
   npm install

   ```

3. **Set up environment variables:**

   Copy the example environment file and update values as needed:

   ```bash
   cp .env.example .env
   # Edit .env to configure environment variables if required
   ```

4. **Run the application:**

   ```bash
   npm run dev
   ```

### AI

The `ai/` folder contains scripts and data for generating course recommendations using machine learning models.  
- It is deployed on a VPS with [sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) to embed about 50 course objects.
- The AI service can recommend similar courses based on embeddings, but does **not** support general conversation or chat.
- This is used for demo and development purposes only; it is not required for running the frontend app.