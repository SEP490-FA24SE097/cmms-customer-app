import React from "react";
import './style.css';

import Anh1 from '../../../assets/images/anh1.jpg';
import Anh2 from '../../../assets/images/anh2.jpg';
import Anh3 from '../../../assets/images/anh3.jpg';
import Rating from '@mui/material/Rating';
import { Link } from "react-router-dom";


export default function TopProducts(props){
    return (
        <>
            <div className="topSelling_box">
                <h3>{props.title}</h3>

                <div className="items d-flex align-items-cente">
                    <div className="img">
                        <Link to=''>                       
                            <img src={Anh1} className="w-100" alt="" />
                        </Link>
                    </div>

                    <div className="info px-3">
                        <Link to=''><h4>NỆM CAO SU THIÊN NHIÊN CLASSIC</h4></Link>
                        <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
                        <div className="d-flex align-items-center">
                            <div className="d-flex align-items-start money">
                                <span className="price text-b">200.000 đ</span> <span className="oldPrice">250.000 đ</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="items d-flex align-items-cente">
                    <div className="img">
                        <Link to=''>                       
                            <img src={Anh1} className="w-100" alt="" />
                        </Link>
                    </div>

                    <div className="info px-3">
                        <Link to=''><h4>NỆM CAO SU THIÊN NHIÊN CLASSIC</h4></Link>
                        <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
                        <div className="d-flex align-items-center">
                            <div className="d-flex align-items-start money">
                                <span className="price text-b">200.000 đ</span> <span className="oldPrice">250.000 đ</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="items d-flex align-items-cente">
                    <div className="img">
                        <Link to=''>                       
                            <img src={Anh1} className="w-100" alt="" />
                        </Link>
                    </div>

                    <div className="info px-3">
                        <Link to=''><h4>NỆM CAO SU THIÊN NHIÊN CLASSIC</h4></Link>
                        <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
                        <div className="d-flex align-items-center">
                            <div className="d-flex align-items-start money">
                                <span className="price text-b">200.000 đ</span> <span className="oldPrice">250.000 đ</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            
        </>
    );
}