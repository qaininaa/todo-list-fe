import { useState, type ReactNode, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import axiosInstance from "../../api/axios";

/**
 * Interface for authentication state
 */
export interface Auth {
  accessToken: string;
}

/**
 * Auth provider component that manages authentication state
 * Automatically attempts to refresh token on app initialization
 */
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<Auth | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * Login function to set access token
   */
  const login = (accessToken: string) => {
    setAuth((prev) => ({
      ...(prev ?? {}),
      accessToken,
    }));
  };

  /**
   * Refresh function to update access token
   */
  const refresh = (accessToken: string) => {
    setAuth((prev) => ({
      ...(prev ?? {}),
      accessToken,
    }));
  };

  /**
   * Logout function to clear auth state
   */
  const logout = () => {
    setAuth(null);
  };

  /**
   * Attempt to refresh token on app initialization
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const res = await axiosInstance.get("/api/auth/refresh", {
          withCredentials: true,
        });

        if (res.data?.accessToken) {
          setAuth({ accessToken: res.data.accessToken });
        }
      } catch (error) {
        /**
         * If refresh fails on initialization, user needs to login
         */
        console.error("Initial token refresh failed:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Show loading while checking authentication status
   */
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ setAuth, login, logout, auth, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
