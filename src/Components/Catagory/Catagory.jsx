import React from 'react'
import { categoryInfos } from "./CatagoryFullinfos";
import CatagoryCard from './CatagoryCard'
import classes from './Catagory.module.css'


function Catagory() {
  return (
    <section className={classes.category__container}>
      {categoryInfos?.map((infos) => {
        return <CatagoryCard key={infos.name} data={infos} />;
      })}
    </section>
  );
}
export default Catagory




// import React from "react";
// import { categoryInfos } from "./CatagoryFullinfos";
// import CategoryCard from "./CatagoryCard";
// import styles from "./Catagory.module.css";

// const Category = () => {
//   return (
//     <section className={`${styles.category_section}  `}>
//       <div className={`${styles.category_container} `}>
//         {categoryInfos.map((infos) => (
//           <CategoryCard key={infos.name} data={infos} />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Category;