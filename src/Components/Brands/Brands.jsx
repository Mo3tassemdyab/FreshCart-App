import React from "react";
import styles from "./Brands.module.css";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useQuery } from "react-query";
import { ColorRing } from "react-loader-spinner";
export default function Brands() {
  function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  let { isLoading, data, isFetching } = useQuery("featuredProducts", getBrands);
  console.log(data);
  
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Brands Page</title>
      </Helmet>

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
              <div key={ele._id} className="col-md-2">
                <div className="product px-2 py-3 text-center">
                  <img src={ele.image} className="w-100" alt={ele.title} />
                  <p className="text-main">{ele.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
