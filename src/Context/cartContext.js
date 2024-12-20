import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState, } from "react";




export let cartContext = createContext();



let headers = {
  token: localStorage.getItem("userToken"),
};




function addToCart(id) {
  return axios
    .post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        productId: id,
      },
      {
        headers,
      }
    )
    .then((res) => res)
    .catch((err) => err);
}

function getCart() {
  return axios
    .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers,
    })
    .then((res) => res)
    .catch((err) => {
      console.log(err.response.data.message);
    
      return <div className="alert alert-danger">{err.response.data.message}</div>
    }
    );
}

function deleteProductFromCart(id) {
  return axios
    .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
      headers,
    })
    .then((res) => res)
    .catch((err) => err);
}
function updateProductQuantity(id, count) {
  return axios
    .put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        count,
      },
      {
        headers,
      }
    )
    .then((res) => res)
    .catch((err) => err);
}


export function CartContextProvider(props) {

const [cartId, setCartId] = useState(null)
const [totalNumberOfCart, setTotalNumberOfCart] = useState(null)



function onlinePayment(shippingAddress) {
    return axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        {
          shippingAddress,
        },
        {
          headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }
async function getInitialCart(){
   let {data} = await getCart();
   setTotalNumberOfCart(data?.totalNumberOfCart)
   setCartId(data?.data._id);
   localStorage.setItem('userId', data?.data.cartOwner)
}



useEffect( ()=>{
    getInitialCart();
},[] )

  return (
    <cartContext.Provider
      value={{
        addToCart,
        getCart,
        deleteProductFromCart,
        updateProductQuantity,
        onlinePayment,
        totalNumberOfCart,
        setTotalNumberOfCart,
    
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
