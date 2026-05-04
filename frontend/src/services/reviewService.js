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
    },

    deleteReview: async (reviewId) => {
        try {
            const response = await api.delete(`/reviews/${reviewId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting review:', error);
            throw error;
        }
    },


    updateReview: async (reviewId, reviewData) => {
        const response = await api.put(`/reviews/${reviewId}`, reviewData);
        return response.data;
    },


    getMyReviews: async () => {
        try {
            const response = await api.get(`/users/me/reviews`);
            return response.data;
        } catch (error) {
            console.error('Error fetching my reviews:', error);
            throw error;
        }
    },
};