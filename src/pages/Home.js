import React from "react";
import Banner from "../assets/img/banner-wide-9b45d0aa9a311c4ff6013e9cf3bc2b6646468be3d2f553192c63598685fcc177.jpg";
import "../App.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?limit=6&page=${page}`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [page]);
  return isLoading === true ? (
    <div>En cours de chargement...</div>
  ) : (
    <div className="home">
      <div className="banner">
        <img src={Banner} alt="" className="hero" />
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
      {/* <div className="article-container">
        {data.offers.map((articles, index) => {
          const id = articles._id;

          return (
            <Link to={`/offer/${id}`} className="description">
              {" "}
              <div className="avatar-account">
                <div className="avatar-imgcontainer">
                  {<img
                    src={articles.owner.account.avatar.url}
                    alt=""
                    className="avatar-img"
                  /> ? (
                    <img
                      src={articles.owner.account.avatar.url}
                      alt=""
                      className="avatar-img"
                    />
                  ) : (
                    <img
                      src="../assets/img/woman-1274056__340.jpg"
                      alt=""
                      className="avatar-img"
                    />
                  )}
                </div>
                <p>{articles.owner.account.username}</p>
              </div>
              <div className="articles" key={index}>
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
      </div> */}

      <div className="container-btn-home">
        {" "}
        <button onClick={() => setPage(page - 1)}>Page précédente</button>
        <button onClick={() => setPage(page + 1)}>Page suivante</button>
      </div>
    </div>
  );
}
