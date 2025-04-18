import { request } from "../hook/api";
import { AttendanceProps, MediaAssessmentUrlProps, PasswordUpdateProps, ReportCardData, SwapProgramProps } from "./_model";

/**
 *
 * @param {string} url
 * @param {string, [GET, POST, PATCH, PUT...]} method
 * @param {payload} payload
 * @param {boolean} token
 * @param {boolean} text
 * @param {boolean} form
 * @param {string | null} xHash
 * @returns Response Data;
 */



class UserService {
    
    async passwordUpdate(payload: PasswordUpdateProps) {
        try {  
            const response = await request(
                '/teacher/auth/password-update' , 
                'POST',
                payload,
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async getActivity() {
        try {  
            const response = await request(
                '/teacher/get/activities' , 
                'GET',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async getPromoActivity() {
        try {  
            const response = await request(
                '/teacher/get/promo/activities' , 
                'GET',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async compleleAndUncompleteProgram(data:any) {
        try {  
            const response = await request(
                `/teacher/program/status` , 
                'POST',
                data,
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async compleleAndUncompleteSingleProgram(status:any,id:any) {
        try {  
            const response = await request(
                `/teacher/single/program/status/${id}` , 
                'PUT',
                status,
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

   
    async getTeachers() {
        try {  
            const response = await request(
                '/teacher/get/all-teachers' , 
                'GET',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async swapProgram(payload: SwapProgramProps) {
        try {  
            const response = await request(
                '/teacher/swap/set' , 
                'POST',
                payload,
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }


    async submitMediaAssessmentUrl(payload: MediaAssessmentUrlProps, id: string | number) {
        try {  
            const response = await request(
                `/teacher/update/program/${id}` , 
                'POST',
                payload,
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async submitAttendance(payload: AttendanceProps) {
        try {  
            const response = await request(
                `/teacher/mark/attendance` , 
                'POST',
                payload,
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async createReport(payload: ReportCardData) {
        try {  
            const response = await request(
                `/teacher/report` , 
                'POST',
                payload,
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async updateReport(id:any,payload: ReportCardData) {
        try {  
            const response = await request(
                `/teacher/edit/report/${id}` , 
                'PUT',
                payload,
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async getSingleReport(id:any) {
        try {  
            const response = await request(
                `/teacher/report/${id}` , 
                'GET',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async getAllCohort() {
        try {  
            const response = await request(
                `/teacher/cohort/all` , 
                'GET',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async getTeacherPrograms(id:any) {
        try {  
            const response = await request(
                `/teacher/program/cohort/${id}` , 
                'GET',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }
}


export default UserService;