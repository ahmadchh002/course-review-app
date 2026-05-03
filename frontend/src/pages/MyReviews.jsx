import React from 'react';
import { Star, Edit2, Trash2 } from 'lucide-react';

const MyReviews = () => {
  const reviews = [
    {
      id: 1,
      courseName: 'Data Structures & Algorithms',
      rating: 5,
      date: '2 days ago',
      content: 'Great course, highly recommended! The instructor was very clear.',
    },
    {
      id: 2,
      courseName: 'Web Programming',
      rating: 4,
      date: '1 week ago',
      content: 'Good content but the assignments were quite tough.',
    },
    {
      id: 3,
      courseName: 'Database Systems',
      rating: 4,
      date: '2 weeks ago',
      content: 'Solid introduction to SQL and database design principles.',
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">My Reviews</h1>
        <p className="text-white/60">Manage all the reviews you have submitted.</p>
      </div>

      <div className="grid gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-white">{review.courseName}</h3>
                <span className="text-white/40 text-sm">{review.date}</span>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-[#ffc107] fill-[#ffc107]' : 'text-white/20'}`} />
                ))}
              </div>
              <p className="text-white/70">{review.content}</p>
            </div>
            <div className="flex md:flex-col justify-end gap-3 shrink-0">
              <button className="flex items-center space-x-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors text-sm font-medium">
                <Edit2 className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-[#d62851]/10 hover:bg-[#d62851]/20 text-[#d62851] rounded-lg transition-colors text-sm font-medium border border-[#d62851]/20">
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReviews;
