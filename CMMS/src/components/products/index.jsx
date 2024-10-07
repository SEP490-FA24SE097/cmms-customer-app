import React from "react";
import "./style.css"
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

export default function Product(){
    return(
        <div className="productThumb">
            <div className="imgWrapper">
                <img src="https://vlxdgiatot.com/wp-content/uploads/2024/10/rem-cau-vong-eco-home-new-york-510x510-1.jpg" alt="product" className="w-100"/>
            </div>

            <div className="info">
                <span className="d-block catName">Vat tu noi that</span>
                <h4 className="title"><Link>Rem cau vong NEWYORK sdfsadf fas dfasd fd</Link></h4>
                <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
                <span className="brand d-block">By <Link href="" className="text-b">Cuong</Link></span>

                <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center">
                        <span className="price text-b">200.000 đ</span> <span className="oldPrice">250.000 đ</span>
                    </div>

                    <Button className="bg-b ms-auto transition"><ShoppingCartOutlinedIcon/> Add</Button>
                </div>
            </div>
        </div>
    );
}