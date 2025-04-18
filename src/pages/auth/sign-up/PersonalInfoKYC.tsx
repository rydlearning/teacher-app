import { useEffect, useRef, useState } from 'react'
import { AuthLayout } from '../../../components/layouts';
import { Button, CountrySelectInput, CustomDropdown, CustomInput, PhoneNumberInput, StateSelectInput, Stepper } from '../../../components/ui';
import { Link } from 'react-router-dom';
import { AuthProps } from './_model';
import uploadImg from '../../../assets/icons/uploadImg.svg';
import AuthService from '../../../services/auth.service';
import { toast } from 'react-toastify';
import { qualifications } from '../../../utils/constants';
import axios from 'axios';

interface KycProps extends AuthProps {
    setPreviousTab: () => void;
}

export default function PersonalInfoKYC({ props, setActiveTab, setPreviousTab  }: KycProps) {
  const authService = new AuthService();
  const ref: any = useRef(null);
  const [ selectedFile, setSelectedFile ] = useState<any>(null);
  const [ error, setError ] = useState(false);
  const [ doc, setDoc ] = useState(null);
  const [loading, setLoading] = useState(false);

  const { setFormData, formData } = props;


  const flexContainer = `w-full lg:flex grid gap-5 mb-[1rem]`;
  const gridContainer = `w-full grid gap-1`;
  const inputFieldStyle = `w-full bg-ryd-gray rounded-[16px] text-[14px] leading-[26px] font-[400] text-[#576877] px-[26px] py-[12px] outline-none active:outline-none`;
  const labelStyle = `text-ryd-subTextPrimary font-[400] text-[13px] leading-[26px]`;

  const handleFileUploadTrigger = () => {
    ref?.current?.click();
  }

  const handleFileSelect = (e: any) => {
    setSelectedFile(e.target.files[0]);
  }

  const handlePrevious = () => {
    setPreviousTab()
  }

  const handleSubmit = async(e: any) => {
        e.preventDefault();

        if(!selectedFile){
            setError(true);
            return;
        }else{
            setError(false);
            setLoading(true);

            const formData: any = new FormData();

            try {
                formData.append("file", selectedFile);
                formData.append("upload_preset", "ryd_learning");
                const res = await axios.post("https://api.cloudinary.com/v1_1/okafohenrie/image/upload", formData);
                setLoading(false);

                if(res?.statusText.toLowerCase() != 'ok') return;
                    
                setDoc(res?.data?.secure_url);

            }catch(err: any){
                setLoading(false);
                toast.error(err.message)
            }

        }
    }

    useEffect(() => {
        if(!doc){
            return;
        }
        setFormData({...formData, docUrl: doc });
        setActiveTab();

    }, [doc])


  return (
    <AuthLayout>
        <Stepper currentTab={2} />

        <form className='mt-[2rem]' onSubmit={handleSubmit}>
            {/* Qualification  */}
            <div className={flexContainer}>
                <div className={gridContainer}>
                    <label className={labelStyle}>Highest Level of Certification</label>
                    <CustomDropdown 
                        data={qualifications}
                        handleChange={(data: any) =>  setFormData({...formData, qualification: data.value })}
                        className={inputFieldStyle}
                    />
                </div>
            </div>

             {/* experience  */}
            <div className={flexContainer}>
                <div className={gridContainer}>
                    <label className={labelStyle}>Teaching Experience</label>
                    <CustomInput
                        type="number" 
                        placeholder='5'
                        pattern="[0-9]*"
                        required={true}
                        onChange={(e: any) => setFormData({...formData, experience: e.target.value })}
                    />
                </div>
            </div>


            {/* cv field  */}
            <div className={flexContainer}>
                <div className={gridContainer}>
                    <label className={labelStyle}>CV</label>
                    <div className='w-full rounded-[16px] border border-dotted border-ryd-primary lg:h-[200px] h-[200px] bg-ryd-primaryLess1/[.3]'>
                        {!selectedFile &&
                            <div className='w-fit m-auto lg:mt-[4.5rem] mt-[4.5rem] hover:cursor-pointer' onClick={handleFileUploadTrigger}>
                                <img src={uploadImg} alt="upload" className='mx-auto' />
                                <p className='text-ryd-primary text-[1p4x] font-[400] font-[AvertaStd-Semibold]'>Upload CV</p>
                            </div>
                        }

                        {selectedFile && 
                        <div className='w-full px-5 pt-5 flex items-start justify-between'>
                            <p className='text-[14px] font-[400]'>{selectedFile?.name}</p>
                            <p className='text-[25px] font-[400] hover:cursor-pointer' onClick={() => setSelectedFile(null)}>&times;</p>
                        </div> 
                        }
                    </div>
                    <input
                        type="file"
                        accept='.pdf, .docx, doc' 
                        className='hidden' 
                        ref={ref} 
                        onChange={handleFileSelect}
                    />
                { error && <small className='text-red-500'>This field is required</small>}
                </div>
            </div>


            <div className="grid lg:grid-cols-3 grid-cols-1 gap-3">
                <div className="col-span-1">
                    <Button 
                        text="Previous"
                        isInverted={true}
                        category='button'
                        handleClick={handlePrevious}
                        btnStyle='w-full rounded-[16px] mt-3 text-[12px] leading-[26px] font-[400] text-ryd-primary border border-ryd-primary px-[26px] py-[12px]'
                    />
                </div>
                <div className="lg:col-span-2 col-span-1">
                    <Button 
                        text={loading ? 'Processing...' : 'Continue'}
                        isInverted={false}
                        category='button'
                        type='submit'
                        btnStyle='w-full rounded-[16px] border-0 mt-3 text-[14px] leading-[26px] font-[400] text-white px-[26px] py-[12px]'
                    />
                </div>
            </div>


            <p className="text-[14px] font-[400] leading-[26px] text-center mt-[2rem]">
                <span className="text-ryd-subTextPrimary">Already have an account? </span><Link to='/teacher/sign-in' className="text-ryd-primary">Sign In</Link>
            </p>
        </form>
    </AuthLayout>
  )
}