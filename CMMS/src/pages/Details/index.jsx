import React from "react";
import { Link } from "react-router-dom";

export default function DetailsPage(){
    return (
        <section className="detailsPage">
            <div className="breadcrumWrapper">
                <div className="container-fluid">
                    <ul className="breadcrumb breadcrumb2 mb-0">
                        <li><Link>Trang chủ</Link></li>
                        <li><Link>Gạch</Link></li>
                        <li>Gạch chọi đầu Đạt</li>
                    </ul>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-10 col-lg-12 m-auto">
                        
                    </div>
                </div>
            </div>
        </section>
    );
}