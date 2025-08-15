import { createContext } from "react";

interface AuthContextType {
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  login: (username: string) => void;
  logout: () => void;
  user: string | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);
