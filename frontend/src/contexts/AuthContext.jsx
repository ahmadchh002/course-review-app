import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing user
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Mock login - accepts any email/password
      // For testing: email: test@example.com, password: any password
      if (email && password) {
        const mockUser = {
          id: 1,
          name: email.split('@')[0], // Use part of email as name
          email: email,
          studentId: '12345'
        };
        const mockToken = 'mock-token-12345';
        
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        toast.success('Login successful!');
        return true;
      } else {
        toast.error('Please enter email and password');
        return false;
      }
    } catch (error) {
      toast.error('Login failed');
      return false;
    }
  };

  const signup = async (userData) => {
    try {
      // Mock signup - accepts any data
      const { name, email, password, studentId } = userData;
      
      if (!name || !email || !password) {
        toast.error('Please fill all required fields');
        return false;
      }

      if (password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return false;
      }

      const mockUser = {
        id: Date.now(),
        name: name,
        email: email,
        studentId: studentId || ''
      };
      const mockToken = 'mock-token-' + Date.now();
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      toast.success('Account created successfully!');
      return true;
    } catch (error) {
      toast.error('Signup failed');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};