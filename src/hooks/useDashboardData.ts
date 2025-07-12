import { useEffect, useState } from 'react';
import { getUserDataFromCookie } from '../services/historyService';
import { getCart } from '../services/cartService';
import { getWishlist } from '../services/wishlistService';
import { getRecommendedCourses } from '../services/recommendService';
import { courses } from '../data';
import { CartItem, Course, UserData } from '../types';

export function useDashboardData() {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [recommendCourses, setRecommendCourses] = useState<Course[]>([]);
  const [userData, setUserData] = useState<UserData | null>(getUserDataFromCookie());

  const updateFromCookie = () => {
    setWishlist(getWishlist() || []);
    setCart(getCart() || []);
    setUserData(getUserDataFromCookie() || null);
  };

  useEffect(() => {
    updateFromCookie();
    const interval = setInterval(updateFromCookie, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchRecommendedCourses = async () => {
      const courses = await getRecommendedCourses();
      setRecommendCourses(courses);
    };
    fetchRecommendedCourses();
  }, []);

  const enrolledCourses = courses.filter(course =>
    userData?.enrolledCourses.includes(course.id)
  );

  return {
    wishlist,
    cart,
    recommendCourses,
    userData,
    enrolledCourses,
    updateFromCookie
  };
}
