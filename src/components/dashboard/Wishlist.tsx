import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingCart, Star, Clock, Users, Heart, ChevronDown, ChevronUp } from 'lucide-react';
import courses from '../../data/courses';
import { getWishlist, setWishlist, removeWishlistItem, appendCart, getCart } from '../../services/cookie';
interface WishlistProps {
  whislist?: string[];
}

const Wishlist = ({ whislist: propWishlist }: WishlistProps) => {
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const wishlist = propWishlist || getWishlist() || [];
    setWishlistItems(wishlist);
    setLoading(false);
  }, [propWishlist]);

  const removeItem = (courseId: string) => {
    const result = removeWishlistItem(courseId);
    const updatedWishlist = getWishlist() || [];
    setWishlistItems(updatedWishlist);

    console.log(result);
  };

  const clearWishlist = () => {
    setWishlist([]);
    setWishlistItems([]);

  };

  const addToCart = (courseId: string) => {
    appendCart(courseId, 1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="w-8 h-8 border-t-2 border-pink-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
        <Heart size={64} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Your wishlist is empty</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Browse our courses and add them to your wishlist to save for later.
        </p>
        <Link to="/courses" className="btn bg-pink-500 hover:bg-pink-600 text-white">
          Browse Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      {/* Wishlist Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              My Wishlist ({wishlistItems.length} items)
            </h2>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label={isCollapsed ? "Expand wishlist" : "Collapse wishlist"}
            >
              {isCollapsed ? (
                <ChevronDown size={20} className="text-gray-600 dark:text-gray-400" />
              ) : (
                <ChevronUp size={20} className="text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
          <button
            onClick={clearWishlist}
            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
          >
            Clear Wishlist
          </button>
        </div>
        {isCollapsed && (
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {wishlistItems.length} courses saved
          </div>
        )}
      </div>

      {/* Wishlist Items - Collapsible */}
      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
        isCollapsed 
          ? 'max-h-0 opacity-0' 
          : 'max-h-[2000px] opacity-100'
      }`}>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {wishlistItems.map((courseId) => {
            const course = courses.find(c => c.id === courseId);
            if (!course) return null;

            return (
              <div key={courseId} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Course Image */}
                  <div className="flex-shrink-0">
                    <Link to={`/courses/${course.id}`}>
                      <img
                        src={course.imageUrl}
                        alt={course.title}
                        className="w-full sm:w-32 h-24 object-cover rounded-lg hover:opacity-80 transition-opacity"
                      />
                    </Link>
                  </div>

                  {/* Course Details */}
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-grow mb-4 sm:mb-0">
                        <Link
                          to={`/courses/${course.id}`}
                          className="text-lg font-semibold text-gray-900 dark:text-white hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                        >
                          {course.title}
                        </Link>

                        <p className="text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                          {course.description}
                        </p>

                        {/* Course Meta */}
                        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <Star size={14} className="mr-1 text-yellow-500" />
                            <span>{course.rating.toFixed(1)} ({course.reviewCount})</span>
                          </div>
                          <div className="flex items-center">
                            <Users size={14} className="mr-1" />
                            <span>{course.enrolledStudents.toLocaleString()} students</span>
                          </div>
                          <div className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            <span>{course.level}</span>
                          </div>
                        </div>

                        {/* Course Tags */}
                        <div className="flex flex-wrap gap-2 mt-3">
                          <span className="px-2 py-1 bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200 text-xs rounded-md">
                            {course.category}
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs rounded-md">
                            {course.language}
                          </span>
                        </div>
                      </div>

                      {/* Price and Actions */}
                      <div className="flex flex-col items-end space-y-3">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            ${course.price?.toFixed(2)}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col space-y-2">
                          {(() => {
                            // Check if the course is already in the cart
                            const cart = getCart() || [];
                            const inCart = cart.some((item: { id: string }) => item.id === course.id);

                            if (inCart) {
                              return (
                                <button
                                  disabled
                                  className="flex items-center justify-center px-4 py-2 bg-gray-300 text-gray-600 text-sm rounded-lg cursor-not-allowed"
                                >
                                  <ShoppingCart size={14} className="mr-1" />
                                  Already in your cart
                                </button>
                              );
                            }
                            return (
                              <button
                                onClick={() => addToCart(course.id)}
                                className="flex items-center justify-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-lg transition-colors"
                              >
                                <ShoppingCart size={14} className="mr-1" />
                                Add to Cart
                              </button>
                            );
                          })()}

                          <button
                            onClick={() => removeItem(course.id)}
                            className="flex items-center justify-center text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
                          >
                            <Trash2 size={14} className="mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Wishlist Footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-b-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {wishlistItems.length} courses in your wishlist
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/courses"
                className="btn btn-outline text-center"
              >
                Continue Browsing
              </Link>
              <button
                onClick={() => {
                  wishlistItems.forEach(courseId => addToCart(courseId));
                }}
                className="btn bg-pink-500 hover:bg-pink-600 text-white"
              >
                Add All to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;