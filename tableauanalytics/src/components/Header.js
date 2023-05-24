import React from "react";

const Header = () => {
  return (
    <div className="header-container">
      <img src="../logo.png" alt="logo" className="logo" />
      <nav className="navbar">
        <ul>
          <li>Accueil</li>
          <li>Profil</li>
          <li>Réglage</li>
          <li>Communauté</li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
