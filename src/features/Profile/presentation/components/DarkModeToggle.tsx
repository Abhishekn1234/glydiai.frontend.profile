
import React, { type Dispatch, type SetStateAction, useEffect } from "react";

interface DarkModeToggleProps {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ darkMode, setDarkMode }) => {
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="relative inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-200/50 dark:border-gray-700/50"
      aria-label="Toggle dark mode"
    >
      {/* Sun icon */}
      <svg
        className={`w-5 h-5 transition-all duration-300 ${
          darkMode ? 'text-gray-400 rotate-0' : 'text-yellow-500 -rotate-90'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
          clipRule="evenodd"
        />
      </svg>

      {/* Moon icon */}
      <svg
        className={`w-5 h-5 transition-all duration-300 ${
          darkMode ? 'text-blue-400 rotate-0' : 'text-gray-400 rotate-90'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
      </svg>

      {/* Text indicator */}
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[80px]">
        {darkMode ? 'Dark' : 'Light'}
      </span>

      {/* Glow effect */}
      <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
        darkMode 
          ? 'bg-blue-500/10 opacity-100' 
          : 'bg-yellow-500/10 opacity-0'
      }`} />
    </button>
  );
};

export default DarkModeToggle;