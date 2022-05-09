import React from "react";
import Banner from "../assets/img/banner-wide-9b45d0aa9a311c4ff6013e9cf3bc2b6646468be3d2f553192c63598685fcc177.jpg";
import "../App.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  //creation d'un state pour la pagination du site
  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?limit=6&page=${page}` //state dans l'url pour la pagination
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [page]); //mettre "page" ici, sinon useEffect bloquera la demande de requete lors du changement de page
  return isLoading === true ? (
    <div>En cours de chargement...</div>
  ) : (
    <div className="home">
      <div className="banner">
        <img src={Banner} alt="" />
        <div className="tri">
          <p>
            Prêts à faire <br />
            du tri dans vos <br /> placards ?
          </p>{" "}
          <button>Vends maintenant</button>
          <Link to="" className="banner-link">
            Découvrir comment ça marche
          </Link>
        </div>
      </div>
      <div className="title">
        <p>Articles populaires</p>
      </div>
      <div className="article-container">
        {data.offers.map((articles, index) => {
          const id = articles._id;

          return (
            <Link to={`/offer/${id}`} className="description">
              {" "}
              <div
                className="articles"
                key={index}
                //   onClick={(articles) => {
                //     articles._id;
                //   }}
              >
                <div className="images">
                  <img src={articles.product_image.url} alt="" />
                </div>
                <div className="description">
                  <p>{articles.product_price} €</p>
                  {articles.product_details.map((detail, index) => {
                    return (
                      <div className="detail" key={index}>
                        <p>{detail.TAILLE}</p>
                        <p>{detail.MARQUE}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      {/* Mise en place des boutons avec les state page, pour créer la pagination des produits */}
      <button onClick={() => setPage(page - 1)}>Page précédente</button>
      <button onClick={() => setPage(page + 1)}>Page suivante</button>
      <div className="title">
        <p>Recherche par marque</p>
      </div>
      <div className="search-to-marque">
        <Link to="" className="search-to-marque-link">
          Kiabi
        </Link>
        <Link to="" className="search-to-marque-link">
          Cache Cache
        </Link>
        <Link to="" className="search-to-marque-link">
          Tommy Hilfiger
        </Link>
        <Link to="" className="search-to-marque-link">
          Desigual
        </Link>
        <Link to="" className="search-to-marque-link">
          Burberry
        </Link>
        <Link to="" className="search-to-marque-link">
          Monoprix
        </Link>
        <Link to="" className="search-to-marque-link">
          Domyos
        </Link>
        <Link to="" className="search-to-marque-link">
          Pimkie
        </Link>
        <Link to="" className="search-to-marque-link">
          Superdry
        </Link>
        <Link to="" className="search-to-marque-link">
          Decathlon
        </Link>
        <Link to="" className="search-to-marque-link">
          Stradivarius
        </Link>
        <Link to="" className="search-to-marque-link">
          Sandro
        </Link>
        <Link to="" className="search-to-marque-link">
          Caroll
        </Link>

        <Link to="" className="search-to-marque-link">
          Esprit
        </Link>
        <Link to="" className="search-to-marque-link">
          Gémo
        </Link>
        <Link to="" className="search-to-marque-link">
          Wed'ze
        </Link>
        <Link to="" className="search-to-marque-link">
          Disney
        </Link>
        <Link to="" className="search-to-marque-link">
          Jules
        </Link>
      </div>
      <div className="title">
        <p>Suggestions de recherche</p>
      </div>
    </div>
  );
}
