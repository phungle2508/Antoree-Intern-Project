import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, BookOpen } from 'lucide-react';
import CourseCard from '../components/courses/CourseCard';
import CourseFilters from '../components/courses/CourseFilters';
import { courses, categoriesInit } from '../data';
import { Course } from '../types';
import { FilterState } from '../hooks/useCourseFilters';
import Pagination from '../components/common/Pagination';

const COURSES_PER_PAGE = 6;

const CourseCatalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [allFilters, setAllFilters] = useState<FilterState>({
    category: '',
    level: '',
    priceRange: null,
    sort: 'popular'
  });

  const levels = ['All', ...Array.from(new Set(courses.map(course => course.level)))];

  useEffect(() => {
    document.title = 'Course Catalog | Saket LearnHub';

    const categoryParam = searchParams.get('category');
    const levelParam = searchParams.get('level');
    const priceParam = searchParams.get('price');
    const sortParam = searchParams.get('sort');
    const searchParam = searchParams.get('search') || '';

    setSearchQuery(searchParam);

    const newFilters: FilterState = {
      category: categoryParam || '',
      level: levelParam || '',
      priceRange: priceParam ? [priceParam.split(',').map(Number)[0], priceParam.split(',').map(Number)[1]] as [number, number] : null,
      sort: sortParam || 'popular'
    };

    setAllFilters(newFilters);
    applyFilters(newFilters, searchParam);

    setTimeout(() => {
      setIsLoading(false);
    }, 800);

    window.scrollTo(0, 0);
  }, [searchParams]);

  const applyFilters = (filters: FilterState, searchTerm: string = searchQuery) => {
    let results = [...courses];

    if (filters.category && filters.category !== 'All') {
      results = results.filter(course => course.category.replace(/-/g, ' ').toLowerCase() === filters.category.replace(/-/g, ' ').toLowerCase());
    }

    if (filters.level && filters.level !== 'All') {
      results = results.filter(course => course.level === filters.level);
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      results = results.filter(course => {
        const price = course.price || 0;
        return price >= min && price <= max;
      });
    }

    if (searchTerm) {
      const query = searchTerm.toLowerCase();
      results = results.filter(course =>
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    switch (filters.sort) {
      case 'newest':
        results.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
        break;
      case 'highest-rated':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        results.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-high':
        results.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'popular':
      default:
        results.sort((a, b) => b.enrolledStudents - a.enrolledStudents);
        break;
    }

    setFilteredCourses(results);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setAllFilters(newFilters);
    applyFilters(newFilters);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters(allFilters, searchQuery);
  };

  const resetFilters = () => {
    setSearchQuery('');
    const resetFilters: FilterState = {
      category: '',
      level: '',
      priceRange: null,
      sort: 'popular'
    };
    setAllFilters(resetFilters);
    setFilteredCourses(courses);
    setSearchParams({});
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredCourses.length / COURSES_PER_PAGE);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * COURSES_PER_PAGE,
    currentPage * COURSES_PER_PAGE
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Explore Our Courses
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Browse through our extensive collection of high-quality courses across various categories and skill levels
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search for courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-12 py-3"
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <button type="submit" className="absolute inset-y-0 right-0 btn btn-primary rounded-l-none">
              Search
            </button>
          </form>
        </div>

        {/* Filters and Courses */}
        <div className="mt-6">
          <CourseFilters
            categories={categoriesInit}
            levels={levels}
            onFilterChange={handleFilterChange}
            onReset={resetFilters}
            currentFilters={allFilters}
          />

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="w-12 h-12 border-t-4 border-primary-500 border-solid rounded-full animate-spin"></div>
            </div>
          ) : filteredCourses.length > 0 ? (
            <>
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-center sm:text-left">
              Showing {paginatedCourses.length} of {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
              </div>

              {/* Pagination Controls */}
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </>
          ) : (
            <div className="text-center py-12">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <BookOpen className="h-10 w-10 text-gray-500 dark:text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No courses found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We couldn't find any courses that match your search and filters.
              </p>
              <button onClick={resetFilters} className="btn btn-primary">
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCatalog;