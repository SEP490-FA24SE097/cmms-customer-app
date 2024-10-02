import React, {useState, useEffect} from "react";
import '../header/Header.css';
import Logo from '../../assets/images/logo.svg';
import SearchIcon from '../../assets/images/search.svg';
import Select from "../selectDrop/select";
import axios from 'axios';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';


export default function Header(){

    const [categories,setCategories] = useState([
        'Xi măng',
        'Sắt, Thép',
        'Cát, đá',
        'Gạch',
        'Cát',
        'Đá',
        'Phụ gia xây dựng',
        'Trần, sàn'
    ]);

    const countryList =[];

    useEffect(() => {
        getCountry('https://provinces.open-api.vn/api/')
    },[]);


    const getCountry = async(url)=>{
        try {
            await axios.get(url).then((res)=>{
                if(res!==null){
                    // console.log(res.data);
                    res.data.map((item)=>{
                        countryList.push(item.name)
                    })
                }
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    return (    
        <>
            <header>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-2">
                            <img src={Logo} alt="logo" height="60px" img/>
                        </div>

                        <div className="col-sm-5">
                            <div className="headerSearch d-flex align-items-center ">                               
                                <Select data={categories} placeholder='All categories' icon={false}/>
                                <div className="search">
                                    <input type="text" placeholder="Search for items..." />
                                    <img className="searchIcon" src={SearchIcon} width="30px" alt="icon search" />
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-5">
                            <div className="countryWrapper">
                                <Select data={countryList} placeholder='Your location' icon ={<LocationOnOutlinedIcon style={{opacity:'0.5'}}/>}/>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}