import React, { InputHTMLAttributes, useState } from 'react';
import searchIcon from '../../assets/icons/search.svg';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    handleSearch: (data: string) => void,
}

export default function CustomInput({ type, placeholder, handleSearch, required, pattern, maxLength }: Props){
    const [ searchValue, setSearchValue ] = useState('');

    const inputFieldStyle = `w-full flex items-center gap-x-1 bg-ryd-gray rounded-[1000px] text-[14px] leading-[26px] font-[400] text-[#576877] pl-[1.5rem] pr-[.3rem] py-[.3rem] outline-none active:outline-none`;
    const boxStyle = `outline-none border-0 w-full bg-transparent`;
    const btnStyle = 'flex items-center justify-center rounded-full bg-ryd-primary h-[50px] w-[65px] hover:cursor-pointer hover:bg-ryd-primary/[.9]';

    const handleClick = () => {
        if(searchValue === ''){ 
            return;
        }else{
            handleSearch(searchValue);
        }

    }

    return (
        <div className={inputFieldStyle}>
            <input 
                type="search"
                placeholder={placeholder}
                className={boxStyle}
                onChange={(e: any) => setSearchValue(e.target.value)}
            />

            <div className={btnStyle} onClick={handleClick}>
                <img src={searchIcon} alt="search" />
            </div>
        </div>
    )
}