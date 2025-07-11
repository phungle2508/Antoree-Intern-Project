import axios from '../lib/axios'; // or just '../lib/axios'



export const recommendCourses = async (courseId: string, topK: number = 3): Promise<CourseRecommendation[]> => {
    const res = await axios.get('/recommend', {
        params: { course_id: courseId, top_k: topK }
    });
    console.log(res.data);
    return res.data;
};

export const recommendCoursesBatch = async (courseIds: string[], topK: number = 3): Promise<CourseRecommendation[]> => {
    // Create URLSearchParams to properly format the query string
    const params = new URLSearchParams();
    courseIds.forEach(id => params.append('course_ids', id));
    params.append('top_k', topK.toString());

    const res = await axios.post(`/recommend/batch?${params.toString()}`);
    return res.data;
};

export const chatWithAI = async (query: string, topK: number = 3): Promise<ChatAIResult> => {
    const res = await axios.get('/chat', {
        params: { query, top_k: topK }
    });
    return res.data;
};

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
