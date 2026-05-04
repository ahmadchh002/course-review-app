import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Star, Link as LinkIcon, User, Calendar, ThumbsUp, ThumbsDown, Trash2 } from 'lucide-react';
import { reviewService } from '../services/reviewService';

const ReviewCard = ({ review, currentUserId, isAdmin, onDeleted }) => {
  const [deleting, setDeleting] = useState(false);
  const displayRating = Number(review.rating) || 0;
  const displayDifficulty = Number(review.difficulty_level ?? review.rating) || 0;
  const displayDate = review.created_at || review.createdAt;

  const isOwner = currentUserId != null && String(review.user_id) === String(currentUserId);
  const canDelete = (isOwner || isAdmin) && review?.id;

  const handleDelete = async () => {
    if (!canDelete || deleting) return;
    if (!window.confirm('Delete this review? This cannot be undone.')) return;

    setDeleting(true);
    try {
      await reviewService.deleteReview(review.id);
      toast.success('Review deleted');
      onDeleted?.();
    } catch (error) {
      const msg = error.response?.data?.detail || 'Failed to delete review';
      toast.error(typeof msg === 'string' ? msg : 'Failed to delete review');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 transition-all hover:bg-white/10">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4 border-b border-white/10 pb-4">
        <div className="flex-1 w-full flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="flex items-center space-x-3 mb-2 flex-wrap">
            <span className="text-[#d62851] font-bold text-lg">Rating: {displayRating}/5</span>
            <div className="h-4 w-px bg-white/20"></div>
            <div className="flex items-center">
              <span className="text-white/70 mr-2 text-sm">Difficulty: </span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < displayDifficulty ? 'text-[#ff4d79]' : 'text-white/20'}`}
                    fill={i < displayDifficulty ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
            </div>
          </div>
          {canDelete && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold bg-red-500/15 text-red-300 border border-red-500/30 hover:bg-red-500/25 hover:text-white transition-colors disabled:opacity-50 shrink-0"
            >
              <Trash2 className="w-4 h-4" />
              {deleting ? 'Deleting…' : 'Delete'}
            </button>
          )}
        </div>
        <div className="flex items-center space-x-4 text-sm text-white/50 bg-black/20 px-3 py-1.5 rounded-lg">
          <div className="flex items-center space-x-1.5">
            <User className="w-3.5 h-3.5" />
            <span>{review.studentName || 'Anonymous'}</span>
          </div>
          <div className="h-3 w-px bg-white/20"></div>
          <div className="flex items-center space-x-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{displayDate ? new Date(displayDate).toLocaleDateString() : '-'}</span>
          </div>
        </div>
      </div>

      {(review.content || review.advice) && (
        <div className="mb-5">
          <h4 className="font-semibold text-white mb-2 flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4da6ff]"></span>
            <span>Review</span>
          </h4>
          <p className="text-white/70 bg-black/20 p-4 rounded-lg leading-relaxed text-sm">{review.content || review.advice}</p>
        </div>
      )}

      {review.resources && review.resources.length > 0 && (
        <div className="mb-5">
          <h4 className="font-semibold text-white mb-2 flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffc107]"></span>
            <span>Resources</span>
          </h4>
          <ul className="space-y-2">
            {review.resources.map((resource, index) => (
              <li key={index} className="flex items-center space-x-2">
                <LinkIcon className="w-3.5 h-3.5 text-white/40" />
                <a href={resource} target="_blank" rel="noopener noreferrer" className="text-[#4da6ff] hover:text-white transition-colors text-sm truncate max-w-full">
                  {resource}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {(review.goodInstructors?.length > 0 || review.badInstructors?.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {review.goodInstructors?.length > 0 && (
            <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
              <h4 className="font-semibold text-green-400 mb-1 flex items-center space-x-1.5 text-sm">
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Good Instructors</span>
              </h4>
              <p className="text-white/80 text-sm">{review.goodInstructors.join(', ')}</p>
            </div>
          )}
          {review.badInstructors?.length > 0 && (
            <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
              <h4 className="font-semibold text-red-400 mb-1 flex items-center space-x-1.5 text-sm">
                <ThumbsDown className="w-3.5 h-3.5" />
                <span>Avoid Instructors</span>
              </h4>
              <p className="text-white/80 text-sm">{review.badInstructors.join(', ')}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewCard;