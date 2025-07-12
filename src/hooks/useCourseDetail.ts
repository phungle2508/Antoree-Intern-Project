import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courses, authors } from '../data';
import { Course, Author, Section } from '../types';
import { updateProgressOfUserData } from '../services/historyService';
import { appendWishlist, getWishlist, removeWishlistItem } from '../services/wishlistService';
import { appendCart } from '../services/cartService';

export function useCourseDetail(props: { courseId?: string }) {
  const params = useParams<{ courseId: string }>();
  const courseId = props.courseId || params.courseId;
  const navigate = useNavigate();

  const [course, setCourse] = useState<Course | null>(null);
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'reviews'>('overview');
  const [addingToCart, setAddingToCart] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundCourse = courses.find(c => c.id === courseId);
    if (foundCourse) {
      updateProgressOfUserData(foundCourse?.id);
      setCourse(foundCourse);
      document.title = `${foundCourse.title} | LearnHub`;

      const foundAuthor = authors.find(a => a.id === foundCourse.authorId);
      if (foundAuthor) {
        setAuthor(foundAuthor);
      }

      if (foundCourse.curriculum.length > 0) {
        setActiveSectionId(foundCourse.curriculum[0].id);
      }
      const wishlist = getWishlist();
      setIsInWishlist(wishlist ? wishlist.includes(foundCourse.id) : false);
    }

    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, [courseId]);

  const toggleSection = (sectionId: string) => {
    setActiveSectionId(activeSectionId === sectionId ? null : sectionId);
  };

  const getTotalLectures = (curriculum: Section[]) => {
    return curriculum.reduce((total, section) => total + section.lectures.length, 0);
  };

  const getTotalDuration = (curriculum: Section[]) => {
    let totalMinutes = 0;
    curriculum.forEach(section => {
      section.lectures.forEach(lecture => {
        const [minutes, seconds] = lecture.duration.split(':').map(Number);
        totalMinutes += minutes + (seconds / 60);
      });
    });
    const hours = Math.floor(totalMinutes / 60);
    const mins = Math.round(totalMinutes % 60);
    return `${hours}h ${mins}m`;
  };

  const handleAddToCart = () => {
    setAddingToCart(true);
    setTimeout(() => {
      if (course && course.id) {
        appendCart(course.id, 1)
      }
      setAddingToCart(false);
    }, 800);
  };

  const handleWishlistToggle = () => {
    if (course && course.id) {
      if (isInWishlist) {
        removeWishlistItem(course.id);
        setIsInWishlist(false);
      } else {
        appendWishlist(course.id);
        setIsInWishlist(true);
      }
    }
  };

  return {
    courseId,
    course,
    author,
    loading,
    activeSectionId,
    setActiveSectionId,
    activeTab,
    setActiveTab,
    addingToCart,
    setAddingToCart,
    imageLoaded,
    setImageLoaded,
    isInWishlist,
    setIsInWishlist,
    toggleSection,
    getTotalLectures,
    getTotalDuration,
    handleAddToCart,
    handleWishlistToggle,
    navigate
  };
}
