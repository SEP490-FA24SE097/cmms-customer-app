import React from "react";
import './style.css';
import NotFoundImg from "../../assets/images/page-404.png";
import { Button } from '@mui/material';
import { Link } from "react-router-dom";

export default function NotFound(){
    return (
            <section className="notFound"> 
                <div className="container-fluid">
                    <div className="box">
                        <img src={NotFoundImg} alt="404" />
                        <br /> <br />
                        <h1>Không Tìm Thấy Trang</h1>
                        <p>Liên kết bạn nhấp vào có thể bị hỏng hoặc trang có thể đã bị xóa. Hãy truy cập Trang chủ hoặc Liên hệ với chúng tôi về vấn đề này</p>
                        <br />
                        <div className="d-flex">
                                <Button className="btn-b btn-lg m-auto">
                                    <Link to={'/'}>Trở Về Trang Chủ</Link>
                                </Button>
                        </div>
                    </div>
                </div>
            </section>
    );
}