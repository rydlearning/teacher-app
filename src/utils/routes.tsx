import { Navigate, RouteObject } from "react-router-dom";
import { CreateNewPassword, ErrorPage, ForgotPassword, Home, Profile, SignIn, SignUp } from "../pages";
import SuccessPage from "../pages/auth/sign-up/SuccessPage";
import AuthMiddleware from "./AuthMiddleware";


const routes: RouteObject[] = [
    { path: '/', element: <Navigate to="/teacher/sign-in" replace />},
    { path: '/teacher/sign-up', element: <SignUp />},
    { path: '/teacher/sign-in', element: <SignIn />},
    { path: '/teacher/forgot-psd', element: <ForgotPassword />},
    { path: '/teacher/create-psd', element: <CreateNewPassword />},
    { path: '/teacher/home', element: (
        <AuthMiddleware>
            <Home/>
        </AuthMiddleware>
    )},
    { path: '/teacher/activity', element: (
        <AuthMiddleware>
            <Profile />
        </AuthMiddleware> 
    )},
    { path: '/success', element: <SuccessPage />},
    { path: '*', element: <ErrorPage />}
];

export { routes };
