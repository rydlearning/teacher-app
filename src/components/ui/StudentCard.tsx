import React from 'react';
import { Link } from 'react-router-dom';
import mediaIcon from '../../assets/icons/mediaIcon.svg';
// import img from '../../assets/images/sectionImg.svg';

interface Props {}

export default function StudentCard({}: Props) {
    // const {} = props;

    const cardContainerStyle = 'border border-[#E7EEFE] rounded-[16px] w-full grid lg:grid-cols-5 grid-cols-1';
    const programStyle = 'float-right rounded-[1000px] mb-2 px-[10px] py-[5px] bg-[#ECF9EA] text-ryd-green text-center w-fit text-[13px] font-[400]';
    const h1Style = 'clear-both lg:text-[26px] text-[20px] lg:mt-1 mb-2 leading-[35px] font-[400] font-[AvertaStd-Semibold] text-ryd-subTextPrimary';
    const pStyle = 'lg:text-[18px] text-[14px] leading-[32px] font-[400] text-[#576877]';
    const flexBoxStyle = 'flex flex-wrap items-center';
    const mediaBoxContainer = 'w-full flex flex-wrap gap-5 items-center mt-5';
    const mediaBtn = 'flex items-center gap-2 px-[16px] lg:py-[10px] py-[7px] rounded-[1000px] border border-[#476788] text-ryd-subTextPrimary text-[14px]';
    const goToBtn = 'flex items-center gap-2 px-[16px] lg:py-[10px] py-[7px] rounded-[1000px] border border-ryd-primary text-ryd-primary hover:bg-ryd-primary hover:text-white text-[14px]';

    return (
        <div className={cardContainerStyle}>
            <div className='col-span-1 p-2'>
                <div className="lg:h-full h-[200px]">
                    <img src={''} alt="banner" className='object-contain h-full w-full rounded-[16px] border' />
                </div>
            </div>
            <div className='lg:col-span-4 col-span-1 pt-7 pb-[2.5rem] lg:pr-[2.7rem] pr-[1.2rem] lg:pl-[2rem] pl-[1.2rem]'>
                <div className={programStyle}>Basic</div>
                <h1 className={h1Style}>Tech Explorers Club</h1>
                <p className={pStyle}>Join our Tech Explorers Club where young minds delve into the exciting world of technology. From coding adventures to digital creativity, we empower kids to become the innovators of tomorrow</p>
                <div className={flexBoxStyle}></div>
                <div className={mediaBoxContainer}>
                    <Link to={'/'} target='_blank' rel="noopener noreferrer" className={mediaBtn}>
                        <img src={mediaIcon} alt="media" className='h-[15px] w-[15px]' /> 
                        <span>Media</span> 
                    </Link>
                    <Link to='/' className={goToBtn} target='_blank' rel="noopener noreferrer">Get curriculum</Link> 
                    <Link to='/' className={goToBtn} target='_blank' rel="noopener noreferrer">Go to class</Link> 
                </div>
            </div>
        </div>
    )
}
