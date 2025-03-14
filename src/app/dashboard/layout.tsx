"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Verificar se é tela móvel e recuperar estado da sidebar do localStorage
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Verificar no carregamento inicial
    checkIfMobile();

    // Recuperar estado do localStorage
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      setSidebarCollapsed(savedState === 'true');
    }

    // Adicionar event listener para redimensionamento
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
    // Salvar estado no localStorage
    localStorage.setItem('sidebarCollapsed', (!sidebarCollapsed).toString());
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#FFF032] dark:bg-[#090909]">
      {/* Overlay para mobile quando sidebar está aberta */}
      {isMobile && !sidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black/30 z-30"
          onClick={toggleSidebar}
        />
      )}

      {/* Barra de navegação combinada (sidebar + header) */}
      <Navbar 
        isMobile={isMobile} 
        collapsed={sidebarCollapsed} 
        toggleSidebar={toggleSidebar} 
      />

      {/* Conteúdo principal */}
      <div className={`flex-1 flex flex-col transition-all duration-300 pt-16 ${
        !sidebarCollapsed && !isMobile ? 'ml-60' : isMobile ? 'ml-0' : 'ml-16'
      }`}>
        {/* Conteúdo da página */}
        <main className="flex-1 overflow-auto">
          <div className="bg-white dark:bg-gray-900 min-h-full rounded-l-3xl shadow-sm p-6 text-[#090909] dark:text-[#fefefe]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 