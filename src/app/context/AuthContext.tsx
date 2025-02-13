"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  username: string;
  role: string;
}

interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => void;
  errorLogin: string | null;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [errorLogin, setErrorLogin] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    if (storedToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("access_token", data.access_token);
        setUser(data.user);
        setIsAuthenticated(true);
        setIsAdmin(data.user.role === "ADMIN");
        router.push("/");
      } else {
        setErrorLogin("Invalid email or password. Please try again.");
      }
    } catch {
      setErrorLogin("An error occurred. Please try again.");
    }
  };

  const signOut = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    router.push("/auth");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isAdmin, login, errorLogin, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
