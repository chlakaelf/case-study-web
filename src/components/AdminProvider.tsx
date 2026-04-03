"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface AdminContextValue {
  isAdmin: boolean;
  password: string;
  login: (pw: string) => Promise<boolean>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextValue>({
  isAdmin: false,
  password: "",
  login: async () => false,
  logout: () => {},
});

export function useAdmin() {
  return useContext(AdminContext);
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");

  const login = useCallback(async (pw: string) => {
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    if (res.ok) {
      setIsAdmin(true);
      setPassword(pw);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAdmin(false);
    setPassword("");
  }, []);

  return (
    <AdminContext value={{ isAdmin, password, login, logout }}>
      {children}
    </AdminContext>
  );
}
