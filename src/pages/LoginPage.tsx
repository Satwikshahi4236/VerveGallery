import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/auth/LoginForm';

const LoginPage: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  useEffect(() => {
    document.title = 'Sign In | VerveGallery';
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-lg font-medium text-gray-600">
          Loading...
        </div>
      </div>
    );
  }
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-gray-50 py-12">
      <LoginForm />
    </div>
  );
};

export default LoginPage;