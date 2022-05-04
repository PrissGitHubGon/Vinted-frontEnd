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
          "https://lereacteur-vinted-api.herokuapp.com/offers"
          // `https://lereacteur-vinted-api.herokuapp.com/offers/id:${params.offerId}`
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
    <div className="">
      {/* Product: {params.offerId} */}
      <div className="article-container">
        {data.offers.map((articles, index) => {
          {
            /* const id = articles._id; */
          }

          {
            /* return ( */
          }
          {
            /* <Link to={`/offer/${id}`}> */
          }

          <div className="articles" key={params.offerId}>
            <div className="images">
              <img src={articles.product_image.url} alt="" />
            </div>
            <div className="description">
              <p>{articles.product_price} €</p>
              {articles.product_details.map((detail) => {
                console.log("ceci et le params =>", params.offerId);

                return (
                  <div className="detail" key={params.offerId}>
                    <p>{detail.TAILLE}</p>
                    <p>{detail.MARQUE}</p>
                  </div>
                );
              })}

              <p></p>
            </div>
          </div>;
          {
            /* </Link> */
          }
          {
            /* ); */
          }
        })}
      </div>
    </div>
  );
}

export default Offer;
