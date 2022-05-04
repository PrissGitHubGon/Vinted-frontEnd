import React from "react";
import Banner from "../assets/img/banner-wide-9b45d0aa9a311c4ff6013e9cf3bc2b6646468be3d2f553192c63598685fcc177.jpg";
import "../App.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return isLoading === true ? (
    <div>En cours de chargement...</div>
  ) : (
    <div className="home">
      <div className="banner">
        <img src={Banner} alt="" />
        <div className="tri">Prêts à faire du tri dans vos placards ? </div>
      </div>
      <div className="title">
        <h2>Articles populaires</h2>
      </div>
      <div className="article-container">
        {data.offers.map((articles, index) => {
          const id = articles._id;

          return (
            <Link to={`/offer/${id}`}>
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

                  <p></p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="title">
        <h2>Recherche par marque</h2>
      </div>
    </div>
  );
}
