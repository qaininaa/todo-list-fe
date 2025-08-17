import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";

export interface Auth {
  accessToken: string;
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<Auth | null>(null);

  const login = (accessToken: string) => {
    setAuth((prev) => ({
      ...(prev ?? {}),
      accessToken,
    }));
  };

  const refresh = (accessToken: string) => {
    setAuth((prev) => ({
      ...(prev ?? {}),
      accessToken,
    }));
  };

  const logout = () => {
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ setAuth, login, logout, auth, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
