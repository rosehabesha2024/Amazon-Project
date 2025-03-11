import React, { useEffect, useState } from 'react'
// import classes from './ProductDetail.module.css'
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Api/endPoint'
import Loader from '../../Components/Loader/Loader'
import ProductCard from '../../Components/Product/ProductCard'




function ProductDetail() {
    const {productId} = useParams()
    const[isLoading, setisLoading] = useState(false)
    const [product, setproduct] = useState({})

    useEffect(() => {
      console.log(productId);
      
      setisLoading(true)
    axios.get(`${productUrl}/products/${productId}`)
    .then((res) =>{
    setproduct(res.data);
    setisLoading(false)

    }).catch((err)=>{
      console.log(err)
      setisLoading(false)
      
    })
    }, [])
        
   return (
     <LayOut>
      {isLoading?(<Loader/>):(<ProductCard
        product={product}
        flex = {true}
        renderDesc={true}
      />)}
     </LayOut>
   );
}

export default ProductDetail