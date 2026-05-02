import React from 'react';

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-lg font-semibold">Grade: {review.grade}</span>
          <div className="flex items-center mt-1">
            <span className="text-gray-600">Difficulty: </span>
            <div className="ml-2 flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-lg ${i < review.difficulty ? 'text-red-500' : 'text-gray-300'}`}>
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {new Date(review.createdAt).toLocaleDateString()}
        </div>
      </div>

      {review.advice && (
        <div className="mb-3">
          <h4 className="font-semibold text-gray-700">Advice:</h4>
          <p className="text-gray-600">{review.advice}</p>
        </div>
      )}

      {review.resources && review.resources.length > 0 && (
        <div className="mb-3">
          <h4 className="font-semibold text-gray-700">Resources:</h4>
          <ul className="list-disc list-inside">
            {review.resources.map((resource, index) => (
              <li key={index}>
                <a href={resource} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {resource}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {(review.goodInstructors?.length > 0 || review.badInstructors?.length > 0) && (
        <div className="grid grid-cols-2 gap-4 mt-3">
          {review.goodInstructors?.length > 0 && (
            <div>
              <h4 className="font-semibold text-green-600">Good Instructors:</h4>
              <p className="text-gray-600">{review.goodInstructors.join(', ')}</p>
            </div>
          )}
          {review.badInstructors?.length > 0 && (
            <div>
              <h4 className="font-semibold text-red-600">Bad Instructors:</h4>
              <p className="text-gray-600">{review.badInstructors.join(', ')}</p>
            </div>
          )}
        </div>
      )}

      <div className="mt-3 text-sm text-gray-400">
        Posted by: {review.studentName || 'Anonymous'}
      </div>
    </div>
  );
};

export default ReviewCard;