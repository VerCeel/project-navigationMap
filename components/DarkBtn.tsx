"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const DarkBtn = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div>
      <div className="flex fixed top-2 right-2">
        <div
          onClick={toggleTheme}
          className="p-1.5 border rounded-md bg-neutral-50 dark:bg-neutral-950 hover:bg-neutral-200 dark:hover:bg-neutral-900 cursor-pointer"
        >
          {theme === "dark" ? (
            <Sun className="w-3 h-3 text-white opacity-100 transition-all duration-1000" />
          ) : (
            <Moon className="w-3 h-3 text-black transition-discrete transition-all duration-1000" />
          )}
        </div>
      </div>
    </div>
  );
};

export default DarkBtn;
