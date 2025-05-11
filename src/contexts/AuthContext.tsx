import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthError } from '../types';

interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthError | null>;
  register: (name: string, email: string, password: string) => Promise<AuthError | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('verveGalleryUser');
    
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('verveGalleryUser');
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<AuthError | null> => {
    // In a real app, this would make an API call
    // For demo, we'll simulate authentication
    if (email === 'demo@example.com' && password === 'password123') {
      const userData: User = {
        id: '1',
        name: 'Demo User',
        email: email,
      };
      setUser(userData);
      localStorage.setItem('verveGalleryUser', JSON.stringify(userData));
      return null;
    }
    return { message: 'Invalid email or password' };
  };

  const register = async (name: string, email: string, password: string): Promise<AuthError | null> => {
    // In a real app, this would make an API call
    // For demo, we'll simulate registration
    if (email === 'demo@example.com') {
      return { message: 'Email already in use', field: 'email' };
    }
    
    const userData: User = {
      id: Date.now().toString(),
      name,
      email,
    };
    
    setUser(userData);
    localStorage.setItem('verveGalleryUser', JSON.stringify(userData));
    return null;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('verveGalleryUser');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};