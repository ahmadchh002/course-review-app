import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { courseService } from '../services/courseService';

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
        <div style={{ color: 'var(--text)' }}>Loading courses...</div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8" style={{ maxWidth: '1126px', margin: '0 auto', width: '100%' }}>
      <h1>Available Courses</h1>
      
      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by course name or code..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            border: '1px solid var(--border)',
            background: 'var(--bg)',
            color: 'var(--text-h)'
          }}
          className="w-full max-w-md px-4 py-2 rounded focus:outline-none"
        />
      </div>

      {/* Course Grid */}
      {filteredCourses.length === 0 ? (
        <p style={{ color: 'var(--text)' }}>No courses found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Link to={`/courses/${course.id}`} key={course.id}>
              <div 
                className="rounded-lg shadow-md p-6 hover:shadow-lg transition-all hover:-translate-y-1"
                style={{
                  border: '1px solid var(--border)',
                  background: 'var(--bg)'
                }}
              >
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-h)' }}>
                  {course.name}
                </h3>
                <p style={{ color: 'var(--text)' }} className="mb-2">Code: {course.code}</p>
                <p className="text-sm" style={{ color: 'var(--text)' }}>{course.department}</p>
                {course.averageRating && (
                  <div className="mt-3 flex items-center">
                    <span style={{ color: 'var(--accent)' }} className="mr-1">★</span>
                    <span style={{ color: 'var(--text-h)' }}>{course.averageRating.toFixed(1)}</span>
                    <span className="ml-2" style={{ color: 'var(--text)' }}>({course.reviewCount} reviews)</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;