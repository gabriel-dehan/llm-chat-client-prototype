import "./Header.css";
import { useThemeStore } from "@src/stores/theme.store";

const Header = () => {
  const { toggleTheme } = useThemeStore();

  return (
    <div className="org-header">
      <div className="org-header__logo">
        <img src="/vite.svg" alt="Cookboost" />
      </div>
      <div className="org-header__nav">
        <ul className="org-header__nav-list">
          <li className="org-header__nav-item">
            <a href="/">Home</a>
          </li>
          <li className="org-header__nav-item">
            <button onClick={() => toggleTheme()}>Toggle Theme</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
