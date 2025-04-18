import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "../custom-hooks";


const  countriesArr = require('../../utils/countries.json');

export default function TimezoneSelect({ country, handleTimezoneChange, className }) {
  const [ zoneList, setZoneList ] = useState([]);
  const [ selectedZone, setSelectedZone ] = useState({});
  const [ toggle, setToggle ] = useState(false);

  const timezoneSelectRef = useRef(null)

  const boxStyle = `relative`;

  const closeModal = () => {
    setToggle(false);
    setZoneList(country?.timezones);
  }

  useOnClickOutside(timezoneSelectRef, closeModal);


  useEffect(() => {
    setZoneList(country?.timezones);
    setSelectedZone(country?.timezones[0]);
    // handleTimezoneChange(country?.timezones[0]);
  }, [country]);


  return (
    <div className={`${boxStyle} z-0`} ref={timezoneSelectRef}>
      <div
        className={`${className} hover:cursor-pointer`}
        onClick={() => setToggle(prevState => !prevState)}
      >
        {selectedZone?.zoneName}
      </div>
      {toggle &&
        <div className={`${zoneList.length > 3 ? 'h-[20vh] overflow-y-auto': 'h-fit'}  absolute top-3 w-full shadow bg-white text-ryd-subTextPrimary text-[14px]`}>
          <div className="text-center px-4 py-1 bg-ryd-gray">-- select timezone --</div>
          {zoneList?.length > 0 ? 
            zoneList.map((item, index) => (
              <div key={index} 
                className="hover:bg-ryd-gray px-4 py-1 hover:cursor-pointer" 
                onClick={() => {
                  setSelectedZone(item);
                  setToggle(false)
                  handleTimezoneChange(item)
                  }}>
                {item?.zoneName}
              </div>
            )) :
            <p className="text-center mt-[15%]">No available state</p>
          }
        </div>
      }
    </div>
  )
}