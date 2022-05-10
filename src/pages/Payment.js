// import { PaymentElement } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/checkoutForm/CheckoutForm";
import { useLocation } from "react-router-dom";
//Stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const Payment = () => {
  const stripePromise = loadStripe(
    "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
  );

  const location = useLocation();
  const title = location.state;
  const price = location.state;

  const protectionPrice = 0.4;
  const postagePrice = 0.8;
  const total = price + protectionPrice + postagePrice;

  //   console.log(title, price);

  return (
    <div className="payment-container">
      <div className="">
        <div className="">
          <div className="">Résumé de la commande</div>
          <div className="">
            <ul>
              <li>
                <span>Commande</span>
                <span>{price} €</span>
              </li>
              <li>
                <span>Frais protection acheteurs : </span>
                <span>{protectionPrice} €</span>
              </li>
              <li>
                <span>Frais de port : </span>
                <span>{postagePrice} €</span>
              </li>
            </ul>
          </div>
          <div className="divider"></div>
          <div className="payment_total">
            <span>Total : </span>
            <span>{total.toFixed(2)} €</span>
          </div>
          <div className="payment_text">
            Il ne vous reste plus qu'une étape pour vous offrir
            <span className="payment_text_bold"> {title}</span>. Vous allez
            payer
            <span className="payment_text_bold"> {total.toFixed(2)}</span> €
            (frais de protection et frais de port inclus).
          </div>
          <div className="divider"></div>
        </div>

        <Elements stripe={stripePromise}>
          <CheckoutForm
            title={title}
            price={price}
            // stripePromise={stripePromise}
          />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
