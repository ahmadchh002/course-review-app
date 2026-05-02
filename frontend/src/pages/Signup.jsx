import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Key, Hash } from 'lucide-react';
import bgImage from '../assets/fast_bg.jpg';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    studentId: ''
  });
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const { confirmPassword, ...userData } = formData;
    const success = await signup(userData);
    
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="flex w-full max-w-[1000px] mx-auto rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] h-[600px] mt-8">
      
      {/* Left Side (Clear Background) */}
      <div 
        className="w-5/12 relative p-12 flex flex-col justify-between"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/></svg>
          <span className="text-xl font-bold tracking-wide text-white">Course@FAST</span>
        </div>

        {/* Welcome Text */}
        <div className="mt-8 text-white">
          <h1 className="text-[2.5rem] font-bold leading-[1.1] mb-4">Join Us!<br/>Create Account.</h1>
          <p className="text-sm text-white/80 mt-4 leading-relaxed max-w-[280px]">
            Help fellow students make informed decisions about their courses. Start sharing your experience today.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-5 mt-auto pb-4 text-white">
          <a href="#" className="hover:text-gray-300 transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
          <a href="#" className="hover:text-gray-300 transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg></a>
          <a href="#" className="hover:text-gray-300 transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
          <a href="#" className="hover:text-gray-300 transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
        </div>
      </div>

      {/* Right Side (Form with Gradient Overlay) */}
      <div className="w-7/12 relative bg-gradient-to-b from-[#1c1d33]/90 to-[#6e1335]/95 backdrop-blur-sm p-12 flex flex-col justify-center border-l border-white/10 text-white">
        <h2 className="text-[2rem] font-bold text-center mb-6">Sign Up</h2>
        
        {error && (
          <div className="mb-4 px-4 py-2 rounded text-sm text-center bg-red-500/20 border border-red-500/50 text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full space-y-5 px-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-semibold text-white mb-1">Full Name</label>
              <div className="relative border-b border-white/60 focus-within:border-white pb-1 transition-colors">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent outline-none text-[15px] text-white pr-8 pb-1"
                />
                <User className="absolute right-1 bottom-2 w-4 h-4 text-white" />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-white mb-1">Student ID (Optional)</label>
              <div className="relative border-b border-white/60 focus-within:border-white pb-1 transition-colors">
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none text-[15px] text-white pr-8 pb-1"
                />
                <Hash className="absolute right-1 bottom-2 w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-white mb-1">Email</label>
            <div className="relative border-b border-white/60 focus-within:border-white pb-1 transition-colors">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent outline-none text-[15px] text-white pr-8 pb-1"
              />
              <Mail className="absolute right-1 bottom-2 w-4 h-4 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-semibold text-white mb-1">Password</label>
              <div className="relative border-b border-white/60 focus-within:border-white pb-1 transition-colors">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent outline-none text-[15px] text-white pr-8 pb-1"
                />
                <Lock className="absolute right-1 bottom-2 w-4 h-4 text-white" />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-white mb-1">Confirm Password</label>
              <div className="relative border-b border-white/60 focus-within:border-white pb-1 transition-colors">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent outline-none text-[15px] text-white pr-8 pb-1"
                />
                <Key className="absolute right-1 bottom-2 w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-8 rounded-md font-semibold transition-all duration-300 bg-[#d62851] hover:bg-[#b01e3e] text-white tracking-wide"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-[13px] mt-6">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;