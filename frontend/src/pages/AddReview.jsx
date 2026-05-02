import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { reviewService } from '../services/reviewService';
import toast from 'react-hot-toast';

const AddReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    grade: '',
    difficulty: 3,
    advice: '',
    resources: [''],
    goodInstructors: [''],
    badInstructors: ['']
  });

  const grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayField = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], '']
    });
  };

  const removeArrayField = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.grade) {
      toast.error('Please select a grade');
      return;
    }

    // Filter out empty strings
    const reviewData = {
      grade: formData.grade,
      difficulty: parseInt(formData.difficulty),
      advice: formData.advice,
      resources: formData.resources.filter(r => r.trim() !== ''),
      goodInstructors: formData.goodInstructors.filter(i => i.trim() !== ''),
      badInstructors: formData.badInstructors.filter(i => i.trim() !== '')
    };

    setLoading(true);
    try {
      await reviewService.addReview(id, reviewData);
      toast.success('Review added successfully!');
      navigate(`/courses/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add review');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500">Please login to add a review</p>
        <button
          onClick={() => navigate('/login')}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Add Review</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Grade Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Grade *
          </label>
          <select
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Grade</option>
            {grades.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        {/* Difficulty Slider */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Difficulty Level (1-5)
          </label>
          <input
            type="range"
            name="difficulty"
            min="1"
            max="5"
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full"
          />
          <div className="text-center text-gray-600">
            {formData.difficulty === 1 && 'Very Easy'}
            {formData.difficulty === 2 && 'Easy'}
            {formData.difficulty === 3 && 'Medium'}
            {formData.difficulty === 4 && 'Hard'}
            {formData.difficulty === 5 && 'Very Hard'}
          </div>
        </div>

        {/* Advice */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            General Advice
          </label>
          <textarea
            name="advice"
            rows="4"
            value={formData.advice}
            onChange={handleChange}
            placeholder="Share your advice for future students..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Resource Links */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resource Links
          </label>
          {formData.resources.map((resource, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="url"
                value={resource}
                onChange={(e) => handleArrayChange('resources', index, e.target.value)}
                placeholder="https://..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              />
              {formData.resources.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayField('resources', index)}
                  className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField('resources')}
            className="text-blue-500 hover:text-blue-600 text-sm"
          >
            + Add another resource
          </button>
        </div>

        {/* Good Instructors */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Good Instructors
          </label>
          {formData.goodInstructors.map((instructor, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={instructor}
                onChange={(e) => handleArrayChange('goodInstructors', index, e.target.value)}
                placeholder="Instructor name"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              />
              {formData.goodInstructors.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayField('goodInstructors', index)}
                  className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField('goodInstructors')}
            className="text-blue-500 hover:text-blue-600 text-sm"
          >
            + Add instructor
          </button>
        </div>

        {/* Bad Instructors */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bad Instructors
          </label>
          {formData.badInstructors.map((instructor, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={instructor}
                onChange={(e) => handleArrayChange('badInstructors', index, e.target.value)}
                placeholder="Instructor name"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              />
              {formData.badInstructors.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayField('badInstructors', index)}
                  className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField('badInstructors')}
            className="text-blue-500 hover:text-blue-600 text-sm"
          >
            + Add instructor
          </button>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition disabled:bg-gray-400"
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/courses/${id}`)}
            className="flex-1 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReview;