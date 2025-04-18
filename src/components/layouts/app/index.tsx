import React from "react";
import Nav from "./Nav";

interface Props {
    children: React.ReactNode
}

export default function AppLayout({ children }: Props){
    const containerStyle = `w-full grid grid-cols-6`;

    return (
         <div className={containerStyle}>
            <div className=" col-span-1 bg-ryd-primary">
                <Nav />
            </div>
            <div className="col-span-5 h-[100vh] overflow-y-auto">
                <div className="lg:px-[100px] md:px-[50px] px-[10px] mt-[5rem] pb-[4rem]">{children}</div>
            </div>
         </div>
    )
}