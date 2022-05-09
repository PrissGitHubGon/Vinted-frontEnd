import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
function Offer() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // "https://lereacteur-vinted-api.herokuapp.com/offers"
          `https://lereacteur-vinted-api.herokuapp.com/offer/${params.offerId}`
        );
        console.log(params.offerId);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [params.offerId]);
  return isLoading === true ? (
    <div>En cours de chargement...</div>
  ) : (
    <div className="" key={params.offerId}>
      <div className="article-Unique-container">
        <div className="img">
          <img src={data.product_image.url} alt="" />
        </div>
        <div className="offert-article-unique">
          <p>PRIX : {data.product_price} €</p>
          <div className="">
            {data.product_details.map((item, index) => {
              const keys = Object.keys(item);
              return (
                <div key={index}>
                  {keys[0]} : {item[keys[0]]}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Offer;
