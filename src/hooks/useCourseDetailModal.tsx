import { useState, useCallback, useMemo, useRef } from 'react';
import CourseDetail from '../pages/CourseDetail';
import { useModalBehavior } from './useModalBehavior';

export function useCourseDetailModal() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = useCallback((courseId: string) => {
    setSelectedCourseId(courseId);
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setSelectedCourseId('');
  }, []);

  // Use modal behavior for focus trap, esc, scroll, and click outside
  useModalBehavior({
    open: showModal,
    modalRef,
    onClose: closeModal,
  });

  const ModalContent = useMemo(() => {
    if (!showModal || !selectedCourseId) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-0 sm:px-2">
        <div
          className="relative bg-white dark:bg-gray-900 rounded-none sm:rounded-lg shadow-lg w-full h-full sm:max-w-4xl sm:h-[90vh] overflow-y-auto p-0 sm:p-4 flex items-center justify-center"
          style={{
            maxWidth: '100vw',
            width: '100%',
            minWidth: 0,
            maxHeight: '100vh',
          }}
          ref={modalRef}
          onClick={e => e.stopPropagation()}
        >
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white text-2xl"
            onClick={closeModal}
            tabIndex={0}
            aria-label="Close"
          >
            ×
          </button>
          <div className="w-full h-full flex items-center justify-center">
            <CourseDetail courseId={selectedCourseId} modalMode onClose={closeModal} />
          </div>
        </div>
      </div>
    );
  }, [showModal, selectedCourseId, closeModal]);

  return {
    showModal,
    selectedCourseId,
    openModal,
    closeModal,
    ModalContent,
  };
}
