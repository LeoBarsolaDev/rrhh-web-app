import type { ReactNode } from "react";

export function Title({children} : {children:ReactNode}){
    return(
        <h2 className="text-foreground text-3xl font-bold">
            {children}
        </h2>
    )
}

export function Subtitle({children} : {children:ReactNode}){
    return(
        <h2 className="text-foreground text-2xl font-semibold">
            {children}
        </h2>
    )
}