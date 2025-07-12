import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useCourseDetailModal } from '../../hooks/useCourseDetailModal';
import { useCourseSlider } from '../../hooks/useCourseSlider';
import { courses } from '../../data';
import { useEffect, useState } from 'react';
import { Course } from '../../types';

const FeaturedCourses = () => {
  // Use useCourseSlider for slider logic
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  useEffect(() => {
    const featuredCourses = courses.filter(course => course.isFeatured);
    setFeaturedCourses(featuredCourses);
  }, []);
  const {
    visibleCourses,
    sliderRef,
    canScrollLeft,
    canScrollRight,
    imageLoadStates,
    handleImageLoad,
    scroll,
  } = useCourseSlider(true, featuredCourses);

  // Use shared modal hook
  const {
    openModal,
    ModalContent,
  } = useCourseDetailModal();

  // Show loading spinner while featuredCourses are loading
  if (!featuredCourses.length) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-900 flex items-center justify-center min-h-[300px]">
        <div className="flex items-center justify-center w-full">
          <div className="w-12 h-12 border-t-4 border-orange-500 border-solid rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Featured Courses</h2>
            <p className="text-gray-600 dark:text-gray-400">Handpicked courses curated by our experts</p>
          </div>
          <Link to="/courses" className="btn btn-outline">
            View All
          </Link>
        </div>

        <div className="relative">
          <button
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg ${!canScrollLeft ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-100 dark:hover:bg-orange-700'}`}
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll left">
            <ChevronLeft size={24} className="text-gray-700 dark:text-gray-300" />
          </button>

          <div
            ref={sliderRef}
            className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {visibleCourses.map(course => (
              <div key={course.id} className="flex-shrink-0 w-full sm:w-[340px]">
                <div className="card group h-full flex flex-col">
                  <div className="relative overflow-hidden">
                    {/* Skeleton loader */}
                    <div className="w-full h-48 relative">
                      {!imageLoadStates[course.id] && (
                        <div className="absolute inset-0 w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-t-lg" />
                      )}
                      <img
                        src={course.imageUrl}
                        alt={course.title}
                        className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 rounded-t-lg ${!imageLoadStates[course.id] ? 'opacity-0' : 'opacity-100'}`}
                        onLoad={() => handleImageLoad(course.id)}
                        style={{ position: 'absolute', inset: 0 }}
                      />
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="badge badge-[orange] bg-orange-500 text-white">
                        {course.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="badge badge-[orange] bg-orange-400 text-white">
                        {course.level}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex-grow flex flex-col">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm mb-1">
                      <div className="flex items-center">
                        {Array(5).fill(0).map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`${i < Math.floor(course.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 dark:text-gray-600'}`}
                          />
                        ))}
                      </div>
                      <span className="ml-1">{course.rating.toFixed(1)}</span>
                      <span className="ml-1">({course.reviewCount})</span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      {course.enrolledStudents.toLocaleString()} students enrolled
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="font-bold text-gray-900 dark:text-white">
                        {course.price ? `$${course.price.toFixed(2)}` : 'Free'}
                      </div>
                      <button
                        className="btn bg-orange-500 hover:bg-orange-600 text-sm py-1.5"
                        onClick={() => openModal(course.id)}
                      >
                        View Course
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {ModalContent}
          <button
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg ${!canScrollRight ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-100 dark:hover:bg-orange-700'}`}
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Scroll right">
            <ChevronRight size={24} className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>
    </section>
  );
};
export default FeaturedCourses;
