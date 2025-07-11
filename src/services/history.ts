// History
import { UserData, Progress, courses } from '../data';
import { getCookie } from './cookie';

const userData: UserData = {
    id: "u1",
    name: "Saket Kumar Sinha",
    email: "imsaket123@gmail.com",
    avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    enrolledCourses: [],
    progress: [],
    certificates: [
        {
            id: "cert1",
            courseId: "c1",
            courseName: "Complete Python Bootcamp: From Zero to Hero",
            userName: "Saket Kumar Sinha",
            issueDate: "2024-03-15",
            imageUrl: "/certificates/python-certificate.jpg"
        }
    ],
    joinDate: "2024-01-10"
};
export function getUserDataFromCookie() {
    const userDataCookie = getCookie('userData');
    if (userDataCookie) {
        try {
            const parsedData = JSON.parse(decodeURIComponent(userDataCookie));
            return parsedData as UserData;
        } catch (error) {
            console.error('Error parsing user data from cookie:', error);
        }
    } else {
        document.cookie = `userData=${encodeURIComponent(JSON.stringify(userData))}; path=/; max-age=604800`; // 7 days expiry
    }
    // Sort enrolledCourses by progress lastAccessed (most recent first)

    return userData; // Return default user data if cookie is not set or invalid

}

export function updateFinishProgressOfUserData(courseId: string, completedLectures: string) {
    const userData = getUserDataFromCookie();
    const progressIndex = userData.progress.findIndex((p: Progress) => p.courseId === courseId);
    if (!userData.enrolledCourses.includes(courseId)) {
        userData.enrolledCourses.push(courseId);
    }
    if (progressIndex !== -1) {
        // Update existing progress
        userData.progress[progressIndex].completedLectures.push(completedLectures);
        userData.progress[progressIndex].lastAccessed = new Date().toISOString();
        userData.progress[progressIndex].overallProgress = calculateOverallProgress(courseId, completedLectures);
    } else {
        // Add new progress entry
        userData.progress.push({
            courseId,
            completedLectures: [completedLectures],
            quizResults: [],
            overallProgress: calculateOverallProgress(courseId, completedLectures), // Assuming first lecture completion gives 10% progress
            lastAccessed: new Date().toISOString()
        });
    }

    // Save updated user data back to cookie
    document.cookie = `userData=${encodeURIComponent(JSON.stringify(userData))}; path=/; max-age=604800`; // 7 days expiry

}
export function updateProgressOfUserData(courseId: string) {
    const userData = getUserDataFromCookie();
    const progressIndex = userData.progress.findIndex((p: Progress) => p.courseId === courseId);
    if (!userData.enrolledCourses.includes(courseId)) {
        userData.enrolledCourses.push(courseId);
    }
    if (progressIndex !== -1) {
        // Update existing progress
        userData.progress[progressIndex].lastAccessed = new Date().toISOString();
    } else {
        // Add new progress entry
        userData.progress.push({
            courseId,
            completedLectures: [],
            quizResults: [],
            overallProgress: 0,
            lastAccessed: new Date().toISOString()
        });
    }

    // Save updated user data back to cookie
    document.cookie = `userData=${encodeURIComponent(JSON.stringify(userData))}; path=/; max-age=604800`; // 7 days expiry

}
export function calculateOverallProgress(courseId: string, completedLectures: string): number {
    const course = courses.find(c => c.id === courseId);
    const userData = getUserDataFromCookie();
    const progress = userData.progress.find(p => p.courseId === courseId);
    if (progress && course) {
        const completedLecturesCount = progress.completedLectures.includes(completedLectures)
            ? progress.completedLectures.length
            : progress.completedLectures.length + 1;
        const totalLecturesCount = course.curriculum.reduce((sum, section) => sum + (section.lectures ? section.lectures.length : 0), 0);
        progress.overallProgress = Math.round((completedLecturesCount / totalLecturesCount) * 100);
        return progress.overallProgress;
    }
    return 0; // No progress found
}