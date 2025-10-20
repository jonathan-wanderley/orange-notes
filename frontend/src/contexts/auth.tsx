"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import User from "@/lib/types/user";

type AuthContextProps = {
  children: ReactNode;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User) => void;
};

const initialValue = {
  user: null,
  setUser: () => {},
};

export const AuthContext = createContext<AuthContextType>(initialValue);

const AuthStrucure = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<User | null>(null);

  const [{ token }] = useCookies();

  useEffect(() => {
    if (token) {
      setUser(jwtDecode(token) as User);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthContextProvider = ({ children }: AuthContextProps) => {
  return (
    <CookiesProvider>
      <AuthStrucure>{children}</AuthStrucure>
    </CookiesProvider>
  );
};
