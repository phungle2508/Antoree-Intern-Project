import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Maximize, Settings,
  SkipBack, SkipForward, List, X, BookOpen, FileText, MessageSquare, AlertTriangle, CheckCircle
} from 'lucide-react';
import { useLectureData } from '../hooks/lecture/useLectureData';
import { useVideoPlayer } from '../hooks/lecture/useVideoPlayer';
import { useLectureCompletion } from '../hooks/lecture/useLectureCompletion';
import VideoLectureSidebar from '../components/lecture/VideoLectureSidebar';
import VideoLectureCompletionModal from '../modal/VideoLectureCompletionModal';

const VideoLecture = () => {
  const navigate = useNavigate();
  const {
    course,
    lecture: currentLecture,
    loading,
    courseId,
    lectureId
  } = useLectureData();

  const {
    videoRef,
    videoContainerRef,
    isPlaying,
    isMuted,
    volume,
    videoProgress,
    togglePlay,
    toggleMute,
    handleVolumeChange,
    handleProgress,
    handleSeek,
    toggleFullscreen,
    seek
  } = useVideoPlayer();

  const [showSidebar, setShowSidebar] = useState(true);
  const [activeTab, setActiveTab] = useState<'content' | 'notes' | 'discussions'>('content');
  const [notes, setNotes] = useState('');
  const { showCompletionModal, setShowCompletionModal } = useLectureCompletion(courseId, lectureId);

  // Adjacent lectures logic
  const getAllLectures = (course) => course?.curriculum.flatMap(section => section.lectures) || [];
  const getAdjacentLectures = () => {
    if (!course || !currentLecture) return { prev: null, next: null };
    const allLectures = getAllLectures(course);
    const currentIndex = allLectures.findIndex(l => l.id === currentLecture.id);
    return {
      prev: currentIndex > 0 ? allLectures[currentIndex - 1] : null,
      next: currentIndex < allLectures.length - 1 ? allLectures[currentIndex + 1] : null
    };
  };
  const { prev, next } = course ? getAdjacentLectures() : { prev: null, next: null };

  const toggleSidebar = () => setShowSidebar(v => !v);
  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 pt-16">
        <div className="w-16 h-16 border-t-4 border-primary-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!course || !currentLecture) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 pt-16 px-4">
        <AlertTriangle size={64} className="text-warning-500 mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Lecture Not Found</h1>
        <p className="text-gray-400 mb-6 text-center">
          The lecture you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => navigate(`/courses/${courseId}`)}
          className="btn btn-primary flex items-center"
        >
          <ChevronLeft size={18} className="mr-2" />
          Back to Course
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-16">
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Video Player */}
          <div className={`flex-1 flex flex-col ${showSidebar ? 'lg:mr-80' : ''}`}>
            <div className="relative bg-black" ref={videoContainerRef}>
              {/* Video */}
              <video
                ref={videoRef}
                className="w-full h-auto max-h-[calc(100vh-10rem)]"
                poster={course.imageUrl}
                onTimeUpdate={handleProgress}
                onClick={togglePlay}
              >
                <source src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                {/* Progress Bar */}
                <div
                  className="relative h-1 bg-gray-600 rounded-full mb-2 cursor-pointer"
                  onClick={handleSeek}
                >
                  <div
                    className="absolute top-0 left-0 h-full bg-primary-500 rounded-full"
                    style={{ width: `${videoProgress}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button className="p-1 hover:text-primary-400" onClick={togglePlay}>
                      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                    <button className="p-1 hover:text-primary-400" onClick={() => seek(-10)}>
                      <SkipBack size={20} />
                    </button>
                    <button className="p-1 hover:text-primary-400" onClick={() => seek(10)}>
                      <SkipForward size={20} />
                    </button>
                    <button className="p-1 hover:text-primary-400" onClick={toggleMute}>
                      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                    <div className="w-20 hidden sm:block">
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={e => handleVolumeChange(parseFloat(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    <span className="text-sm text-gray-300">00:00 / 10:00</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="p-1 hover:text-primary-400 lg:hidden" onClick={toggleSidebar}>
                      <List size={20} />
                    </button>
                    <button className="p-1 hover:text-primary-400">
                      <Settings size={20} />
                    </button>
                    <button className="p-1 hover:text-primary-400" onClick={toggleFullscreen}>
                      <Maximize size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Play/Pause overlay */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ opacity: isPlaying ? 0 : 0.8 }}
              >
                <div className="bg-black/50 p-4 rounded-full">
                  <Play size={48} className="text-white" />
                </div>
              </div>
            </div>

            {/* Lecture Info */}
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-xl font-bold">{currentLecture.title}</h1>
                <button
                  className="md:hidden flex items-center text-primary-400 hover:text-primary-300"
                  onClick={toggleSidebar}
                >
                  <List size={20} className="mr-1" />
                  <span>Contents</span>
                </button>
              </div>
              <p className="text-gray-400">{currentLecture.description}</p>
            </div>

            {/* Navigation */}
            <div className="p-4 flex items-center justify-between border-b border-gray-800">
              <Link
                to={prev ? `/lecture/${courseId}/${prev.id}` : `#`}
                className={`flex items-center ${prev ? 'text-primary-400 hover:text-primary-300' : 'text-gray-600 cursor-not-allowed'}`}
                onClick={(e) => !prev && e.preventDefault()}
              >
                <ChevronLeft size={20} className="mr-1" />
                <span>Previous</span>
              </Link>

              <Link
                to={`/courses/${courseId}`}
                className="flex items-center text-gray-400 hover:text-white"
              >
                <BookOpen size={20} className="mr-1" />
                <span>Course Page</span>
              </Link>

              <Link
                to={next ? `/lecture/${courseId}/${next.id}` : `#`}
                className={`flex items-center ${next ? 'text-primary-400 hover:text-primary-300' : 'text-gray-600 cursor-not-allowed'}`}
                onClick={(e) => !next && e.preventDefault()}
              >
                <span>Next</span>
                <ChevronRight size={20} className="ml-1" />
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <VideoLectureSidebar
            showSidebar={showSidebar}
            toggleSidebar={toggleSidebar}
            course={course}
            currentLecture={currentLecture}
            courseId={courseId}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            notes={notes}
            handleNoteChange={handleNoteChange}
          />
        </div>
      </div>

      {/* Completion Modal */}
      {showCompletionModal && (
        <VideoLectureCompletionModal
          currentLecture={currentLecture}
          next={next}
          courseId={courseId}
          setShowCompletionModal={setShowCompletionModal}
          navigate={navigate}
        />
      )}
    </div>
  );
};

export default VideoLecture;