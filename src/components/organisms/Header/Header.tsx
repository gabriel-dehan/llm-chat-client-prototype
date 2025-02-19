import "./Header.css";

import ThemeSwitcher from "@src/components/molecules/ThemeSwitcher/ThemeSwitcher";

const Header = () => {
  return (
    <div className="org-header">
      <a className="org-header__logo" href="/">
        <img alt="Cookboost" src="/vite.svg" />
      </a>
      <div className="org-header__nav">
        <ul className="org-header__nav-list">
          <li className="org-header__nav-item">
            <a href="/">Home</a>
          </li>
          <li className="org-header__nav-item org-header__switcher">
            <ThemeSwitcher />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
