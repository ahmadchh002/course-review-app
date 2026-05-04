import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { courseService } from '../services/courseService';
import { Search, BookOpen, Star } from 'lucide-react';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    const filtered = courses.filter(course =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
  }, [searchTerm, courses]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await courseService.getAllCourses();
      setCourses(data);
      setFilteredCourses(data);
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-white text-xl animate-pulse">Loading courses...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto p-10 rounded-2xl bg-black/40 backdrop-blur-xl shadow-2xl border border-white/10 mt-8 mb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-white/10 pb-6 gap-6">
        <div>
          <h1 className="text-[2.5rem] font-bold text-white mb-2 leading-tight">Available Courses</h1>
          <p className="text-white/70 text-lg">Browse and read reviews from fellow students.</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search by course name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/50 outline-none focus:border-white/50 focus:bg-white/10 transition-all shadow-inner"
          />
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-white/50" />
        </div>
      </div>

      {/* Course Grid */}
      {filteredCourses.length === 0 ? (
        <div className="text-center py-24 text-white/60 bg-white/5 rounded-xl border border-white/5">
          <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-xl font-medium">No courses found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Link to={`/courses/${course.id}`} key={course.id}>
              <div className="group rounded-xl p-7 transition-all duration-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)] hover:border-white/20 h-full flex flex-col relative overflow-hidden">
                {/* Decorative accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d62851] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors line-clamp-2 leading-tight">
                    {course.name}
                  </h3>
                </div>
                
                <div className="mt-auto">
                  <div className="flex items-center space-x-3 mb-4 mt-4">
                    <span className="px-3 py-1 rounded-md bg-[#d62851]/20 border border-[#d62851]/30 text-xs font-semibold text-[#ffa8be]">
                      {course.code}
                    </span>
                  </div>
                  
                  {course.avg_rating !== undefined && (
                    <div className="flex items-center pt-4 border-t border-white/10">
                      <Star className="w-5 h-5 text-[#ffc107] mr-1.5" fill="#ffc107" />
                      <span className="font-bold text-white text-lg mr-2">{Number(course.avg_rating || 0).toFixed(1)}</span>
                      <span className="text-sm text-white/50">({course.review_count || 0} reviews)</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;