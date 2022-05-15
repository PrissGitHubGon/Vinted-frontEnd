import CheckoutForm from "../components/checkoutForm/CheckoutForm";
import { Navigate, useLocation } from "react-router-dom";
//Stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const Payment = ({ token }) => {
  const stripePromise = loadStripe(
    "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
  );

  const location = useLocation();
  const { title } = location.state;
  const { price } = location.state;

  const protectionPrice = 0.4;
  const postagePrice = 0.8;
  const total = price + protectionPrice + postagePrice;

  console.log(title, price);

  return (
    <>
      {token ? (
        <div className="bgcolor">
          <div className="payment">
            <div className="resum-title box-size">
              {" "}
              <p>Résumé de la commande</p>
            </div>
            <div className="box-command-description box-size font-color-grey">
              <p className="box-command-descriptionPrice box-flex-between">
                <span>Commande </span> <span>{price} €</span>
              </p>

              <p className="box-command-descriptionProtect box-flex-between ">
                <span>Frais protection acheteurs : </span>
                <span>{protectionPrice} €</span>
              </p>
              <p className="box-command-descriptionFDP box-flex-between">
                <span>Frais de port : </span>
                <span>{postagePrice} €</span>
              </p>
            </div>
            <div className="payment_total box-flex-between box-size">
              <span>Total : </span>
              <span>{total.toFixed(2)} €</span>
            </div>
            <div className="payment_text box-size">
              <p>
                Il ne vous reste plus qu'une étape pour vous offrir
                <strong> {title}.</strong> Vous allez payer {total.toFixed(2)}€
                (frais de protection et frais de port inclus).
              </p>
            </div>{" "}
            <div className="box-size">
              {" "}
              <Elements stripe={stripePromise}>
                <CheckoutForm title={title} price={price} />
              </Elements>
            </div>
          </div>{" "}
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default Payment;
