import React from "react";
import { useState } from "react";
import '../selectDrop/select.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ClickAwayListener } from '@mui/base';

export default function Select({data, placeholder, icon}){


    const [isOpenSelect, setIsOpenSelect] = useState(false);
    const [isSelect,setIsSelect] = useState(0);
    const [selectItem,setSelectItem] = useState(placeholder);
    const [listData, setListData] = useState(data);
    const [listData2, setListData2] = useState(data);

    function handleClick(){
        setIsOpenSelect(isOpenSelect => !isOpenSelect);
    }
    
    function closeSelect(index,name){
        setIsSelect(index);
        setIsOpenSelect(false);
        setSelectItem(name);
    }

    // const filterList = (e) =>{
    //     const keyword = e.target.value.toLowerCase();
        
    //     const list = listData2.filter((item) =>{
    //         return item.toLowerCase().includes(keyword);
    //     })

    //     const list2 = list.filter((item,index) => list.indexOf(item) === index); //check duplicate

    //     setListData(list2);
    // }
    function removeVietnameseTones(str) {
        return str
            .normalize("NFD") // Tách ký tự tổ hợp
            .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu
            .replace(/đ/g, 'd') // Chuyển đ thành d
            .replace(/Đ/g, 'D'); // Chuyển Đ thành D
    }
    
    const filterList = (e) =>{
        const keyword = removeVietnameseTones(e.target.value.toLowerCase()); // Bỏ dấu từ khóa
    
        const list = listData2.filter((item) =>{
            return removeVietnameseTones(item.toLowerCase()).includes(keyword); // Bỏ dấu khi so sánh
        });
    
        const list2 = list.filter((item,index) => list.indexOf(item) === index); // Kiểm tra trùng lặp
    
        setListData(list2);
    }

    return (
        <>
        <ClickAwayListener onClickAway={() => setIsOpenSelect(false)}>

            <div  className="selectDropWrapper cursor position-relative">
                <div onClick={handleClick} className="handleClick">
                    {icon}
                    <span className="openSelect" >{selectItem.length>14 ? selectItem.substr(0,14) + '...' : selectItem} 
                        <KeyboardArrowDownIcon className="arrow"/>
                    </span>
                </div>

                { isOpenSelect === true &&
                
                    <div className="selectedDrop">
                        <div className="searchFlied">
                            <input type="text" placeholder="Search here..." onChange={filterList}/>
                        </div>
                        <ul className="searchResult">
                            <li key={0} onClick={() => closeSelect(0,placeholder)} className={`${isSelect === 0 ? 'active' : ''}`}>{placeholder}</li>
                            {
                                listData.map((item,index) =>{
                                    return (
                                        <li key={index + 1} onClick={() => closeSelect(index +1,item)} className={`${isSelect === index+1 ? 'active' : ''}`}>{item}</li>
                                    );
                                })
                            }                       
                            </ul>
                    </div>
                }


            </div>
        </ClickAwayListener>
        </>
    );
}