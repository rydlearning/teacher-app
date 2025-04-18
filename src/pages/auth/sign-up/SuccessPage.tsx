import React from 'react'
import { Button } from '../../../components/ui';
import successGif from '../../../assets/images/success.json';
import Lottie from 'lottie-react';

type Props = {}

export default function SuccessPage(){
  const h1Style = 'lg:leading-[58.8px] leading-[45px] lg:text-[42px] text-[32px] font-[400] font-[AvertaStd-Semibold] text-ryd-headerTextPrimary';
  const pStyle = 'lg:text-[18px] text-[14px] leading-[26px] font-[400] font-[AvertaStd-Light]';
  const btnStyle = 'lg:w-[60%] md:w-[80%] w-full mx-auto rounded-[1000px] text-center border-0 mt-6 lg:text-[18px] text-[15px] leading-[26px] font-[400] text-white px-[26px] py-[15px]';

  return (
    <div className='lg:w-[45%] w-[90%] mx-auto grid gap-y-5 text-center mt-[8rem]'>
        <div className='lg:h-[180px] h-[100px] lg:w-[180px] w-[100px] mx-auto'>
            <Lottie animationData={successGif} />
        </div>
        <h1 className={h1Style}>You've successfully <br /> created your account</h1>
        <p className={pStyle}>You've successfully created your account. <br /> Click on the button below to commence your <br /> journey with us, as a tutor!</p>
        <Button 
            text='Proceed to Dashboard'
            to='/teacher/home'
            isInverted={false}
            category='link'
            btnStyle={btnStyle}
        />
    </div>
  )
}