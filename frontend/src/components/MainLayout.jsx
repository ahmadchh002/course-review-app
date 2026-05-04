import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Search, LogOut, LayoutDashboard, PlusSquare } from 'lucide-react';
import bgImage from '../assets/fast_bg.jpg';

const MainLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <div 
      className="min-h-screen relative font-sans text-white overflow-hidden bg-black"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Blurred overlay for the entire page */}
      <div className="absolute inset-0 backdrop-blur-md bg-[#0f1123]/40 pointer-events-none"></div>

      {/* Navbar overlay */}
      <nav className="relative z-20 flex justify-between items-center px-12 py-8">
        <div className="flex space-x-8 text-sm font-semibold tracking-wide items-center">
          <Link to="/" className="text-xl font-bold tracking-widest mr-8 flex items-center space-x-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/></svg>
            <span className="tracking-wide">Course@FAST</span>
          </Link>
          <Link to="/" className="hover:text-gray-300 transition-colors">Home</Link>
          <Link to="/about" className="hover:text-gray-300 transition-colors">About</Link>
          <Link to="/services" className="hover:text-gray-300 transition-colors">Services</Link>
          <Link to="/contact" className="hover:text-gray-300 transition-colors">Contact</Link>
        </div>
        <div className="relative flex items-center space-x-6">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border border-white/60 rounded-md py-1.5 pl-4 pr-10 text-sm outline-none focus:border-white w-64 placeholder-white/80 transition-colors"
            />
            <Search className="absolute right-3 top-2 w-4 h-4 text-white" />
          </div>
          {user && (
            <div className="flex items-center space-x-6">
              <Link to="/dashboard" className="hover:text-[#d62851] transition-colors flex items-center space-x-2">
                <LayoutDashboard className="w-5 h-5" />
                <span className="text-sm font-semibold">Dashboard</span>
              </Link>
              {isAdmin && (
                <Link to="/courses/add" className="hover:text-[#d62851] transition-colors flex items-center space-x-2">
                  <PlusSquare className="w-5 h-5" />
                  <span className="text-sm font-semibold">Add Course</span>
                </Link>
              )}
              <button onClick={handleLogout} className="hover:text-[#d62851] transition-colors flex items-center space-x-2">
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-semibold">Logout</span>
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="relative z-10 flex justify-center min-h-[calc(100vh-100px)]">
        <div className="w-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
