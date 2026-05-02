import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CourseDetails from './pages/CourseDetails';
import AddReview from './pages/AddReview';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  const { user, logout } = useAuth();

  return (
    <>
      {/* Navigation Bar with custom styling */}
      <nav style={{ 
        borderBottom: '1px solid var(--border)',
        position: 'sticky',
        top: 0,
        background: 'var(--bg)',
        zIndex: 50
      }}>
        <div className="px-4 py-4 flex justify-between items-center" style={{ maxWidth: '1126px', margin: '0 auto', width: '100%' }}>
          <Link to="/" style={{ color: 'var(--accent)' }} className="text-xl font-bold hover:opacity-80 transition">
            Course Reviews
          </Link>
          <div className="flex gap-3">
            {user ? (
              <>
                <span style={{ color: 'var(--text)' }} className="text-sm self-center">
                  Welcome, {user.name}!
                </span>
                <button
                  onClick={logout}
                  style={{ 
                    backgroundColor: 'var(--accent)',
                    color: 'white'
                  }}
                  className="px-4 py-2 rounded hover:opacity-90 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  style={{ 
                    backgroundColor: 'transparent',
                    color: 'var(--accent)',
                    border: '1px solid var(--accent)'
                  }}
                  className="px-4 py-2 rounded hover:opacity-80 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  style={{ 
                    backgroundColor: 'var(--accent)',
                    color: 'white'
                  }}
                  className="px-4 py-2 rounded hover:opacity-90 transition"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route
          path="/courses/:id/add-review"
          element={
            <ProtectedRoute>
              <AddReview />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;