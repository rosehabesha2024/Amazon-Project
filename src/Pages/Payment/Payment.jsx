import React, { useContext, useState } from "react";
import { Type } from "../Utility/Action.type";
import classes from "./Payment.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Pages/Utility/fireBase";
import { useNavigate } from "react-router-dom";
import { collection, doc, setDoc } from "firebase/firestore";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  console.log(user);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    // return item.price + amount; //the previous amount plus the current price of the item

    return item.price * item.amount + amount; //the previous amount plus the current price of the item times the amount
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const handlechange = (e) => {
    console.log(e);

    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };
  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);

      // 1-backend \\ function contact to the client secret

      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      console.log(response.data);
      const clientSecret = response.data?.clientSecret;

      //2- clinet side (react side confirmation )

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      console.log(paymentIntent);

      // 3-after the confirmation    ... order firestore database save , and clear the basket

       await setDoc(
         doc(collection(db, "users", user.uid, "orders"), paymentIntent.id),
         {
           basket: basket,
           amount: paymentIntent.amount,
           created: paymentIntent.created,
         }
       );

      // await db
      //   .collection("users")
      //   .doc(user.uid)
      //   .collection("orders")
      //   .doc(paymentIntent.id);
      // set({
      //   basket: basket,
      //   amount: paymentIntent.amount,
      //   created: paymentIntent.created,
      // });

      // empty the basket

      dispatch({ type: Type.EMPTY_BASKET });

      setProcessing(false);
      navigate("/orders", { state: { msg: "you have placed new order" } });
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };
  return (
    <LayOut>
      <div className={classes.payment__header}>Checkout ({totalItem})items</div>
      <section className={classes.payment}>
        <div className={classes.flex}>
          <h1>Delivery Address </h1>
          <div>
            <div>{user?.email}</div>
            <div>1234 May St </div>
            <div>Cambridge, MA,  02138</div>
            <div> USA</div>
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Review Items and Delivery</h3>
          <div>
            {basket.map((item) => {
              return <ProductCard flex={true} product={item} key={item.id} />;
            })}
          </div>
        </div>

        <hr />
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                <CardElement onChange={handlechange} />

                <div className={classes.payment__price}>
                  <div>
                    <span style={{ display: "flex" }}>
                      Total Order <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please Wait...</p>
                      </div>
                    ) : (
                      " Pay Now "
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
