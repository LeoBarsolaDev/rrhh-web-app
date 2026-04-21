import Sidebar from "../../../shared/components/sidebar";
import Frame from "../../../shared/components/frame";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faClock, faFileCircleCheck, faListCheck, faTicket, faXmarkCircle, type IconDefinition } from "@fortawesome/free-solid-svg-icons";
import RequestsTable from "../components/requestsTable";
import { useState, type ReactNode } from "react";

function Tab({
        value,
        active,
        children,
        icon,
        onClick
    }: {
        value: string,
        active: boolean,
        children: ReactNode,
        icon: IconDefinition,
        onClick: () => void
    }) {
        return (
            <li
                className={`w-full p-1 cursor-pointer transition-all duration-150 flex justify-center items-center gap-1
                    ${active ? "bg-separator font-bold" : "bg-transparent hover:bg-separator hover:text-foreground text-placeholder"}
                `}
                onClick={onClick}
            >
                <span className={`
                    
                    ${active ? "font-bold" : ""}
                `}>
                    <FontAwesomeIcon icon={icon} />
                </span>
                
                <span className={`
                    hidden md:inline-block
                    ${active ? "font-bold" : ""}
                `}>
                    {children}
                </span>
            </li>
        );
    }

export default function RequestsPage(){
    const [selectedTab, setSelectedTab] = useState<"all" | "pending" | "reviewed" | "approved" | "rejected">("all");

    return(
        <>
            <Sidebar />
            <div 
                className="
                    xl:ml-52 lg:ml-48 md:ml-40 md:mt-0 ml-0 mt-24 py-8
                    md:min-h-screen min-h-[calc(100dvh-6rem)]  flex justify-center items-center
                "
            >
                <Frame styles="md:w-9/10 w-19/20" rounded>
                    <div className="
                        w-full h-1/10
                        border-b-4 border-separator
                        flex justify-start items-center p-4
                    ">
                        <span className="
                        flex gap-2 items-center 
                        text-2xl text-foreground font-bold 
                        ">
                            <FontAwesomeIcon icon={faTicket} /> Solicitudes
                        </span>
                    </div>

                    <ul className="flex border-b-4 border-separator">
                        <Tab
                            icon={faListCheck}
                            value="all"
                            active={selectedTab === "all"}
                            onClick={() => setSelectedTab("all")}
                        >
                            Todas
                        </Tab>

                        <Tab
                            icon={faClock}
                            value="pending"
                            active={selectedTab === "pending"}
                            onClick={() => setSelectedTab("pending")}
                        >
                            Sin revisar
                        </Tab>

                        <Tab
                            icon={faFileCircleCheck}
                            value="reviewed"
                            active={selectedTab === "reviewed"}
                            onClick={() => setSelectedTab("reviewed")}
                        >
                            Revisadas
                        </Tab>

                        <Tab
                            icon={faCircleCheck}
                            value="approved"
                            active={selectedTab === "approved"}
                            onClick={() => setSelectedTab("approved")}
                        >
                            Aprobadas
                        </Tab>

                        <Tab
                            icon={faXmarkCircle}
                            value="rejected"
                            active={selectedTab === "rejected"}
                            onClick={() => setSelectedTab("rejected")}
                        >
                            Rechazadas
                        </Tab>
                    </ul>

                    <RequestsTable selectedTab={selectedTab} />
                </Frame>
            </div>
        </>
    )
}