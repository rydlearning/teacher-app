import React, { useEffect, useState } from 'react';
import { CustomInput, CustomModal, Empty } from '../../../components/ui';
import { formatDate, getDay, getTime, refetchTecherData } from '../../../components/custom-hooks';
import UserService from '../../../services/user.service';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import { setAttendance, setUserActivity } from '../../../redux/reducers/activitySlice';
import Moment from 'react-moment';
import moment from 'moment-timezone';
import 'moment-timezone';
import { formatDatee } from '../../../components/custom-hooks/formatDate';
import CustomDropdown2 from '../../../components/ui/CustomDropdown2';

interface Props {
    data: any[] | []
}

export default function Report({ data }: Props) {
    const userInfo: any = useSelector((state: RootState) => state.auth.userInfo);
    const { userActivity, attendance } = useSelector((state: RootState) => state.activity)
    const userService = new UserService();
    const dispatch = useDispatch();

    const [toggleModal, setToggleModal] = useState(false);
    const [mediaUrl, setMediaUrl] = useState('');
    const [assessmentUrl, setAssessmentUrl] = useState('');
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [selectedId, setSelectedId] = useState(0);
    const [assessmentScore, setAssessmentScore] = useState(0);
    const [mediaSubmitLoading, setMediaSubmitLoading] = useState(false);
    const [assessmentSubmitLoading, setAssessmentSubmitLoading] = useState(false);
    const [absentLoading, setAbsentLoading] = useState(false);
    const [presentLoading, setPresentLoading] = useState(false);
    const [isMarked, setIsMarked] = useState(false);
    const [studentAttendance, setStudentAttendance] = useState<any>([])
    const [programs, setPrograms] = useState<any>([])
    const [toggleReportModal, setToggleReportModal] = useState(false);
    const [viewReportMode, setViewReportMode] = useState(false);
    const [editReportMode, setEditReportMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState<any>(null);

    const [reportCard, setReportCard] = useState({
        progressNotes: '',
        areasForImprovement: '',
        supportSuggestions: '',
        cohortCompleted: true,
        additionalComments: '',
        name: ''
    });

    const handleReportCardSubmit = async (e: any) => {
        e.preventDefault();
        try {
            let response;
            if (editReportMode) {
                response = await userService.updateReport(report.id, {
                    childId: selectedStudent.childId,
                    programId: selectedStudent.id,
                    parentId: selectedStudent.child.parentId,
                    ...reportCard
                });
            } else {
                response = await userService.createReport({
                    childId: selectedStudent.childId,
                    programId: selectedStudent.id,
                    parentId: selectedStudent.child.parentId,
                    ...reportCard
                });
            }

            if (!response.status) {
                toast.error(response.message);
                return;
            }

            toast.success(`Report card ${editReportMode ? 'updated' : 'submitted'} successfully!`);
            setToggleReportModal(false);
            setEditReportMode(false);
            fetchTeacherPrograms(selectedId);
        } catch (err: any) {
            toast.error(err?.message);
        }
    };

    const fetchReport = async (id: any) => {
        setLoading(true);
        try {
            const response = await userService.getSingleReport(id);
            setLoading(false);

            if (!response.status) {
                toast.error(response.message);
                return;
            }
            setReport(response?.data);

            // Set the report card data for editing
            setReportCard({
                progressNotes: response?.data?.progressNotes || '',
                areasForImprovement: response?.data?.areasForImprovement || '',
                supportSuggestions: response?.data?.supportSuggestions || '',
                cohortCompleted: response?.data?.cohortCompleted || true,
                additionalComments: response?.data?.additionalComments || '',
                name: response?.data?.name || selectedStudent?.package?.name || ''
            });
        } catch (err: any) {
            setLoading(false);
            toast.error(err?.message);
            return;
        }
    }

    const fetchTeacherPrograms = async (id: any) => {
        setLoading(true);
        try {
            const response = await userService.getTeacherPrograms(id);
            setLoading(false);

            if (!response.status) {
                toast.error(response.message);
                return;
            }
            setPrograms(response?.data);
        } catch (err: any) {
            setLoading(false);
            toast.error(err?.message);
            return;
        }
    }

    useEffect(() => {
        if (selectedStudent?.package?.name && !reportCard.name) {
            setReportCard(prev => ({ ...prev, name: selectedStudent.package.name }));
        }
    }, [selectedStudent]);

    const tableHeader = 'text-[17px] font-[400] leading-[26px] font-[AvertaStd-Semibold] text-ryd-headerTextPrimary';
    const tableBody = 'text-[16px] font-[400] font-[AvertaStd-Light]  leading-[26px] text-[#616161]';
    const attendanceBtnStyle = 'rounded-[7px] bg-blue-400 py-1 px-2 text-white text-[11px] border-0';
    const btnStyle = 'bg-ryd-primary text-white border-y border-y-ryd-primary px-7 rounded-[500px] py-3';
    const labelStyle = 'text-[14px] tracking-wide';
    const btnAttStyle = 'w-full py-2.5 text-[15px] text-white rounded-[24px]';
    const inputFieldStyle = `w-44 bg-ryd-gray rounded-[1000px] text-[14px] leading-[26px] font-[400] text-[#576877] px-[26px] py-[10px] outline-none active:outline-none`;

    const handleProgramFerch = (data: any) => {
        fetchTeacherPrograms(data.id);
        setSelectedId(data.id)
    }

    const handleEditReport = () => {
        setViewReportMode(false);
        setEditReportMode(true);
    };

    const isEditDisabled = (createdAt: string) => {
        const reportDate = new Date(createdAt);
        const currentDate = new Date();
        const diffInHours = (currentDate.getTime() - reportDate.getTime()) / (1000 * 60 * 60);
        return diffInHours > 24;
    };

    return (
        <div className="">
            <div className="my-5">
                <small>Select cohort*</small>
                <CustomDropdown2
                    data={data}
                    handleChange={handleProgramFerch}
                    className={inputFieldStyle}
                />
            </div>
            <div className={`mt-[3rem] ${programs?.length > 0 ? 'border-x border-x-[#F7F7F7] border-b border-b-[#F7F7F7]' : 'border-0'} lg:w-full w-[700px] overflow-x-auto`}>
                {programs?.length > 0 ?
                    <>
                        <ul>
                            <li className='w-full flex items-center p-3 rounded-t-[10px] bg-[#F7F7F7]'>
                                <p className={`${tableHeader} w-[20%]`}>Name</p>
                                <p className={`${tableHeader} w-[10%]`}>Gender</p>
                                <p className={`${tableHeader} w-[15%] text-center`}>Program</p>
                                <p className={`${tableHeader} w-[10%]`}>Level</p>
                                <p className={`${tableHeader} w-[10%]`}>Day</p>
                                <p className={`${tableHeader} w-[15%]`}>Class Time</p>
                                <p className={`${tableHeader} w-[25%] text-center`}>Actions</p>
                            </li>
                        </ul>

                        <ol>
                            {programs?.map((item: any, index: number) => {
                                const pTime = moment().utc(false).utcOffset(item?.child?.parent?.timeOffset)
                                pTime.day(item?.day)
                                pTime.hour(item?.time)
                                pTime.second(0)
                                pTime.minute(0)

                                return (
                                    <li key={item?.id} className={`w-full flex items-center p-3 ${index % 2 !== 0 ? 'bg-[#F7F7F7]' : 'bg-white'}`}>
                                        <p className={`${tableBody} w-[20%] capitalize`}>{item?.child?.firstName} {item?.child?.lastName}</p>
                                        <p className={`${tableBody} w-[10%] capitalize`}>{item?.child?.gender}</p>
                                        <p className={`${tableBody} w-[15%] text-center`}>{item?.package?.title.replace(/Program/g, '')}</p>
                                        <p className={`${tableBody} w-[10%]`}>{item?.level}</p>
                                        <p className={`${tableBody} w-[10%]`}>{getDay(item?.day)}</p>
                                        <p className={`${tableBody} w-[15%]`}>
                                            <Moment format='hh:mm A' date={pTime.toISOString()} tz={userInfo?.timezone}></Moment>
                                        </p>
                                        <p className={`${tableBody} w-[25%] text-center flex gap-2 justify-center`}>
                                            {item.reportCreated ? (
                                                <button
                                                    className={`${attendanceBtnStyle} bg-purple-600`}
                                                    onClick={() => {
                                                        setToggleReportModal(true);
                                                        fetchReport(item.reportId);
                                                        setSelectedStudent(item);
                                                        setViewReportMode(true);
                                                        setEditReportMode(false);
                                                    }}
                                                >
                                                    View Report
                                                </button>
                                            ) : (
                                                <button
                                                    className={`${attendanceBtnStyle} bg-green-600`}
                                                    onClick={() => {
                                                        setToggleReportModal(true);
                                                        setSelectedStudent(item);
                                                        setViewReportMode(false);
                                                        setEditReportMode(false);
                                                    }}
                                                >
                                                    Create Report
                                                </button>
                                            )}
                                        </p>
                                    </li>
                                )
                            })}
                        </ol>
                    </> : <Empty text="You have no student records" />
                }

                {toggleReportModal && (
                    <CustomModal
                        modalStyle="relative bg-white lg:w-[45%] md:w-[70%] w-[95%] mx-auto rounded-[16px] lg:mt-[2rem] mt-[3rem] lg:h-fit h-[80vh] max-h-[90vh] overflow-y-auto"
                        closeModal={() => {
                            setToggleReportModal(false);
                            setViewReportMode(false);
                            setEditReportMode(false);
                        }}
                    >
                        <div className='p-[2rem]'>
                            <h2 className='text-[20px] font-[AvertaStd-Semibold] text-center leading-[36px] text-ryd-headerTextPrimary'>
                                {viewReportMode && !editReportMode ? 'Student Report' :
                                    editReportMode ? 'Edit Report' : 'End of Cohort Report'} for <span className='text-ryd-primary capitalize'>{selectedStudent?.child?.firstName} {selectedStudent?.child?.lastName}</span>
                            </h2>

                            {viewReportMode && !editReportMode ? (
                                // View Report Mode
                                <>
                                    {report && (<div className="mt-6 space-y-6">
                                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                            <div className="grid grid-cols-2 gap-4 mb-6">
                                                <div>
                                                    <p className="text-sm text-gray-500">Student Name</p>
                                                    <p className="font-medium">{selectedStudent?.child?.firstName} {selectedStudent?.child?.lastName}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Level</p>
                                                    <p className="font-medium">{report?.program?.package?.title}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Course</p>
                                                    <p className="font-medium">{report?.name}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Date</p>
                                                    <p className="font-medium">
                                                        {formatDatee(report?.createdAt)}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                                                        <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                                                        Progress Summary
                                                    </h3>
                                                    <div className="bg-blue-50 p-4 rounded-lg">
                                                        <p className="text-gray-700 whitespace-pre-line">
                                                            {report?.progressNotes}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                                                        <span className="w-3 h-3 bg-amber-500 rounded-full mr-2"></span>
                                                        Areas for Improvement
                                                    </h3>
                                                    <div className="bg-amber-50 p-4 rounded-lg">
                                                        <p className="text-gray-700 whitespace-pre-line">
                                                            {report?.areasForImprovement}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                                                        <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                                                        Parent Support Suggestions
                                                    </h3>
                                                    <div className="bg-green-50 p-4 rounded-lg">
                                                        <p className="text-gray-700 whitespace-pre-line">
                                                            {report?.supportSuggestions}
                                                        </p>
                                                    </div>
                                                </div>

                                                {report?.additionalComments && (
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                                                            <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                                                            Additional Comments
                                                        </h3>
                                                        <div className="bg-purple-50 p-4 rounded-lg">
                                                            <p className="text-gray-700 whitespace-pre-line">
                                                                {report?.additionalComments}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                                                    <span className="text-sm text-gray-500">Cohort Completion:</span>
                                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${report?.cohortCompleted
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                        }`}>
                                                        {report?.cohortCompleted ? 'Completed' : 'Not Completed'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            (isEditDisabled(report?.createdAt) || report?.viewedByParent) ? null :
                                                <div className="flex justify-center">
                                                    <button
                                                        onClick={handleEditReport}
                                                        className="bg-ryd-primary text-white py-2 px-6 rounded-[24px] text-[16px] font-medium"
                                                    >
                                                        Edit Report
                                                    </button>
                                                </div>
                                        }
                                    </div>)}
                                </>
                            ) : (
                                <form onSubmit={handleReportCardSubmit} className='w-full mt-6'>
                                    <div className='grid gap-4'>
                                        <div className='grid grid-cols-2 gap-4'>
                                            <div>
                                                <label className={labelStyle}>Student's Name</label>
                                                <CustomInput
                                                    value={`${selectedStudent.child?.firstName} ${selectedStudent.child?.lastName}`}
                                                    disabled={true}
                                                />
                                            </div>

                                            <div>
                                                <label className={labelStyle}>Course</label>
                                                <CustomInput
                                                    value={selectedStudent.package?.title.replace(/Program/g, '')}
                                                    disabled
                                                />
                                            </div>
                                        </div>

                                        <div className='grid grid-cols-2 gap-4'>
                                            <div>
                                                <label className={labelStyle}>Level</label>
                                                <CustomInput
                                                    value={selectedStudent.level}
                                                    disabled
                                                />
                                            </div>

                                            <div>
                                                <label className={labelStyle}>Date</label>
                                                <CustomInput
                                                    value={new Date().toLocaleDateString()}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Name</label>
                                            <input
                                                className='w-full bg-ryd-gray rounded-[16px] text-[14px] p-4'
                                                placeholder='What did the student accomplish? (e.g., Completed Code Combat levels, Created a simple game)'
                                                value={reportCard.name}
                                                onChange={(e) => setReportCard({ ...reportCard, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Progress</label>
                                            <textarea
                                                className='w-full bg-ryd-gray rounded-[16px] text-[14px] p-4 min-h-[100px]'
                                                placeholder='What did the student accomplish? (e.g., Completed Code Combat levels, Created a simple game)'
                                                value={reportCard.progressNotes}
                                                onChange={(e) => setReportCard({ ...reportCard, progressNotes: e.target.value })}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className={labelStyle}>Areas for Improvement</label>
                                            <textarea
                                                className='w-full bg-ryd-gray rounded-[16px] text-[14px] p-4 min-h-[80px]'
                                                placeholder='What areas need more work? (e.g., Understanding game logic, Debugging code)'
                                                value={reportCard.areasForImprovement}
                                                onChange={(e) => setReportCard({ ...reportCard, areasForImprovement: e.target.value })}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className={labelStyle}>How Parents Can Support</label>
                                            <textarea
                                                className='w-full bg-ryd-gray rounded-[16px] text-[14px] p-4 min-h-[80px]'
                                                placeholder='Suggestions for parents (e.g., Encourage practice, Ask about projects)'
                                                value={reportCard.supportSuggestions}
                                                onChange={(e) => setReportCard({ ...reportCard, supportSuggestions: e.target.value })}
                                            />
                                        </div>

                                        <div>
                                            <label className={labelStyle}>Additional Comments</label>
                                            <textarea
                                                className='w-full bg-ryd-gray rounded-[16px] text-[14px] p-4 min-h-[80px]'
                                                placeholder='Any other observations about the student'
                                                value={reportCard.additionalComments}
                                                onChange={(e) => setReportCard({ ...reportCard, additionalComments: e.target.value })}
                                            />
                                        </div>

                                        <div className='flex items-center gap-4 mt-2'>
                                            <label className={`${labelStyle} font-semibold`}>Did the child complete the Cohort?</label>
                                            <div className='flex gap-4'>
                                                <label className='flex items-center gap-2'>
                                                    <input
                                                        type="radio"
                                                        name="completionStatus"
                                                        checked={reportCard.cohortCompleted}
                                                        onChange={() => setReportCard({ ...reportCard, cohortCompleted: true })}
                                                        required
                                                    />
                                                    Yes
                                                </label>
                                                <label className='flex items-center gap-2'>
                                                    <input
                                                        type="radio"
                                                        name="completionStatus"
                                                        checked={!reportCard.cohortCompleted}
                                                        onChange={() => setReportCard({ ...reportCard, cohortCompleted: false })}
                                                    />
                                                    No
                                                </label>
                                            </div>
                                        </div>

                                        <button
                                            type='submit'
                                            className='bg-ryd-primary text-white py-3 px-6 rounded-[24px] mt-6 text-[16px] font-medium'
                                        >
                                            {editReportMode ? 'Update Report Card' : 'Submit Report Card'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </CustomModal>
                )}
            </div>
        </div>
    )
}