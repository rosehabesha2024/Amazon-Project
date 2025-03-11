import React, { useContext } from "react";
import classes from "./Cart.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormater from "../../Components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import { Type } from "../../Pages/Utility/Action.type";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

function Cart() {
  const [{ basket }, dispatch] = useContext(DataContext);
  const total = basket.reduce((amount, item) => {
    // return item.price + amount; //the previous amount plus the current price of the item

    return amount + item.price * item.amount; //the previous amount plus the current price of the item times the amount
  }, 0);

  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };

  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };
  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart__container}>
          <h2>Hello</h2>
          <h3>Your Shopping Basket</h3>
          <hr />
          {basket?.length === 0 ? (
            <p>No items in your Cart</p>
          ) : (
            basket?.map((item, i) => {
              return (
                <section className={classes.cart_product}>
                  <ProductCard
                    key={i}
                    product={item}
                    renderAdd={false}
                    renderDesc={true}
                    flex={true}
                  />
                  <div className={classes.btn_container}>
                    <button
                      className={classes.btn}
                      type=""
                      onClick={() => increment(item)}
                    >
                      <IoIosArrowUp size={25} />
                    </button>
                    <span>{item.amount}</span>
                    <button
                      className={classes.btn}
                      type=""
                      onClick={() => decrement(item.id)}
                    >
                      <IoIosArrowDown size={25} />
                    </button>
                  </div>
                </section>
              );
            })
          )}
        </div>

        {basket?.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>Subtotal({basket?.length} items):</p>

              <CurrencyFormater amount={total} />
            </div>

            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>

            <Link to="/payment">continue to check out</Link>
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Cart;
