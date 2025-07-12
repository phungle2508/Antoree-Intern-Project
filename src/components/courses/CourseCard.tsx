import { Star, Users, Clock } from 'lucide-react';
import { useState } from 'react';
import CourseDetail from '../../pages/CourseDetail';
import { Course } from '../../types';

interface CourseCardProps {
  course: Course;
  size?: 'small' | 'medium' | 'large';
}
const CourseCard = ({ course, size = 'medium' }: CourseCardProps) => {
  const sizesConfig = {
    small: {
      imageHeight: 'h-32',
      titleClass: 'text-base font-semibold line-clamp-1',
      descriptionClass: 'line-clamp-1',
      padding: 'p-3'
    },
    medium: {
      imageHeight: 'h-48',
      titleClass: 'text-xl font-semibold line-clamp-2',
      descriptionClass: 'line-clamp-2',
      padding: 'p-5'
    },
    large: {
      imageHeight: 'h-60',
      titleClass: 'text-2xl font-semibold line-clamp-2',
      descriptionClass: 'line-clamp-3',
      padding: 'p-6'
    }
  };
  const config = sizesConfig[size];
  const [showModal, setShowModal] = useState(false);
  const [imageLoadStates, setImageLoadStates] = useState<{ [key: string]: boolean }>({});

  const handleImageLoad = (imageId: string) => {
    setImageLoadStates(prev => ({
      ...prev,
      [imageId]: true
    }));
  };

  return (
    <div className="card group h-full flex flex-col">
      <div className="relative overflow-hidden">
        <div className={`w-full ${config.imageHeight} relative`}>
          {!imageLoadStates[course.id] && (
            <div className={`absolute inset-0 w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-t-lg`} />
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
          <span className="badge badge-primary">
            {course.category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="badge badge-secondary">
            {course.level}
          </span>
        </div>
      </div>
      <div className={`${config.padding} flex-grow flex flex-col`}>
        <h3 className={`${config.titleClass} text-gray-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors`}>
          {course.title}
        </h3>
        <p className={`${config.descriptionClass} text-gray-600 dark:text-gray-400 mb-4`}>
          {course.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-3">
          <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-center">
              <Star size={16} className="text-yellow-500 fill-yellow-500 mr-1" />
              <span>{course.rating.toFixed(1)}</span>
            </div>
            <span className="mx-1">·</span>
            <span>({course.reviewCount})</span>
          </div>

          <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
            <Users size={14} className="mr-1" />
            <span>{course.enrolledStudents.toLocaleString()}</span>
          </div>

          <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
            <Clock size={14} className="mr-1" />
            <span>Updated {course.lastUpdated}</span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="font-bold text-gray-900 dark:text-white">
            {course.price ? `$${course.price.toFixed(2)}` : 'Free'}
          </div>

          <button
            className="btn bg-indigo-600 hover:bg-indigo-700 text-sm py-1.5"
            onClick={() => {
              setShowModal(true);
            }} >
            View Course
          </button>
        </div>
      </div>
      {/* Modal for CourseDetail - Responsive */}
      {
        showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4">
            <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-lg 
                           w-full h-full max-h-full
                           sm:w-full sm:max-w-2xl sm:h-[85vh] sm:max-h-[85vh]
                           md:max-w-3xl md:h-[90vh] md:max-h-[90vh]
                           lg:max-w-4xl lg:h-[90vh] lg:max-h-[90vh]
                           xl:max-w-5xl
                           overflow-hidden flex flex-col">
              <button
                className="absolute top-2 right-2 z-10 text-gray-500 hover:text-gray-800 dark:hover:text-white 
                          text-xl sm:text-2xl bg-white dark:bg-gray-800 rounded-full w-8 h-8 sm:w-10 sm:h-10 
                          flex items-center justify-center shadow-md hover:shadow-lg transition-all"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
              <div className="flex-1 overflow-y-auto">
                <CourseDetail courseId={course.id} modalMode onClose={() => setShowModal(false)} />
              </div>
            </div>
          </div>
        )
      }

    </div >
  );
};
export default CourseCard;
