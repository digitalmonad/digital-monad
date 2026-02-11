"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "./ui/switch";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center space-x-2">
        <Sun className="h-4 w-4" />
        <Switch disabled />
        <Moon className="h-4 w-4" />
      </div>
    );
  }

  const currentTheme = resolvedTheme ?? theme;

  return (
    <div className="flex items-center space-x-2">
      <Sun
        className={`h-4 w-4 transition-colors ${
          currentTheme === "light" ? "text-yellow-500" : "text-muted-foreground"
        }`}
      />
      <Switch
        checked={currentTheme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
      <Moon
        className={`h-4 w-4 transition-colors ${
          currentTheme === "dark" ? "text-yellow-500" : "text-muted-foreground"
        }`}
      />
    </div>
  );
}
