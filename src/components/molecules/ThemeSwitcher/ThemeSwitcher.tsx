import { useThemeStore } from "@src/stores/theme.store";
import { MoonStars, Sun } from "@phosphor-icons/react";
import "./ThemeSwitcher.css";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button onClick={toggleTheme} className="m-theme-switcher">
      {theme === "dark" ? (
        <MoonStars size={24} color="var(--gray-8)" weight="light" />
      ) : (
        <Sun size={24} color="var(--gray-8)" weight="light" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
