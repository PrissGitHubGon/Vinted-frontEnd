import { Link, useParams } from "react-router-dom";
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
      {/* Product: {params.offerId} */}
      <Link to="/">Retour</Link>

      <div className="article-Unique-container">
        <div className="img">
          <img src={data.product_image.url} alt="" />
        </div>
        <div className="offert-article-unique">
          <button
            onClick={() => {
              console.log(
                "prix => ",
                data.product_price,
                "\n",
                "taille =>",
                data.product_details[0],
                "\n",
                "état => ",
                data.product_details[1],
                "\n",
                "couleur => ",
                data.product_details[2],
                "\n",
                "emplacement => ",
                data.product_details[3]
              );
            }}
          >
            la
          </button>
          <p>{data.product_price} €</p>
          <p>MARQUE :</p>
          {/* <p>TAILLE :{data.product_details[data].TAILLE}</p> */}
          {/* <p>ETAT : {data.product_details[1]}</p> */}
          {/* <p>COULEUR : {data.product_details[2]}</p> */}
          {/* <p>EMPLACEMENT : {data.product_details[3]}</p> */}
          <div className="offert-article-etat">
            <p>{data.product_name}</p>
            <p>{data.product_description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Offer;
