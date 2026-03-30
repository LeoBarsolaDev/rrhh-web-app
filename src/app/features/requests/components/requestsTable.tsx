import useRequestsTable from "../hooks/useRequestsTable"
import RequestsCard from "./requestCard"
import RequestModal from "./requestModal"

export default function RequestsTable(){
    const {
        requests
    } = useRequestsTable()

    console.log("REQUESTAS DFASKFMASD")
    console.log(requests)

    return(
        <div className="flex flex-col p-4 gap-2">
            {requests.map((req) => (
                <span key={req.id}>
                    <RequestsCard 
                        request={req}
                    />
                </span>
            ))}

            <RequestModal open={true} setOpen={() => {}} request={requests[0]} />
        </div>
    )
}