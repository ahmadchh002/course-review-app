import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import MainLayout from './components/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CourseDetails from './pages/CourseDetails';
import AddReview from './pages/AddReview';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex justify-center items-center h-64 text-white">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/courses/:id" element={
          <ProtectedRoute>
            <CourseDetails />
          </ProtectedRoute>
        } />
        <Route path="/courses/:id/add-review" element={
          <ProtectedRoute>
            <AddReview />
          </ProtectedRoute>
        } />
      </Routes>
    </MainLayout>
  );
}

export default App;