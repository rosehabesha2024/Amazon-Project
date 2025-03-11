import React, { useEffect, useState } from "react";
import styles from "./Results.module.css";
import axios from "axios";
import { productUrl } from "../../Api/endPoint";
import LayOut from "../../Components/LayOut/LayOut";
import ProductCard from "../../Components/Product/ProductCard";
import { useParams } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";


const Results = () => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const {categoryName} = useParams()
   
    useEffect(() => {
        setIsLoading(true)
        axios.get(`${productUrl}/products/category/${categoryName}`)
        .then((res) => {
            setResults(res.data)
            setIsLoading(false)
            console.log(res)
        }).catch((err) => {
            console.log(err)
            setIsLoading(false)
        })
    }, [])

  return (
    <LayOut> 
        {
            isLoading?(<Loader/>) :(
                <div>
        <h1 style={{padding: "30px"}}> Results</h1>
        <p style={{padding: "30px"}}> Category/{categoryName}</p>
        <hr/>
        <div className={styles.products_container}>
            {results?.map((product) =>(
                <ProductCard key={product.id}
                product={product}
                renderDesc={false}
                renderAdd={true}
                />
            ))}

        </div>
    </div>

            )
        }

    </LayOut>
  )
}

export default Results














// function Results() {
//   const [results, setResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false)
//   const { catagoryName } = useParams();
  
//   console.log(catagoryName);
  
//   useEffect(() => {
//     (async () => {
//       setIsLoading(true);
//       try {
//         let request = await axios.get(
//           `${productUrl}/products/catagory/${catagoryName}`)
//         console.log(request);
//         setResults(request.data);
//         setIsLoading(false);
//       } catch (error) {
//         console.error(error);
//         setIsLoading(false);
//       }
//     })();
//   }, []);
//   return (
//     <LayOut>
//         <div>
//             <h1>Results</h1>
//             <p>Catagory / {catagoryName}</p>
//             <hr />
//             <div>
//                 {results?.map((product)=>(
//                     < ProductCard key={product.id}product={product} />
//                 ))}
//             </div>
        
//         </div>
//     </LayOut>
//   );
// }

// export default Results;
