import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/img/logo.svg";
function Header() {
  return (
    <div className="header">
      <img src={Logo} alt="" />
      <nav>
        <Link to="">S'inscrire</Link>
        <Link to="">Se connecter</Link>
        <Link to="">Vends tes articles</Link>
      </nav>
    </div>
  );
}

export default Header;
