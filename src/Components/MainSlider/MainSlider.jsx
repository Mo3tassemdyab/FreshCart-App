import React from "react";
import styles from "./MainSlider.module.css";
import Slider from "react-slick";

import img1 from "../../Assets/images/slider-image-1.jpeg";
import img2 from "../../Assets/images/slider-image-2.jpeg";
import img3 from "../../Assets/images/slider-image-3.jpeg";

export default function MainSlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-8">
            <Slider {...settings}>
              <img src={img3} height={400} className="w-100" alt="" />
              <img src={img1} height={400} className="w-100" alt="" />
              <img src={img2}  height={400} className="w-100" alt="" />
            </Slider>
          </div>
          <div className="col-md-4">
            <img src={img1} height={200} className="w-100" alt="" />
            <img src={img2} height={200} className="w-100" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
