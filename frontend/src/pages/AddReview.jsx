import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { reviewService } from '../services/reviewService';
import toast from 'react-hot-toast';
import { ArrowLeft, Save, X, Plus, Trash2, Link as LinkIcon, UserPlus, UserMinus } from 'lucide-react';
import { courseService } from '../services/courseService';

const AddReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState(null);
  const [formData, setFormData] = useState({
    grade: '',
    difficulty: 3,
    advice: '',
    resources: [''],
    goodInstructors: [''],
    badInstructors: ['']
  });

  const grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'];

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await courseService.getCourseById(id);
        setCourse(data);
      } catch (error) {
        toast.error('Could not load course details');
        navigate(`/courses/${id}`);
      }
    };

    fetchCourse();
  }, [id, navigate]);

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

    if (!course?.code) {
      toast.error('Course data is still loading. Please try again.');
      return;
    }


    // Send both core and extended review fields to backend
    const reviewPayload = {
      course_code: course.code,
      rating: Number(formData.difficulty),
      content: formData.advice?.trim() || `Grade: ${formData.grade}`,
      grade: formData.grade,
      difficulty_level: Number(formData.difficulty),
      resources: formData.resources.filter((resource) => resource.trim() !== ''),
      goodInstructors: formData.goodInstructors.filter((instructor) => instructor.trim() !== ''),
      badInstructors: formData.badInstructors.filter((instructor) => instructor.trim() !== ''),
    };

    setLoading(true);
    try {
      await reviewService.addReview(reviewPayload);
      toast.success('Review added successfully!');
      navigate(`/courses/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to add review');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="w-full max-w-[800px] mx-auto p-10 mt-8 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 text-center">
        <p className="text-[#ff4d79] text-xl mb-6 font-semibold">Please login to add a review</p>
        <button
          onClick={() => navigate('/login')}
          className="bg-[#d62851] hover:bg-[#b01e3e] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[800px] mx-auto mt-8 mb-12 space-y-8">
      {/* Back Link */}
      <button 
        onClick={() => navigate(`/courses/${id}`)}
        className="inline-flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Course</span>
      </button>

      <div className="bg-black/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-10 relative overflow-hidden">
        {/* Decorative Top Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d62851] to-transparent"></div>

        <h1 className="text-[2.5rem] font-bold text-white mb-8 leading-tight border-b border-white/10 pb-6">Add Review</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Grade Selection */}
            <div>
              <label className="block text-[13px] font-semibold text-white mb-2 uppercase tracking-wider">
                Grade <span className="text-[#d62851]">*</span>
              </label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white outline-none focus:border-white focus:bg-white/10 transition-all appearance-none"
              >
                <option value="" className="text-black">Select Grade</option>
                {grades.map(g => (
                  <option key={g} value={g} className="text-black">{g}</option>
                ))}
              </select>
            </div>

            {/* Difficulty Slider */}
            <div>
              <label className="block text-[13px] font-semibold text-white mb-2 uppercase tracking-wider">
                Difficulty Level <span className="text-[#d62851]">*</span>
              </label>
              <div className="flex items-center space-x-4 h-[46px] bg-white/5 px-4 rounded-lg border border-white/10">
                <input
                  type="range"
                  name="difficulty"
                  min="1"
                  max="5"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full accent-[#d62851]"
                />
                <span className="text-white font-bold w-6 text-center">{formData.difficulty}</span>
              </div>
              <div className="flex justify-between text-xs text-white/50 mt-1 px-1">
                <span>Easy</span>
                <span>Hard</span>
              </div>
            </div>
          </div>

          {/* Advice */}
          <div>
            <label className="block text-[13px] font-semibold text-white mb-2 uppercase tracking-wider">
              General Advice
            </label>
            <textarea
              name="advice"
              rows="4"
              value={formData.advice}
              onChange={handleChange}
              placeholder="Share your advice for future students..."
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white outline-none focus:border-white focus:bg-white/10 transition-all resize-none placeholder-white/30"
            />
          </div>

          <div className="space-y-6 pt-4 border-t border-white/10">
            {/* Resource Links */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-[13px] font-semibold text-white uppercase tracking-wider flex items-center space-x-2">
                  <LinkIcon className="w-4 h-4 text-[#ffc107]" />
                  <span>Resource Links</span>
                </label>
                <button
                  type="button"
                  onClick={() => addArrayField('resources')}
                  className="text-[#4da6ff] hover:text-white transition-colors text-sm flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add More</span>
                </button>
              </div>
              <div className="space-y-3">
                {formData.resources.map((resource, index) => (
                  <div key={index} className="flex gap-3">
                    <input
                      type="url"
                      value={resource}
                      onChange={(e) => handleArrayChange('resources', index, e.target.value)}
                      placeholder="https://..."
                      className="flex-1 px-4 py-2.5 bg-white/5 border border-white/20 rounded-lg text-white outline-none focus:border-white focus:bg-white/10 transition-all placeholder-white/30"
                    />
                    {formData.resources.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayField('resources', index)}
                        className="bg-red-500/20 text-red-400 p-2.5 rounded-lg hover:bg-red-500 hover:text-white transition-colors border border-red-500/30 shrink-0"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Good Instructors */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-[13px] font-semibold text-white uppercase tracking-wider flex items-center space-x-2">
                    <UserPlus className="w-4 h-4 text-green-400" />
                    <span>Good Instructors</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => addArrayField('goodInstructors')}
                    className="text-[#4da6ff] hover:text-white transition-colors text-sm flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.goodInstructors.map((instructor, index) => (
                    <div key={index} className="flex gap-3">
                      <input
                        type="text"
                        value={instructor}
                        onChange={(e) => handleArrayChange('goodInstructors', index, e.target.value)}
                        placeholder="Instructor name"
                        className="flex-1 px-4 py-2.5 bg-white/5 border border-white/20 rounded-lg text-white outline-none focus:border-white focus:bg-white/10 transition-all placeholder-white/30"
                      />
                      {formData.goodInstructors.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayField('goodInstructors', index)}
                          className="bg-red-500/20 text-red-400 p-2.5 rounded-lg hover:bg-red-500 hover:text-white transition-colors border border-red-500/30 shrink-0"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bad Instructors */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-[13px] font-semibold text-white uppercase tracking-wider flex items-center space-x-2">
                    <UserMinus className="w-4 h-4 text-red-400" />
                    <span>Avoid Instructors</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => addArrayField('badInstructors')}
                    className="text-[#4da6ff] hover:text-white transition-colors text-sm flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.badInstructors.map((instructor, index) => (
                    <div key={index} className="flex gap-3">
                      <input
                        type="text"
                        value={instructor}
                        onChange={(e) => handleArrayChange('badInstructors', index, e.target.value)}
                        placeholder="Instructor name"
                        className="flex-1 px-4 py-2.5 bg-white/5 border border-white/20 rounded-lg text-white outline-none focus:border-white focus:bg-white/10 transition-all placeholder-white/30"
                      />
                      {formData.badInstructors.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayField('badInstructors', index)}
                          className="bg-red-500/20 text-red-400 p-2.5 rounded-lg hover:bg-red-500 hover:text-white transition-colors border border-red-500/30 shrink-0"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-6 border-t border-white/10 mt-8">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center space-x-2 bg-[#d62851] text-white py-3.5 rounded-lg hover:bg-[#b01e3e] transition-all duration-300 disabled:bg-gray-500 font-bold shadow-lg shadow-[#d62851]/30"
            >
              <Save className="w-5 h-5" />
              <span>{loading ? 'Submitting...' : 'Submit Review'}</span>
            </button>
            <button
              type="button"
              onClick={() => navigate(`/courses/${id}`)}
              className="w-32 flex items-center justify-center space-x-2 bg-white/10 text-white py-3.5 rounded-lg hover:bg-white/20 transition-all duration-300 font-bold border border-white/10"
            >
              <X className="w-5 h-5" />
              <span>Cancel</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReview;