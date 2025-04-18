import React, { useState } from 'react'
import CustomInput from './CustomInput';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import UserService from '../../services/user.service';
import { toast } from 'react-toastify';
import { setUserInfo } from '../../redux/reducers/authSlice';
interface Props {
    closeModal: () => void;
}

const initialPasswordValues = {
    passwordOld: '',
    password1: '',
    password2: ''
}

const initialPersonalInfoValues = {
    firstName: '',
    lastName: ''
}

export default function ProfileUpdate({ closeModal }: Props) {
    const userInfo: any = useSelector((state: RootState) => state.auth.userInfo);
    const userService = new UserService();
    const dispatch = useDispatch();

    const [ tab, setTab ] = useState(0);
    const [ passwordData, setPasswordData ] = useState(initialPasswordValues);
    const [ personalData, setPersonalData ] = useState(initialPersonalInfoValues);
    const [ loading, setLoading ] = useState(false)

    const h1Style = 'font-[AvertaStd-Semibold] text-[23px] text-center font-[400] p-[1.3rem]';
    const btnStyle = `text-center w-full py-3 text-[14px] font-[400]`;
    const activeTab = `border-b-2 border-ryd-primary`;
    const flexContainer = `w-full lg:flex grid gap-10 mb-[1rem]`;
    const gridContainer = `w-full grid gap-2`;
    const labelStyle = `text-ryd-subTextPrimary font-[400] text-[13px] leading-[26px]`;

    // const handlePersonalInfoUpdate = async(e: any) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     try{
    //         const response = await userService.passwordUpdate(personalData);
    //         setLoading(false);
    //         if(!response?.status){
    //             toast.error(response?.message);
    //             return;
    //         }
    //         dispatch(setUserInfo(response.data));
    //         closeModal();
    //         toast.success(response?.message);
    //     }catch(err: any){
    //         setLoading(false);
    //         toast.error(err.message);
    //     }
    // }

    const handlePasswordUpdate = async(e: any) => {
        e.preventDefault();
        setLoading(true);
        try{
            const response = await userService.passwordUpdate(passwordData);
            setLoading(false);
            if(!response?.status){
                toast.error(response?.message);
                return;
            }
            closeModal();
            toast.success(response?.message);
        }catch(err: any){
            setLoading(false);
            toast.error(err.message);
        }
    }

    const Tabs = () => {
        return (
            <div className='full flex justify-between border-b items-center'>
                <button 
                    className={`${btnStyle} ${tab === 0 && activeTab}`} 
                    onClick={() => setTab(0)}>
                        Personal Information
                </button>
                <button 
                    className={`${btnStyle} ${tab === 1 && activeTab}`} 
                    onClick={() => setTab(1)}>
                    Password
                </button>
            </div>
        )
    }

    return (
        <div>
            <h1 className={h1Style}>Password Update</h1>
            {/* <Tabs /> */}
            <form className='p-[2rem]' onSubmit={handlePasswordUpdate}>
                {/* {tab === 0 &&
                    <div>       
                        <div className={flexContainer}>
                            <div className={gridContainer}>
                                <label className={labelStyle}>First Name</label>
                                <CustomInput
                                    type="text" 
                                    placeholder={userInfo?.firstName}
                                    required={true}
                                    onChange={(e: any) => setPersonalData({...personalData, firstName: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className={flexContainer}>
                            <div className={gridContainer}>
                                <label className={labelStyle}>Last Name</label>
                                <CustomInput
                                    type="text" 
                                    placeholder={userInfo?.lastName}
                                    required={true}
                                    onChange={(e: any) => setPersonalData({...personalData, lastName: e.target.value })}
                                />
                            </div>
                        </div>
                        <Button 
                            text={tab === 0 && loading ? 'Updating...' : 'Update'}
                            isInverted={false}
                            category='button'
                            type='submit'
                            btnStyle='w-full rounded-[1000px] border-0 mt-6 text-[16px] leading-[26px] font-[400] text-white px-[26px] py-[12px]'
                        />
                    </div>
                } */}
                {/* {tab === 1 && */}
                    <div>
                        <div className={flexContainer}>
                            <div className={gridContainer}>
                                <label className={labelStyle}>Old Password</label>
                                <CustomInput
                                    type="password" 
                                    placeholder='XXXXXXXXX'
                                    required={true}
                                    onChange={(e: any) => setPasswordData({...passwordData, passwordOld: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className={flexContainer}>
                            <div className={gridContainer}>
                                <label className={labelStyle}>New Password</label>
                                <CustomInput
                                    type="password" 
                                    placeholder='XXXXXXXXX'
                                    required={true}
                                    onChange={(e: any) => setPasswordData({...passwordData, password1: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className={flexContainer}>
                            <div className={gridContainer}>
                                <label className={labelStyle}>Confirm Password</label>
                                <CustomInput
                                    type="password" 
                                    placeholder='XXXXXXXXX'
                                    required={true}
                                    onChange={(e: any) => setPasswordData({...passwordData, password2: e.target.value })}
                                />
                            </div>
                        </div>

                        <Button 
                            text={loading ? 'Updating...' : 'Update'}
                            isInverted={false}
                            category='button'
                            type='submit'
                            btnStyle='w-full rounded-[1000px] border-0 mt-6 text-[16px] leading-[26px] font-[400] text-white px-[26px] py-[12px]'
                        />
                    </div>
                {/* } */}
            </form>
        </div>
    )
}
