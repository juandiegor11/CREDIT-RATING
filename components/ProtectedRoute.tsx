"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);

  // Asegurarse de que el componente solo se renderice después de que el cliente esté montado
  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted && !isAuthenticated) {
      router.push("/Login"); // Redirige al login si no está autenticado
    }
  }, [isAuthenticated, hasMounted, router]);

 

  if (!isAuthenticated) {
    return null; // Evita mostrar contenido mientras redirige
  }

  return <>{children}</>;
};