import React from 'react';
import { BookOpen, Star, TrendingUp, Clock, Bell } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setActiveTab } from '../reducer/notificationSlice';
import { reviewService } from '../services/reviewService';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNotificationClick = () => {
    // Set global state to notifications before navigating
    dispatch(setActiveTab('notifications'));
    navigate('/settings');
  };

  const stats = [
    { label: 'Total Reviews', value: '12', icon: Star, color: 'text-[#d62851]', bg: 'bg-[#d62851]/10' },
    { label: 'Courses Enrolled', value: '5', icon: BookOpen, color: 'text-[#4da6ff]', bg: 'bg-[#4da6ff]/10' },
    { label: 'Avg Rating Given', value: '4.5', icon: TrendingUp, color: 'text-[#ffc107]', bg: 'bg-[#ffc107]/10' },
    { label: 'Hours Spent', value: '120h', icon: Clock, color: 'text-[#00e676]', bg: 'bg-[#00e676]/10' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user?.email?.split('@')[0] || 'User'}! 👋
          </h1>
          <p className="text-white/60">Here is what's happening with your courses today.</p>
        </div>
        
        {/* Notification Bell from image_0d9b1d.png */}
        <button 
          onClick={handleNotificationClick}
          className="relative p-3 bg-white/5 border border-white/10 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all"
        >
          <Bell className="w-6 h-6" />
          <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-[#d62851] rounded-full border-2 border-[#121212]"></span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 flex items-center space-x-4">
              <div className={`p-4 rounded-xl ${stat.bg}`}>
                <Icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div>
                <p className="text-white/60 text-sm font-medium mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
        <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Star className="w-5 h-5 text-[#ffc107]" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium truncate">Reviewed Data Structures & Algorithms</h4>
                <p className="text-white/50 text-sm truncate">"Great course, highly recommended!"</p>
              </div>
              <span className="text-white/40 text-sm whitespace-nowrap hidden sm:block">2 days ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;