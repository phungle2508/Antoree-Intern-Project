import { ChevronLeft, Star, ChevronRight } from 'lucide-react';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useModalBehavior } from '../hooks/useModalBehavior';
import { useCourseDetailModal } from '../hooks/useCourseDetailModal';
import { useCourseSlider } from '../hooks/useCourseSlider';
import { Course } from '../types';
import { getRecommendedCourses } from '../services/recommendService';

interface PopupModalProps {
  open: boolean;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  onClose: () => void;
  children?: React.ReactNode;
  actions?: React.ReactNode;
}

const PopupModal = ({ open, onClose }: PopupModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [recommendCourses, setRecommendCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch recommended courses only when modal opens
  useEffect(() => {
    if (!open) return;
    let mounted = true;
    setLoading(true);
    getRecommendedCourses(5)
      .then(courses => {
        if (mounted) setRecommendCourses(courses);
      })
      .catch(() => {
        if (mounted) setRecommendCourses([]);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, [open]);

  const {
    visibleCourses,
    sliderRef,
    canScrollLeft,
    canScrollRight,
    setShowModal,
    setSelectedCourseId,
    imageLoadStates,
    handleImageLoad,
    scroll,
  } = useCourseSlider(open, recommendCourses);

  const { openModal, ModalContent } = useCourseDetailModal();

  useModalBehavior({
    open,
    modalRef,
    onClose: useCallback(() => {
      setShowModal(false);
      setSelectedCourseId('');
      onClose();
    }, [onClose, setShowModal, setSelectedCourseId])
  });

  if (!open) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-2 sm:px-4">
        <div className="flex items-center justify-center w-full">
          <div className="w-12 h-12 border-t-4 border-orange-500 border-solid rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  // Show error if no recommended courses
  if (!visibleCourses.length) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-2 sm:px-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-md w-full p-6 flex flex-col items-center">
          <div className="text-4xl mb-4">😅</div>
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">No Recommendations Yet</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-center">
            You need to add some courses to your cart or view some courses to get recommendations.
          </p>
          <button
            className="btn btn-primary"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-2 sm:px-4"
      onClick={() => {
        setShowModal(false);
        setSelectedCourseId('');
        setTimeout(onClose, 0);
      }}
      data-modal-root
    >
      <div
        className="relative bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-6xl max-h-[95vh] overflow-y-auto p-2 sm:p-4 md:p-6 flex flex-col"
        style={{ minHeight: '300px' }}
        ref={modalRef}
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 left-0 z-30 flex justify-end w-full bg-transparent">
          <button
            className="mt-2 mr-2 sm:mt-0 sm:mr-0 text-gray-500 hover:text-gray-800 dark:hover:text-white text-2xl"
            onClick={() => {
              setShowModal(false);
              setSelectedCourseId('');
              setTimeout(onClose, 0);
            }}
            tabIndex={0}
            aria-label="Close"
            style={{ background: 'transparent' }}
          >
            ×
          </button>
        </div>
        <div className="relative w-full">
          <button
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg ${!canScrollLeft ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-100 dark:hover:bg-orange-700'}`}
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} className="text-gray-700 dark:text-gray-300" />
          </button>
          <div
            ref={sliderRef}
            className="flex overflow-x-auto gap-4 sm:gap-6 pb-6 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {visibleCourses.map(course => (
              <div
                key={course.id}
                className="flex-shrink-0 w-[90vw] xs:w-[320px] sm:w-[340px] max-w-xs"
                style={{ minWidth: 240, maxWidth: 380 }}
              >
                <div className="card group h-full flex flex-col">
                  <div className="relative overflow-hidden">
                    <div className="w-full h-48 relative">
                      {!imageLoadStates[course.id] && (
                        <div className="absolute inset-0 w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-t-lg" />
                      )}
                      <img
                        src={course.imageUrl}
                        alt={course.title}
                        className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 rounded-t-lg ${!imageLoadStates[course.id] ? 'opacity-0' : 'opacity-100'}`}
                        onLoad={() => handleImageLoad(course.id)}
                        style={{ position: 'absolute', inset: 0 }}
                      />
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="badge bg-orange-500 text-white">{course.category}</span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="badge bg-orange-400 text-white">{course.level}</span>
                    </div>
                  </div>
                  <div className="p-5 flex-grow flex flex-col">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm mb-1">
                      <div className="flex items-center">
                        {Array(5).fill(0).map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`${i < Math.floor(course.rating)
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-gray-300 dark:text-gray-600'
                              }`}
                          />
                        ))}
                      </div>
                      <span className="ml-1">{course.rating.toFixed(1)}</span>
                      <span className="ml-1">({course.reviewCount})</span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      {course.enrolledStudents.toLocaleString()} students enrolled
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="font-bold text-gray-900 dark:text-white">
                        {course.price ? `$${course.price.toFixed(2)}` : 'Free'}
                      </div>
                      <button
                        className="btn bg-orange-500 hover:bg-orange-600 text-sm py-1.5"
                        onClick={() => openModal(course.id)}
                      >
                        View Course
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg ${!canScrollRight ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-100 dark:hover:bg-orange-700'}`}
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <ChevronRight size={24} className="text-gray-700 dark:text-gray-300" />
          </button>
          {ModalContent}
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
