import React from "react";
import { useState } from "react";

import { Link } from "react-router-dom";

import Sidebar from "../../components/sidebar";
import Product from "../../components/products"
import { Button } from '@mui/material';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';

export default function Listing(){

    const [isOpenDropDown, setIsOpenDownDown] = useState(false);
    const [isOpenDropDown2, setIsOpenDownDown2] = useState(false);
    return (
        <section className="listingPage">
            <div className="container-fluid">
                <div className="breadcrumb flex-column">
                    <h1>Gach</h1>
                    <ul className="list list-inline mb-0">
                        <li className="list-inline-item">
                            <Link to={''}>Trang chủ</Link>
                        </li>
                        <li className="list-inline-item">
                            <Link to={''}>Sản phẩm</Link>
                        </li>
                        <li className="list-inline-item">
                            <Link to={''}>Gạch</Link>
                        </li>
                    </ul>
                </div>

                <div className="listingData">
                    <div className="row">
                        <div className="col-md-3 sidebarWrapper">
                            <Sidebar/>
                        </div>
                        <div className="col-md-9 rightContent homeProducts pt-0">

                            <div className="topStrip d-flex align-items-center">
                                <p className="mb-0">Đã tìm được <span className="text-primary">100</span> sản phẩm mà bạn tìm!</p>
                                <div className="ms-auto d-flex align-items-center">
                                    <div className="tab_ position-relative">
                                        <Button onClick={() => setIsOpenDownDown(isOpenDropDown => !isOpenDropDown)} className="tab_"><AppsOutlinedIcon/> Số lượng: 20</Button>
                                        {
                                            isOpenDropDown!== false &&
                                            <ul className="dropdownMenu">
                                                <li><Button onClick={() => setIsOpenDownDown(false)}>15</Button></li>
                                                <li><Button onClick={() => setIsOpenDownDown(false)}>20</Button></li>
                                                <li><Button onClick={() => setIsOpenDownDown(false)}>25</Button></li>
                                                <li><Button onClick={() => setIsOpenDownDown(false)}>30</Button></li>
                                            </ul>
                                        }
                                    </div>
                                    <div className="tab_ ms-3 position-relative">
                                        <Button onClick={() => setIsOpenDownDown2(isOpenDropDown2 => !isOpenDropDown2)} className="tab_"><SortOutlinedIcon/> Lọc theo: Mới nhất</Button>
                                        {
                                            isOpenDropDown2!== false &&
                                            <ul className="dropdownMenu">
                                                <li><Button onClick={() => setIsOpenDownDown2(false)}>Mới nhất</Button></li>
                                                <li><Button onClick={() => setIsOpenDownDown2(false)}>Giá thấp đến cao</Button></li>
                                                <li><Button onClick={() => setIsOpenDownDown2(false)}>Giá cao đến thấp</Button></li>
                                                <li><Button onClick={() => setIsOpenDownDown2(false)}>Đánh giá</Button></li>
                                            </ul>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="productRow ps-4 pe-3">
                                <div className="item">
                                    <Product tag='best'/>
                                </div>
                                <div className="item">
                                    <Product/>
                                </div>
                                <div className="item">
                                    <Product tag='best'/>
                                </div>
                                <div className="item">
                                    <Product/>
                                </div>
                                <div className="item">
                                    <Product tag='best'/>
                                </div>
                                <div className="item">
                                    <Product tag='hot'/>
                                </div>
                                <div className="item">
                                    <Product/>
                                </div>
                                <div className="item">
                                    <Product/>
                                </div>
                                <div className="item">
                                    <Product tag='new'/>
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
                    </div>
                </div>
            </div>
        </section>
    );
}