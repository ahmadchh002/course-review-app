import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Bell } from 'lucide-react';
// Import your notification component here
import Notification from './Notification'; 

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-white/60">Manage your account preferences and settings.</p>
      </div>

      <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-4 min-h-[500px]">
          
          {/* Sidebar */}
          <div className="border-b md:border-b-0 md:border-r border-white/10 p-6 space-y-2 bg-white/5">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'profile' ? 'bg-[#d62851] text-white' : 'text-white/70 hover:bg-white/10'
              }`}
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
            </button>

            <button 
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'notifications' ? 'bg-[#d62851] text-white' : 'text-white/70 hover:bg-white/10'
              }`}
            >
              <Bell className="w-5 h-5" />
              <span>Notifications</span>
            </button>
          </div>

          {/* Dynamic Content Area */}
          <div className="md:col-span-3 p-8">
            {activeTab === 'profile' ? (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-xl font-bold text-white mb-6">Profile Information</h2>
                {/* ... your existing profile form code ... */}
                <form className="space-y-6">
                   <div className="flex items-center space-x-6 mb-8">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#d62851] to-[#4da6ff] flex items-center justify-center text-3xl font-bold text-white">
                      {user?.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <button type="button" className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-medium text-sm border border-white/10">
                      Change Avatar
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70">First Name</label>
                      <input type="text" defaultValue="John" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-[#d62851] transition-colors" />
                    </div>
                  </div>
                  <button type="submit" className="px-6 py-3 bg-[#d62851] text-white rounded-lg font-semibold">
                    Save Changes
                  </button>
                </form>
              </div>
            ) : (
              /* This renders your Notification.jsx component */
              <div className="animate-in fade-in duration-300">
                <Notification />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;