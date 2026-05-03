import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto mt-12 mb-12 space-y-8 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Contact Info */}
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 p-3 rounded-lg">
                <MapPin className="w-6 h-6 text-[#d62851]" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Location</h4>
                <p className="text-white/70">FAST NUCES, Lahore Campus</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 p-3 rounded-lg">
                <Mail className="w-6 h-6 text-[#4da6ff]" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Email</h4>
                <p className="text-white/70">[coursesatfast@gmail.com]</p>
              </div>
            </div>


            <div className="flex items-center space-x-4">
              <div className="bg-white/10 p-3 rounded-lg">
                <Phone className="w-6 h-6 text-[#ffc107]" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Phone</h4>
                <p className="text-white/70">+92 3268700876</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d62851] to-transparent"></div>
          <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[13px] font-semibold text-white mb-2 uppercase tracking-wider">Your Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white outline-none focus:border-white focus:bg-white/10 transition-all"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-white mb-2 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white outline-none focus:border-white focus:bg-white/10 transition-all"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-white mb-2 uppercase tracking-wider">Message</label>
              <textarea
                required
                rows="4"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white outline-none focus:border-white focus:bg-white/10 transition-all resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 bg-[#d62851] hover:bg-[#b01e3e] text-white py-3.5 rounded-lg font-bold transition-all duration-300 shadow-lg shadow-[#d62851]/30"
            >
              <Send className="w-5 h-5" />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>

      {/* Google Map Section */}
      <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-2 sm:p-4 h-[350px] md:h-[450px]">
        <iframe 
          src="https://maps.google.com/maps?q=FAST%20NUCES%20Lahore&t=&z=14&ie=UTF8&iwloc=&output=embed" 
          width="100%" 
          height="100%" 
          style={{ border: 0, borderRadius: '0.75rem' }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="FAST NUCES Lahore Location"
          className="rounded-xl filter invert-[90%] hue-rotate-180 brightness-95 contrast-85 opacity-90 transition-all hover:opacity-100 hover:filter-none duration-500"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
