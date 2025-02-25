"use client";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
    localStorage.theme = newTheme;
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="icon"
      className="relative w-9 h-9 rounded-xl bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl border-0 hover:bg-white/20 dark:hover:bg-gray-800/20 transition-all duration-300"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-violet-600 dark:text-violet-400" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-violet-600 dark:text-violet-400" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
