import Sidebar from "../../../shared/components/sidebar";
import Frame from "../../../shared/components/frame";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faClock, faFileCircleCheck, faListCheck, faTicket, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import RequestsTable from "../components/requestsTable";
import { useState } from "react";
import Tab from "../../../shared/components/Tab";
import SearchBar from "../../../shared/components/searchBar";

export default function RequestsPage(){
    const [selectedTab, setSelectedTab] = useState<"all" | "pending" | "reviewed" | "approved" | "rejected">("all");
    const [searchQuery, setSearchQuery] = useState<string>("");
    

    return(
        <>
            <Sidebar />
            <div 
                className="
                    xl:ml-52 lg:ml-48 md:ml-40 md:mt-0 ml-0 mt-24 py-8
                    md:min-h-screen min-h-[calc(100dvh-6rem)] flex justify-center items-center
                "
            >
                <Frame styles="md:w-9/10 w-19/20 flex flex-col max-h-[85vh]" rounded>
                    {/* Header */}
                    <div className="
                        w-full shrink-0
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

                    {/* Tabs */}
                    <ul className="flex border-b-4 border-separator shrink-0 overflow-x-auto">
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

                    <span className="px-4 py-1">
                        <SearchBar value={searchQuery} onChange={setSearchQuery} />
                    </span>

                    {/* Lista con Altura Fija y Scroll */}
                    <div className="flex-1 h-137.5 overflow-y-auto custom-scrollbar">
                        <RequestsTable selectedTab={selectedTab} searchQuery={searchQuery} />
                    </div>
                </Frame>
            </div>
        </>
    )
}