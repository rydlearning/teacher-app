import { getDay } from "./getDayTime";


export default function getTodayDays(data: any) {
    const today = new Date();
    const options: any = { weekday: 'short' };
    const dayAbbreviation = today.toLocaleDateString('en-US', options);

    const tdx = data?.programs?.filter((item: any) => getDay(item.day) === dayAbbreviation);

    return tdx;
}
