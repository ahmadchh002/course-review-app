import api from './api';

export const courseService = {
    // Get all courses
    getAllCourses: async() => {
        try {
            const response = await api.get('/courses');
            return response.data;
        } catch (error) {
            console.error('Error fetching courses:', error);
            throw error;
        }
    },

    // Get single course by ID
    getCourseById: async(id) => {
        try {
            const response = await api.get(`/courses/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching course:', error);
            throw error;
        }
    },

    // Search courses
    searchCourses: async(query) => {
        try {
            const response = await api.get(`/courses/search?q=${query}`);
            return response.data;
        } catch (error) {
            console.error('Error searching courses:', error);
            throw error;
        }
    }
};