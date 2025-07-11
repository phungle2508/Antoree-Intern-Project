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
            Loading Saket LearnHub...
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
        className="fixed bottom-8 right-8 z-50 rounded-full w-14 h-14 bg-accent-500 text-white shadow-lg flex items-center justify-center hover:bg-accent-600 transition-colors"
        aria-label="Open chat"
        style={{ background: '#ffc680', color: '#222' }}
        onClick={() => setChatOpen(true)}
      >
        <MessageCircle size={28} />
      </button>
      <ModalChat open={chatOpen} onClose={() => setChatOpen(false)} />
      <ModalNote open={chatOpen}  />
    </ThemeProvider>
  );
}

export default App;