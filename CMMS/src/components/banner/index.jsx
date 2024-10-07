import React from "react";
import "./style.css";
import Banner1 from "../../assets/images/banner1.jpg";
import Banner2 from "../../assets/images/banner2.jpg";
import Banner3 from "../../assets/images/banner3.jpg";



export default function Banner(){
    return(
        <div className="bannerSection">
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <div className="box">
                            <img src={Banner1} alt="banner1" className="w-100 transition" />
                            <h1 className="catName">Vật liệu xây dựng cơ bản</h1>
                        </div>
                    </div>
                    <div className="col">
                        <div className="box">
                            <img src={Banner2} alt="banner1" className="w-100 transition" />
                            <h1 className="catName">Vật liệu xây dựng kết cấu</h1>
                        </div>
                    </div>
                    <div className="col">
                        <div className="box">
                            <img src={Banner3} alt="banner1" className="w-100 transition" />
                            <h1 className="catName">Vật liệu xây dựng hoàn thiện</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}