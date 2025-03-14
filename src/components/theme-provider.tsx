"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "claro" | "escuro" | "sistema";

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
  storageKey = "reduzo-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "sistema") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "escuro"
        : "claro";

      root.classList.add(systemTheme === "escuro" ? "dark" : "light");
      return;
    }

    root.classList.add(theme === "escuro" ? "dark" : "light");
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
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