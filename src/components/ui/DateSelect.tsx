import React, { forwardRef, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface Props {
    handleDateChange: (date: any) => void;
    selected: Date
}
interface CustomInputProps {
    value?: string;
    onClick?: () => void;
  }

export default function DateSelect({ handleDateChange, selected }: Props) {
    const ref: any = useRef<any>(null)

    const inputFieldStyle = `w-full flex items-center bg-ryd-gray rounded-[1000px] text-[16px] leading-[26px] font-[400] text-[#576877] px-[26px] py-[15px] outline-none active:outline-none`;

    const CustomInput = forwardRef<HTMLDivElement, CustomInputProps>(({ value, onClick }, ref) => (
      <div className={inputFieldStyle} onClick={onClick} ref={ref}>
        {value}
      </div>
    ));

    return (
      <DatePicker
        selected={selected}
        onChange={handleDateChange}     // (date) => setStartDate(date)
        customInput={<CustomInput />}
      />
    );
}
