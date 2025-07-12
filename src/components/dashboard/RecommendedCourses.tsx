import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Course } from '../../types';

interface RecommendedCoursesProps {
  recommendCourses: Course[];
}

const RecommendedCourses = ({ recommendCourses }: RecommendedCoursesProps) => (
  <div>
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recommended for You</h2>
      <Link
        to="/courses"
        className="text-teal-600 dark:text-teal-400 hover:underline flex items-center text-sm font-medium"
      >
        Browse all courses
        <ArrowRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recommendCourses.map(course => (
        <div key={course.id} className="card group">
          <div className="relative overflow-hidden">
            <img
              src={course.imageUrl}
              alt={course.title}
              className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 left-3">
              <span className="px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded-md">
                {course.category}
              </span>
            </div>
          </div>
          <div className="p-4">
            <Link to={`/courses/${course.id}`}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                {course.title}
              </h3>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
              {course.description}
            </p>
            <div className="flex justify-between items-center">
              <div className="font-bold text-gray-900 dark:text-white">
                {typeof course.price === 'number' && course.price > 0
                  ? `$${course.price.toFixed(2)}`
                  : 'Free'}
              </div>
              <Link
                to={`/courses/${course.id}`}
                className="px-4 py-1.5 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
              >
                View Course
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default RecommendedCourses;
