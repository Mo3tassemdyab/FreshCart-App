import React, { useContext, useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { Helmet } from 'react-helmet';
import { cartContext } from "../../Context/cartContext";
import { ColorRing } from "react-loader-spinner";
import { Link } from 'react-router-dom';
import { TokenContext } from "../../Context/Token";
export default function Cart() {

const [cartDetails, setCartDetails] = useState({});
let {getCart, deleteProductFromCart,updateProductQuantity, setTotalNumberOfCart} = useContext(cartContext);
let {token} = useContext(TokenContext);

async function getCartDetails(){
let {data} =  await getCart();

console.log(data);
setTotalNumberOfCart(data.numOfCartItems)
setCartDetails(data);

}

async function removeItem(id){

  let {data} =  await deleteProductFromCart(id);
  console.log(data);
  setTotalNumberOfCart(data.numOfCartItems)
  setCartDetails(data);
  
}
async function updateCount(id,count){

  let {data} =  await updateProductQuantity(id,count);
  console.log(data);
  setCartDetails(data);

 
  
}

useEffect( ()=> {

  getCartDetails();
}, [] )

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart Page</title>
      </Helmet>

      {cartDetails?.data? 
       <div className="container my-5">
        <div className="w-100 mx-auto bg-main-light p-5">
          <h1 className="mb-3">Cart Shop</h1>
          <div className="d-flex justify-content-between align-items-center ">
            <h3 className="h5">Total Price : <span className="text-main">{cartDetails.data.totalCartPrice} EGP</span></h3>
            <h3 className="h5" >Total Cart Item : <span className="text-main">{cartDetails.numOfCartItems} </span></h3>
          </div>

          {cartDetails.data.products.map((ele,index) => <div key={index} className="row py-2 border-bottom">
            <div className="col-md-1">
              <img src={ele.product.imageCover} className="w-100" alt="" />
            </div>
            <div className="col-md-11">
              <div className="d-flex justify-content-between ">
                  <div className="left-side">
                    <h4>{ele.product.title}</h4>
                    <p>{ele.price} EGP</p>
                  </div>
                  <div className="right-side">
                    <button className="btn btn-outline-success" onClick={()=> updateCount(ele.product._id, ele.count -1) }>-</button>
                    <span className="mx-2">{ele.count}</span>
                    <button className="btn btn-outline-success" onClick={()=> updateCount(ele.product._id, ele.count +1) }  >+</button>
                  </div>
              </div>

              <button  className="btn text-danger p-0"  onClick={()=> removeItem(ele.product._id)} ><i className="fa fa-trash-can"></i> remove </button>
            </div>

          </div> )}
            <Link className="btn bg-main text-white w-100 mt-5" to={'/checkout'}> Checkout </Link>
     

        </div>

   
      </div>
:    <div className="row justify-content-center align-items-center vh-100">
     <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="color-ring-loading"
      wrapperStyle={{}}
      wrapperClass="color-ring-wrapper "
      colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
    /> 
</div>  }

    </>
  );
}
