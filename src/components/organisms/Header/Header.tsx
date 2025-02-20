import { Link } from "@tanstack/react-router";

import ThemeSwitcher from "@src/components/molecules/ThemeSwitcher/ThemeSwitcher";

import "./Header.css";

const Header = () => {
  return (
    <div className="org-header">
      <Link className="org-header__logo" to="/">
        <img alt="Cookboost" src="/vite.svg" />
      </Link>
      <div className="org-header__nav">
        <ul className="org-header__nav-list">
          <li className="org-header__nav-item">
            <a href="/">Home</a>
          </li>
          <li className="org-header__nav-separator"></li>
          <li className="org-header__nav-item org-header__switcher">
            <ThemeSwitcher />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
