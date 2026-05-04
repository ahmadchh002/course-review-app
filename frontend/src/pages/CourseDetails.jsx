import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { courseService } from '../services/courseService';
import { reviewService } from '../services/reviewService';
import ReviewCard from '../components/ReviewCard';
import { ArrowLeft, PlusCircle, Book, Building } from 'lucide-react';

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
  
      const courseData = await courseService.getCourseById(id);
      setCourse(courseData);
  
      const reviewsData = await reviewService.getReviewsForCourse(courseData.code);
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
        <div className="text-white text-xl animate-pulse">Loading course details...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="w-full max-w-[800px] mx-auto p-10 mt-8 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 text-center">
        <p className="text-[#ff4d79] text-xl mb-4">Course not found</p>
        <Link to="/" className="text-white/80 hover:text-white transition-colors inline-flex items-center justify-center space-x-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1000px] mx-auto mt-8 mb-12 space-y-8">
      {/* Back Link */}
      <Link to="/" className="inline-flex items-center space-x-2 text-white/70 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Courses</span>
      </Link>

      {/* Course Info */}
      <div className="bg-black/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-10 relative overflow-hidden">
        {/* Decorative Top Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d62851] to-transparent"></div>

        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <h1 className="text-[2.5rem] font-bold text-white mb-4 leading-tight">{course.name}</h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                <Book className="w-4 h-4 text-[#ffc107]" />
                <span className="text-white font-semibold">{course.code}</span>
              </div>
              
              {course.department && (
                <div className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <Building className="w-4 h-4 text-[#4da6ff]" />
                  <span className="text-white/90">{course.department}</span>
                </div>
              )}
            </div>

            <p className="text-white/80 leading-relaxed max-w-2xl text-lg">{course.description}</p>
          </div>

          {user && (
            <button
              onClick={() => navigate(`/courses/${id}/add-review`)}
              className="flex items-center space-x-2 bg-[#d62851] hover:bg-[#b01e3e] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-[#d62851]/30 shrink-0"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Add Review</span>
            </button>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-black/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-10">
        <h2 className="text-[2rem] font-bold text-white mb-8 border-b border-white/10 pb-4">
          Reviews <span className="text-[#d62851]">({reviews.length})</span>
        </h2>
        
        <div className="space-y-6">
          {reviews.length === 0 ? (
            <div className="text-center py-12 bg-white/5 rounded-xl border border-white/5">
              <p className="text-white/60 text-lg">No reviews yet. Be the first to share your experience!</p>
            </div>
          ) : (
            reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;