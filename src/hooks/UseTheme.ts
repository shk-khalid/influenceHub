// src/hooks/useThemeToggler.ts
import { useState, useEffect } from 'react';

export function useThemeToggler() {
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize from localStorage or default to false
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return { darkMode, toggleDarkMode };
}
