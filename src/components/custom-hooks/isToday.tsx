export default function isToday(inputDate: string | Date | number) {
    const today = new Date();
    const date = new Date(inputDate);

    const tdx = today.getDay() 
    return tdx === Number(inputDate);

  // return (
  //   date.getFullYear() === today.getFullYear() &&
  //   date.getMonth() === today.getMonth() &&
  //   date.getDate() === today.getDate()
  // );
}