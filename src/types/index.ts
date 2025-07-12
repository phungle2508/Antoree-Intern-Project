
export interface Category {
    id: string;
    name: string;
}
export interface CartItem {
  id: string;
  quantity: number;
}

export interface HistoryItem {
  id: string;
  quantity: number;
}

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    company: string;
    avatarUrl: string;
    content: string;
    rating: number;
}
// This file was auto-generated
export interface Author {
    id: string;
    name: string;
    role: string;
    avatarUrl: string;
    bio: string;

}
export interface Progress {
    courseId: string;
    completedLectures: string[];
    quizResults: {
        quizId: string;
        score: number;
        completed: boolean;
    }[];
    overallProgress: number;
    lastAccessed: string;
}
export interface Certificate {
    id: string;
    courseId: string;
    courseName: string;
    userName: string;
    issueDate: string;
    imageUrl: string;
}
export interface UserData {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    enrolledCourses: string[];
    progress: Progress[];
    certificates: Certificate[];
    joinDate: string;
}
export interface CourseRecommendation {
    includes(id: string): unknown;
    id: string;
    title: string;
    description: string;
    score: number;
}

export interface ChatAIResult {
    score: number;
    courses: CourseRecommendation[];
}

export interface Review {
    id: string;
    userId: string;
    userName: string;
    userAvatarUrl: string;
    rating: number;
    comment: string;
    date: string;
}

export interface LectureItem {
    id: string;
    title: string;
    duration: string;
    videoUrl: string;
    description: string;
    isFree: boolean;
}

export interface Section {
    id: string;
    title: string;
    lectures: LectureItem[];
}

export interface Quiz {
    id: string;
    title: string;
    description: string;
    questions: Question[];
}

export interface Question {
    id: string;
    text: string;
    options: string[];
    correctOptionIndex: number;
}

export interface Course {
    id: string;
    title: string;
    slug: string;
    description: string;
    longDescription: string;
    imageUrl: string;
    category: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    price: number | null;
    isFeatured: boolean;
    isPopular: boolean;
    enrolledStudents: number;
    rating: number;
    reviewCount: number;
    language: string;
    lastUpdated: string;
    authorId: string;
    curriculum: Section[];
    requirements: string[];
    objectives: string[];
    tags: string[];
    quizzes: Quiz[];
    reviews: Review[];
}
