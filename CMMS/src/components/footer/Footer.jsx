import React from "react";
import "./Footer.css";

import Icon1 from "../../assets/images/iconfooter1.jpg";
import Icon2 from "../../assets/images/iconfooter2.jpg";
import Icon3 from "../../assets/images/iconfooter3.jpg";
import Icon4 from "../../assets/images/iconfooter4.jpg";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import { Link } from "react-router-dom";
import Logo from '../../assets/images/logo.svg';
import AppStore from "../../assets/images/app-store.jpg";
import GooglePlay from "../../assets/images/google-play.jpg";
import Zalo from "../../assets/images/payment.jpg";
import Momo from "../../assets/images/momo.jpg";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';


export default function Footer(){
    return(
        <div className="footerWrapper">
            <div className="footerBoxes">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <div className="box d-flex align-items-center w-100">
                                <span><img src={Icon1} alt="" /></span>
                                <div className="info">
                                    <h4>
                                        CHẾ ĐỘ BẢO HÀNH
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="box d-flex align-items-center w-100">
                                <span><img src={Icon2} alt="" /></span>
                                <div className="info">
                                    <h4>
                                        VẬN CHUYỂN MIỄN PHÍ
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="box d-flex align-items-center w-100">
                                <span><img src={Icon3} alt="" /></span>
                                <div className="info">
                                    <h4>
                                        THANH TOÁN KHI NHẬN HÀN
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="box d-flex align-items-center w-100">
                                <span><img src={Icon4} alt="" /></span>
                                <div className="info">
                                    <h4>
                                        CHĂM SÓC KHÁCH HÀNG 24H
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3 part1">
                            <Link to='/'><img src={Logo} /></Link>
                            <br /> <br />
                            <p>Trang bán vật liệu xịn xò con bò</p>
                            <p><LocationOnOutlinedIcon/> <strong>Địa chỉ:</strong> FPT University, Quận 9, Tp HCM, Việt Nam</p>
                            <p><LocalPhoneOutlinedIcon/> <strong>Số điện thoại:</strong> 0123456789</p>
                            <p><EmailOutlinedIcon/> <strong>Email:</strong> Email:cuongsieucapvipro.com</p>
                            <p><WatchLaterOutlinedIcon/> <strong>Thời gian làm việc:</strong> 8:00 - 18:00</p>
                        </div>

                        <div className="col-md-6 part2">
                            <div className="row">
                                <div className="col">
                                    <h3>Giới thiệu & thông tin</h3>
                                    <ul className="footer-list mb-sm-5 mb-md-0 pe-0">
                                        <li><Link to="#">Giới thiệu</Link></li>
                                        <li><Link to="#">Giao hàng, lắp đặt</Link></li>
                                        <li><Link to="#">Câu hỏi thường gặp</Link></li>
                                        <li><Link to="#">Hướng dẫn mua hàng</Link></li>
                                        <li><Link to="#">Đổi trả, bảo hành</Link></li>
                                    </ul>
                                </div>
                                <div className="col">
                                    <h3>Giới thiệu & thông tin</h3>
                                    <ul className="footer-list mb-sm-5 mb-md-0 pe-0">
                                        <li><Link to="#">Giới thiệu</Link></li>
                                        <li><Link to="#">Giao hàng, lắp đặt</Link></li>
                                        <li><Link to="#">Câu hỏi thường gặp</Link></li>
                                        <li><Link to="#">Hướng dẫn mua hàng</Link></li>
                                        <li><Link to="#">Đổi trả, bảo hành</Link></li>
                                    </ul>
                                </div>
                                <div className="col">
                                    <h3>Tài khoản</h3>
                                    <ul className="footer-list mb-sm-5 mb-md-0 pe-0">
                                        <li><Link to="#">Đang nhập</Link></li>
                                        <li><Link to="#">Thông tin tài khoản</Link></li>
                                        <li><Link to="#"></Link></li>
                                        <li><Link to="#">Hướng dẫn mua hàng</Link></li>
                                        <li><Link to="#">Đăng xuất</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 part3">
                            <h3>Tải ứng dụng</h3>
                            <br />
                            <p>Tài từ Apple Store hoặc Google Play</p>
                            <div className="d-flex">
                                <Link to={''}><img src={AppStore} width={200} /></Link>
                                <Link to={''}><img src={GooglePlay} className="mx-2" width={200}/></Link>
                            </div>
                            <br />
                            <p>Phương thức thanh toán</p>
                            <div className="d-flex">
                                <img src={Zalo} width={70}/>
                                <img src={Momo} className="mx-3 momo" width={70}/>
                            </div>
                        </div>
                    </div>

                    <hr />
                    <div className="row lastStrip">
                        <div className="col-md-3">

                        </div>
                        <div className="col-md-6">
                            
                        </div>
                        <div className="col-md-3 part3">
                            <div className="d-flex align-items-center">
                                <ul className="list list-inline">
                                    <li className="list-inline-item">
                                        <Link to={''}><FacebookOutlinedIcon/></Link>
                                    </li>
                                    <li className="list-inline-item">
                                        <Link to={''}><InstagramIcon/></Link>
                                    </li>
                                    <li className="list-inline-item">
                                        <Link to={''}><LocalPhoneOutlinedIcon/></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}