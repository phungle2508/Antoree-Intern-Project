import { Link } from 'react-router-dom';
import {  X, BookOpen, FileText, MessageSquare, Play } from 'lucide-react';
import { Course, LectureItem } from '../../types';
import React from 'react';

interface VideoLectureSidebarProps {
  showSidebar: boolean;
  toggleSidebar: () => void;
  course: Course | null;
  currentLecture: LectureItem | null;
  courseId: string | undefined;
  activeTab: 'content' | 'notes' | 'discussions';
  setActiveTab: (tab: 'content' | 'notes' | 'discussions') => void;
  notes: string;
  handleNoteChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const VideoLectureSidebar: React.FC<VideoLectureSidebarProps> = ({
  showSidebar,
  toggleSidebar,
  course,
  currentLecture,
  courseId,
  activeTab,
  setActiveTab,
  notes,
  handleNoteChange
}) => (
  <div
    className={`fixed top-16 right-0 bottom-0 w-full sm:w-80 bg-gray-800 overflow-y-auto transition-transform duration-300 z-20 
    ${showSidebar ? 'translate-x-0' : 'translate-x-full lg:hidden'}`}
  >
    <div className="flex items-center justify-between p-4 border-b border-gray-700">
      <h2 className="text-lg font-semibold">Course Content</h2>
      <button
        className="lg:hidden p-1 text-gray-400 hover:text-white"
        onClick={toggleSidebar}
      >
        <X size={20} />
      </button>
    </div>

    {/* Tabs */}
    <div className="flex border-b border-gray-700">
      <button
        className={`flex-1 py-3 text-center text-sm font-medium ${activeTab === 'content'
          ? 'text-white border-b-2 border-primary-500'
          : 'text-gray-400 hover:text-white'
          }`}
        onClick={() => setActiveTab('content')}
      >
        <div className="flex items-center justify-center">
          <BookOpen size={16} className="mr-1" />
          <span>Contents</span>
        </div>
      </button>
      <button
        className={`flex-1 py-3 text-center text-sm font-medium ${activeTab === 'notes'
          ? 'text-white border-b-2 border-primary-500'
          : 'text-gray-400 hover:text-white'
          }`}
        onClick={() => setActiveTab('notes')}
      >
        <div className="flex items-center justify-center">
          <FileText size={16} className="mr-1" />
          <span>Notes</span>
        </div>
      </button>
      <button
        className={`flex-1 py-3 text-center text-sm font-medium ${activeTab === 'discussions'
          ? 'text-white border-b-2 border-primary-500'
          : 'text-gray-400 hover:text-white'
          }`}
        onClick={() => setActiveTab('discussions')}
      >
        <div className="flex items-center justify-center">
          <MessageSquare size={16} className="mr-1" />
          <span>Discussions</span>
        </div>
      </button>
    </div>

    {/* Tab Content */}
    <div className="p-4">
      {activeTab === 'content' && course && currentLecture && (
        <div>
          {course.curriculum.map((section) => (
            <div key={section.id} className="mb-4">
              <h3 className="font-medium mb-2">{section.title}</h3>
              <div className="space-y-2">
                {section.lectures.map((lecture) => (
                  <Link
                    key={lecture.id}
                    to={`/lecture/${courseId}/${lecture.id}`}
                    className={`flex items-start p-2 rounded-lg ${lecture.id === currentLecture.id
                      ? 'bg-primary-900 text-primary-200'
                      : 'text-gray-300 hover:bg-gray-700'
                      }`}
                  >
                    <Play size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{lecture.title}</p>
                      <div className="flex items-center text-xs text-gray-400 mt-1">
                        <span>{lecture.duration}</span>
                        {lecture.isFree && (
                          <span className="ml-2 px-1.5 py-0.5 bg-primary-900 text-primary-300 rounded-sm">
                            Free
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'notes' && (
        <div>
          <p className="text-gray-300 mb-4">
            Take notes for this lecture. Your notes are saved automatically and can be accessed anytime.
          </p>
          <textarea
            className="w-full h-64 p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
            placeholder="Type your notes here..."
            value={notes}
            onChange={handleNoteChange}
          ></textarea>
          <div className="mt-2 flex justify-end">
            <button className="btn btn-primary text-sm">
              Save Notes
            </button>
          </div>
        </div>
      )}

      {activeTab === 'discussions' && (
        <div>
          <p className="text-gray-300 mb-4">
            Discuss this lecture with other students and the instructor.
          </p>
          <div className="bg-gray-700 rounded-lg p-4 mb-4">
            <p className="text-gray-300 mb-2">
              No discussions yet for this lecture.
            </p>
            <p className="text-gray-400 text-sm">
              Be the first to start a discussion!
            </p>
          </div>
          <div className="space-y-3">
            <textarea
              className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
              placeholder="Ask a question or share your thoughts..."
              rows={3}
            ></textarea>
            <div className="flex justify-end">
              <button className="btn btn-primary text-sm">
                Post Comment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default VideoLectureSidebar;
