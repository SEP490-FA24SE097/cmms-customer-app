import React from "react";
import SliderBanner from "./Slider";
import CatSlider from "../../components/catSlider";
import Banner from "../../components/banner";
import Product from "../../components/products";
import './style.css'

import Banner4 from "../../assets/images/banner4.jpg";
import Slider from "react-slick";
import TopProducts from "./topProducts";
import Footer from "../../components/footer/Footer";

export default function Home(){

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        fade: false,
        arrow: true,
        autoplay: 2000
      };

    return (
        <>
            <SliderBanner/>
            <CatSlider/>
            <Banner/>

            <section className="homeProducts">
                <div className="container-fluid">
                    <div className="d-flex align-items-center">
                        <h2 className="hd mb-0 mt-0">Popular Product</h2>
                        <ul className="list list-inline ms-auto fillerTab mb-0">
                            <li className="list-inline-item">
                                <a href="" className="cursor">All</a>
                            </li>
                            <li className="list-inline-item">
                                <a href="" className="cursor">Cuong vip pro</a>
                            </li>
                            <li className="list-inline-item">
                                <a href="" className="cursor">Dat chicken</a>
                            </li>
                            <li className="list-inline-item">
                                <a href="" className="cursor">Hung chicken</a>
                            </li>
                            <li className="list-inline-item">
                                <a href="" className="cursor">Duc chicken</a>
                            </li>
                        </ul>
                    </div>

                    <div className="row productRow">
                        <div className="item">
                            <Product  tag="hot"/>
                        </div>
                        <div className="item">
                            <Product  tag="new"/>
                        </div>
                        <div className="item">
                            <Product tag="sale"/>
                        </div>
                        <div className="item">
                            <Product tag="best"/>
                        </div>
                        <div className="item">
                            <Product/>
                        </div>
                        <div className="item">
                            <Product/>
                        </div>
                        <div className="item">
                            <Product/>
                        </div>
                        <div className="item">
                            <Product/>
                        </div>
                        <div className="item">
                            <Product/>
                        </div>
                        <div className="item">
                            <Product/>
                        </div>
                    </div>
                </div>
            </section>

            <section className="homeProducts homeProductsRow2 pt-0">
                <div className="container-fluid">
                    <div className="d-flex align-items-center">
                        <h2 className="hd mb-0 mt-0">Material Best Seller</h2>
                        <ul className="list list-inline ms-auto fillerTab mb-0">
                            <li className="list-inline-item">
                                <a href="" className="cursor">All</a>
                            </li>
                            <li className="list-inline-item">
                                <a href="" className="cursor">Popular</a>
                            </li>
                            <li className="list-inline-item">
                                <a href="" className="cursor">New Products</a>
                            </li>
                        </ul>
                    </div>

                    <br />

                    <div className="row">
                        <div className="col-md-3 pe-5">
                            <img src={Banner4} className="w-100" alt="" />
                        </div>

                        <div className="col-md-9">
                            <Slider {...settings} className ='prodSlider'>
                                <div className="item">
                                    <Product tag='sale'/>
                                </div>
                                <div className="item">
                                    <Product tag='hot'/>
                                </div>
                                <div className="item">
                                    <Product tag='sale'/>
                                </div>
                                <div className="item">
                                    <Product tag='new'/>
                                </div>
                                <div className="item">
                                    <Product tag='sale'/>
                                </div>
                                <div className="item">
                                    <Product tag='hot'/>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>
            </section>

            <section className="topProductsSection">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <TopProducts title="Top Selling"/>
                        </div>
                        <div className="col">
                            <TopProducts title="Trending Products"/>
                        </div>
                        <div className="col">
                            <TopProducts title="Recently added"/>
                        </div>
                        <div className="col">
                            <TopProducts title="Top Rate"/>
                        </div>
                    </div>
                </div>
            </section>

            <Footer/>
        </>
    );
}