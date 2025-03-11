import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./product.module.css";

function Product() {
  const [products, setProducts] = useState();
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setisLoading(false);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  }, []);
  return (
    <>
      {isLoading? (
        <Loader />
      ) : (
        <section className={classes.products__container}>
          {products?.map((singleProduct) => {
            return (
              <ProductCard product={singleProduct} key={singleProduct.id} renderAdd={true}/>
            );
          })}
        </section>
      )}
    </>
  );
}

export default Product;
