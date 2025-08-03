import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, apiService } from '../services/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (username: string, email: string, password: string, role: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log('Initializing auth...');
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (token && storedUser) {
          console.log('Found stored token and user, validating...');
          try {
            const currentUser = await apiService.getCurrentUser();
            console.log('Current user validated:', currentUser);
            setUser(currentUser);
          } catch (error) {
            console.error('Token validation failed:', error);
            // Try to use stored user as fallback
            const storedUserData = getCurrentUserFromStorage();
            if (storedUserData) {
              console.log('Using stored user as fallback:', storedUserData);
              setUser(storedUserData);
            } else {
              apiService.logout();
            }
          }
        } else {
          console.log('No stored auth data found');
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        apiService.logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiService.login({ email, password });
      setUser(response.user);
      return response.user;
    } catch (error) {
      throw error;
    }
  };

  const register = async (username: string, email: string, password: string, role: string) => {
    try {
      const response = await apiService.register({ username, email, password, role: role as any });
      // Don't set user after registration - user needs to login separately
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    apiService.logout();
    setUser(null);
  };

  const getCurrentUserFromStorage = (): User | null => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error('Error parsing stored user:', error);
      return null;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user || !!localStorage.getItem('token'),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 