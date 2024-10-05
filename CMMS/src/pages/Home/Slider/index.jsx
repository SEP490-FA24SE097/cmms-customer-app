import React from "react";
import Slider from "react-slick";
import "./style.css";
import Slider1 from "../../../assets/images/slider1.jpg";
import Slider2 from "../../../assets/images/slider2.jpg";
import Slider3 from "../../../assets/images/slider3.jpg";


export default function HomeSlider(){

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade:true
      };

    return (
        <section className="homeSlider">
            <div className="container-fluid">
                <Slider {...settings} className ='home_slider_Main'>
                    <div className="item">
                        <img src={Slider2} className="w-100" st alt="slider1" />
                    </div>
                    <div className="item">
                        <img src={Slider1} className="w-100" alt="slider2" />
                    </div>   
                    <div className="item">
                        <img src={Slider3} className="w-100" alt="slider3" />
                    </div>              
                </Slider>
            </div>
        </section>
    );
}