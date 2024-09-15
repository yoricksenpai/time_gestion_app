import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerUser, loginUser, logoutUser, getUserInfo, updateUserInfo, deleteUser } from '../api/auth';

interface User {
  id: string;
  username: string;
  email: string;
  // Ajoutez d'autres propriétés utilisateur si nécessaire
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  register: (username: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updatedData: Partial<User>) => Promise<User>;
  deleteUserAccount: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
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
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const userData = await getUserInfo();
          setUser(userData);
        }
      } catch (error) {
        console.error('Error loading user:', error);
        // En cas d'erreur, on supprime le token et on déconnecte l'utilisateur
        await AsyncStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);


  const register = async (username: string, email: string, password: string): Promise<void> => {
    try {
      const data = await registerUser(username, email, password);
      setUser(data.user);
      await AsyncStorage.setItem('token', data.token);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const data = await loginUser(email, password);
      setUser(data.user);
      await AsyncStorage.setItem('token', data.token);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await logoutUser();
      setUser(null);
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const updateUser = async (updatedData: Partial<User>): Promise<User> => {
    try {
      const updatedUser = await updateUserInfo(updatedData);
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  };

  const deleteUserAccount = async (): Promise<void> => {
    try {
      await deleteUser();
      setUser(null);
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.error('Delete user error:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    register,
    login,
    logout,
    updateUser,
    deleteUserAccount
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
