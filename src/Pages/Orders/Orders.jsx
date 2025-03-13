import React, { useContext, useState, useEffect } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { db } from "../Utility/fireBase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import classes from "./Orders.module.css";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      // Older SDk synthax
      // db.collection("users")
      //   .doc(user.uid)
      //   .collection("orders")
      //   .orderBy("created", "desc")
      //   .onSnapShot((snapShot) => console.log(snapShot));
      // Modular SDK
      onSnapshot(
        query(
          collection(db, "users", user.uid, "orders"),
          orderBy("created", "desc")
        ),
        (snapshot) => {
          console.log(snapshot);
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        }
        // .docs.map((doc) => doc.data())
      );
    } else {
      setOrders([]);
    }
  }, []);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders__container}>
          <h2>Your orders</h2>
          {orders?.lenght === 0 && (
            <div style={{ padding: "20px" }}>you dont have orders yet.</div>
          )}

          <div>
            {orders?.map((eachOrder, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order ID: {eachOrder?.id}</p>
                  {eachOrder?.data?.basket?.map((order) => {
                    return (
                      <ProductCard flex={true} product={order} key={order.id} />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        
      </section>
    </LayOut>
  );
}

export default Orders;
