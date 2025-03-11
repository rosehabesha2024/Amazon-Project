// import React from "react";

// import classes from "./Catagory.module.css";
// import { Link } from "react-router-dom";

// function CatagoryCard({ data }) {
//   console.log(data);
  
//   return (
//     <div className={classes.catagory}>
//       <Link to={`/Catagory/${data.name}`}>
//         <span>
//           <h2>{data?.title}</h2>
//         </span>
//         <img src={data.imgLink} alt="" />
//         <p>shop now</p>
//       </Link>
//     </div>
//   );
// }

// export default CatagoryCard;

// // import React from 'react'
// // import classes from './Catagory.module.css'

// // function CatagoryCard({data}) {
// //   return (
// //     <div className='classes.catagory'>
// //         <a href="">
// //             <span>
// //                 <h2>{data.title}</h2>
// //             </span>
// //             <img src={data.imgLink}alt="" />
// //             <p>shop now</p>
// //         </a>
// //         </div>
// //   )
// // }
// // export default CatagoryCard





import React from 'react';
import styles from './Catagory.module.css'
import { Link } from 'react-router-dom';



const CategoryCard = ({data}) => {
  return (
    <div className={`${styles.category} `}> 

      <Link to= {`/category/${data.name}`}>
        <span>
          <h2 className={`${styles.title}`}> {data.title}</h2>
        </span>
        <img src={data.imgLink} alt={data.title}/>
        <p>Shop now</p>
      </Link> 
    </div>
  );
};

export default CategoryCard;