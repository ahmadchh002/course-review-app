import api from './api';

export const reviewService = {
    // Get reviews for a course
    getReviewsForCourse: async(courseCode) => {
        try {
            const response = await api.get(`/reviews/course/${courseCode}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching reviews:', error);
            throw error;
        }
    },

    // Add a new review
    addReview: async(reviewData) => {
        try {
            const response = await api.post(`/reviews/`, reviewData);
            return response.data;
        } catch (error) {
            console.error('Error adding review:', error);
            throw error;
        }
    }
};