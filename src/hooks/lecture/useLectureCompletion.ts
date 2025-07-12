import { useEffect, useState } from 'react';
import { updateFinishProgressOfUserData } from '../../services/historyService';

export function useLectureCompletion(courseId: string | undefined, lectureId: string | undefined) {
    const [showCompletionModal, setShowCompletionModal] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowCompletionModal(true);
            if (courseId && lectureId) {
                updateFinishProgressOfUserData(courseId, lectureId);
            }
        }, 10000);

        return () => clearTimeout(timer);
    }, [courseId, lectureId]);

    return { showCompletionModal, setShowCompletionModal };
}
