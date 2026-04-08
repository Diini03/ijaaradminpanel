import React, { createContext, useContext, useState, useCallback } from "react";

interface AuthUser {
  name: string;
  email: string;
  avatar: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_CREDENTIALS = { email: "admin@ijaar.com", password: "demo123" };

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem("ijaar_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback((email: string, password: string) => {
    if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      const u: AuthUser = {
        name: "Admin User",
        email,
        avatar: `https://ui-avatars.com/api/?name=Admin+User&background=1B2559&color=fff&size=40`,
      };
      setUser(u);
      localStorage.setItem("ijaar_user", JSON.stringify(u));
      return true;
    }
    return false;
  }, []);

  const register = useCallback((name: string, email: string, _password: string) => {
    const u: AuthUser = {
      name,
      email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1B2559&color=fff&size=40`,
    };
    setUser(u);
    localStorage.setItem("ijaar_user", JSON.stringify(u));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("ijaar_user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
