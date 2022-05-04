import React from "react";
import Banner from "../assets/img/banner-wide-9b45d0aa9a311c4ff6013e9cf3bc2b6646468be3d2f553192c63598685fcc177.jpg";
import "../App.scss";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-deliveroo-api.herokuapp.com/"
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
  return (
    <div className="home">
      <div className="banner">
        <img src={Banner} alt="" />
        <div className="tri">Prêts à faire du tri dans vos placards ? </div>
      </div>
      <div className="article"></div>
    </div>
  );
}
