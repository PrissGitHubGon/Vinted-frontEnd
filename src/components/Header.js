import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/img/logo.svg";
import RangeLine from "./Range-bar";

function Header({ token, setUser }) {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  return (
    <div className="global-header">
      <div className="header ">
        <Link to="/">
          <img src={Logo} alt="" className="logo" />
        </Link>
        <div className="search">
          <select name="Article" id="article">
            <option value="" disabled>
              Articles
            </option>
            <option value="articles">Articles</option>
            <option value="membre">Membre</option>
            <option value="forum">Forum</option>
            <option value="aide">Centre d'aide</option>
          </select>
          <input
            type="text"
            placeholder="Rechercher des articles"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />
        </div>
        {token === null ? (
          <nav style={{ paddingBottom: "20px" }}>
            <button
              to=""
              className="btn-soldeArticle"
              onClick={() => {
                navigate("/signup");
              }}
            >
              S'inscrire
            </button>
            <button
              to=""
              className="btn-soldeArticle"
              onClick={() => {
                navigate("/login");
              }}
            >
              Se connecter
            </button>
            <button
              to=""
              className="btn-soldeArticle"
              onClick={() => {
                navigate("/login");
              }}
            >
              Vends maintenant
            </button>
          </nav>
        ) : (
          <div>
            {" "}
            <button
              className="btn-disconect"
              onClick={() => {
                //Je me déconnecte et je redirige l'utilsateur vers la home page
                setUser(null);
                navigate("/");
              }}
            >
              Se déconnecter
            </button>
            <select className="btn-select">
              <option value="Mon compte" disabled>
                Mon compte
              </option>
              <option value="Mon profil">Mon profil</option>
              <option value="Mes paramètres">Mes paramètres</option>
              <option value="Personnalisation">Personnalisation</option>
              <option value="Mon porte-monnaie">Mon porte-monnaie</option>
              <option value="invite tes amis">invite tes amis</option>
              <option value="Se déconnecter" style={{ color: "red" }}>
                Se déconnecter
              </option>
            </select>
            <button
              to=""
              className="btn-soldeArticle"
              onClick={() => {
                navigate("/publish");
              }}
            >
              Vends maintenant
            </button>
            <i class="fas fa-question-circle"></i>
          </div>
        )}
      </div>
      <RangeLine />

      <div>
        <nav className="navLink-all">
          <Link to="" className="navLink">
            Femmes
          </Link>
          <Link to="" className="navLink">
            Hommes
          </Link>
          <Link to="" className="navLink">
            Enfants
          </Link>
          <Link to="" className="navLink">
            Maison
          </Link>
          <Link to="" className="navLink">
            Divertissement
          </Link>
          <Link to="" className="navLink">
            Animaux
          </Link>
          <Link to="" className="navLink">
            A propos
          </Link>
          <Link to="" className="navLink">
            Notre plateforme
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default Header;
