"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";

const DarkBtn = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <Button
      onClick={toggleTheme}
      className="rounded-md shadow-md bg-neutral-50 dark:bg-neutral-950 hover:bg-neutral-200 hover:dark:bg-neutral-800 cursor-pointer"
    >
      {theme === "dark" ? (
        <Sun className=" text-white opacity-100 transition-all duration-1000" />
      ) : (
        <Moon className=" text-black transition-discrete transition-all duration-1000" />
      )}
    </Button>
  );
};

export default DarkBtn;
