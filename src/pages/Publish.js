import axios from "axios";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const Publish = ({ token }) => {
  //state formulaire pour la récupération des value dans la fonction onChange
  const [title, setTitle] = useState(""); //  title = titre
  const [description, setDescription] = useState(""); //  description = description
  const [brand, setBrand] = useState(""); //  brand = Marque
  const [size, setSize] = useState(""); //  size = Taille
  const [color, setColor] = useState(""); //  color = Couleur
  const [condition, setCondition] = useState(""); //  etat = état du produit
  const [city, setCity] = useState(""); //  city = Lieu
  const [price, setPrice] = useState(0); //  price = prix
  const [exchangeInterest, setExchangeInterest] = useState(false); //  checkbox
  const [picture, setPicture] = useState(null); // file = photo
  const [data, setData] = useState(null); //data requete
  const [isPictureSending, setIsPictureSending] = useState(false);
  //*******************************************************************************/

  // const userToken = token;
  //*******************************************************************************/

  // const navigate = useNavigate(); //redirection vers une autre page

  const handlePublish = async (event) => {
    event.preventDefault();
    setIsPictureSending(true);
    //Je viens créer mon formData qui contiendra l'annonce à transmettre au serveur

    const formData = new FormData();
    //je retrouverais ces informations dans la clé req.fields
    formData.append("condition", condition);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("price", price);
    formData.append("color", color);
    formData.append("size", size);
    formData.append("picture", picture);
    formData.append("city", city);

    try {
      const response = await axios.post(
        `https://lereacteur-vinted-api.herokuapp.com/offer/publish`,
        formData,
        {
          headers: {
            // authorization: `Bearer ` + userToken,
            authorization: `Bearer ` + Cookies.get(token),
            ContentType: "multipart/form-data",
          },
        }
      );
      // alert(JSON.stringify(response.data));
      setData(response.data);
      setIsPictureSending(false);
      console.log(data);
    } catch (err) {
      // if (err.response.status === 500) {
      //   console.error("An error occurred");
      // } else {
      //   console.error(err.response.data.msg);
      // }
      console.log(err.message);
    }
  };

  return token === null ? (
    <div>
      <button>se connecter</button>
    </div>
  ) : (
    // return (
    <div className="Allform">
      <div>
        <form onSubmit={handlePublish} className="form">
          <h2>Vends ton article</h2>
          <div className="files">
            <input
              type="file"
              onChange={(event) => {
                setPicture(event.target.files[0]);
              }}
            />
          </div>
          <div className="bloc_publish_1">
            <p>titre</p>
            <input
              value={title}
              placeholder="ex : chemise damart bleu"
              type="text"
              onChange={(event) => setTitle(event.target.value)}
            />
            <p>Décris ton article</p>

            <textarea
              name="description"
              id="description"
              rows="5"
              placeholder="ex: porté quelques fois, taille correctement"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <div className="bloc_publish_2">
            <p>Marque</p>
            <input
              value={brand}
              placeholder="ex : Zara"
              type="text"
              onChange={(event) => setBrand(event.target.value)}
            />
            <p>Taille</p>
            <input
              value={size}
              placeholder="ex : L/40"
              type="text"
              onChange={(event) => setSize(event.target.value)}
            />
            <p>Couleur</p>
            <input
              value={color}
              placeholder="ex : Bleu"
              type="text"
              onChange={(event) => setColor(event.target.value)}
            />
            <p>Etat</p>
            <input
              value={condition}
              placeholder="ex : Neuf avec étiquette"
              type="text"
              onChange={(event) => setCondition(event.target.value)}
            />
            <p>Lieu</p>
            <input
              value={city}
              placeholder="ex : Paris"
              type="text"
              onChange={(event) => setCity(event.target.value)}
            />
          </div>
          <div className="bloc_publish_3">
            <p>Prix</p>
            <input
              value={price}
              placeholder="ex : 0,00€"
              type="text"
              onChange={(event) => setPrice(event.target.value)}
            />
            <br />

            {/* <input
              type="checkbox"
              value={checkbox}
              onChange={(event) => setCheckbox(event.target.checked)}
            />
            <span>Je suis intéressé(e) par les échanges</span> */}
            <div className="checkbox_interest">
              {exchangeInterest ? (
                <label
                  className="checkbox_interest_label_checked"
                  htmlFor="checkbox_exchange_interest"
                >
                  <i className="fa-solid fa-check fa-sm"></i>
                </label>
              ) : (
                <label
                  className="checkbox_interest_label"
                  htmlFor="checkbox_exchange_interest"
                ></label>
              )}

              <input
                id="checkbox_exchange_interest"
                type="checkbox"
                onChange={() => {
                  setExchangeInterest(!exchangeInterest);
                }}
              />
              <span>Je suis interessé(e) par les échanges </span>
            </div>
          </div>
          {/* {isPictureSending === false && (
            <div className="isPictureSending"></div>
          )}
          {isPictureSending === true ? (
            <div className="isPictureSending">En cours de publication</div>
          ) : (
            data && navigate(`/offer/${data._id}`)
          )} */}
          <div className="submit_form_btn">
            <input type="submit"> Ajouter</input>
          </div>
          {/* <input
            className="Register"
            type="submit"
            value="Ajouter"
            onChange={() => console.log(setCheckbox, setPrice)}
          /> */}
        </form>
        {isPictureSending === true ? (
          <div>Image en cours d'upload</div>
        ) : (
          data && (
            <img src={data.secure_url} style={{ width: "200px" }} alt="" />
          )
        )}
      </div>
    </div>
  );
};

export default Publish;
