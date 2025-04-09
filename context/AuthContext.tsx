"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para manejar la carga inicial
  const router = useRouter();

  // Restaurar el estado de autenticación desde localStorage al cargar
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
    setIsLoading(false); // Finaliza la carga inicial
  }, []);

  const login = async (email: string, password: string) => {
    // Simula una llamada a la API para autenticar al usuario
    if (email === "Admin@crc.com" && password === "Crc*2025") {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true"); // Persistir autenticación
      router.push("/"); // Redirige a una ruta protegida
    } else {
      alert("Credenciales incorrectas");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated"); // Eliminar autenticación persistida
    router.push("/login"); // Redirige al login
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};