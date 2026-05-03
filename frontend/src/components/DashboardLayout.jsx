import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, BookOpen, Star, Settings, LogOut, Bell, Search } from 'lucide-react';
import bgImage from '../assets/fast_bg.jpg';

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Explore Courses', path: '/', icon: BookOpen },
    { name: 'My Reviews', path: '/dashboard/reviews', icon: Star },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div 
      className="min-h-screen relative font-sans text-white overflow-hidden bg-black flex"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Blurred overlay */}
      <div className="absolute inset-0 backdrop-blur-xl bg-[#0f1123]/60 pointer-events-none z-0"></div>

      {/* Sidebar */}
      <aside className="relative z-20 w-64 border-r border-white/10 bg-black/20 backdrop-blur-md flex flex-col h-screen">
        <div className="p-6 border-b border-white/10 flex items-center space-x-3">
          <svg className="w-8 h-8 text-[#d62851]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/></svg>
          <span className="text-xl font-bold tracking-widest">Course@FAST</span>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link 
                key={item.name} 
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive ? 'bg-[#d62851] text-white shadow-lg shadow-[#d62851]/30' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-[#d62851] transition-all duration-300 w-full"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Navbar */}
        <header className="h-20 border-b border-white/10 bg-black/10 backdrop-blur-md flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center text-white/50 space-x-4">
             <h2 className="text-xl font-semibold text-white">Dashboard</h2>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-black/20 border border-white/10 rounded-lg py-2 pl-4 pr-10 text-sm outline-none focus:border-white/30 focus:bg-white/5 w-64 placeholder-white/50 transition-all text-white"
              />
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-white/50" />
            </div>
            
            <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#d62851] rounded-full"></span>
            </button>
            
            <div className="flex items-center space-x-3 pl-4 border-l border-white/10">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#d62851] to-[#4da6ff] flex items-center justify-center font-bold text-sm">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="font-medium text-sm hidden md:block">{user?.email?.split('@')[0] || 'User'}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
