import React, { Dispatch, SetStateAction, useState } from 'react';
import { AuthLayout } from '../../../components/layouts';
import { Button, CustomInput, OtpVerification, Stepper } from '../../../components/ui';
import { toast } from 'react-toastify';
import AuthService from '../../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../../redux/reducers/authSlice';

interface Props {
    formData: any
}

export default function OtpVerificationForm({ formData }: Props){
    const authService = new AuthService();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ loading, setLoading ] = useState(false)


    
    const handleVerification = async(data: number | string) => {
        const obj: any = localStorage.getItem('email-confirmation');
        const tdx = JSON.parse(obj);
        const newOtp = tdx?.data?.otp + '1';
        if(data === newOtp){
            registerTeacher();
        }else{
            toast.error('Invalid OTP!');
            return;
        }
    }

    const registerTeacher = async() => {
        setLoading(true);
        try {
            const response  = await authService.signUp(formData);
            setLoading(false);
            if(!response.status){
                toast.error(response?.message);
                return;
            }
            navigate('/success');
            localStorage.setItem('ryd-token-teacher', response?.data?.token);
            dispatch(setUserInfo(response.data));
        }catch(err: any){
            setLoading(false);
            toast.error(err.message);
            return;
        }
    }

    return (
        <AuthLayout
        >
            <Stepper currentTab={3} />

            <div className='lg:px-[2rem] mx-auto mt-[5rem]'>
                <OtpVerification btnText={loading ? "Processing..." : "Verify OTP"} handleVerification={handleVerification} />
            </div>
        </AuthLayout>
    )
}