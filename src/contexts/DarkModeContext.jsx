import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorageState from "./../hooks/useLocalStorageState";
import {
  DARK_MODE_CLASS,
  DARK_MODE_KEY,
  LIGHT_MODE_CLASS,
} from "../utils/configs/uiConstants";

const darkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    false,
    DARK_MODE_KEY
  );

  function toggleDarkMode() {
    setIsDarkMode((is) => !is);
  }

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove(LIGHT_MODE_CLASS);
      document.documentElement.classList.add(DARK_MODE_CLASS);
    } else {
      document.documentElement.classList.remove(DARK_MODE_CLASS);
      document.documentElement.classList.add(LIGHT_MODE_CLASS);
    }
  }, [isDarkMode]);

  return (
    <darkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </darkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(darkModeContext);

  if (context === undefined)
    throw new Error("Cannot access dark mode context outside its provider.");

  return context;
}

export { useDarkMode };
export default DarkModeProvider;
