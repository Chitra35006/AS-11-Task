import React, { createContext, useState, useEffect, useContext } from "react";

// Create the ThemeContext
export const ThemeContext = createContext();

// ThemeProvider component to manage theme state
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    // Apply the theme to the <html> element
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme); // Persist the theme in localStorage
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};