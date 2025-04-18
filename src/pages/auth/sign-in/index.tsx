import { useState } from "react";
import { AuthLayout } from "../../../components/layouts";
import { Button, CustomInput } from "../../../components/ui";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthService from "../../../services/auth.service";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../../redux/reducers/authSlice";

const initialValues = {
    email: '',
    password: ''
}

export default function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authService = new AuthService();

    const [ formData, setFormData ] = useState(initialValues);
    const [ loading, setLoading ] = useState(false);

    const h1Style = `font-[400] text-[28px] leading-[36.2px] font-[AvertaStd-Semibold] text-center text-ryd-subTextPrimary mt-[5rem] mb-[1.5rem]`;
    const flexContainer = `w-full lg:flex grid gap-10 mb-[2rem]`;
    const gridContainer = `w-full grid gap-2`;
    const labelStyle = `text-ryd-subTextPrimary font-[400] text-[15px] leading-[26px]`;

    const handleSubmit = async(e: any) => {
        e.preventDefault();
        setLoading(true);
        try{
            const response = await authService.signIn(formData);
            setLoading(false);
            if(!response.status){
                toast.error(response?.message);
                return;
            }
            toast.success(response?.message);
            dispatch(setUserInfo(response?.data));
            localStorage.setItem('ryd-token-teacher', response?.data?.token);
            navigate('/teacher/home');
        }catch(err: any){
            setLoading(false);
            toast.error(err.message);
            return
        }
    }

    return (
        <AuthLayout   
        >
            <form className='mt-[2.5rem] pb-[2rem]  lg:px-[1rem]' onSubmit={handleSubmit}>
                 {/* email address  */}
                <div className={flexContainer}>
                    <div className={gridContainer}>
                        <label className={labelStyle}>Email Address</label>
                        <CustomInput
                            type="email" 
                            placeholder='Example@example.com'
                            required={true}
                            onChange={(e: any) => setFormData({...formData, email: e.target.value })}
                        />
                    </div>
                </div>

                {/* password  */}
                 <div className={flexContainer}>
                    <div className={gridContainer}>
                        <label className={labelStyle}>Password</label>
                        <CustomInput
                            type="password" 
                            placeholder='XXXXXXXXX'
                            required={true}
                            onChange={(e: any) => setFormData({...formData, password: e.target.value })}
                        />
                    </div>
                </div>

                {/* forgot password  */}
                <Link 
                    to='/teacher/forgot-psd' 
                    className="text-[14px] font-[400] font-[AvertaStd-Semibold] leading-[26px] flex justify-end -mt-5  text-ryd-primary">
                        Forgot password?
                </Link>

                <Button 
                    text={loading ? 'Processing...' : 'Sign In and Explore'}
                    isInverted={false}
                    category='button'
                    btnStyle='w-full rounded-[16px] border-0 mt-6 text-[14px] leading-[26px] font-[400] text-white px-[26px] py-[12px]'
                />

                <p className="text-[14px] font-[400] leading-[26px] text-center mt-6">
                    <span className="text-ryd-subTextPrimary">Haven't registered yet? </span><Link to='/teacher/sign-up' className="text-ryd-primary">Sign Up</Link>
                </p>
            </form>
        </AuthLayout>
    )
}