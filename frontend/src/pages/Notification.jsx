import React from 'react';
import { Bell, MessageSquare, Info } from 'lucide-react';

const Notification = () => {
  const notifications = [
    { id: 1, title: "System Update", message: "Version 2.0 is now live.", time: "2h ago", icon: Info },
    { id: 2, title: "New Message", message: "You have a new reply from support.", time: "5h ago", icon: MessageSquare },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-6">Recent Notifications</h2>
      <div className="space-y-4">
        {notifications.map((n) => (
          <div key={n.id} className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-start space-x-4 hover:bg-white/10 transition-colors cursor-pointer">
            <div className="p-2 bg-[#d62851]/20 rounded-lg">
              <n.icon className="w-5 h-5 text-[#d62851]" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="text-white font-medium">{n.title}</h3>
                <span className="text-xs text-white/40">{n.time}</span>
              </div>
              <p className="text-white/60 text-sm mt-1">{n.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;