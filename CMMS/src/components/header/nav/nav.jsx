import React from "react";
import "./nav.css";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GridViewIcon from '@mui/icons-material/GridView';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';

export default function Nav(){
    return (
        <div className="nav d-flex align-items-center">
            <div className="container-fluid">
                <div className="row position-relative">
                    <div className="col-sm-3 part1 d-flex align-items-center">
                        <Button className="bg-b text-white catTab"><GridViewIcon/> &nbsp; Browse All Category <KeyboardArrowDownIcon/></Button>
                    </div>

                    <div className="col-sm-7 part2 position-static">
                        <ul className="list list-inline mb-0">
                            <li className="list-inline-item">
                                <Button><Link>Home</Link></Button>
                            </li>
                            <li className="list-inline-item">
                                <Button><Link>About Us</Link></Button>
                            </li>
                            <li className="list-inline-item position-static">
                                <Button><Link>Shop <KeyboardArrowDownIcon/></Link></Button>

                                <div className="dropdown_menu megaMenu w-100">
                                    <div className="row">
                                        <div className="col">
                                            <h4 className="text-b">Vật liệu cơ bản</h4>
                                            <ul className="mt-4 mb-0 ps-0">
                                                <li><Link>Xi măng</Link></li>
                                                <li><Link>Sắt</Link></li>
                                                <li><Link>Cát</Link></li>
                                                <li><Link>Sắt, thép</Link></li>
                                                <li><Link>Gạch</Link></li>
                                            </ul>
                                        </div>
                                        <div className="col">
                                            <h4 className="text-b">Vật liệu kết cấu</h4>
                                            <ul className="mt-4 mb-0 ps-0">
                                                <li><Link>Phụ gia xây dựng</Link></li>
                                                <li><Link>Bê tông</Link></li>
                                                <li><Link>Vữa xây dựng</Link></li>
                                            </ul>
                                        </div>
                                        <div className="col">
                                            <h4 className="text-b">Vật liệu hoàn thiện</h4>
                                            <ul className="mt-4 mb-0 ps-0">
                                                <li><Link>Tường</Link></li>
                                                <li><Link>Trần</Link></li>
                                                <li><Link>Sàn</Link></li>
                                                <li><Link>Vật tư nội thất</Link></li>
                                                <li><Link>Vật tư ngoại thất</Link></li>
                                            </ul>
                                        </div>
                                        <div className="col">
                                            <img src="https://static1.cafeland.vn/cafelandnew/hinh-anh/2022/09/30/191/image-20220930130809-2.jpeg" className="w-100" alt="image categories" />
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="list-inline-item">
                                <Button><Link>Blog</Link></Button>
                            </li>
                            <li className="list-inline-item">
                                <Button><Link>PageTest <KeyboardArrowDownIcon/></Link></Button>

                                <div className="dropdown_menu">
                                    <ul className="ps-0">
                                        <li><Button><Link to="/about">About Us</Link></Button></li>
                                        <li><Button><Link to="/about">Contact</Link></Button></li>
                                        <li><Button><Link to="/about">My Account</Link></Button></li>
                                        <li><Button><Link to="/about">Login</Link></Button></li>
                                        <li><Button><Link to="/about">Forgot Password</Link></Button></li>
                                        <li><Button><Link to="/about">Purchar guide</Link></Button></li>
                                        <li><Button><Link to="/about">Privacy Policy</Link></Button></li>
                                        <li><Button><Link to="/about">Temps Of Service</Link></Button></li>
                                        <li><Button><Link to="/about">404 Pages</Link></Button></li>
                                    </ul>
                                </div>
                            </li>
                            <li className="list-inline-item">
                                <Button><Link>Contact</Link></Button>
                            </li>
                        </ul>
                    </div>

                    <div className="col-sm-2 part3 d-flex align-items-center">
                        <div className="phNo d-flex align-items-center ms-auto">
                            <span><HeadphonesOutlinedIcon/></span>
                            <div className="info ms-3">
                                <h4 className="text-b mb-0">1900 - 1111</h4>
                                <p className="mb-0">24/7 Call Cho Cuong</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}