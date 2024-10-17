import React from "react";

import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

function valuetext(value) {
    return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}đ`;  
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Sidebar(){

    const [value, setValue] = React.useState([100000, 200000]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    
    return (
        <>
            <div className="sidebar">
                <div className="card border-0 shadow">
                    <h3>Danh mục</h3>

                    <div className="catList">
                        <div className="catItem d-flex align-items-center">
                            <h4 className="mb-0 me-3 ms-3">Xi mang</h4>
                            <span className="d-flex align-items-center justify-content-center rounded-circle ms-auto">30</span>
                        </div>
                        <div className="catItem d-flex align-items-center">
                            <h4 className="mb-0 me-3 ms-3">Xi mang</h4>
                            <span className="d-flex align-items-center justify-content-center rounded-circle ms-auto">30</span>
                        </div>
                        <div className="catItem d-flex align-items-center">
                            <h4 className="mb-0 me-3 ms-3">Xi mang</h4>
                            <span className="d-flex align-items-center justify-content-center rounded-circle ms-auto">30</span>
                        </div>
                        <div className="catItem d-flex align-items-center">
                            <h4 className="mb-0 me-3 ms-3">Xi mang</h4>
                            <span className="d-flex align-items-center justify-content-center rounded-circle ms-auto">30</span>
                        </div>
                        <div className="catItem d-flex align-items-center">
                            <h4 className="mb-0 me-3 ms-3">Xi mang</h4>
                            <span className="d-flex align-items-center justify-content-center rounded-circle ms-auto">30</span>
                        </div>
                    </div>
                </div>

                <div className="card border-0 shadow">
                    <h3>Lọc theo giá tiền</h3>
                    <Slider
                    min={10000}
                    step={10000}
                    max={1000000}
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    />

                    <div className="d-flex pt-2 pb-2 priceRange">
                        <span>Từ: <strong className="text-primary">{valuetext(value[0])}</strong></span>
                        <span className="ms-auto">Đến: <strong className="text-primary">{valuetext(value[1])}</strong></span>
                    </div>

                    <div className="filters">
                        <h5>Màu</h5>
                        <ul className="ps-0">
                            <li><Checkbox {...label} color="primary" />Đỏ(30)</li>
                            <li><Checkbox {...label} color="primary" />Xanh lam(30)</li>
                            <li><Checkbox {...label} color="primary" />Tím(30)</li>
                            <li><Checkbox {...label} color="primary" />Hồng(30)</li>
                            <li><Checkbox {...label} color="primary" />Đen(30)</li>
                            <li><Checkbox {...label} color="primary" />Vàng(30)</li>
                            <li><Checkbox {...label} color="primary" />Xanh lục(30)</li>
                            <li><Checkbox {...label} color="primary" />Cam(30)</li>
                        </ul>
                    </div>

                    <div className="filters">
                        <h5>Thương hiệu</h5>
                        <ul className="ps-0">
                            <li><Checkbox {...label} color="primary" />SamCuong(30)</li>
                            <li><Checkbox {...label} color="primary" />AppCuong(30)</li>
                            <li><Checkbox {...label} color="primary" />TosiCuong(30)</li>
                            <li><Checkbox {...label} color="primary" />Hồng(30)</li>
                            <li><Checkbox {...label} color="primary" />Đen(30)</li>
                            <li><Checkbox {...label} color="primary" />Vàng(30)</li>
                            <li><Checkbox {...label} color="primary" />Xanh lục(30)</li>
                            <li><Checkbox {...label} color="primary" />Cam(30)</li>
                        </ul>
                    </div>

                    <div className="d-flex">
                        <Button className="btn btn-b"><FilterAltOutlinedIcon/> Tìm Kiếm</Button>
                    </div>
                </div>
            </div>
        </>
    );
}