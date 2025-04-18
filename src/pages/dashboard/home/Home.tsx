import React, { useEffect, useState } from 'react'
import { AppLayout } from '../../../components/layouts';
import { Empty } from '../../../components/ui';
import SectionOne from './SectionOne';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import UserService from '../../../services/user.service';
import { toast } from 'react-toastify';
import { setUserActivity } from '../../../redux/reducers/activitySlice';
import { getDay, getTime, isToday } from '../../../components/custom-hooks';
import { Link } from 'react-router-dom';
import moment from "moment-timezone";
import Moment from "react-moment";

export interface ChildRegProps {
    firstName: string,
    lastName: string,
    dob: Date,
    gender: string,
    days: string,
    time: string
}

const initialValues = {
    firstName: '',
    lastName: '',
    dob: new Date(),
    gender: 'male',
    days: '',
    time: ''
}


export default function Home() {
    const userInfo: any = useSelector((state: RootState) => state.auth.userInfo);
    const userService = new UserService();
    const dispatch = useDispatch();

    const [ formData, setFormData ] = useState(initialValues);
    const [ data, setData ] = useState<any>(null);
    const [ todayClasses, setTodayClasses ] = useState<any>(null);
    const [ totalStudents, setTotalStudents ] = useState<any>([]);
    const [ activeStudents, setActiveStudents ] = useState<any>([]);
    const [ loading, setLoading ] = useState(false);


    useEffect(() => {
        getActivity();
    }, []);


    const getActivity = async() => {
        setLoading(true);
        try {
            const response = await userService.getActivity();
            setLoading(false);

            if(!response.status){
                toast.error(response.message);
                //return;
            }
            dispatch(setUserActivity(response?.data))
            setData(response?.data);
            // const tdx = getTodayDays(response?.data);
            // setTodayClasses(tdx);

            // total students
            setTotalStudents(response?.data?.programs)
            // get active students
            const active = response?.data?.programs?.filter((item: any) => item?.child?.status === true);
            setActiveStudents(active);
            // classes for today
            const classesForToday = response?.data?.programs?.filter((item: any) => isToday(item?.day));
            setTodayClasses(classesForToday);
        }catch(err: any){
            setLoading(false);
            toast.error(err?.message);
            return;
        }
    }


    const h1Style = 'lg:text-[30px] text-[24px] font-[AvertaStd-Semibold] capitalize font-[400] leading-[46px] text-ryd-headerTextPrimary';
    const h2Style = 'lg:text-[24px] text-[18px] font-[AvertaStd-Semibold] font-[400] leading-[33px] text-ryd-headerTextPrimary';
    const tableHeader = 'text-[17px] font-[400] leading-[26px] font-[AvertaStd-Semibold] text-ryd-headerTextPrimary';
    const tableBody = 'text-[16px] font-[400] font-[AvertaStd-Light]  leading-[26px] text-[#616161]';

    const props = { formData, setFormData };

    return (
        <AppLayout>
            <h1 className={h1Style}>Hello, {userInfo?.firstName} ☀️</h1>
            <SectionOne
                todayClasses={todayClasses}
                totalStudents={totalStudents}
                activeStudents={activeStudents}
            />
            <section>
                <div className="w-full flex flex-wrap items-end justify-between mt-[4rem]">
                    <h2 className={h2Style}>Students</h2>
                    <Link
                        to={data?.classLink}
                        target='_blank'
                        referrerPolicy='no-referrer'
                        className="w-fit rounded-[7px] border-0 mt-6 lg:text-[16px] text-[14px] leading-[26px] font-[400] bg-ryd-primary text-white lg:px-[32px] px-[25px] lg:py-[13px] py-[10px] hover:cursor-pointer"
                        >
                        My Class
                    </Link>
                </div>

               <>
               {!loading ?
               <div>{todayClasses?.length > 0 ?
                        <div className='mt-[3rem] border-x border-x-[#F7F7F7] border-b border-b-[#F7F7F7] lg:w-full w-[700px] overflow-x-auto'>
                            <ul>
                                <li className='w-full flex items-center p-3 rounded-t-[10px] bg-[#F7F7F7]'>
                                    <p className={`${tableHeader} w-[20%]`}>Name</p>
                                    <p className={`${tableHeader} w-[15%] `}>Gender</p>
                                    <p className={`${tableHeader} w-[20%]`}>Program</p>
                                    <p className={`${tableHeader} w-[15%] text-center`}>Level</p>
                                    <p className={`${tableHeader} w-[15%] text-center`}>Day of class</p>
                                    <p className={`${tableHeader} w-[15%] text-center`}>Time of class</p>
                                </li>
                            </ul>
                            <ol>
                                {todayClasses?.map((item: any, index: number) => {
                                    const pTime = moment().utc(false).utcOffset(item?.child?.parent?.timeOffset)
                                    pTime.day(item?.day)
                                    pTime.hour(item?.time)
                                    pTime.second(0)
                                    pTime.minute(0)
                                    //convert to teacher time
                                    return (<li key={index} className={`w-full flex items-center p-3 ${index % 2 !== 0 ? 'bg-[#F7F7F7]' : 'bg-white'}`}>
                                        <p className={`${tableBody} w-[20%] capitalize`}>{item?.child?.firstName} {item?.child?.lastName}</p>
                                        <p className={`${tableBody} w-[15%] capitalize`}>{item?.child?.gender}</p>
                                        <p className={`${tableBody} w-[20%]`}>{item?.package?.title?.replace(/Program/g, '')}</p>
                                        <p className={`${tableBody} w-[15%] text-center`}>{item?.level}</p>
                                        <p className={`${tableBody} w-[15%] text-center`}>{getDay(item?.day)}</p>
                                        <p className={`${tableBody} w-[15%] text-center`}><Moment format='hh:mm A' date={pTime.toISOString()} tz={userInfo.timezone}></Moment></p>
                                    </li>
                                )})}
                            </ol>
                        </div>
                        :
                        <Empty text="You have no class for today." />
                    }
                </div> :
                <div className='w-fit h-fit mx-auto text-[18px] mt-[5rem]'>Loading data...</div>
                }
               </>


            </section>
        </AppLayout>
    )
}
