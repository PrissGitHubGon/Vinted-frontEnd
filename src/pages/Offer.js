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
          <p>{data.product_price} €</p>
          <p>MARQUE :{data.product_details.MARQUE}</p>
          <p>TAILLE :{data.product_details.TAILLE}</p>
          <p>ETAT : {data.product_details.ÉTAT}</p>
          <p>COULEUR : {data.product_details.COULEUR}</p>
          <p>EMPLACEMENT : {data.product_details.EMPLACEMENT}</p>
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
