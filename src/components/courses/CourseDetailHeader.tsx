import { Link } from 'react-router-dom';
import {
  Star,
  Clock,
  Users,
  BookOpen,
  PlayCircle,
  CheckCircle,
  Share2,
  Heart,
  ShoppingCart,
  ArrowLeft
} from 'lucide-react';
import { Course, Author, Section } from '../../types';

interface CourseDetailHeaderProps {
  course: Course;
  author: Author | null;
  imageLoaded: boolean;
  setImageLoaded: (v: boolean) => void;
  isInWishlist: boolean;
  handleWishlistToggle: () => void;
  handleAddToCart: () => void;
  addingToCart: boolean;
  getTotalLectures: (curriculum: Section[]) => number;
  getTotalDuration: (curriculum: Section[]) => string;
}

const CourseDetailHeader = ({
  course,
  author,
  imageLoaded,
  setImageLoaded,
  isInWishlist,
  handleWishlistToggle,
  handleAddToCart,
  addingToCart,
  getTotalLectures,
  getTotalDuration,
}: CourseDetailHeaderProps) => (
  <div className="bg-gray-900 text-white py-12">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Course Info */}
          <div className="md:w-7/12">
            <Link
              to="/courses"
              className="inline-flex items-center text-primary-300 hover:text-primary-200 mb-4"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Courses
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
            <p className="text-lg text-gray-300 mb-6">{course.description}</p>
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center">
                <div className="flex">
                  {Array(5).fill(0).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={`${i < Math.floor(course.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`}
                    />
                  ))}
                </div>
                <span className="ml-2 font-medium">{course.rating.toFixed(1)}</span>
                <span className="ml-1 text-gray-300">({course.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Users size={18} className="mr-1" />
                <span>{course.enrolledStudents.toLocaleString()} students</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Clock size={18} className="mr-1" />
                <span>Last updated {course.lastUpdated}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="badge badge-primary">{course.category}</span>
              <span className="badge badge-secondary">{course.level}</span>
              <span className="badge badge-accent">{course.language}</span>
            </div>
            {author && (
              <div className="flex items-center">
                <img
                  src={author.avatarUrl}
                  alt={author.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-primary-500"
                />
                <div className="ml-2">
                  <p className="font-medium">{author.name}</p>
                  <p className="text-sm text-gray-300">{author.role}</p>
                </div>
              </div>
            )}
          </div>
          {/* Course Card */}
          <div className="md:w-5/12 md:max-w-md">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              {/* Course Image */}
              <div className="relative">
                {!imageLoaded && (
                  <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 animate-pulse" />
                )}
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className={`w-full h-48 object-cover ${!imageLoaded ? 'opacity-0' : 'opacity-100'}`}
                  onLoad={() => setImageLoaded(true)}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                  <PlayCircle size={64} className="text-white opacity-80 hover:opacity-100 cursor-pointer transition-opacity" />
                </div>
              </div>
              {/* Card Content */}
              <div className="p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {typeof course.price === 'number' && course.price > 0
                        ? `$${course.price.toFixed(2)}`
                        : 'Free'}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ${(course.price ? course.price * 1.4 : 0).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-green-600 dark:text-green-400 font-medium">
                    40% off! Sale ends in 2 days
                  </p>
                </div>
                <div className="space-y-3 mb-6">
                  <button
                    className="btn btn-primary w-full flex items-center justify-center min-h-[44px]"
                    onClick={handleAddToCart}
                    disabled={addingToCart}
                  >
                    {addingToCart ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Adding to Cart...
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={18} className="mr-2" />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
                <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-6">
                  30-Day Money-Back Guarantee
                </p>
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">This course includes:</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <PlayCircle size={18} className="text-gray-700 dark:text-gray-300 mt-0.5 mr-3 flex-shrink-0" />
                      <p className="text-gray-700 dark:text-gray-300">
                        {getTotalLectures(course.curriculum)} lectures
                      </p>
                    </div>
                    <div className="flex items-start">
                      <Clock size={18} className="text-gray-700 dark:text-gray-300 mt-0.5 mr-3 flex-shrink-0" />
                      <p className="text-gray-700 dark:text-gray-300">
                        {getTotalDuration(course.curriculum)} total length
                      </p>
                    </div>
                    <div className="flex items-start">
                      <BookOpen size={18} className="text-gray-700 dark:text-gray-300 mt-0.5 mr-3 flex-shrink-0" />
                      <p className="text-gray-700 dark:text-gray-300">
                        {course.quizzes.length} quizzes
                      </p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle size={18} className="text-gray-700 dark:text-gray-300 mt-0.5 mr-3 flex-shrink-0" />
                      <p className="text-gray-700 dark:text-gray-300">
                        Certificate of completion
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center space-x-4 mt-6">
                  <button
                    className={`group flex items-center transition-colors duration-200 ${isInWishlist
                      ? 'text-pink-600 dark:text-pink-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    onClick={handleWishlistToggle}
                  >
                    <Heart
                      size={18}
                      className={`mr-1 transition-colors duration-200 
                    ${isInWishlist ? 'fill-current text-pink-500' : 'text-gray-400 group-hover:text-pink-500'}`}
                    />
                    Wishlist
                  </button>
                  <button className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    <Share2 size={18} className="mr-1" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CourseDetailHeader;
