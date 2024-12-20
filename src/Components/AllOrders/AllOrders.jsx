import React, { useEffect, useState } from "react";
import styles from "./AllOrders.module.css";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
export default function AllOrders() {
  const [allOrders, setAllOrders] = useState([]);

  function getUserOrders() {
    let userId = localStorage.getItem("userId");
    axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
      .then((res) => {
        setAllOrders(res?.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  if (!allOrders) {
    return (
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
    );
  }
  return (
    <>
      {/* <div className="container">
    <div className="bg-success p-5 my-5 text-center text-white">
        <h2>Congrats</h2>
    </div>
  </div>
   */}

      <div className="container">
        <div className="row gy-3">
          {allOrders.map((order, idx) => {
            console.log(order);

            return (
              <div key={idx} className="col-md-6 p-2 ">
                <div className="order  h-100 ">
                  <div className="container">
                    <div className="row">

                      {order.cartItems.map( (item)=> {
                        return <div key={item._id} className="col-md-4">
                        <div className="products h-100">
                          <img src={item.product.imageCover} className="w-100" alt={item.product.title} />
                          <h5 className="text-center">{item.product.title.split(' ').splice(0,2).join(' ')} </h5>
                          <h6>Price: {item.price}</h6>
                          <h6>Count: {item.count}</h6>
                        </div>
                      </div>
                      } )}
                  
                    </div>


                  </div>
                  <h5>payMent Method:{order.paymentMethodType} </h5>
                  <h5>order Price: :{order.totalOrderPrice} </h5>
                
                 
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
