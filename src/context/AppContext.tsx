"use client";

import React, { createContext, useState, ReactNode } from 'react';
import type { User, Booking } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  bookings: Booking[];
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  addBooking: (bookingData: Omit<Booking, 'id' | 'userId' | 'status'>) => boolean;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { toast } = useToast();

  const login = (email: string, password: string): boolean => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.name}!`,
      });
      return true;
    }
    toast({
      variant: "destructive",
      title: "Login Failed",
      description: "Invalid email or password.",
    });
    return false;
  };

  const register = (name: string, email: string, password: string): boolean => {
    if (users.some(u => u.email === email)) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: "An account with this email already exists.",
      });
      return false;
    }
    const newUser: User = { id: Date.now().toString(), name, email, password };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    toast({
        title: "Registration Successful",
        description: `Welcome, ${name}! Your account has been created.`,
    });
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
    });
  };

  const addBooking = (bookingData: Omit<Booking, 'id' | 'userId' | 'status'>): boolean => {
    if (!currentUser) {
       toast({
        variant: "destructive",
        title: "Booking Failed",
        description: "You must be logged in to book a service.",
      });
      return false;
    }
    const newBooking: Booking = {
      ...bookingData,
      id: `booking-${Date.now()}`,
      userId: currentUser.id,
      status: 'Confirmed',
    };
    setBookings(prev => [...prev, newBooking]);
    return true;
  };

  const value = {
    currentUser,
    users,
    bookings,
    login,
    register,
    logout,
    addBooking,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
