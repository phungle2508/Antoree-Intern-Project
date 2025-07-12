import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import CourseCatalog from './pages/CourseCatalog';
import CourseDetail from './pages/CourseDetail';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import VideoLecture from './pages/VideoLecture';
import Quiz from './pages/Quiz';
import NotFound from './pages/NotFound';
import { MessageCircle } from 'lucide-react';
import ModalChat from './modal/ModalChat';
import ModalNote from './modal/ModalNote';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          <h2 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
            Loading LearnHub...
          </h2>
        </div>
      </div>
    );
  }
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="courses" element={<CourseCatalog />} />
          <Route path="courses/:courseId" element={<CourseDetail />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="lecture/:courseId/:lectureId" element={<VideoLecture />} />
          <Route path="quiz/:quizId" element={<Quiz />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      {/* Floating Icon Button with Tailwind and Lucide */}
      <button
        className="fixed z-50 rounded-full shadow-lg flex items-center justify-center transition-colors
          w-12 h-12 bottom-4 right-4
          sm:w-14 sm:h-14 sm:bottom-6 sm:right-6
          md:w-16 md:h-16 md:bottom-8 md:right-8
          hover:scale-110 transform transition-transform duration-200"
        aria-label="Open chat"
        style={{ background: '#ffc680', color: '#222' }}
        onClick={() => setChatOpen(true)}
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
      </button>
      <ModalChat open={chatOpen} onClose={() => setChatOpen(false)} />
      <ModalNote open={chatOpen}  />
    </ThemeProvider>
  );
}

export default App;