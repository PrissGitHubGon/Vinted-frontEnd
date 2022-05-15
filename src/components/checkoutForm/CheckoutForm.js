import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import "./checkoutForm.scss";
import Cookies from "js-cookie";

const CheckoutForm = ({ title, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [confirmMessage, setConfirmMessage] = useState("");

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const userID = Cookies.get("userID");
      const cardElements = elements.getElement(CardElement); // J'envoi le numéro de carte à stripe et je récupère les données de cb
      console.log(cardElements);

      const stripeResponse = await stripe.createToken(cardElements, {
        name: userID,
      }); //J'envoi ces données à l'api de stripe
      console.log(stripeResponse);
      //Envoie du token stripe au serveur
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: stripeResponse.token.id, //le token a envoyer a etait déclaré ligne 18
          title: title,
          amount: price,
        }
      );
      console.log(response.data);
      if (response.data.status === "succeeded") {
        setConfirmMessage("validé ! ");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="formPayment"
        style={{ backgroundColor: "white" }}
      >
        <CardElement />
        <button type="submit" className="btn-submit-payment">
          Paiement {confirmMessage}
        </button>
      </form>
    </>
  );
};

export default CheckoutForm;
