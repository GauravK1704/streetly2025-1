import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'vendor' | 'supplier' | 'admin' | 'delivery';

export interface User {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  location?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (phone: string, otp: string, role: UserRole) => Promise<boolean>;
  register: (userData: Omit<User, 'id'>) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users for demo
const mockUsers: User[] = [
  { id: '1', name: 'Raj Kumar', phone: '9876543210', role: 'vendor', location: 'Delhi' },
  { id: '2', name: 'Priya Supplier', phone: '9876543211', role: 'supplier', location: 'Mumbai' },
  { id: '3', name: 'Admin User', phone: '9876543212', role: 'admin', location: 'Bangalore' },
  { id: '4', name: 'Delivery Guy', phone: '9876543213', role: 'delivery', location: 'Chennai' },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (phone: string, otp: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock OTP validation (accept any 4-digit OTP)
    if (otp.length === 4) {
      const foundUser = mockUsers.find(u => u.phone === phone && u.role === role);
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
        setIsLoading(false);
        return true;
      }
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (userData: Omit<User, 'id'>): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};