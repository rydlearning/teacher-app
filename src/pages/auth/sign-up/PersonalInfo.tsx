import { useEffect, useState } from 'react'
import { AuthLayout } from '../../../components/layouts';
import {
    Button,
    CountrySelectInput,
    CustomInput,
    GenderSelect,
    PhoneNumberInput,
    Stepper,
    TimezoneSelect
} from '../../../components/ui';
import { Link } from 'react-router-dom';
import { AuthProps } from './_model';
import AuthService from '../../../services/auth.service';
import { toast } from 'react-toastify';



export default function PersonalInfo({ props, setActiveTab  }: AuthProps) {
  const authService = new AuthService();

  const [ country, setCountry ] = useState<any>(null);
  const [ emailLoading, setEmailLoading ] = useState(false);

  const { setFormData, formData } = props;


  const flexContainer = `w-full lg:flex grid lg:gap-3 gap-5 mb-[1rem]`;
  const gridContainer = `w-full grid gap-1`;
  const inputFieldStyle = `w-full bg-ryd-gray rounded-[16px] text-[14px] leading-[26px] font-[400] text-[#576877] px-[26px] py-[12px] outline-none active:outline-none`;
  const labelStyle = `text-ryd-subTextPrimary font-[400] text-[13px] leading-[26px]`;


  const handleCountryChange = (data: any) => {    
        setCountry(data);
        setFormData({...formData, country: data.name, timezone: data?.timezones[0]?.zoneName });
    }


const handlePhoneChange = (data: string) => {
        setFormData({...formData, phone: data});
    }

const handleTimezoneChange = (data: any) => {
        setFormData({...formData, timezone: data.zoneName });
    }

  const handleSubmit = async(e: any) => {
        e.preventDefault();
        setActiveTab()
    
        // setEmailLoading(true);
        // try{
        //     const response = await authService.verifyEmail({ email: formData.email });
        //     setEmailLoading(false)
        //     if(!response.status){
        //         toast.error(response?.message);
        //         return
        //     }
        //     const obj = JSON.stringify(response)
        //     localStorage.setItem('email-confirmation', obj);
        // }catch(err: any){
        //     setEmailLoading(false)
        //     toast.error(err?.message);
        // }
    }



  return (
    <AuthLayout>
        <Stepper currentTab={1} />

        <form className='mt-[1.5rem] px-[1rem]' onSubmit={handleSubmit}>
            {/* first name and last name  */}
            <div className={flexContainer}>
                <div className={gridContainer}>
                    <label className={labelStyle}>First name</label>
                    <CustomInput
                        type="text" 
                        placeholder='John'
                        required={true}
                        onChange={(e: any) => setFormData({...formData, firstName: e.target.value })}
                    />
                </div>
                <div className={gridContainer}>
                    <label className={labelStyle}>Last name</label>
                    <CustomInput
                        type="text" 
                        placeholder='Doe'
                        required={true}
                        onChange={(e: any) => setFormData({...formData, lastName: e.target.value })}
                    />
                </div>
            </div>

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

            {/* country and state  */}
            <div className='mb-[1rem]'>
                <div className={'w-full lg:flex grid gap-5'}>
                    <div className={gridContainer}>
                        <label className={labelStyle}>Country</label>
                        <CountrySelectInput
                            handleCountryChange={handleCountryChange}
                            className={inputFieldStyle}
                            />
                    </div>
                    <div className={gridContainer}>
                        <div className={gridContainer}>
                            <label className={labelStyle}>Study Timezone</label>
                            <TimezoneSelect
                                country={country}
                                handleTimezoneChange={handleTimezoneChange}
                                className={inputFieldStyle}
                                />
                        </div>
                    </div>
                </div>
            </div>

            {/* phone number  */}
            <div className={flexContainer}>
                <div className={gridContainer}>
                    <label className={labelStyle}>Phone</label>
                    <PhoneNumberInput
                        country={country}
                        handlePhoneInputChange={handlePhoneChange}
                        className={inputFieldStyle}
                    />
                </div>
                 <div className={gridContainer}>
                    <label className={labelStyle}>Gender</label>
                    <GenderSelect
                        handleGenderChange={(item: string) => setFormData({...formData, gender: item })}
                        className={inputFieldStyle}
                    />
                </div>
            </div>

            <div className={` flex items-center gap-3`}>
                <input type="checkbox" required className='accent-ryd-primary hover:cursor-pointer' />
                <label className={labelStyle}>
                    I agree to the <a href='' target='_blank' className='text-ryd-primary'>terms</a> and <a href='' target='_blank' className='text-ryd-primary'>conditions</a>
                </label>
            </div>

            <Button 
                text={emailLoading ? 'Processing...' : 'Continue'}
                isInverted={false}
                category='button'
                btnStyle='w-full rounded-[16px] border-0 mt-6 text-[14px] leading-[26px] font-[400] text-white px-[26px] py-[12px]'
            />

<p className="text-[14px] font-[400] leading-[26px] text-center mt-[.5rem]">
                    <span className="text-ryd-subTextPrimary">Already have an account? </span><Link to='/teacher/sign-in' className="text-ryd-primary">Sign In</Link>
                </p>
        </form>
    </AuthLayout>
  )
}