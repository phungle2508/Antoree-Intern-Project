import {
  Star,
  PlayCircle,
  CheckCircle,
  ChevronDown,
  Share2,
  Heart,
  ShoppingCart,
  AlertTriangle,
  ArrowLeft
} from 'lucide-react';
import { Course, Author, Section } from '../../types';

interface CourseDetailModalProps {
  course: Course | null;
  author: Author | null;
  loading: boolean;
  activeSectionId: string | null;
  activeTab: 'overview' | 'curriculum' | 'reviews';
  setActiveTab: (tab: 'overview' | 'curriculum' | 'reviews') => void;
  addingToCart: boolean;
  imageLoaded: boolean;
  setImageLoaded: (v: boolean) => void;
  isInWishlist: boolean;
  toggleSection: (id: string) => void;
  getTotalLectures: (curriculum: Section[]) => number;
  getTotalDuration: (curriculum: Section[]) => string;
  handleAddToCart: () => void;
  handleWishlistToggle: () => void;
  onClose?: () => void;
}

const CourseDetailModal = ({
  course,
  author,
  loading,
  activeSectionId,
  activeTab,
  setActiveTab,
  addingToCart,
  isInWishlist,
  toggleSection,
  getTotalLectures,
  getTotalDuration,
  handleAddToCart,
  handleWishlistToggle,
  onClose
}: CourseDetailModalProps) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
        <div className="w-16 h-16 border-t-4 border-primary-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 px-4">
        <AlertTriangle size={64} className="text-warning-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Course Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
          The course you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={onClose}
          className="btn btn-primary flex items-center"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg px-2 py-4 max-h-[60vh] overflow-y-auto">
      {/* Tabs - Mobile Responsive */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
        <nav className="flex space-x-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-3 font-medium text-sm border-b-2 whitespace-nowrap ${activeTab === 'overview'
              ? 'border-primary-500 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`py-2 px-3 font-medium text-sm border-b-2 whitespace-nowrap ${activeTab === 'curriculum'
              ? 'border-primary-500 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
          >
            Curriculum
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-2 px-3 font-medium text-sm border-b-2 whitespace-nowrap ${activeTab === 'reviews'
              ? 'border-primary-500 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
          >
            Reviews
          </button>
        </nav>
      </div>

      {/* Tab Content - Responsive */}
      <div>
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">About This Course</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm whitespace-pre-line">
                {course.longDescription}
              </p>

              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">What you'll learn</h3>
              <ul className="grid grid-cols-1 gap-2 mb-4">
                {course.objectives.slice(0, 4).map((objective, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle size={14} className="text-primary-600 dark:text-primary-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{objective}</span>
                  </li>
                ))}
                {course.objectives.length > 4 && (
                  <li className="text-sm text-gray-500 dark:text-gray-400">
                    + {course.objectives.length - 4} more objectives
                  </li>
                )}
              </ul>

              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Requirements</h3>
              <ul className="space-y-1">
                {course.requirements.slice(0, 3).map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-1 h-1 rounded-full bg-gray-700 dark:bg-gray-300 mt-2 mr-2"></div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{requirement}</span>
                  </li>
                ))}
                {course.requirements.length > 3 && (
                  <li className="text-sm text-gray-500 dark:text-gray-400">
                    + {course.requirements.length - 3} more requirements
                  </li>
                )}
              </ul>
            </div>

            {author && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Instructor</h2>
                <div className="flex items-start">
                  <img
                    src={author.avatarUrl}
                    alt={author.name}
                    className="w-12 h-12 rounded-full object-cover mr-3"
                  />
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">{author.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-1 text-sm">{author.role}</p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">{author.bio}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons in Modal */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <div className="space-y-3">
                <button
                  className="btn btn-primary w-full flex items-center justify-center min-h-[40px] text-sm"
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                >
                  {addingToCart ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={16} className="mr-2" />
                      Add to Cart - {typeof course.price === 'number' && course.price > 0 ? `$${course.price.toFixed(2)}` : 'Free'}
                    </>
                  )}
                </button>

                <div className="flex justify-center space-x-6">
                  <button
                    className={`group flex items-center transition-colors duration-200 text-sm ${isInWishlist
                      ? 'text-pink-600 dark:text-pink-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    onClick={handleWishlistToggle}
                  >
                    <Heart
                      size={16}
                      className={`mr-1 transition-colors duration-200 
                    ${isInWishlist ? 'fill-current text-pink-500' : 'text-gray-400 group-hover:text-pink-500'}`}
                    />
                    Wishlist
                  </button>

                  <button className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">
                    <Share2 size={16} className="mr-1" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Curriculum Tab - Responsive */}
        {activeTab === 'curriculum' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Course Curriculum</h2>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                <span>{course.curriculum.length} sections</span>
                <span className="mx-1">•</span>
                <span>{getTotalLectures(course.curriculum)} lectures</span>
                <span className="mx-1">•</span>
                <span>{getTotalDuration(course.curriculum)} total</span>
              </div>
            </div>

            <div className="space-y-2">
              {course.curriculum.slice(0, 5).map((section) => (
                <div key={section.id} className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="flex items-center justify-between w-full p-3 text-left font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-sm"
                  >
                    <span className="truncate">{section.title}</span>
                    <ChevronDown
                      size={16}
                      className={`transform transition-transform flex-shrink-0 ml-2 ${activeSectionId === section.id ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {activeSectionId === section.id && (
                    <div className="p-3 space-y-2">
                      {section.lectures.slice(0, 3).map((lecture) => (
                        <div key={lecture.id} className="flex items-start">
                          <PlayCircle size={14} className="text-gray-600 dark:text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-gray-800 dark:text-gray-200 text-sm truncate">{lecture.title}</p>
                            <div className="flex items-center text-xs">
                              <span className="text-gray-500 dark:text-gray-400">{lecture.duration}</span>
                              {lecture.isFree && (
                                <span className="ml-2 text-primary-600 dark:text-primary-400">Preview</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}

                      {section.lectures.length > 3 && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 pt-1">
                          + {section.lectures.length - 3} more lectures
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {course.curriculum.length > 5 && (
                <p className="text-xs text-gray-500 dark:text-gray-400 pt-2 text-center">
                  + {course.curriculum.length - 5} more sections
                </p>
              )}
            </div>
          </div>
        )}

        {/* Reviews Tab - Responsive */}
        {activeTab === 'reviews' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="mb-4">
              <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mb-4">
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {course.rating.toFixed(1)}
                </div>
                <div className="flex mb-1">
                  {Array(5).fill(0).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${i < Math.floor(course.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 dark:text-gray-600'}`}
                    />
                  ))}
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-xs text-center">
                  {course.reviewCount} Reviews
                </div>
              </div>

              {course.reviews.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">Recent Reviews</h3>
                  {course.reviews.slice(0, 3).map((review) => (
                    <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0">
                      <div className="flex items-start">
                        <img
                          src={review.userAvatarUrl}
                          alt={review.userName}
                          className="w-8 h-8 rounded-full object-cover mr-3"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate">{review.userName}</h4>
                            <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">{review.date}</span>
                          </div>
                          <div className="flex mb-1">
                            {Array(5).fill(0).map((_, i) => (
                              <Star
                                key={i}
                                size={12}
                                className={`${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 dark:text-gray-600'}`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {course.reviews.length > 3 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      + {course.reviews.length - 3} more reviews
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400 text-sm text-center py-4">
                  No reviews yet.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetailModal;
