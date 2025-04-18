import React from 'react'
import UserService from '../../services/user.service';

export const refetchTecherData = async() => {
    const userService = new UserService();

    try {
        const response = await userService.getActivity();
        if(!response.status){
            return false;
        }
        return response?.data;
    }catch(err: any){
        return false;
    }
}


