import { useCourseDetail } from '../hooks/useCourseDetail';
import {
  AlertTriangle,
  ArrowLeft
} from 'lucide-react';
import ModalCourseDetail from '../modal/ModalCourseDetail';
import CourseDetailHeader from '../components/courses/CourseDetailHeader';
import CourseDetailTabs from '../components/courses/CourseDetailTabs';

interface CourseDetailProps {
  courseId?: string;
  modalMode?: boolean;
  onClose?: () => void;
}

const CourseDetail = (props: CourseDetailProps) => {
  const {
    course,
    author,
    loading,
    activeSectionId,
    activeTab,
    setActiveTab,
    addingToCart,
    imageLoaded,
    setImageLoaded,
    isInWishlist,
    toggleSection,
    getTotalLectures,
    getTotalDuration,
    handleAddToCart,
    handleWishlistToggle,
    navigate
  } = useCourseDetail(props);

  if (props.modalMode) {
    return (
      <ModalCourseDetail
        course={course}
        author={author}
        loading={loading}
        activeSectionId={activeSectionId}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        addingToCart={addingToCart}
        imageLoaded={imageLoaded}
        setImageLoaded={setImageLoaded}
        isInWishlist={isInWishlist}
        toggleSection={toggleSection}
        getTotalLectures={getTotalLectures}
        getTotalDuration={getTotalDuration}
        handleAddToCart={handleAddToCart}
        handleWishlistToggle={handleWishlistToggle}
        onClose={props.onClose}
      />
    );
  }

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
          onClick={() => props.modalMode && props.onClose ? props.onClose() : navigate('/courses')}
          className="btn btn-primary flex items-center"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-16">
      <CourseDetailHeader
        course={course}
        author={author}
        imageLoaded={imageLoaded}
        setImageLoaded={setImageLoaded}
        isInWishlist={isInWishlist}
        handleWishlistToggle={handleWishlistToggle}
        handleAddToCart={handleAddToCart}
        addingToCart={addingToCart}
        getTotalLectures={getTotalLectures}
        getTotalDuration={getTotalDuration}
      />
      <CourseDetailTabs
        course={course}
        author={author}
        activeSectionId={activeSectionId}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        toggleSection={toggleSection}
        getTotalLectures={getTotalLectures}
        getTotalDuration={getTotalDuration}
      />
    </div>
  );
};

export default CourseDetail;