import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import "./checkoutForm.scss";

const CheckoutForm = ({ title, price, stripePromise }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardElements = elements.getElement(CardElement); // J'envoi le numéro de carte à stripe et je récupère les données de cb
    console.log(cardElements);

    const stripeResponse = await stripe.createToken(cardElements, {
      name: "L'id de l'acheteur",
    }); //J'envoi ces données à l'api de stripe
    console.log(stripeResponse);
    //Envoie du token stripe au serveur
    const response = await axios.post(
      "https://lereacteur-vinted-api.herokuapp.com/payment",
      {
        stripeToken: stripeResponse.token.id,
        //stripeToken: { stripePromise },

        title,
        price,
      }
    );
    console.log(response.data);
    // if (response.data.status === "succeeded") {
    //   console.log("Payment succeeded !!");
    // }
    // if (elements == null) {
    //   return;
    // }
  };

  return (
    <>
      {!completed ? (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button type="submit" disabled={!stripe || !elements}>
            Valider
          </button>
        </form>
      ) : (
        <span>Paiement effectué ! </span>
      )}
    </>
  );
};

export default CheckoutForm;
