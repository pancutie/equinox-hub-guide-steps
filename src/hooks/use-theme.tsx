
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type ThemeProviderProps = {
  children: ReactNode;
};

type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      
      // If theme is saved in localStorage, use it
      if (savedTheme) {
        return savedTheme;
      }
      
      // If no saved theme, check user system preferences
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    
    // Default to light theme
    return 'light';
  });

  useEffect(() => {
    // Apply theme class to document element
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      document.body.classList.add('bg-gray-900');
      document.body.classList.add('text-gray-100');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      document.body.classList.remove('bg-gray-900');
      document.body.classList.remove('text-gray-100');
    }
    
    // Apply background color to body for full-page coloring
    if (theme === 'dark') {
      document.body.style.backgroundColor = '#111827'; // Using a slightly lighter dark gray
      document.body.style.color = '#f3f4f6';
    } else {
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#1a1a1a';
    }
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
    
    // Log theme change for debugging
    console.log('Theme changed to:', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
