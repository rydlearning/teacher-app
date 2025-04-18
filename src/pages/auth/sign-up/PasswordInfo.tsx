import React, { useState } from 'react'
import { AuthLayout } from '../../../components/layouts'
import { Button, CustomInput, Stepper } from '../../../components/ui';
import { AuthProps } from './_model';
import AuthService from '../../../services/auth.service';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../../redux/reducers/authSlice';



export default function PasswordInfo({ props }: any){
    const authService = new AuthService();
    const navigate = useNavigate();
    const dispatch = useDispatch();

;    const [error, setError] = useState(false);
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ loading, setLoading ] = useState(false);

    const flexContainer = `w-full lg:flex grid gap-5 mb-[1rem]`;
    const gridContainer = `w-full grid gap-1`;
    const labelStyle = `text-ryd-subTextPrimary font-[400] text-[13px] leading-[26px]`;

    const { setFormData, formData } = props;

    // const respObj: any = localStorage.getItem('email-confirmation');
    // const obj = JSON.parse(respObj);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if(formData.password !== confirmPassword){
            setError(true);
            return;
        }

        setError(false);
        // toast.success(obj.message);
        // setActiveTab();
        registerTeacher(formData)
    }

    const registerTeacher = async(data: any) => {
        setLoading(true);
        try {
            const response  = await authService.signUp(data);
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

            <form className='mt-[3rem] lg:px-[1rem]' onSubmit={handleSubmit}>
                {/* password  */}
                <div className={flexContainer}>
                    <div className={gridContainer}>
                        <label className={labelStyle}>Enter Password</label>
                        <CustomInput
                            type="password" 
                            placeholder='XXXXXXXXX'
                            required={true}
                            onChange={(e: any) => setFormData({...formData, password: e.target.value })}
                        />
                    </div>
                </div>

                {/* confirm password  */}
                <div className='mb-[1rem]'>
                    <div className={gridContainer}>
                        <label className={labelStyle}>Confirm Password</label>
                        <CustomInput
                            type="password" 
                            placeholder='XXXXXXXXX'
                            required={true}
                            onChange={(e: any) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <small className='text-red-600'>{error && 'Passwords must match!'}</small>
                </div>

                  {/* activation code */}
                  {/* <div className={flexContainer}>
                    <div className={gridContainer}>
                        <label className={labelStyle}>Enter Activation Code</label>
                        <CustomInput
                            type="text" 
                            placeholder='code'
                            required={true}
                            // onChange={(e: any) => setFormData({...formData, password: e.target.value })}
                        />
                    </div>
                </div> */}

                <Button 
                    text={loading? 'Processing...' : 'Submit'}
                    isInverted={false}
                    category='button'
                    btnStyle='w-full rounded-[16px] border-0 mt-6 text-[14px] leading-[26px] font-[400] text-white px-[26px] py-[12px]'
                />
            </form>
        </AuthLayout>
    )
}