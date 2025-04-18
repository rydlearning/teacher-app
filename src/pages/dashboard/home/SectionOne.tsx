import React, { useEffect, useState } from 'react';
import arrowImg from '../../../assets/icons/arrow.svg';
import userImg from '../../../assets/icons/userImg.svg';
import alumniImg from '../../../assets/icons/graduate.svg';
import classesImg from '../../../assets/icons/book.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';

const containerStyle = 'grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mt-[4rem]';
const boxStyle = 'rounded-[10px] lg:p-[35px] p-[30px] bg-[#F7F7F7] grid gap-y-10';
const headerStyle = 'w-full flex items-center';
const pStyle = 'lg:text-[16px] text-[14px] leading-[26px] text-ryd-headerTextPrimary';
const countStyle = 'lg:text-[24px] text-[20px] leading-[33px] font-[AvertaStd-Semibold] text-ryd-headerTextPrimary';

interface Props {
    todayClasses: any[],
    totalStudents: any[],
    activeStudents: any[]
}

export default function SectionOne({ totalStudents, todayClasses, activeStudents }: Props) {

    return (
        <div className={containerStyle}>
            <div className={boxStyle}>
                <div className={`${headerStyle} gap-x-5`}>
                    <div className='h-[53px] w-[53px] rounded-full flex items-center justify-center'>
                        <img src={userImg} alt="user" />
                    </div>
                    <p className={pStyle}>Total Students</p>
                </div>
                <div className={`${headerStyle} justify-between`}>
                    <p className={countStyle}>{totalStudents?.length > 0 ? totalStudents?.length : 0}</p>
                    <img src={arrowImg} alt="growth" />
                </div>
            </div>

            <div className={boxStyle}>
                <div className={`${headerStyle} gap-x-5`}>
                    <div className='h-[53px] w-[53px] rounded-full flex items-center justify-center bg-[#D9D9D9]'>
                        <img src={alumniImg} alt="user" />
                    </div>
                    <p className={pStyle}>Active Students</p>
                </div>
                <div className={`${headerStyle} justify-between`}>
                    <p className={countStyle}>{activeStudents?.length > 0 ? activeStudents?.length : 0}</p>
                    <img src={arrowImg} alt="growth" />
                </div>
            </div>

            <div className={boxStyle}>
                <div className={`${headerStyle} gap-x-5`}>
                    <div className='h-[53px] w-[53px] rounded-full flex items-center justify-center bg-[#D9D9D9]'>
                        <img src={classesImg} alt="user" />
                    </div>
                    <p className={pStyle}>All Classes (today)</p>
                </div>
                <div className={`${headerStyle} justify-between`}>
                    <p className={countStyle}>{todayClasses?.length > 0 ? todayClasses?.length : 0}</p>
                    <img src={arrowImg} alt="growth" />
                </div>
            </div>
        </div>
    )
}
