import React, { useContext, useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import Slider from "react-slick";
import { Helmet } from "react-helmet";
import FeatureProducts from "../FeatureProducts/FeatureProducts";
import { cartContext } from "../../Context/cartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  let {addToCart,setTotalNumberOfCart} = useContext(cartContext);

  let { id } = useParams();
  var settings = {
    dots: false,
    autoplay:true,
    arrows:false,
    autoplaySpeed:2000, 
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };


  async function getProductDetails(id) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setDetails(data.data);
    setLoading(false);
  }

  useEffect(() => {
    getProductDetails(id);
  }, []);


 
  async function addCart(id){
    let response =  await addToCart(id);
     if(response.data.status === 'success'){
        toast.success('Product Added Successfully');
      setTotalNumberOfCart(response.data.numOfCartItems)

    }else{
      toast.error('Product Added Successfully')
  
    }
    
   }
  

  return (
    <>
      {/* <div className="container d-flex justify-content-center align-items-center ">
    {isLoading ?   <div className="row justify-content-center align-items-center vh-100">
      <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper "
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          /> 
    </div> :  <div className="row align-items-center">
      <div className="col-md-4">
          <Slider {...settings}>
              {data.images.map( (ele) => <img src={data?.data?.data.imageCover} className='w-100' alt= {data?.data?.data.title}/>  )}
          </Slider>
      </div>
      <div className="col-md-8">
       <h2>{data?.data?.data.title}</h2>
       <p>{data?.data?.data.description}</p>
       <p>{data?.data?.data.category.name}</p>
       <div className="d-flex justify-content-between">
        <h5>{data?.data?.data.price} EGP</h5>
        <h5> <i className='fa fa-star rating-color'></i> {data?.data?.data.ratingsAverage}  </h5>
       </div>
       <button className='btn bg-main w-100 text-white '> Add to Cart </button>
      </div>

    </div>}

  </div> */}

      {loading ? (
        <div className="row justify-content-center align-items-center vh-100">
          <ColorRing
            visible={true}
            height="100"
            width="100"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      ) : (
       <div className="container my-5">
         <div className="row row justify-content-center align-items-center vh-100">
          <Helmet>
            <meta charSet="utf-8" />
            <title> {details.title.split(" ").splice(0, 2).join(" ")} </title>
          </Helmet>
          <div className="col-md-4">
            <Slider {...settings}>
              {details.images.map((image, idx) => (
                <img
                  key={idx}
                  src={image}
                  alt={details.title}
                  className="w-100"
                />
              ))}
            </Slider>
          </div>
          <div className="col-md-8">
            <div className="details">
              <h2 className="h5">{details.title}</h2>
              <p className="py-3">{details.description}</p>
              <p className="font-sm text-main">{details.category.name}</p>
              <div className="d-flex py-3 justify-content-between align-align-items-center">
                <h5 className="font-sm">{details.price} EG </h5>
                <h5 className="font-sm">
                  <i className="fas fa-star rating-color me-1"></i>
                  {details.ratingsAverage}
                </h5>
              </div>
              <button onClick={()=> addCart(details.id)} className="btn bg-main w-100  text-white">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
       </div>
      )}

     
    </>
  );
}
