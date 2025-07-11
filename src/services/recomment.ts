import { Course, courses } from "../data";
import { CourseRecommendation, recommendCoursesBatch } from "./aiService";
import { getWishlist, getCartItemIds } from "./cookie";
import { getEnrolledCoursesID } from "./history";

export async function getRecommendedCourses(): Promise<Course[]> {
    const enrolledCourses = await getEnrolledCoursesID();
    const wishlist = await getWishlist();
    const cartItemIds = await getCartItemIds();

    // Combine all course IDs to exclude from recommendations
    const excludedCourseIds = new Set([
        ...enrolledCourses,
        ...(wishlist ? wishlist : []),
        ...cartItemIds
    ]);

    // Fetch recommended courses from the AI service, passing excluded IDs
    const recommendedCoursesMap: CourseRecommendation[] = await recommendCoursesBatch(Array.from(excludedCourseIds));
    
    // Extract course IDs from recommendations
    const recommendedCourseIds = new Set(recommendedCoursesMap.map(rec => rec.id));
    
    // Convert to array of Course objects
    const recommendedCourses: Course[] = courses.filter((course: Course) =>
        recommendedCourseIds.has(course.id) && !excludedCourseIds.has(course.id)
    );
    return recommendedCourses;
}