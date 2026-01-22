import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isGuest: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  continueAsGuest: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = '@weather_crew:auth';
const GUEST_STORAGE_KEY = '@weather_crew:guest';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedAuth = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      const isGuestMode = await AsyncStorage.getItem(GUEST_STORAGE_KEY);
      
      if (storedAuth) {
        const parsedAuth = JSON.parse(storedAuth);
        setUser(parsedAuth.user);
      } else if (isGuestMode === 'true') {
        setIsGuest(true);
      }
    } catch (error) {
      console.error('Erro ao carregar autenticação:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // Simulação de login - substitua pela sua lógica de autenticação real
      // Aqui você faria a chamada à API
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
      };

      const authData = { user: mockUser };
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
      await AsyncStorage.removeItem(GUEST_STORAGE_KEY);
      setUser(mockUser);
      setIsGuest(false);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string, name?: string) => {
    try {
      // Simulação de registro - substitua pela sua lógica de autenticação real
      // Aqui você faria a chamada à API
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        name: name || email.split('@')[0],
      };

      const authData = { user: mockUser };
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
      await AsyncStorage.removeItem(GUEST_STORAGE_KEY);
      setUser(mockUser);
      setIsGuest(false);
    } catch (error) {
      console.error('Erro ao registrar:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
      await AsyncStorage.removeItem(GUEST_STORAGE_KEY);
      setUser(null);
      setIsGuest(false);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    }
  };

  const continueAsGuest = async () => {
    try {
      await AsyncStorage.setItem(GUEST_STORAGE_KEY, 'true');
      setIsGuest(true);
    } catch (error) {
      console.error('Erro ao continuar como convidado:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        isGuest,
        login,
        register,
        logout,
        continueAsGuest,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
