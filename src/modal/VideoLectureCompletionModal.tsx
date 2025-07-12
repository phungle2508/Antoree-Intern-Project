import { CheckCircle } from 'lucide-react';

interface VideoLectureCompletionModalProps {
  currentLecture: { title: string } | null;
  next: { id: string } | null;
  courseId: string | undefined;
  setShowCompletionModal: (show: boolean) => void;
  navigate: (url: string) => void;
}

const VideoLectureCompletionModal = ({
  currentLecture,
  next,
  courseId,
  setShowCompletionModal,
  navigate
}: VideoLectureCompletionModalProps) => {
  if (!currentLecture) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-center mb-4">
          <div className="bg-success-100 dark:bg-success-900 p-3 rounded-full">
            <CheckCircle size={40} className="text-success-600 dark:text-success-400" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-2">
          Lecture Completed!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
          Great job! You've completed "{currentLecture.title}".
        </p>
        <div className="flex flex-col space-y-3">
          {next ? (
            <button
              onClick={() => {
                setShowCompletionModal(false);
                navigate(`/lecture/${courseId}/${next.id}`);
              }}
              className="btn btn-primary"
            >
              Continue to Next Lecture
            </button>
          ) : (
            <button
              onClick={() => {
                setShowCompletionModal(false);
                navigate(`/courses/${courseId}`);
              }}
              className="btn btn-primary"
            >
              Back to Course Page
            </button>
          )}
          <button
            onClick={() => setShowCompletionModal(false)}
            className="btn bg-indigo-100 text-indigo-800 hover:bg-indigo-200 "
          >
            Stay on This Lecture
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoLectureCompletionModal;
