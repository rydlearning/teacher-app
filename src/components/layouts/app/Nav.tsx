import React, { useState } from 'react';
import userImg from '../../../assets/images/user-avatar.png';
import { nav } from '../../../utils/constants';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoutIcon from '../../../assets/icons/logout.svg';
import { CustomModal, ProfileUpdate } from '../../ui';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/reducers/authSlice';
import { toast } from 'react-toastify';
import { RootState } from '../../../redux/rootReducer';

export default function () {
    const userInfo: any = useSelector((state: RootState) => state.auth.userInfo);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [imgSrc, setImgSrc] = useState({ name: '', icon: ''});
    const [ toggleLogout, setToggleLogout ] = useState(false);
    const [ updateModal, setUpdateModal ] = useState(false);

    const containerHeaderStyle = `w-full z-20 mt-[5rem]`;  
    const navStyle = `flex items-center lg:justify-start justify-center rounded-[10px] gap-x-2 lg:py-3.5 py-2 lg:px-5 px-3 mb-2 w-full hover:bg-ct-primary hover:bg-dark-primary text-white hover:font-[400] tracking-[0.7px] text-[15px] nav-style`;
    const activeStyle = `bg-dark-primary`;
    const navTextStyle = `text-[13px] capitalize lg:block hidden`;
    const logoutBtnStyle = 'text-center py-2.5 px-7 text-white text-[12px] font-[600] tracking-[0.7px] rounded-[7px]';

    const handleHover = (arg: {name: string, route: string, icon: string}) => {
        const data = { name: arg.name, icon: arg.icon};
        setImgSrc(data);
      };
    const handleHoverOut = () => setImgSrc({ name: '', icon: ''});

    const handleLogout = () => {
        localStorage.clear();
        dispatch(logout());
        navigate('/teacher/sign-in');
        toast.success('Logout successful!');

    }

    return (
        <nav className={containerHeaderStyle}>
            {/* teacher brief info  */}
            <div>
                <img src={userImg} alt="user-avatar" className='mx-auto lg:h-[64px] h-[32px] lg:w-[64px] w-[32px] border-2 border-white bg-white rounded-full object-cover' />
                <div 
                    onClick={() => setUpdateModal(true)} 
                    className='w-[85%] lg:block hidden mx-auto bg-dark-primary rounded-[10px] text-center px-4 py-2 mt-5 hover:cursor-pointer'
                    >
                    <p className='font-[400] text-[14px] font-[AvertaStd-Semibold] text-white capitalize'>{userInfo.firstName} {userInfo.lastName}</p>
                    <p className='font-[400] text-[11px] tracking-wide font-[AvertaStd-Light] text-white lowercase'>{userInfo.email}</p>
                </div>
            </div>
            <div className='mt-10 w-[85%] mx-auto'>
            {nav.map((item, index) => {
                    const isTargetRoute = location.pathname.includes(item.route);
                    return (
                        <Link 
                            key={index} 
                            to={item.route} 
                            onMouseOut={() => handleHoverOut()}
                            onMouseOver={() => handleHover(item)}
                            className={`${navStyle} ${isTargetRoute && activeStyle}`}
                            >
                                <img 
                                    src={(isTargetRoute || imgSrc?.icon === item.icon) ?
                                        require(`../../../assets/icons/on.${item.icon}`) :
                                        require(`../../../assets/icons/${item.icon}`)
                                    } 
                                    alt={item.name} 
                                    />
                                <span className={`${navTextStyle}`}>{item.name}</span>
                        </Link>
                    )
                }
            )}
            </div>

            <div className='mt-[17rem] w-[85%] mx-auto'>
                <div className={`${navStyle} hover:cursor-pointer`} onClick={() => setToggleLogout(true)}>
                    <img src={logoutIcon} alt="logout" />
                    <p className={navTextStyle}>Logout</p>
                </div>
            </div>

            {toggleLogout &&
                <CustomModal
                closeModal={() => setToggleLogout(false)}
                modalStyle='md:w-[25%] w-[90%] rounded-[10px] p-[2rem] mx-auto bg-white mt-[15%]'
                >
                    <p className='text-center'>Do you wish to logout?</p>
                    <div className='flex justify-center gap-3 mt-3'>
                        <button 
                            onClick={() => handleLogout()} 
                            className={`${logoutBtnStyle} bg-green-600`}>
                                Yes
                            </button>
                        <button 
                            onClick={() => setToggleLogout(false)} 
                            className={`${logoutBtnStyle} bg-red-500`}>
                                No
                            </button>
                    </div>
                </CustomModal>
            }
            { updateModal && 
            <CustomModal
            closeModal={() => setUpdateModal(false)}
            modalStyle='bg-white lg:w-[30%] md:w-[70%] w-[95%] mx-auto rounded-[16px] lg:mt-[3rem] mt-[3rem]'
            >
                <ProfileUpdate 
                closeModal={() => setUpdateModal(false)} 
                />
            </CustomModal>
            }
        </nav>
    )
}
