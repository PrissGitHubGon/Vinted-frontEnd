import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/img/logo.svg";
import RangeLine from "./Range-bar";
// import axios from "axios";
function Header({ token, setUser }) {
  const [input, setInput] = useState("");
  // const [data, setData] = useState();

  const navigate = useNavigate();
  // const marque = data;
  // console.log("console log de marque =>", marque);
  // axios
  //   .get(`https://lereacteur-vinted-api.herokuapp.com/offer`)
  //   .then((response) => {
  // const marqueTitle = response.data.offers.product_details;
  // console.log("console log de response =>", response.data, marqueTitle);
  // // console.log("B");
  // // console.log(pokemonTab);
  // for (let i = 0; i < marqueTitle.length; i++) {
  //   // je boucle sur mon tableau et j'affiche la clef name de chaque objet.
  // console.log(response.data);
  // }
  // })
  // .catch((error) => {
  // se déclenchera en cas d'erreur
  // console.log(error);
  // });
  // axios.get("/title", (req, res) => {
  //   console.log(req.query); // { name: 'farid', city: 'paris' }
  //   res.send("Data received");
  // });
  return (
    <div className="global-header">
      <div className="header">
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
          <nav>
            <Link to="/signup" className="c-button--small  c-button ">
              S'inscrire
            </Link>
            <Link to="/login" className="c-button--small  c-button ">
              Se connecter
            </Link>
            <Link to="" className="c-button--small  c-button ">
              Vend Maintenant
            </Link>
          </nav>
        ) : (
          <div>
            {" "}
            <button
              style={{
                background: "red",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => {
                //Je me déconnecte et je redirige l'utilsateur vers la home page
                setUser(null);
                navigate("/");
              }}
            >
              Se déconnecter
            </button>
            <select>
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
              className="c-button--small  c-button "
              style={{
                background: "#09B1BA",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/publish");
              }}
            >
              Vend tes articles
            </button>
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
