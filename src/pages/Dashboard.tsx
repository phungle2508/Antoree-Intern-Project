import { Bell, BookOpen, Search, Heart, ShoppingCart, HistoryIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Cart from '../components/dashboard/Cart';
import Wishlist from '../components/dashboard/Wishlist';
import { useEffect } from 'react';
import { useDashboardData } from '../hooks/useDashboardData';
import ContinueLearning from '../components/dashboard/ContinueLearning';
import RecommendedCourses from '../components/dashboard/RecommendedCourses';

const Dashboard = () => {
  const { theme, toggleTheme } = useTheme();

  const {
    wishlist,
    cart,
    recommendCourses,
    userData,
    enrolledCourses,
    updateFromCookie
  } = useDashboardData();

  // Scroll to top and update title when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Dashboard | Saket LearnHub';
    updateFromCookie();
    // Poll for cookie changes every 500ms
    const interval = setInterval(updateFromCookie, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="">
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <button
                type="button"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 lg:hidden"

              >
                <span className="sr-only">Open sidebar</span>
                <BookOpen className="h-6 w-6" />
              </button>
              <h1 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white lg:ml-0">Dashboard</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block w-64">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
              </div>

              <button
                type="button"
                className="relative p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </button>

              <button
                type="button"
                onClick={toggleTheme}
                className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <span className="sr-only">Toggle theme</span>
                {theme === 'dark' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              <div className="flex items-center">
                <img
                  src={userData?.avatarUrl}
                  alt="User avatar"
                  className="h-8 w-8 rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        <main className="py-8 px-4 sm:px-6 lg:px-8">

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back, {userData?.name}!</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Continue your learning journey. You're making great progress!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">


            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400">
                  <Heart className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Wishlist</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{wishlist.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <ShoppingCart className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Cart</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{cart.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">
                  <HistoryIcon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">History</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{userData?.enrolledCourses.length}</p>
                </div>
              </div>
            </div>
          </div>


          <div className=" lg:grid-cols-4 gap-6 mb-8">
            <Cart cart={cart} />
          </div>
          <div className=" lg:grid-cols-4 gap-6 mb-8">
          <Wishlist whislist={wishlist} />
          </div>

          <ContinueLearning
            enrolledCourses={enrolledCourses}
            userData={userData}
          />

          <RecommendedCourses
            recommendCourses={recommendCourses}
          />

          <div className="flex justify-center mt-12">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex items-center space-x-3">
              <span className="text-gray-700 dark:text-gray-300">Made by Saket</span>
              <span className="inline-block px-2 py-1 bg-accent-100 text-accent-800 dark:bg-accent-900 dark:text-accent-300 rounded-md text-xs font-medium">
                Saket LearnHub
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;