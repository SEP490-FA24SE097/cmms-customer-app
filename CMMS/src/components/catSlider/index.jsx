import React, {useState} from "react";
import Slider from "react-slick";
import "./style.css";

export default function CatSlider(){

    const [itemBg, setItemBg] = useState([
        '#87A2FF',
        '#C4D7FF',
        '#FFD7C4',
        '#FFF4B5',
        '#C4D7FF',
        '#FFD7C4',
        '#FFF4B5',
        '#87A2FF',
        '#C4D7FF',
        '#FFD7C4'
    ]);

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 10,
        slidesToScroll: 1,
        fade:false,
        arrows: true
      };


    return(
        <>
            <div className="catSliderSection">
                <div className="container-fluid">
                    <h2 className="hd">Featured Categories</h2>
                    <Slider {...settings} className="cat_slider_Main">
                        {itemBg !== 0 && itemBg.map((item,index)=>{
                            return (
                                <div className="item">
                                    <div className="info" style={{background:item}}>
                                        <img src="https://lh3.googleusercontent.com/proxy/YDmxfj4_5UtEvRDsh3OCQsYSipAl63LSJBlnlilS2INOpsfzRLt37UGsHLIAV5ozXirItHSX_PSSbwQ00u4OBql7-yiOOhKptnsQ9_uZEySQ2A" alt="" />
                                        <h5>Gach</h5>
                                        <p>20 loai</p>
                                    </div>
                                </div>
                            )
                        })}                       
                    </Slider>
                </div>
            </div>

            <br /><br /><br /><br /><br /><br /><br />
        </>
    );
}