import React from "react";
import CarousleEffect from "../../Components/Carousle/CarousleEffect";
import Catagory from "../../Components/Catagory/Catagory";
import Product from "../../Components/Product/Product";
import LayOut from "../../Components/LayOut/LayOut";


function LandingPage() {
  return (
    
      < LayOut > 
          <CarousleEffect />
          <Catagory />
          <Product />
       </LayOut > 
    
  );
}

export default LandingPage