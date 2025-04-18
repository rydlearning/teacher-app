import React, { useEffect, useState } from 'react';
import { CustomDropdown, CustomModal, Empty } from '../../../components/ui';
import { useDispatch, useSelector } from 'react-redux';
import { getDay, getTime, refetchTecherData } from '../../../components/custom-hooks';
import { toast } from 'react-toastify';
import UserService from '../../../services/user.service';
import { setUserActivity } from '../../../redux/reducers/activitySlice';
import Moment from "react-moment";
import moment from "moment";
import { RootState } from '../../../redux/rootReducer';

interface Props {
    data: any[] | [],
}

export default function SwapTable({ data }: Props) {
    const userInfo: any = useSelector((state: RootState) => state.auth.userInfo);
    const userService = new UserService();
    const dispatch = useDispatch();


    const [teachersArr, setTeachersArr] = useState<any>([]);
    const [ toggleModal, setToggleModal ] = useState(false);
    const [ selectedStudent, setSelectedStudent ] = useState<any>(null);
    const [ reason, setReason ] = useState('');
    const [ teacher, setTeacher ] = useState<any>({});
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        getTeachers();
    }, []);

    const getTeachers = async() => {
        try{
            const response = await userService.getTeachers();
            if(!response.status){
                // toast.error(response.message);
                return;
            }
            // set single teacher initial data
            let s_name = `${response.data[0].firstName} ${response.data[0].lastName}`;
            setTeacher({name: s_name, value: response.data[0].id})

            // set teachers array
            let arr = []
            for(let i=0; i<response.data.length; i++){
                let name = `${response.data[i].firstName} ${response.data[i].lastName}`;
                let value = response.data[i].id;
                arr.push({name, value })
            }
            setTeachersArr(arr)
        }catch(err: any){
            // toast.error(err?.message);
            return;
        }
    }


    const handleTutorChange = (data: any) => {
        setTeacher(data);
    }

    const handleSubmit = async(e: any) => {
        e.preventDefault();
        const payload = { programId: selectedStudent.id, toTeacherId: teacher.value, body: reason }

        setLoading(true);
        try{
            const response = await userService.swapProgram(payload);
            if(!response.status){
                toast.error(response.message);
                return;
            }
            toast.success(response.message);
            setToggleModal(false);

            const res = await refetchTecherData();
            if(!res){
                return
            }
            dispatch(setUserActivity(res))
        }catch(err: any){
            setLoading(false);
            toast.error(err.message);
            return;
        }
    }


    const tableHeader = 'text-[17px] font-[400] leading-[26px] font-[AvertaStd-Semibold] text-ryd-headerTextPrimary';
    const tableBody = 'text-[16px] font-[400] font-[AvertaStd-Light]  leading-[26px] text-[#616161]';
    const attendanceBtnStyle = 'rounded-[7px] bg-ryd-primary py-1 px-2 text-white text-[11px] border-0';
    const inputFieldStyle = `w-full bg-ryd-gray rounded-[1000px] text-[14px] leading-[26px] font-[400] text-[#576877] px-[26px] py-[10px] outline-none active:outline-none`;
    const h1Style = 'lg:text-[22px] text-[20px] font-[400]  font-[AvertaStd-Semibold] text-center capitalize'

    return (
        <div className={`mt-[3rem] ${data?.length > 0 ? 'border-x border-x-[#F7F7F7] border-b border-b-[#F7F7F7]' : 'border-0'} lg:w-full w-[700px] overflow-x-auto`}>
            {data?.length > 0 ?
            <>
                <ul>
                    <li className='w-full flex items-center p-3 rounded-t-[10px] bg-[#F7F7F7]'>
                        <p className={`${tableHeader} w-[20%]`}>Name</p>
                        <p className={`${tableHeader} w-[15%]`}>Program</p>
                        <p className={`${tableHeader} w-[15%]`}>Gender</p>
                        <p className={`${tableHeader} w-[10%]`}>Level</p>
                        <p className={`${tableHeader} w-[15%]`}>Class Time</p>
                        <p className={`${tableHeader} w-[10%]`}>Day</p>
                        <p className={`${tableHeader} w-[15%] text-center`}>Actions</p>
                    </li>
                </ul>
                <ol>
                    {data?.map((item: any, index: number) => {
                        const pTime = moment().utc(false).utcOffset(item?.child?.parent?.timeOffset)
                        pTime.day(item.day)
                        pTime.hour(item.time)
                        pTime.second(0)
                        pTime.minute(0)
                        return(
                            <li key={index} className={`w-full flex items-center p-3 ${index % 2 !== 0 ? 'bg-[#F7F7F7]' : 'bg-white'}`}>
                                <p className={`${tableBody} w-[20%] capitalize`}>{item?.child?.firstName} {item?.child?.lastName}</p>
                                <p className={`${tableBody} w-[15%]`}>{item?.package?.title.replace(/Program/g, '')}</p>
                                <p className={`${tableBody} w-[15%] capitalize`}>{item?.child?.gender}</p>
                                <p className={`${tableBody} w-[10%]`}>{item?.level}</p>
                                <p className={`${tableBody} w-[15%]`}>
                                    <Moment format='hh:mm A' date={pTime.toISOString()} tz={userInfo.timezone}></Moment>
                                </p>
                                <p className={`${tableBody} w-[10%]`}>{getDay(item?.day)}</p>
                                <p className={`${tableBody} w-[15%] text-center`}>
                                    <button
                                        className={attendanceBtnStyle}
                                        onClick={() => {
                                            setToggleModal(true)
                                            setSelectedStudent(item)
                                        }}>
                                            Swap request
                                    </button>
                                </p>
                            </li>
                    )})}
                </ol>
            </> :
            <Empty text='You have no student records' />
            }

            {toggleModal &&
                <CustomModal
                modalStyle="relative bg-white lg:w-[30%] md:w-[70%] w-[95%] mx-auto rounded-[16px] lg:mt-[7rem] mt-[3rem]"
                closeModal={() => setToggleModal(false)}
                >
                    <form onSubmit={handleSubmit} className='p-[2rem]'>
                        <h1 className={h1Style}>Swap Request</h1>
                        <p className='text-[16px] font-[400] font-[AvertaStd-Light] mt-3'>Do you wish to swap your student: <span className='font-[AvertaStd-Semibold] capitalize'>{selectedStudent.child.firstName} {selectedStudent.child.lastName}</span>?</p>

                        <div className='w-full lg:flex grid items-center mt-3.5 gap-3'>
                            <p className='text-[16px] font-[400] font-[AvertaStd-Light]'>With tutor:</p>
                            <div className='lg:w-[60%]'>
                                <CustomDropdown
                                    className={inputFieldStyle}
                                    data={teachersArr}
                                    handleChange={handleTutorChange}
                                />
                            </div>
                        </div>

                        <div className='mt-3.5'>
                            <label className='text-[14px]'>Reason</label>
                            <textarea
                                rows={4}
                                onChange={(e: any) => setReason(e.target.value)}
                                required
                                className={`w-full rounded-[8px] border resize-none outline-0 p-[.7rem] text-[14px]`}>
                                    {reason}
                                </textarea>
                        </div>

                        <div className='w-full  lg:flex grid gap-3  mt-5'>
                            <button
                                onClick={() => setToggleModal(false)}
                                className='w-full py-2.5 text-center rounded-[16px] border border-ryd-primary text-ryd-primary bg-white'>
                                    Cancel
                                </button>
                            <button
                                type='submit'
                                className='w-full py-2.5 text-center rounded-[16px] bg-ryd-primary text-white'>
                                    {loading ? 'Processing...' :'Proceed'}
                            </button>
                        </div>
                    </form>
                </CustomModal>
            }
        </div>
    )
}
