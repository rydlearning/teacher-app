import React, { useEffect, useState } from "react";
import { CustomInput, CustomModal, Empty } from "../../../components/ui";
import {
  formatDate,
  getDay,
  getTime,
  refetchTecherData,
} from "../../../components/custom-hooks";
import UserService from "../../../services/user.service";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import {
  setAttendance,
  setUserActivity,
} from "../../../redux/reducers/activitySlice";
import Moment from "react-moment";
import moment from "moment-timezone";
import "moment-timezone";

interface Props {
  data: any[] | [];
}

export default function PromoProgramTable({ data }: Props) {
  const userInfo: any = useSelector((state: RootState) => state.auth.userInfo);
  const { userActivity, attendance } = useSelector(
    (state: RootState) => state.activity
  );
  const userService = new UserService();
  const dispatch = useDispatch();

  const [toggleModal, setToggleModal] = useState(false);
  const [mediaUrl, setMediaUrl] = useState("");
  const [assessmentUrl, setAssessmentUrl] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [assessmentScore, setAssessmentScore] = useState(0);
  const [mediaSubmitLoading, setMediaSubmitLoading] = useState(false);
  const [assessmentSubmitLoading, setAssessmentSubmitLoading] = useState(false);
  const [absentLoading, setAbsentLoading] = useState(false);
  const [presentLoading, setPresentLoading] = useState(false);
  const [isMarked, setIsMarked] = useState(false);
  const [multiIDs, setMultiIDs] = useState<any>([]);
  const [studentAttendance, setStudentAttendance] = useState<any>([]);

  const handleMediaUrlSubmit = async (e: any) => {
    e.preventDefault();
    setMediaSubmitLoading(true);
    try {
      const response = await userService.submitMediaAssessmentUrl(
        { mediaUrl },
        selectedStudent.id
      );
      setMediaSubmitLoading(false);
      if (!response.status) {
        toast.error(response.message);
        return;
      }
      toast.success(response.message);
    } catch (err: any) {
      setMediaSubmitLoading(false);
      toast.error(err?.message);
      return;
    }
  };

  const handleAssessmentUrlSubmit = async (e: any) => {
    e.preventDefault();
    setAssessmentSubmitLoading(true);
    try {
      const response = await userService.submitMediaAssessmentUrl(
        { assessmentUrl },
        selectedStudent.id
      );
      setAssessmentSubmitLoading(false);
      if (!response.status) {
        toast.error(response.message);
        return;
      }
      toast.success(response.message);
    } catch (err: any) {
      setAssessmentSubmitLoading(false);
      toast.error(err?.message);
      return;
    }
  };

  const handleMarkAbsent = async (e: any) => {
    e.preventDefault();
    setAbsentLoading(true);
    setIsMarked(!isMarked);
    try {
      const response = await userService.submitAttendance({
        score: assessmentScore,
        status: false,
        programId: selectedStudent.id,
      });
      setAbsentLoading(false);
      if (!response.status) {
        toast.error(response.message);
        return;
      }
      toast.success(response.message);
      // refetch user data
      const res = await refetchTecherData();
      if (!res) {
        return;
      } else {
        dispatch(setUserActivity(res));
      }
      setIsMarked(!isMarked);
    } catch (err: any) {
      setAbsentLoading(false);
      toast.error(err?.message);
      return;
    }
  };

  const handleMarkPresent = async (e: any) => {
    e.preventDefault();
    setPresentLoading(true);

    try {
      const response = await userService.submitAttendance({
        score: assessmentScore,
        status: true,
        programId: selectedStudent.id,
      });
      setPresentLoading(false);
      if (!response.status) {
        toast.error(response.message);
        return;
      }
      toast.success(response.message);
      // refetch user data
      const res = await refetchTecherData();
      if (!res) {
        return;
      } else {
        dispatch(setUserActivity(res));
        const ctxStudent = res.programs?.filter(
          (item: any) => item.id === selectedStudent?.id
        );
        dispatch(setAttendance(ctxStudent));
        setStudentAttendance(ctxStudent);
      }
      setIsMarked(!isMarked);
    } catch (err: any) {
      setPresentLoading(false);
      toast.error(err?.message);
      return;
    }
  };

  const sortAttendance = (data: any) => {
    const ctxStudent = userActivity?.programs?.filter(
      (item: any) => item.id === data?.id
    );
    setStudentAttendance(ctxStudent);
    dispatch(setAttendance(ctxStudent));
  };

  useEffect(() => {
    const currentStdnt = userActivity?.programs?.filter(
      (item: any) => item?.id === selectedStudent?.id
    );
    setStudentAttendance(currentStdnt);
    dispatch(setAttendance(currentStdnt));
  }, [isMarked]);

  const formatData = (data: any) => {
    const parsed = Array.isArray(data) ? data : JSON.parse(data);
    return parsed;
  };

  type TimeSlot = {
    dayText: string;
    timeText: string;
  };

  const FormatTimeAndDate = (data: any, i: number): string => {
    const parsedTimeSlots: TimeSlot[][] = formatData(data);

    if (parsedTimeSlots[i]) {
      return parsedTimeSlots[i]
        .map(({ dayText, timeText }) => `${dayText} ${timeText}`)
        .join(" - ");
    }

    return "";
  };

  const completeAndUncompleteProgram = async (status: boolean) => {
    const data = { ids: multiIDs, status };

    try {
      const response = await userService.compleleAndUncompleteProgram(data);
      if (!response.status) {
        return false;
      }
      console.log(response.data);
      toast.success(response.message);
      window.location.reload();
    } catch (err: any) {
      return false;
    }
  };

  const completeAndUncompleteSingleProgram = async (
    status: boolean,
    id: any
  ) => {
    console.log(id);
    try {
      const response = await userService.compleleAndUncompleteSingleProgram(
        { status: status },
        id
      );
      if (!response.status) {
        return false;
      }
      console.log(response.data);
      toast.success(response.message);
      window.location.reload();
    } catch (err: any) {
      return false;
    }
  };

  const tableHeader =
    "text-[17px] font-[400] leading-[26px] font-[AvertaStd-Semibold] text-ryd-headerTextPrimary";
  const tableBody =
    "text-[16px] font-[400] font-[AvertaStd-Light]  leading-[26px] text-[#616161]";
  const attendanceBtnStyle =
    "rounded-[7px] bg-ryd-primary py-1 px-2 text-white text-[11px] border-0";
  const btnStyle =
    "bg-ryd-primary text-white border-y border-y-ryd-primary px-7 rounded-[500px] py-3";
  const labelStyle = "text-[14px] tracking-wide";
  const btnAttStyle = "w-full py-2.5 text-[15px] text-white rounded-[24px]";

  const customConfirm = (message: string): boolean => {
    return window.confirm(message);
  };

  const handleSelectAllChange = (e: any) => {
    if (e.target.checked) {
      // Select all items
      const allIDs = data.map((program) => program?.id);
      setMultiIDs(allIDs);
      toast.warn("All items have been added to the action list.");
    } else {
      setMultiIDs([]);
      toast.error("All items have been removed from the action list.");
    }
  };

  const getStatusColor = (status: any) => {
    return status === true ? "green" : "gray";
  };

  return (
    <div
      className={`mt-[3rem] ${
        data?.length > 0
          ? "border-x border-x-[#F7F7F7] border-b border-b-[#F7F7F7]"
          : "border-0"
      } lg:w-full w-[700px] overflow-x-auto`}
    >
      {data?.length > 0 ? (
        <>
          <button
            className={attendanceBtnStyle}
            onClick={() => {
              if (
                customConfirm(
                  `Are you sure you want to change the status of this ${multiIDs.length} child promo program ?`
                )
              ) {
                completeAndUncompleteProgram(true);
              }
            }}
          >
            Complete All
          </button>
          <ul>
            <li className="w-full flex items-center p-3 rounded-t-[10px] bg-[#F7F7F7] mt-3">
              <p className={`${tableHeader} w-[20%]`}>
                <input
                  style={{ marginRight: 5 }}
                  type={"checkbox"}
                  onChange={(e) => handleSelectAllChange(e)}
                />
                All
              </p>
              <p className={`${tableHeader} w-[20%]`}>Name</p>
              <p className={`${tableHeader} w-[10%]`}>Gender</p>
              <p className={`${tableHeader} w-[20%] text-center`}>Time Group</p>
              {/* <p className={`${tableHeader} w-[10%]`}>Level</p> */}
              <p className={`${tableHeader} w-[20%]`}>Class Time</p>
              <p className={`${tableHeader} w-[20%]`}>Day</p>
              <p className={`${tableHeader} w-[20%]`}>status</p>
              <p className={`${tableHeader} w-[20%] text-center`}>Actions</p>
            </li>
          </ul>

          <ol>
            {data?.map((item: any, index: number) => {
              const pTime = moment()
                .utc(false)
                .utcOffset(item?.child?.parent?.timeOffset);
              pTime.day(item?.day);
              pTime.hour(item?.time);
              pTime.second(0);
              pTime.minute(0);
              //convert to teacher time

              return (
                <li
                  key={item?.id}
                  className={`w-full flex items-center p-3 ${
                    index % 2 !== 0 ? "bg-[#F7F7F7]" : "bg-white"
                  }`}
                >
                  <p className={`${tableBody} w-[20%] capitalize`}>
                    <input
                      style={{ marginRight: 5 }}
                      type={"checkbox"}
                      onClick={(d) => {
                        //multiple selection push to array
                        if (multiIDs.includes(item?.id)) {
                          //remove from array
                          setMultiIDs(
                            multiIDs.filter((i: any) => i !== item?.id)
                          );
                          toast.error(
                            item?.child?.firstName +
                              " removed is been from the action list."
                          );
                        } else {
                          setMultiIDs([...multiIDs, item?.id]);
                          toast.warn(
                            item?.child?.firstName +
                              " has been added to action list."
                          );
                        }
                      }}
                      checked={multiIDs.includes(item?.id) || false}
                      onChange={() => {
                        //multiple selection push to array
                      }}
                    />
                    {index + 1}
                  </p>
                  <p className={`${tableBody} w-[20%] capitalize`}>
                    {item?.child?.firstName} {item?.child?.lastName}
                  </p>
                  <p className={`${tableBody} w-[10%] capitalize`}>
                    {item?.child?.gender}
                  </p>
                  {/* <p className={`${tableBody} w-[15%] text-center`}>{item?.package?.title.replace(/Program/g, '')}</p> */}
                  <p className={`${tableBody} w-[20%]`}>
                    {item?.timeGroup?.title}
                  </p>
                  <p className={`${tableBody} w-[20%]`}>
                    {FormatTimeAndDate(
                      item?.timeGroup?.times,
                      item?.timeGroupIndex
                    )}
                  </p>
                  <p className={`${tableBody} w-[20%]`}>{item?.day}</p>
                  <p
                    className={`${tableBody} w-[20%]`}
                    style={{ color: getStatusColor(item?.isCompleted) }}
                  >
                    {" "}
                    {item?.isCompleted === true ? "Completed" : "Ongoing"}
                  </p>
                  <p className={`${tableBody} w-[20%] text-center`}>
                    <button
                      className={attendanceBtnStyle}
                      onClick={() => {
                        setMultiIDs([...multiIDs, item?.id]);
                        if (
                          customConfirm(
                            `Are you sure you want to change the status of this child promo program ?`
                          )
                        ) {
                          completeAndUncompleteSingleProgram(
                            item?.isCompleted ? false : true,
                            item?.id
                          );
                        }
                      }}
                    >
                      Complete
                    </button>
                  </p>
                </li>
              );
            })}
          </ol>
        </>
      ) : (
        <Empty text="You have no student records" />
      )}

      {toggleModal && (
        <CustomModal
          modalStyle="relative bg-white lg:w-[45%] md:w-[70%] w-[95%] mx-auto rounded-[16px] lg:mt-[2rem] mt-[3rem] lg:h-fit h-[80vh] overflow-y-auto"
          closeModal={() => setToggleModal(false)}
        >
          <div className="p-[2rem]">
            <h2 className="text-[20px] font-[AvertaStd-Semibold] text-center leading-[36px] text-ryd-headerTextPrimary">
              Record for{" "}
              <span className="text-ryd-primary capitalize">
                {selectedStudent.child?.firstName}{" "}
                {selectedStudent.child?.lastName}
              </span>
            </h2>
            {/* set media url  */}
            <form
              onSubmit={handleMediaUrlSubmit}
              className="w-full border-y border-y-gray-100 pb-5 pt-2 mt-3"
            >
              <label className={labelStyle}>Course Media Url</label>
              <div className="lg:flex grid gap-3 mt-1">
                <CustomInput
                  placeholder="https://docs.google.com/spreadsheets/d/1jyCiPhfv..."
                  required
                  onChange={(e: any) => setMediaUrl(e.target.value)}
                />
                <button className={btnStyle} type="submit">
                  {mediaSubmitLoading ? "Updating..." : "Update"}
                </button>
              </div>
            </form>

            {/* assessment docs  */}
            <form
              onSubmit={handleAssessmentUrlSubmit}
              className="w-full border-b border-b-gray-100 pb-5 pt-2 mt-3"
            >
              <label className={labelStyle}>Assessment Url</label>
              <div className="lg:flex grid gap-3 mt-1">
                <CustomInput
                  placeholder="https://docs.google.com/spreadsheets/d/1jyCiPhfv..."
                  required
                  onChange={(e: any) => setAssessmentUrl(e.target.value)}
                />
                <button className={btnStyle} type="submit">
                  {assessmentSubmitLoading ? "Updating" : "Update"}
                </button>
              </div>
            </form>

            {/* assessment and attendance */}
            <div className="mx-auto px-5 py-3 text-[11px] bg-amber-100 mt-3 rounded-[16px]">
              Note: Select an assessment score before clicking either{" "}
              <span className="text-green-600">Present</span> or{" "}
              <span className="text-red-600">Absent</span> to mark student's
              attendance.
            </div>

            <div className="grid lg:grid-cols-2 grid-cols-1 gap-2  pb-5 pt-2 mt-3">
              <div className="w-full">
                <label className={labelStyle}>Assessment</label>
                <div className="lg:flex grid gap-3 mt-1">
                  <select
                    onChange={(e: any) => setAssessmentScore(e.target.value)}
                    className="lg:w-full bg-ryd-gray rounded-[1000px] text-[14px] leading-[26px] font-[400] text-[#576877] px-[26px] py-[15px] outline-none active:outline-none"
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={handleMarkPresent}
                    className={`${btnAttStyle} bg-green-600`}
                  >
                    Present
                  </button>
                  <button
                    onClick={handleMarkAbsent}
                    className={`${btnAttStyle} bg-red-700`}
                  >
                    Absent
                  </button>
                </div>
              </div>
              <div className="grid gap-3">
                <div>
                  <label className={`${labelStyle} text-center`}>
                    Attendance Record (
                    {studentAttendance[0]?.attendance?.length}/8)
                  </label>
                  {studentAttendance[0]?.attendance?.length > 0 ? (
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {studentAttendance[0]?.attendance?.map(
                        (item: any, index: number) => (
                          <li
                            key={index}
                            className={`w-fit h-fit text-[11px] border-0 text-white rounded-[12px] px-2.5 py-1 ${
                              item.status ? "bg-green-500" : "bg-red-600"
                            }`}
                          >
                            {formatDate(item.createdAt)}
                          </li>
                        )
                      )}
                    </ul>
                  ) : (
                    <div className="px-3 text-[15px] text-center h-fit mt-[2rem]">
                      This student has no attendance record yet.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CustomModal>
      )}
    </div>
  );
}
