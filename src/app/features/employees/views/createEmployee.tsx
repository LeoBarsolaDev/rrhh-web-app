import Frame from "../../../shared/components/frame";
import Sidebar from "../../../shared/components/sidebar";
import CreateEmployeeForm from "../components/createEmployeeForm";

export default function CreateEmployeePage(){
    
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
                    <CreateEmployeeForm />
                </Frame>
            </div>
        </>
    )
}