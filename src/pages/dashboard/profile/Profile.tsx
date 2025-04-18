import React, { useEffect, useState } from "react";
import { AppLayout } from "../../../components/layouts";
import ScheduleTable from "./ScheduleTable";
import ProgramTable from "./ProgramTable";
import SwapTable from "./SwapTable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import { refetchTecherData } from "../../../components/custom-hooks";
import UserService from "../../../services/user.service";
import {
  setAttendance,
  setUserActivity,
} from "../../../redux/reducers/activitySlice";
import PromoProgramTable from "./PromoProgramList";
import Report from "./Report";

export default function Profile() {
  const userActivity: any = useSelector(
    (state: RootState) => state.activity.userActivity
  );
  const userService = new UserService();
  const dispatch = useDispatch();

  const [tabs, setTabs] = useState(0);
  const [promoProgram, setPromoProgram] = useState([]);
  const [cohort, setCohorts] = useState([]);

  const h2Style =
    "lg:text-[24px] text-[20px] font-[AvertaStd-Semibold] font-[400] leading-[33px] text-ryd-headerTextPrimary";
  const tabContainer = "w-full flex gap-2 border-b border-gray-100 mt-7";
  const btnStyle = `px-7 py-1 hover:border-b-2 hover:border-ryd-primary`;

  const refetchTecherData = async () => {
    const userService = new UserService();

    try {
      const response = await userService.getActivity();
      if (!response.status) {
        return false;
      }
      dispatch(setUserActivity(response.data));
    } catch (err: any) {
      return false;
    }
  };

  const fetchTecherPromoData = async () => {
    const userService = new UserService();

    try {
      const response = await userService.getPromoActivity();
      if (!response.status) {
        return false;
      }
      console.log(response.data)
      setPromoProgram(response.data.promo_programs)
    } catch (err: any) {
      return false;
    }
  };

  const fetchCohorts = async () => {
    const userService = new UserService();

    try {
      const response = await userService.getAllCohort();
      if (!response.status) {
        return false;
      }
      console.log(response.data)
      setCohorts(response.data)
    } catch (err: any) {
      return false;
    }
  };

  useEffect(() => {
    refetchTecherData();
    fetchTecherPromoData();
    fetchCohorts();
  }, []);

  console.log(cohort)

  return (
    <AppLayout>
      <h2 className={h2Style}>Activity</h2>
      <section>
        {/* tabs */}
        <div className={tabContainer}>
          <button
            className={`${btnStyle} ${
              tabs === 0 && "border-b-2 border-ryd-primary"
            }`}
            onClick={() => setTabs(0)}
          >
            Schedule
          </button>
          <button
            className={`${btnStyle} ${
              tabs === 1 && "border-b-2 border-ryd-primary"
            }`}
            onClick={() => setTabs(1)}
          >
            Programs
          </button>
          <button
            className={`${btnStyle} ${
              tabs === 3 && "border-b-2 border-ryd-primary"
            }`}
            onClick={() => setTabs(3)}
          >
            Promo Programs
          </button>
          <button
            className={`${btnStyle} ${
              tabs === 2 && "border-b-2 border-ryd-primary"
            }`}
            onClick={() => setTabs(2)}
          >
            Swap
          </button>
          <button
            className={`${btnStyle} ${
              tabs === 4 && "border-b-2 border-ryd-primary"
            }`}
            onClick={() => setTabs(4)}
          >
            Reports
          </button>
        </div>

        <div>
          {tabs === 0 && <ScheduleTable data={userActivity?.programs} />}

          {tabs === 1 && <ProgramTable data={userActivity?.programs} />}

          {tabs === 2 && <SwapTable data={userActivity?.programs} />}

          {tabs === 3 && <PromoProgramTable data={promoProgram} />}

          {tabs === 4 && <Report data={cohort} />}
        </div>
      </section>
    </AppLayout>
  );
}
