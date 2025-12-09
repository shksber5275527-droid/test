import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useLocation } from "react-router";
import apiClient from "../config/apiClient";
import type { AuthContextType, User } from "../types/auth.model";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { pathname } = useLocation();

  // LOGIN
  const login = async (email: string, password: string) => {
    try {
      const { data } = await apiClient.post("/auth/login", { email, password });
      setUser(data.user);
      return { success: true };
    } catch (err: any) {
      return {
        success: false,
        error: err.response?.data?.message || "Login failed",
      };
    }
  };

  // REGISTER
  const register = async (name: string, email: string, password: string) => {
    try {
      const { data } = await apiClient.post("/auth/signup", {
        name,
        email,
        password,
      });
      setUser(data.user);
      return { success: true };
    } catch (err: any) {
      const errorMessage = err.response?.data?.message;
      return {
        success: false,
        error: Array.isArray(errorMessage)
          ? errorMessage.join(", ")
          : errorMessage || "Registration failed due to network",
      };
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (pathname === "/login" || pathname === "/register") {
          setIsLoading(false);
          return;
        }
        // Try to get current user session
        const { data } = await apiClient.get("/users/profile");
        setUser(data);
      } catch (err: any) {
        // If 401/404, user is not authenticated - this is expected on login/register pages
        if (err.response?.status === 401 || err.response?.status === 404) {
          setUser(null);
        } else {
          // Log unexpected errors
          console.error("Auth check failed:", err);
          setUser(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname]);

  // LOGOUT
  const logout = async () => {
    try {
      await apiClient.post("/auth/logout");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    login,
    isAuthenticated: !!user,
    isLoading,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};