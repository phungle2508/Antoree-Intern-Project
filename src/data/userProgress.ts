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

// export default userData;