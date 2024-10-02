import React from "react";
import { useState } from "react";
import '../selectDrop/select.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ClickAwayListener } from '@mui/base';

export default function Select({data, placeholder, icon}){


    const [isOpenSelect, setIsOpenSelect] = useState(false);
    const [isSelect,setIsSelect] = useState(0);
    const [selectItem,setSelectItem] = useState(placeholder);

    function handleClick(){
        setIsOpenSelect(isOpenSelect => !isOpenSelect);
    }
    
    function closeSelect(index,name){
        setIsSelect(index);
        setIsOpenSelect(false);
        setSelectItem(name);
    }

    return (
        <>
        <ClickAwayListener onClickAway={() => setIsOpenSelect(false)}>

            <div  className="selectDropWrapper cursor position-relative">
                <div onClick={handleClick} className="handleClick">
                    {icon}
                    <span className="openSelect" >{selectItem} 
                        <KeyboardArrowDownIcon className="arrow"/>
                    </span>
                </div>

                { isOpenSelect === true &&
                
                    <div className="selectedDrop">
                        <div className="searchFlied">
                            <input type="text" placeholder="Search here..."/>
                        </div>
                        <ul className="searchResult">
                            <li key={0} onClick={() => closeSelect(0,placeholder)} className={`${isSelect === 0 ? 'active' : ''}`}>{placeholder}</li>
                            {
                                data.map((item,index) =>{
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