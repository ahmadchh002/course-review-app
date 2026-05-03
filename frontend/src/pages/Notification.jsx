import React from 'react';
import { Bell, Info } from 'lucide-react';

const Notification = () => {
  const alerts = [
    { id: 1, title: "Welcome!", message: "Thanks for joining the platform.", time: "Just now" },
    { id: 2, title: "Update", message: "New features have been added to your dashboard.", time: "2h ago" }
  ];

  return (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-xl font-bold text-white mb-6">Your Notifications</h2>
      <div className="space-y-4">
        {alerts.map((item) => (
          <div key={item.id} className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center space-x-4">
            <div className="p-2 bg-[#d62851]/20 rounded-lg">
              <Bell className="w-5 h-5 text-[#d62851]" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <p className="text-white font-medium">{item.title}</p>
                <span className="text-xs text-white/40">{item.time}</span>
              </div>
              <p className="text-white/60 text-sm">{item.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;