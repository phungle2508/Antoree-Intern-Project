import { Star, Users, Clock } from 'lucide-react';
import { useState } from 'react';
import { useCourseDetailModal } from '../../hooks/useCourseDetailModal';
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
  const [imageLoadStates, setImageLoadStates] = useState<{ [key: string]: boolean }>({});

  // Use shared modal hook
  const {
    openModal,
    ModalContent,
  } = useCourseDetailModal();

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
            onClick={() => openModal(course.id)}
          >
            View Course
          </button>
        </div>
      </div>
      {ModalContent}
    </div >
  );
};
export default CourseCard;
