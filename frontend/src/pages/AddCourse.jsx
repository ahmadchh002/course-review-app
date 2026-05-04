import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ArrowLeft, BookPlus, Save } from 'lucide-react';
import { courseService } from '../services/courseService';

const AddCourse = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      code: formData.code.trim().toUpperCase(),
      name: formData.name.trim(),
      description: formData.description.trim(),
    };

    if (!payload.code || !payload.name || !payload.description) {
      toast.error('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      await courseService.createCourse(payload);
      toast.success('Course created successfully!');
      navigate('/');
    } catch (error) {
      const message = error.response?.data?.detail || 'Failed to create course';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[900px] mx-auto mt-8 mb-12 space-y-8">
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Courses</span>
      </button>

      <div className="bg-black/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d62851] to-transparent" />

        <h1 className="text-[2.2rem] font-bold text-white mb-8 leading-tight border-b border-white/10 pb-6 flex items-center gap-3">
          <BookPlus className="w-8 h-8 text-[#d62851]" />
          Add New Course
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-[13px] font-semibold text-white mb-2 uppercase tracking-wider">
                Course Code <span className="text-[#d62851]">*</span>
              </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="e.g. CS101"
                maxLength={20}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white outline-none focus:border-white focus:bg-white/10 transition-all placeholder-white/40 uppercase"
              />
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-white mb-2 uppercase tracking-wider">
              Course Name <span className="text-[#d62851]">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Introduction to Programming"
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white outline-none focus:border-white focus:bg-white/10 transition-all placeholder-white/40"
            />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-white mb-2 uppercase tracking-wider">
              Description <span className="text-[#d62851]">*</span>
            </label>
            <textarea
              name="description"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a brief overview of the course..."
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white outline-none focus:border-white focus:bg-white/10 transition-all resize-none placeholder-white/40"
            />
          </div>

          <div className="pt-6 border-t border-white/10">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto md:min-w-[220px] flex items-center justify-center gap-2 bg-[#d62851] text-white py-3.5 px-8 rounded-lg hover:bg-[#b01e3e] transition-all duration-300 disabled:bg-gray-500 font-bold shadow-lg shadow-[#d62851]/30"
            >
              <Save className="w-5 h-5" />
              <span>{loading ? 'Creating...' : 'Create Course'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
