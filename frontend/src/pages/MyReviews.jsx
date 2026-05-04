import React, { useEffect, useState } from 'react';
import { Star, Edit2, Trash2, BookOpen, X } from 'lucide-react';
import { reviewService } from '../services/reviewService';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const MyReviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState(null);
  const [editFormData, setEditFormData] = useState({
    rating: 5,
    content: '',
    grade: '',
    difficulty_level: 3,
  });

  const fetchMyReviews = async () => {
    try {
      const data = await reviewService.getMyReviews();
      const formatted = data.map(review => ({
        id: review.id,
        courseName: review.course_name,
        courseCode: review.course_code,
        rating: review.rating,
        content: review.content,
        date: new Date(review.created_at).toLocaleDateString(),
        grade: review.grade,
        difficulty_level: review.difficulty_level,
        goodInstructors: review.goodInstructors,
        badInstructors: review.badInstructors,
        resources: review.resources,
      }));
      setReviews(formatted);
    } catch (error) {
      console.error('Error fetching my reviews:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => { fetchMyReviews(); }, []);

  // ----- DELETE -----
  const handleDelete = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      await reviewService.deleteReview(reviewId);
      // Remove from local state
      setReviews(reviews.filter(r => r.id !== reviewId));
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete review. Please try again.');
    }
  };

  // ----- EDIT -----
  const handleEditClick = (review) => {
    setEditingReview(review);
    setEditFormData({
      rating: review.rating,
      content: review.content,
      grade: review.grade || '',
      difficulty_level: review.difficulty_level || 3,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (!editingReview) return;
    try {
      const updated = await reviewService.updateReview(editingReview.id, editFormData);
      // Update local state
      setReviews(reviews.map(r => 
        r.id === editingReview.id 
          ? { ...r, ...editFormData, date: new Date(updated.created_at).toLocaleDateString() }
          : r
      ));
      setEditingReview(null);
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update review');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-white text-xl animate-pulse">Loading reviews...</div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="text-white/70 text-xl">No reviews found. Add a review to get started.</div>
        <Link
          to="/"
          className="text-white/80 hover:text-white transition-colors inline-flex items-center justify-center space-x-2 bg-white/5 px-4 py-2 rounded-lg"
        >
          <BookOpen className="w-4 h-4" />
          <span>Browse Courses</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto p-10 rounded-2xl bg-black/40 backdrop-blur-xl shadow-2xl border border-white/10 mt-8 mb-12">
      <h2 className="text-2xl font-bold text-white mb-6">My Reviews</h2>
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-white">{review.courseName} ({review.courseCode})</h3>
                <span className="text-white/40 text-sm">{review.date}</span>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-[#ffc107] fill-[#ffc107]' : 'text-white/20'}`} />
                ))}
              </div>
              <p className="text-white/70">{review.content}</p>
              {review.grade && <p className="text-white/50 text-sm mt-2">Grade: {review.grade}</p>}
            </div>
            <div className="flex md:flex-col justify-end gap-3 shrink-0">
              <button onClick={() => handleEditClick(review)} className="flex items-center space-x-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors text-sm font-medium">
                <Edit2 className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button onClick={() => handleDelete(review.id)} className="flex items-center space-x-2 px-4 py-2 bg-[#d62851]/10 hover:bg-[#d62851]/20 text-[#d62851] rounded-lg transition-colors text-sm font-medium border border-[#d62851]/20">
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingReview && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-black/90 backdrop-blur-xl rounded-2xl border border-white/20 p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Edit Review for {editingReview.courseName}</h3>
              <button onClick={() => setEditingReview(null)} className="text-white/50 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm mb-1">Rating (1-5)</label>
                <select name="rating" value={editFormData.rating} onChange={handleEditChange} className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white">
                  {[1,2,3,4,5].map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-1">Review Content</label>
                <textarea name="content" value={editFormData.content} onChange={handleEditChange} rows="3" className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white" />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-1">Grade (optional)</label>
                <input name="grade" value={editFormData.grade} onChange={handleEditChange} className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white" />
              </div>
              <button onClick={handleUpdate} className="w-full bg-[#d62851] hover:bg-[#b81f45] text-white font-bold py-2 rounded-lg transition-colors">
                Update Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;