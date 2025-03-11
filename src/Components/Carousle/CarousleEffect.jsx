import React from 'react'
import {Carousel} from 'react-responsive-carousel'
import {img} from './img/data'
import "react-responsive-carousel/lib/styles/carousel.min.css";

// import React from "react";
// import { Carousel } from "react-responsive-carousel";
// import { img } from "./img/data";
// import "react-responsive-carousel/lib/styles/carousel.min.css";

function CarousleEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((imageItem, index) => {
          return (
            <img key={index} src={imageItem} alt={`carousel-item-${index}`} />
          );
        })}
      </Carousel>
    </div>
  );
}

export default CarousleEffect;

// function CarousleEffect() {
//   return (
//     <div>
//         <Carousel
//         autoPlay={true}
//         infiniteLoop={true}
//         showIndicators={false}
//         showThumbs={false}
//         >
//             {
//                 img.map((imageItem)=>{
//                     return <img src={imageItem} />
//                 })
//             }
// </Carousel>
//  </div>
//   )
// }

// export default CarousleEffect