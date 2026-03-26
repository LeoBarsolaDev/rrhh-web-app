import type { ReactNode } from "react";

export default function Frame({children, styles="", rounded=false} : {children?:ReactNode, styles?:string, rounded?:boolean}){
    return(
        <div className={`bg-frame ${rounded ? "rounded-2xl" : ""} ${styles} shadow-[0_0_32px_8px] shadow-shadow/25`}>
            {children}
        </div>
    )
}