import React, { useState } from 'react';

interface Props {
    className?: string,
    handleGenderChange: (data: string) => void
}

const genderClassification = ['male', 'female'];

export default function GenderSelect({ className, handleGenderChange}: Props) {
    const [ gender, setGender ] = useState('male');
    const [ toggle, setToggle ] = useState(false);
    
    const boxStyle = 'relative';

    return (
        <div className={`${boxStyle}`}>
            <div
                className={`${className} hover:cursor-pointer capitalize`}
                onClick={() => setToggle(prevState => !prevState)}
            >
                {gender}
            </div>
            {toggle &&
                <div className="h-fit z-20 overflow-y-auto absolute top-3 w-full shadow bg-white text-ryd-subTextPrimary text-[16px]">
                {genderClassification.map((item, index) => (
                    <div key={index} 
                    className="hover:bg-ryd-gray px-4 py-1 hover:cursor-pointer capitalize" 
                    onClick={() => {
                        setGender(item);
                        setToggle(false)
                        handleGenderChange(item);
                        }}>
                    {item}
                    </div>
                ))}
                </div>
            }
        </div>
    )
}
