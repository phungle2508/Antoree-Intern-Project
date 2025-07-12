import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import CourseProgress from './CourseProgress';
import { Course, UserData } from '../../types';

interface ContinueLearningProps {
  enrolledCourses: Course[];
  userData: UserData | null;
}

const ContinueLearning = ({ enrolledCourses, userData }: ContinueLearningProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const sortedCourses = [...enrolledCourses].sort((a, b) => {
    const progressA = userData?.progress.find(p => p.courseId === a.id);
    const progressB = userData?.progress.find(p => p.courseId === b.id);
    const dateA = progressA ? new Date(progressA.lastAccessed).getTime() : 0;
    const dateB = progressB ? new Date(progressB.lastAccessed).getTime() : 0;
    return dateB - dateA;
  });

  useEffect(() => {
    const checkScrollButtons = () => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', checkScrollButtons);
      checkScrollButtons();
      return () => {
        slider.removeEventListener('scroll', checkScrollButtons);
      };
    }
  }, [sortedCourses]);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { clientWidth } = sliderRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth / 2 : clientWidth / 2;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Continue Learning</h2>
        <Link
          to="/dashboard/courses"
          className="text-teal-600 dark:text-teal-400 hover:underline flex items-center text-sm font-medium"
        >
          View all courses
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      <div className="relative">
        <button
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg ${!canScrollLeft ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-100 dark:hover:bg-teal-700'}`}
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} className="text-gray-700 dark:text-gray-300" />
        </button>
        <div
          ref={sliderRef}
          className="flex overflow-x-auto gap-6 pb-2 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {sortedCourses.map(course => {
            const courseProgress = userData?.progress.find(p => p.courseId === course.id);
            if (!courseProgress) return null;
            return (
              <div key={course.id} className="flex-shrink-0 w-full sm:w-[340px]">
                <CourseProgress course={course} progress={courseProgress} />
              </div>
            );
          })}
        </div>
        <button
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg ${!canScrollRight ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-100 dark:hover:bg-teal-700'}`}
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          aria-label="Scroll right"
        >
          <ChevronRight size={24} className="text-gray-700 dark:text-gray-300" />
        </button>
      </div>
    </div>
  );
};

export default ContinueLearning;
