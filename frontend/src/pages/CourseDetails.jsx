import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { courseService } from '../services/courseService';
import { reviewService } from '../services/reviewService';
import ReviewCard from '../components/ReviewCard';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourseAndReviews();
  }, [id]);

  const fetchCourseAndReviews = async () => {
    try {
      setLoading(true);
      const [courseData, reviewsData] = await Promise.all([
        courseService.getCourseById(id),
        reviewService.getReviewsForCourse(id)
      ]);
      setCourse(courseData);
      setReviews(reviewsData);
    } catch (error) {
      console.error('Error loading course details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading course details...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-500">Course not found</p>
        <Link to="/" className="text-blue-500 hover:underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Course Info */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold mb-2">{course.name}</h1>
        <p className="text-gray-600 mb-4">Course Code: {course.code}</p>
        <p className="text-gray-700 mb-4">{course.description}</p>
        {course.department && (
          <p className="text-gray-500">Department: {course.department}</p>
        )}
        
        {user && (
          <button
            onClick={() => navigate(`/courses/${id}/add-review`)}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Add Review
          </button>
        )}
      </div>

      {/* Reviews Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Reviews ({reviews.length})
        </h2>
        {reviews.length === 0 ? (
          <p className="text-gray-600">No reviews yet. Be the first to add one!</p>
        ) : (
          reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        )}
      </div>
    </div>
  );
};

export default CourseDetails;