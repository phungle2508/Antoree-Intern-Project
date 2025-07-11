// Export types and data from userProgress
export type { Progress, Certificate, UserData } from './userProgress';

// Export types and data from testimonials
export type { Testimonial } from './testimonials';
export { default as testimonials } from './testimonials';

// Export types and data from courses
export type { 
  Author, 
  Review, 
  LectureItem, 
  Section, 
  Quiz, 
  Question, 
  Course 
} from './courses';
export { default as courses, authors } from './courses';

// Export everything from services (if it exists)
export * from '../services/autoFakeData';
