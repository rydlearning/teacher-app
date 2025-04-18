import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Empty } from '../../../components/ui';
import { formatDate, getDay, getTime } from '../../../components/custom-hooks';
import Moment from "react-moment";
import moment from "moment";
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';

interface Props {
    data: any[] | []
}

export default function ScheduleTable({ data }: Props) {
    const userInfo: any = useSelector((state: RootState) => state.auth.userInfo);
    const [ toggleModal, setToggleModal ] = useState(false);

    console.log('schedule', data)

    const tableHeader = 'text-[17px] font-[400] leading-[26px] font-[AvertaStd-Semibold] text-ryd-headerTextPrimary';
    const tableBody = 'text-[16px] font-[400] font-[AvertaStd-Light]  leading-[26px] text-[#616161]';
    const attendanceBtnStyle = 'rounded-[7px] bg-green-600 py-2.5 px-2.5 text-white text-[11px] border-0';

    return (
        <div className={`mt-[3rem] ${data?.length > 0 ? 'border-x border-x-[#F7F7F7] border-b border-b-[#F7F7F7]' : 'border-0'} lg:w-full w-[700px] overflow-x-auto`}>
            { data?.length > 0 ?
                <>
                    <ul>
                        <li className='w-full flex items-center p-3 rounded-t-[10px] bg-[#F7F7F7]'>
                            <p className={`${tableHeader} w-[20%]`}>Name</p>
                            <p className={`${tableHeader} w-[15%]`}>Program</p>
                            <p className={`${tableHeader} w-[10%]`}>Level</p>
                            <p className={`${tableHeader} w-[15%]`}>Class Time</p>
                            <p className={`${tableHeader} w-[10%]`}>Day</p>
                            <p className={`${tableHeader} w-[15%]`}>Next class</p>
                            <p className={`${tableHeader} w-[15%] text-center`}>Action</p>
                        </li>
                    </ul>
                    <ol>
                    {data?.map((item: any, index: number) => {
                        const pTime = moment().utc(false).utcOffset(item?.child?.parent?.timeOffset)
                        pTime.day(item.day)
                        pTime.hour(item.time)
                        pTime.second(0)
                        pTime.minute(0)

                        const nextWeekTime = pTime;
                        nextWeekTime.week(moment().week()+1);
                        const nDay = getDay(item?.day);

                        return(
                            <li key={index} className={`w-full flex items-center p-3 ${index % 2 !== 0 ? 'bg-[#F7F7F7]' : 'bg-white'}`}>
                                <p className={`${tableBody} w-[20%] capitalize`}>{item?.child?.firstName} {item?.child?.lastName}</p>
                                {/* <p className={`${tableBody} w-[15%]`}>{item.class}</p> */}
                                <p className={`${tableBody} w-[15%]`}>{item?.package?.title.replace(/Program/g, '')}</p>
                                <p className={`${tableBody} w-[10%]`}>{item?.level}</p>
                                <p className={`${tableBody} w-[15%]`}>
                                    <Moment format='hh:mm A' date={pTime.toISOString()} tz={userInfo.timezone}></Moment>
                                </p>
                                <p className={`${tableBody} w-[10%]`}>{nDay}</p>

                                <p className={`${tableBody} w-[15%]`}>
                                    <Moment
                                        format='D MMM YYYY'
                                        date={pTime.toISOString()} tz={userInfo.timezone}>{nextWeekTime}</Moment>
                                </p>
                                <p className={`${tableBody} w-[15%] text-center`}>
                                    <Link
                                        to={userInfo?.classLink}
                                        target='_blank'
                                        referrerPolicy='no-referrer'
                                        className={attendanceBtnStyle}
                                        onClick={() => setToggleModal(true)}>Go to class</Link>
                                </p>
                            </li>
                        )})}
                    </ol>
                </> :
                <Empty text='You have no student records' />

            }

        </div>
    )
}
