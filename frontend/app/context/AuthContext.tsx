"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Role = "admin" | "intern" | null;

type AuthContextType = {
  role: Role;
  login: (role: Role) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role") as Role;
    if (storedRole) setRole(storedRole);
  }, []);

  const login = (userRole: Role) => {
    setRole(userRole);
    localStorage.setItem("role", userRole!);
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthContext missing");
  return ctx;
};
