import { Author, Review, LectureItem, Section, Question, Quiz, Course } from "../types";

// Fake data arrays for generation
const COURSE_TITLES = [
    'Complete JavaScript Bootcamp',
    'React Development Masterclass',
    'Python for Data Science',
    'Web Design Fundamentals',
    'Machine Learning with TensorFlow',
    'Node.js Backend Development',
    'UI/UX Design Principles',
    'Digital Marketing Strategy',
    'Photography Masterclass',
    'Business Analytics with Excel',
    'Mobile App Development',
    'Cybersecurity Essentials',
    'Cloud Computing with AWS',
    'Database Design and SQL',
    'Project Management Professional',
    'Angular Complete Guide',
    'Vue.js from Scratch',
    'Docker and Kubernetes',
    'Game Development with Unity',
    'Blockchain Development'
];

const INSTRUCTOR_NAMES = [
    'Sarah Johnson', 'Mike Chen', 'Emily Davis', 'David Wilson',
    'Lisa Anderson', 'James Brown', 'Maria Garcia', 'Alex Smith',
    'Jennifer Lee', 'Robert Taylor', 'Amanda White', 'Chris Martin'
];

const CATEGORIES = [
    'Programming', 'Web Development', 'Data Science', 'Design',
    'Business', 'Marketing', 'Photography', 'Mobile Development',
    'DevOps', 'Cybersecurity', 'Game Development', 'Blockchain'
];

const DESCRIPTIONS = [
    'Master the fundamentals and advanced concepts in this comprehensive course.',
    'Learn from industry experts with hands-on projects and real-world examples.',
    'Build practical skills that you can apply immediately in your career.',
    'A complete guide from beginner to professional level with practical projects.',
    'Step-by-step learning with interactive exercises, quizzes, and assignments.'
];

const LONG_DESCRIPTIONS = [
    'This comprehensive course will take you from beginner to advanced level. You\'ll learn industry best practices, work on real-world projects, and gain the confidence to tackle complex challenges in your field.',
    'Designed for both beginners and experienced professionals, this course covers all essential concepts with practical examples. By the end, you\'ll have built several projects for your portfolio.',
    'Through hands-on learning and expert instruction, you\'ll master the skills needed to excel in today\'s competitive market. Includes lifetime access and regular updates.',
    'Join thousands of successful students who have transformed their careers with this course. Features interactive content, community support, and career guidance.',
    'Learn from industry veterans with real-world experience. This course includes downloadable resources, practice exercises, and personalized feedback.'
];

// Generate fake authors
export const generateFakeAuthors = (count: number = 10): Author[] => {
    return Array.from({ length: count }, (_, i) => ({
        id: `a${i + 1}`,
        name: INSTRUCTOR_NAMES[i % INSTRUCTOR_NAMES.length],
        role: ['Lead Instructor', 'Senior Developer', 'Industry Expert', 'Technical Mentor'][i % 4],
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${INSTRUCTOR_NAMES[i % INSTRUCTOR_NAMES.length]}`,
        bio: `${INSTRUCTOR_NAMES[i % INSTRUCTOR_NAMES.length]} is an experienced professional with over ${Math.floor(Math.random() * 10) + 5} years in the industry. Specializes in modern development practices and has helped thousands of students achieve their goals.`
    }));
};

// Generate fake reviews
export const generateFakeReviews = (count: number = 5): Review[] => {
    const reviewComments = [
        'This course exceeded my expectations! Clear explanations and great examples.',
        'Excellent instructor and well-structured content. Highly recommended!',
        'I learned so much from this course. The projects were very practical.',
        'Great course for beginners and intermediate learners alike.',
        'The instructor explains complex concepts in an easy-to-understand way.',
        'Perfect balance of theory and practical application.',
        'This course helped me land my dream job. Thank you!',
        'Well worth the investment. Quality content and great support.'
    ];

    return Array.from({ length: count }, (_, i) => ({
        id: `r${i + 1}`,
        userId: `u${i + 1}`,
        userName: `Student ${i + 1}`,
        userAvatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=student${i}`,
        rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
        comment: reviewComments[i % reviewComments.length],
        date: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }));
};

// Generate fake lectures
export const generateFakeLectures = (count: number = 5, section: number): LectureItem[] => {
    const lectureTitles = [
        'Introduction and Overview',
        'Setting Up Your Environment',
        'Core Concepts and Fundamentals',
        'Hands-on Practice Session',
        'Advanced Techniques',
        'Best Practices and Patterns',
        'Project Implementation',
        'Testing and Debugging',
        'Deployment and Production',
        'Performance Optimization'
    ];

    return Array.from({ length: count }, (_, i) => ({
        id: `s${section + 1}l${i + 1}`,
        title: lectureTitles[i % lectureTitles.length],
        duration: `${Math.floor(Math.random() * 40) + 10}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
        videoUrl: `https://example.com/video${i + 1}`,
        description: `Learn about ${lectureTitles[i % lectureTitles.length].toLowerCase()} with practical examples and exercises.`,
        isFree: i < 2 // First 2 lectures are free
    }));
};

// Generate fake sections
export const generateFakeSections = (count: number = 3): Section[] => {
    const sectionTitles = [
        'Getting Started',
        'Core Concepts',
        'Advanced Topics',
        'Practical Applications',
        'Project Development',
        'Final Projects'
    ];

    return Array.from({ length: count }, (_, i) => ({
        id: `s${i + 1}`,
        title: sectionTitles[i % sectionTitles.length],
        lectures: generateFakeLectures(Math.floor(Math.random() * 6) + 3, i) // 3-8 lectures per section
    }));
};

// Generate fake quiz questions
export const generateFakeQuestions = (count: number = 5): Question[] => {
    const questions = [
        {
            text: 'What is the primary purpose of this technology?',
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correctOptionIndex: 0
        },
        {
            text: 'Which of the following is a best practice?',
            options: ['Practice A', 'Practice B', 'Practice C', 'Practice D'],
            correctOptionIndex: 1
        },
        {
            text: 'How do you implement this feature?',
            options: ['Method A', 'Method B', 'Method C', 'Method D'],
            correctOptionIndex: 2
        },
        {
            text: 'What is the correct syntax for this operation?',
            options: ['Syntax A', 'Syntax B', 'Syntax C', 'Syntax D'],
            correctOptionIndex: 3
        },
        {
            text: 'Which tool is most commonly used for this task?',
            options: ['Tool A', 'Tool B', 'Tool C', 'Tool D'],
            correctOptionIndex: 0
        }
    ];

    return Array.from({ length: count }, (_, i) => ({
        id: `qu${i + 1}`,
        ...questions[i % questions.length]
    }));
};


// Generate fake quizzes
export const generateFakeQuizzes = (count: number = 2): Quiz[] => {
    return Array.from({ length: count }, (_, i) => ({
        id: `q${i + 1}`,
        title: `Quiz ${i + 1}: Knowledge Check`,
        description: `Test your understanding of the concepts covered in this section.`,
        questions: generateFakeQuestions(Math.floor(Math.random() * 5) + 3) // 3-7 questions per quiz
    }));
};

// Generate fake courses
export const generateFakeCourses = (count: number = 20): Course[] => {

    const levels: Course['level'][] = ['Beginner', 'Intermediate', 'Advanced'];
    const languages = ['English', 'Spanish', 'French', 'German'];

    return Array.from({ length: count }, (_, i) => {
        const enrolledStudents = Math.floor(Math.random() * 10000) + 500;
        const reviewCount = Math.floor(enrolledStudents * 0.1); // 10% of students leave reviews

        return {
            id: `c${i + 1}`,
            title: COURSE_TITLES[i % COURSE_TITLES.length],
            slug: COURSE_TITLES[i % COURSE_TITLES.length].toLowerCase().replace(/\s+/g, '-'),
            description: DESCRIPTIONS[i % DESCRIPTIONS.length],
            longDescription: LONG_DESCRIPTIONS[i % LONG_DESCRIPTIONS.length],
            imageUrl: `https://picsum.photos/800/600?random=${i}`,
            category: CATEGORIES[i % CATEGORIES.length],
            level: levels[i % levels.length],
            price: Math.random() > 0.1 ? Math.floor(Math.random() * 2001) : null, // 10% free courses, price 0-2000
            isFeatured: Math.random() > 0.7, // 30% featured
            isPopular: Math.random() > 0.6, // 40% popular
            enrolledStudents,
            rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)), // 3.5-5.0
            reviewCount,
            language: languages[i % languages.length],
            lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            authorId: `a${(i % 10) + 1}`, // Assuming 10 authors
            curriculum: generateFakeSections(Math.floor(Math.random() * 4) + 3), // 3-6 sections
            requirements: [
                'Basic computer skills',
                'Internet connection',
                'Willingness to learn'
            ].slice(0, Math.floor(Math.random() * 3) + 1),
            objectives: [
                'Master the fundamentals',
                'Build real-world projects',
                'Gain practical experience',
                'Prepare for career advancement'
            ].slice(0, Math.floor(Math.random() * 4) + 2),
            tags: CATEGORIES.slice(0, Math.floor(Math.random() * 5) + 2), // 2-6 tags
            quizzes: generateFakeQuizzes(Math.floor(Math.random() * 3) + 1), // 1-3 quizzes
            reviews: generateFakeReviews(Math.min(reviewCount, 10)) // Show up to 10 reviews
        };
    });

};

// Utility functions
export const getRandomCourse = (): Course => {
    const courses = generateFakeCourses(1);
    return courses[0];
};

export const getFeaturedCourses = (count: number = 6): Course[] => {
    return generateFakeCourses(count).map(course => ({
        ...course,
        isFeatured: true,
        rating: Number((Math.random() * 0.5 + 4.5).toFixed(1)) // 4.5-5.0 for featured
    }));
};

export const getPopularCourses = (count: number = 8): Course[] => {
    return generateFakeCourses(count).map(course => ({
        ...course,
        isPopular: true,
        enrolledStudents: Math.floor(Math.random() * 5000) + 5000 // Higher enrollment for popular
    }));
};

export const getCoursesByCategory = (category: string, count: number = 10): Course[] => {
    return generateFakeCourses(count).map(course => ({
        ...course,
        category
    }));
};

export const searchCourses = (query: string, count: number = 10): Course[] => {
    return generateFakeCourses(count).map(course => ({
        ...course,
        title: `${query} ${course.title}`,
        description: `Learn ${query.toLowerCase()} with this comprehensive course. ${course.description}`
    }));
};

// Methods to override courses and authors data
export const overrideCourses = (newCourses: Course[]): Course[] => {
    // This method allows you to completely replace the courses array
    // You can use this to override the default courses with your own data
    return newCourses;
};

export const overrideAuthors = (newAuthors: Author[]): Author[] => {
    // This method allows you to completely replace the authors array
    // You can use this to override the default authors with your own data
    return newAuthors;
};

export const mergeCourses = (existingCourses: Course[], newCourses: Course[]): Course[] => {
    // Merge existing courses with new courses, avoiding duplicates by ID
    const courseMap = new Map<string, Course>();

    // Add existing courses
    existingCourses.forEach(course => courseMap.set(course.id, course));

    // Add/update with new courses
    newCourses.forEach(course => courseMap.set(course.id, course));

    return Array.from(courseMap.values());
};

export const mergeAuthors = (existingAuthors: Author[], newAuthors: Author[]): Author[] => {
    // Merge existing authors with new authors, avoiding duplicates by ID
    const authorMap = new Map<string, Author>();

    // Add existing authors
    existingAuthors.forEach(author => authorMap.set(author.id, author));

    // Add/update with new authors
    newAuthors.forEach(author => authorMap.set(author.id, author));

    return Array.from(authorMap.values());
};

export const updateCourseData = (
    courseId: string,
    updates: Partial<Course>,
    courses: Course[]
): Course[] => {
    // Update specific course data by ID
    return courses.map(course =>
        course.id === courseId
            ? { ...course, ...updates }
            : course
    );
};

export const updateAuthorData = (
    authorId: string,
    updates: Partial<Author>,
    authors: Author[]
): Author[] => {
    // Update specific author data by ID
    return authors.map(author =>
        author.id === authorId
            ? { ...author, ...updates }
            : author
    );
};

// Bulk data replacement functions
export const replaceAllCoursesWithFakeData = (count: number = 20): Course[] => {
    // Generate completely new fake courses to replace existing ones
    return generateFakeCourses(count);
};

export const replaceAllAuthorsWithFakeData = (count: number = 10): Author[] => {
    // Generate completely new fake authors to replace existing ones
    return generateFakeAuthors(count);
};

// File replacement methods - these will generate code to replace courses.ts content
export const generateCoursesFileContent = (courses: Course[], authors: Author[]): string => {
    return `// This file was auto-generated
export interface Author {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  bio: string;
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

export const authors: Author[] = ${JSON.stringify(authors, null, 2)};

const courses: Course[] = ${JSON.stringify(courses, null, 2)};

export default courses;
`;
};

export const overwriteCoursesFile = (newCourses?: Course[], newAuthors?: Author[]): string => {
    const coursesToUse = newCourses || generateFakeCourses(20);
    const authorsToUse = newAuthors || generateFakeAuthors(10);

    return generateCoursesFileContent(coursesToUse, authorsToUse);
};

export const generateFakeDataAndFileContent = (courseCount: number = 20, authorCount: number = 10): string => {
    const fakeCourses = generateFakeCourses(courseCount);
    const fakeAuthors = generateFakeAuthors(authorCount);

    return generateCoursesFileContent(fakeCourses, fakeAuthors);
};

