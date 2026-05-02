import React from 'react';
import { BookOpen, Star, Users } from 'lucide-react';

const Services = () => {
  return (
    <div className="w-full max-w-[1000px] mx-auto mt-12 mb-12 space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Our Services</h1>
        <p className="text-white/70 text-lg">Everything you need to navigate your academic journey.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-8 text-center hover:bg-white/5 transition-colors">
          <div className="bg-[#d62851]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-8 h-8 text-[#d62851]" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Course Catalog</h3>
          <p className="text-white/70">Browse through our extensive catalog of courses offered at FAST NUCES.</p>
        </div>

        <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-8 text-center hover:bg-white/5 transition-colors">
          <div className="bg-[#4da6ff]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Star className="w-8 h-8 text-[#4da6ff]" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Honest Reviews</h3>
          <p className="text-white/70">Read authentic reviews from students who have actually taken the courses.</p>
        </div>

        <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-8 text-center hover:bg-white/5 transition-colors">
          <div className="bg-[#ffc107]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-8 h-8 text-[#ffc107]" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Community</h3>
          <p className="text-white/70">Connect with peers, share resources, and help others by contributing your own reviews.</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
