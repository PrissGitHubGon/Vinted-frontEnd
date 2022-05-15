import axios from "axios";
import { useState } from "react";

const Publish = ({ token }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState(0);
  const [checkbox, setCheckbox] = useState(false);
  const [picture, setPicture] = useState(null);
  const [data, setData] = useState(null);
  const [isPictureSending, setIsPictureSending] = useState(false);
  //*******************************************************************************/
  const handlePublish = async (event) => {
    event.preventDefault();
    setIsPictureSending(true);

    const formData = new FormData();

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
            authorization: `Bearer ` + token,
            ContentType: "multipart/form-data",
          },
        }
      );

      setData(response.data);
      setIsPictureSending(false);
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return token === null ? (
    <div>
      <button>se connecter</button>
    </div>
  ) : (
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
              type="number"
              onChange={(event) => setPrice(event.target.value)}
            />
            <div className="checkbox_interest">
              {checkbox ? (
                <label
                  className="checkbox"
                  htmlFor="checkbox_exchange_interest"
                >
                  <i className="fa-solid fa-check fa-sm"></i>
                </label>
              ) : (
                <label
                  className="checkbox"
                  htmlFor="checkbox_exchange_interest"
                ></label>
              )}

              <input
                id="checkbox_exchange_interest"
                type="checkbox"
                onChange={() => {
                  setCheckbox(!checkbox);
                }}
              />
              <span>Je suis interessé(e) par les échanges </span>
            </div>
          </div>

          <div className="submit_form_btn">
            <input type="submit" value="Ajouter"></input>
          </div>
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
