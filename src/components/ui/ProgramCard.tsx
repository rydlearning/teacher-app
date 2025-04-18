import React, { useEffect, useState } from 'react';
import Button from './Button';
import checkCircle from '../../assets/icons/check-circle.svg';
import successIcon from '../../assets/icons/successIcon.svg';

interface Props {
    price: string | number,
    program: string,
    description: string,
    features: string[],
    id: any,
    setSelected: (data:any) => void,
    selected: any
}

export default function ProgramCard({ setSelected, selected, id, price, program, description, features }: Props) {

    const priceContainer = `flex items-center p-0`;
    const priceH1Style = `text-[30px] font-[400] font-[AvertaStd-Semibold] leading-[45px]`
    const pricePStyle = `text-[16px] leading-[26px] font-[400]`;
    const listItemStyle = `flex items-center gap-x-2 text-[12.5px]`;
    const descriptionStyle = 'text-[14px] font-[AvertaStd-Semibold] leading-[22px] mb-3';
    const programStyle = 'capitalize font-[400] text-[23px] leading-[35px]';
    const containerStyle = 'bg-ryd-gray rounded-[8px] px-[2rem] pt-[1.5rem] pb-[3rem] relative';
    const overlayContainer = 'absolute top-0 right-0 left-0 h-full w-full rounded-[8px] bg-gray-100/[0.8]';



    const handleProgramSelect = () => {
        setSelected(id);
    }


    return (
        <div className={containerStyle}>
            <div className={priceContainer}>
                <h1 className={priceH1Style}>${price}</h1>
                <p className={pricePStyle}>/month</p>
            </div>
            <h1 className={programStyle}>{program}</h1>
            <p className={descriptionStyle}>{description}</p>
            <ul className='grid gap-y-2'>
               {features?.length > 0 && features.map((feature: string) => (
                    <li className={listItemStyle}>
                        <img src={checkCircle} alt="check" className='h-[15px] w-[15px]' />
                        <p>{feature}</p>
                    </li>
               ))}
            </ul>
            <Button 
                text='Select plan'
                isInverted={true}
                category='button'
                handleClick={handleProgramSelect}
                btnStyle='w-full rounded-[8px] border border-ryd-primary mt-6 text-[16px] leading-[26px] font-[400] text-ryd-primary px-[26px] hover:text-white hover:bg-ryd-primary py-[12px]'
            />
            {selected === id && 
                <div className={overlayContainer}>
                    <img 
                        src={successIcon} 
                        alt="success-icon" 
                        className='h-[100px] w-[100px] mx-auto mt-[9rem]' 
                        />
                </div>
            }
        </div>
    )
}
