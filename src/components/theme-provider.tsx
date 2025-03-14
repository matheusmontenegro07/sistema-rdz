"use client";

import * as React from "react";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "sistema";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "sistema",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "sistema",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "sistema") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(storageKey) as Theme;
      if (savedTheme) {
        setTheme(savedTheme);
      }
    } catch (e) {
      console.warn("Não foi possível acessar o localStorage:", e);
    }
  }, [storageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (e) {
      console.warn("Não foi possível salvar o tema no localStorage:", e);
    }
  }, [theme, storageKey]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme deve ser usado dentro de um ThemeProvider");

  return context;
}; 