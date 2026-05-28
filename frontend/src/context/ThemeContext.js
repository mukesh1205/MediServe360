import { createContext, useContext, useState } from "react";
export const ThemeContext = createContext();
export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);
  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark(d => !d) }}>
      <div data-theme={dark ? "dark" : "light"}>{children}</div>
    </ThemeContext.Provider>
  );
}
export const useTheme = () => useContext(ThemeContext);