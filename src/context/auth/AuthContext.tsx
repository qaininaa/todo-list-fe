import { createContext } from "react";
import type { Auth } from "./AuthProvider";

interface AuthContextType {
  setAuth: React.Dispatch<React.SetStateAction<Auth | null>>;
  login: (accessToken: string) => void;
  logout: () => void;
  auth: Auth | null;
  refresh: (accessToken: string) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
