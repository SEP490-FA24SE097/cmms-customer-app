import React from "react";
import HomeSlider from "./Slider";
import CatSlider from "../../components/catSlider";
import Banner from "../../components/banner";
import './style.css'

import Product from "../../components/products";
export default function Home(){
    return (
        <>
            <HomeSlider/>
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
        </>
    );
}