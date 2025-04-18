import { Days, Times } from "../../utils/constants";

export function getDay(_arg: number) {
    // if(!_arg) return;

    const day = Days[_arg];
    return day;
}



export function getTime(_arg: number) {
    if(!_arg) return;

    const time = Times[_arg];
    return time;
}