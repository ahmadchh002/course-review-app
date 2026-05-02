import React from 'react';

const About = () => {
  return (
    <div className="w-full max-w-[1000px] mx-auto mt-12 mb-12 space-y-8">
      <div className="bg-black/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-10 relative overflow-hidden text-white">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d62851] to-transparent"></div>
        <h1 className="text-4xl font-bold mb-6">About Course@FAST</h1>
        <p className="text-lg leading-relaxed text-white/80 mb-4">
          Course@FAST is a community-driven platform designed by students, for students. Our goal is to provide a comprehensive and transparent course review system that helps you make informed decisions about your academic journey.
        </p>
        <p className="text-lg leading-relaxed text-white/80">
          We believe that sharing experiences and insights is key to a successful university life. By reading and writing reviews, you contribute to a growing knowledge base that benefits everyone in the FAST NUCES community.
        </p>
      </div>
    </div>
  );
};

export default About;
