import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { courses } from '../../data';
import { Course, LectureItem } from '../../types';

export function useLectureData() {
    const { courseId, lectureId } = useParams<{ courseId: string; lectureId: string }>();
    const [course, setCourse] = useState<Course | null>(null);
    const [lecture, setLecture] = useState<LectureItem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const foundCourse = courses.find(c => c.id === courseId);
        if (foundCourse) {
            setCourse(foundCourse);
            for (const section of foundCourse.curriculum) {
                const foundLecture = section.lectures.find(l => l.id === lectureId);
                if (foundLecture) {
                    setLecture(foundLecture);
                    document.title = `${foundLecture.title} | Saket LearnHub`;
                    break;
                }
            }
        }
        setTimeout(() => setLoading(false), 800);
    }, [courseId, lectureId]);

    return { course, lecture, loading, courseId, lectureId };
}
