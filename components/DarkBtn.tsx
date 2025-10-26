"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const DarkBtn = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
        <div
          onClick={toggleTheme}
          className="flex fixed top-2 right-2 p-2 border rounded-md shadow-md bg-neutral-50 dark:bg-neutral-950 hover:bg-neutral-200 dark:hover:bg-neutral-900 cursor-pointer"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 text-white opacity-100 transition-all duration-1000" />
          ) : (
            <Moon className="w-4 h-4 text-black transition-discrete transition-all duration-1000" />
          )}
        </div>
  );
};

export default DarkBtn;