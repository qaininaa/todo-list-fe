import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  const login = (accessToken: string) => {
    setUser(accessToken);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ setUser, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
