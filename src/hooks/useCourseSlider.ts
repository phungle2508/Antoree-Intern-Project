import { useEffect, useRef, useState } from 'react';
import { Course } from '../types';

export function useCourseSlider(open: boolean, courses: Course[]) {
    const [visibleCourses, setVisibleCourses] = useState<Course[]>([]);
    const sliderRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState<string>('');
    const [imageLoadStates, setImageLoadStates] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        if (!open) return;
        setVisibleCourses(courses);
    }, [open, courses]);

    const checkScrollButtons = () => {
        if (sliderRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        const slider = sliderRef.current;
        if (slider) {
            slider.addEventListener('scroll', checkScrollButtons);
            checkScrollButtons();
            return () => {
                slider.removeEventListener('scroll', checkScrollButtons);
            };
        }
    }, [visibleCourses]);

    const scroll = (direction: 'left' | 'right') => {
        if (sliderRef.current) {
            const { clientWidth } = sliderRef.current;
            const scrollAmount = direction === 'left' ? -clientWidth / 2 : clientWidth / 2;
            sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const handleImageLoad = (courseId: string) => {
        setImageLoadStates(prev => ({ ...prev, [courseId]: true }));
    };

    return {
        visibleCourses,
        sliderRef,
        canScrollLeft,
        canScrollRight,
        showModal,
        setShowModal,
        selectedCourseId,
        setSelectedCourseId,
        imageLoadStates,
        handleImageLoad,
        scroll,
    };
}
