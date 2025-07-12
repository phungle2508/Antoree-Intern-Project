import { Link } from 'react-router-dom';
import {
  PlayCircle,
  CheckCircle,
  ChevronDown,
} from 'lucide-react';
import { Course, Author, Section } from '../../types';

interface CourseDetailTabsProps {
  course: Course;
  author: Author | null;
  activeSectionId: string | null;
  activeTab: 'overview' | 'curriculum' | 'reviews';
  setActiveTab: (tab: 'overview' | 'curriculum' | 'reviews') => void;
  toggleSection: (id: string) => void;
  getTotalLectures: (curriculum: Section[]) => number;
  getTotalDuration: (curriculum: Section[]) => string;
}

const CourseDetailTabs = ({
  course,
  author,
  activeSectionId,
  activeTab,
  setActiveTab,
  toggleSection,
  getTotalLectures,
  getTotalDuration,
}: CourseDetailTabsProps) => (
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="max-w-7xl mx-auto">
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-1 font-medium text-sm border-b-2 ${activeTab === 'overview'
              ? 'border-primary-500 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`py-4 px-1 font-medium text-sm border-b-2 ${activeTab === 'curriculum'
              ? 'border-primary-500 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
          >
            Curriculum
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-4 px-1 font-medium text-sm border-b-2 ${activeTab === 'reviews'
              ? 'border-primary-500 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
          >
            Reviews
          </button>
        </nav>
      </div>
      {/* Tab Content */}
      <div>
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About This Course</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6 whitespace-pre-line">
                  {course.longDescription}
                </p>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">What you'll learn</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {course.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle size={18} className="text-primary-600 dark:text-primary-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{objective}</span>
                    </li>
                  ))}
                </ul>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Requirements</h3>
                <ul className="space-y-2 mb-6">
                  {course.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-700 dark:bg-gray-300 mt-2 mr-2"></div>
                      <span className="text-gray-700 dark:text-gray-300">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {author && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Instructor</h2>
                  <div className="flex items-start">
                    <img
                      src={author.avatarUrl}
                      alt={author.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{author.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">{author.role}</p>
                      <p className="text-gray-700 dark:text-gray-300">{author.bio}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Course Content</h3>
                <div className="flex items-center justify-between mb-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>{course.curriculum.length} sections</span>
                  <span>{getTotalLectures(course.curriculum)} lectures</span>
                  <span>{getTotalDuration(course.curriculum)} total</span>
                </div>
                <div className="mb-4">
                  <Link to={`/lecture/${course.id}/${course.curriculum[0].lectures[0].id}`} className="btn btn-primary w-full">
                    Preview Course
                  </Link>
                </div>
                <div className="space-y-3">
                  {course.curriculum.slice(0, 3).map((section) => (
                    <div key={section.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="flex items-center justify-between w-full p-4 text-left font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <span>{section.title}</span>
                        <ChevronDown
                          size={18}
                          className={`transform transition-transform ${activeSectionId === section.id ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {activeSectionId === section.id && (
                        <div className="p-4 space-y-2">
                          {section.lectures.slice(0, 2).map((lecture) => (
                            <div key={lecture.id} className="flex items-start">
                              <PlayCircle size={16} className="text-gray-600 dark:text-gray-400 mt-1 mr-2 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="text-gray-800 dark:text-gray-200">{lecture.title}</p>
                                <div className="flex items-center text-sm">
                                  <span className="text-gray-500 dark:text-gray-400">{lecture.duration}</span>
                                  {lecture.isFree && (
                                    <span className="ml-2 text-primary-600 dark:text-primary-400">Preview</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                          {section.lectures.length > 2 && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 pt-2">
                              + {section.lectures.length - 2} more lectures
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                  {course.curriculum.length > 3 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 pt-2">
                      + {course.curriculum.length - 3} more sections
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Curriculum Tab */}
        {/* ...implement curriculum and reviews tab as in original... */}
      </div>
    </div>
  </div>
);

export default CourseDetailTabs;
