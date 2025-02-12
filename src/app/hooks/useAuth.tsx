// src/app/hooks/useAuth.tsx

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  username: string;
  role: string;
}

function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user data and token are in localStorage
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("access_token");

    if (storedUser && storedToken) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
      setIsAdmin(parsedUser.role === "ADMIN");
    } else {
      setIsAuthenticated(false);
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
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        setIsAuthenticated(true);
        setIsAdmin(data.user.role === "ADMIN");
        router.push("/");
      } else {
        throw new Error(response.statusText || "Invalid email or password");
      }
    } catch (error: any) {
      throw new Error(error?.message || "An error occurred. Please try again.");
    }
  };

  const signOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    router.push("/auth");
  };

  return { user, isAuthenticated, isAdmin, setIsAuthenticated, login, signOut };
}
