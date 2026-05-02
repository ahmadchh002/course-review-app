import api from './api';

export const reviewService = {
    // Get reviews for a course
    getReviewsForCourse: async(courseId) => {
        try {
            const response = await api.get(`/courses/${courseId}/reviews`);
            return response.data;
        } catch (error) {
            console.error('Error fetching reviews:', error);
            throw error;
        }
    },

    // Add a new review
    addReview: async(courseId, reviewData) => {
        try {
            const response = await api.post(`/courses/${courseId}/reviews`, reviewData);
            return response.data;
        } catch (error) {
            console.error('Error adding review:', error);
            throw error;
        }
    }
};