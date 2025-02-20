import { MoonStars, Sun } from "@phosphor-icons/react";

import { useThemeStore } from "@src/stores/theme.store";

import "./ThemeSwitcher.css";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button className="m-theme-switcher" onClick={toggleTheme}>
      {theme === "dark" ? (
        <Sun color="var(--gray-8)" size={18} weight="light" />
      ) : (
        <MoonStars color="var(--gray-8)" size={18} weight="light" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
