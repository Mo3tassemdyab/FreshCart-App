import React, { useContext, useEffect } from "react";
import styles from "./FeatureProducts.module.css";
import axios from "axios";
import { useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from 'react-router-dom';
import { cartContext } from "../../Context/cartContext";
import toast from "react-hot-toast";
export default function FeatureProducts() {
  // const [allProducts, setAllProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // async function getAllProducts() {
  //   let { data } = await axios.get(
  //     `https://ecommerce.routemisr.com/api/v1/products`
  //   );
  //   console.log(data);
  //   setAllProducts(data.data);
  //   setIsLoading(false);
  // }

  // useEffect(() => {
  //   getAllProducts();
  // }, []);

  let {addToCart,setTotalNumberOfCart} = useContext(cartContext);

  function getProducts(){
     return  axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }

  let  {isLoading, data, isFetching} = useQuery("featuredProducts", getProducts);
 
  async function addCart(id){
  let response =  await addToCart(id);
   if(response?.data?.status === 'success'){
      toast.success('Product Added Successfully');
      setTotalNumberOfCart(response.data.numOfCartItems)

  }else{
    toast.error('Product Added Successfully')

  }
  
 }

  return (
    <>
      <div className="container d-flex justify-content-center py-5">
        {isLoading ? (
         <div className="row justify-content-center align-items-center vh-100">
         <ColorRing
               visible={true}
               height="80"
               width="80"
               ariaLabel="color-ring-loading"
               wrapperStyle={{}}
               wrapperClass="color-ring-wrapper "
               colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
             /> 
       </div> 
        ) : (
          <div className="row ">
            {data?.data.data.map((ele) => (
              <div key={ele.id} className="col-md-2">
                <div className="product px-2 py-3">
                    <Link to={`/details/${ele.id}`}>
                          <img src={ele.imageCover} className="w-100" alt={ele.title} />
                        <p className="text-main">{ele?.category?.name}</p>
                        <h3 className="h6">
                        {ele?.title?.split(" ").splice(0, 2).join(" ")}
                        </h3>
                        <div className="d-flex justify-content-between">
                          {ele.priceAfterDiscount ? <p> <span className="text-decoration-line-through text-danger">{ele.price}</span> - {ele.priceAfterDiscount} EGP</p> : <p>{ele.price}</p> }
                         
                          
                          <p>
                            <i className="fa fa-star rating-color"></i>
                            {ele.ratingsAverage}
                          </p>
                        </div>
                    
                              
                       </Link>

                    <button onClick={()=> addCart(ele.id)} className="btn bg-main text-white w-100">
                      Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
