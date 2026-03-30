import Sidebar from "../../../shared/components/sidebar";
import Frame from "../../../shared/components/frame";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import RequestsTable from "../components/requestsTable";

export default function RequestsPage(){
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

                    <RequestsTable />
                </Frame>
            </div>
        </>
    )
}