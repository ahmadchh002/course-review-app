import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';

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
      const response = await api.post('/users/login', { email, password });
      
      const { access_token } = response.data;  // changed from 'token'
      
      // After login, fetch the current user's data
      const userResponse = await api.get('/users/me', {
        headers: { Authorization: `Bearer ${access_token}` }
      });
      const loggedInUser = userResponse.data;
      
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      toast.success('Login successful!');
      return true;
    } catch (error) {
      const message = error.response?.data?.detail || 'Login failed. Please check your credentials.';
      toast.error(message);
      return false;
    }
  };

  const signup = async (userData) => {
    try {
      const { name, email, password } = userData;
      
      if (!name || !email || !password) {
        toast.error('Please fill all required fields');
        return false;
      }
  
      if (password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return false;
      }
  
      // Use 'full_name' (not 'fullname')
      await api.post('/users/signup', {
        full_name: name,   // changed from 'fullname'
        email: email,
        password: password,
      });
      
      // Optionally auto-login after signup
      await login(email, password);
      
      toast.success('Account created successfully!');
      return true;
    } catch (error) {
      const message = error.response?.data?.detail || 'Signup failed. Please try again.';
      toast.error(message);
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