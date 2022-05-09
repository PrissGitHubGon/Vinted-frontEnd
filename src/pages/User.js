import React from "react";
import { Link } from "react-router-dom";

function User() {
  return (
    <div className="users">
      <Link to="/user/signup">S'inscrire</Link>
      <Link to="/user/login">Se connecter</Link>
    </div>
  );
}

export default User;
