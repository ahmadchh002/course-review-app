import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab } from '../reducer/notificationSlice';
import { useAuth } from '../contexts/AuthContext';
import { User, Bell, Camera } from 'lucide-react';
import Notification from './Notification';

const Settings = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  
  // Connect to Redux Global State
  const activeTab = useSelector((state) => state.notifications.activeTab);

  const btnBase = "w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all";

  return (
    <div className="space-y-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-white">Settings</h1>

      <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden grid grid-cols-1 md:grid-cols-4 min-h-[600px]">
        {/* Sidebar */}
        <div className="p-6 space-y-2 bg-white/5 border-r border-white/10">
          <button 
            onClick={() => dispatch(setActiveTab('profile'))}
            className={`${btnBase} ${activeTab === 'profile' ? 'bg-[#d62851] text-white shadow-lg shadow-[#d62851]/20' : 'text-white/70 hover:bg-white/10'}`}
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </button>

          <button 
            onClick={() => dispatch(setActiveTab('notifications'))}
            className={`${btnBase} ${activeTab === 'notifications' ? 'bg-[#d62851] text-white shadow-lg shadow-[#d62851]/20' : 'text-white/70 hover:bg-white/10'}`}
          >
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
          </button>
        </div>

        {/* Dynamic Content Area */}
        <div className="md:col-span-3 p-8">
          {activeTab === 'profile' ? (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-xl font-bold text-white mb-8">Profile Information</h2>
              
              <form className="space-y-8">
                {/* Avatar Section from image_0da33d.jpg */}
                <div className="flex items-center space-x-6">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#d62851] to-[#4da6ff] flex items-center justify-center text-3xl font-bold text-white">
                      {user?.email?.charAt(0).toUpperCase() || 'A'}
                    </div>
                    <button type="button" className="absolute bottom-0 right-0 p-2 bg-black/60 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-[#d62851] transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <p className="text-white font-medium">Profile Photo</p>
                    <p className="text-white/40 text-sm">Update your avatar and personal details.</p>
                  </div>
                </div>

                {/* Identity Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Muhammad Ahmad Mudassar"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-[#d62851] transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Username</label>
                    <input 
                      type="text" 
                      placeholder={user?.email?.split('@')[0] || 'ahmedchh002'}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-[#d62851] transition-all" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Email Address</label>
                  <input 
                    type="email" 
                    value={user?.email || ''} 
                    disabled 
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white/40 cursor-not-allowed" 
                  />
                </div>

                {/* Save Changes Button */}
                <div className="pt-6 border-t border-white/10 flex justify-end">
                  <button 
                    type="submit" 
                    className="px-8 py-3 bg-[#d62851] hover:bg-[#b01e3e] text-white rounded-lg font-semibold shadow-lg shadow-[#d62851]/30 transition-all active:scale-95"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <Notification />
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;