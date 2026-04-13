import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../../../shared/components/button";
import Modal from "../../../shared/components/modal";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import useEmployeeStatusModal from "../hooks/useEmployeeStatusModal";
import { Alert } from "../../../shared/components/alert";

export interface props {
  open: boolean;
  setOpen: (value: boolean) => void;
  employee: any;
}


export default function EmployeeStatusModal({open, setOpen, employee} : props){
    const {
        alertOpen,
        alertMessage,
        alertType,
        setAlertOpen,
        handleAccept
    } = useEmployeeStatusModal(employee)
    return(
        <Modal open={open} setOpen={setOpen} styles="border-4 border-red-800" width="md:w-4/10 sm:w-6/10 w-8/10" >
            <Alert duration={1000} show={alertOpen} onClose={() => {setAlertOpen(false)}} type={alertType}> {alertMessage} </Alert>
            {employee != null ?
            <div className="w-full p-4 flex flex-col gap-2">
                <h4 className="text-3xl font-extrabold text-red-700 text-center">ATENCIÓN</h4>
                <h5 className="text-foreground text-lg text-center">¿Está seguro que desea Dar de {employee.status === "Activo" ? "Baja" : "Alta"} al empleado: <b className="italic">{employee.full_name}</b>?</h5>
                <div className="flex flex-col md:flex-row gap-4 w-full justify-center items-center">
                    <Button wide rounded color="done" onClick={handleAccept}> <FontAwesomeIcon icon={faCheck} /> Aceptar</Button>
                    <Button wide rounded color="delete" onClick={() => { setOpen(false) }}> <FontAwesomeIcon icon={faXmark} /> Cancelar</Button>
                </div>
            </div>
            :
            <>
            <h4 className="text-lg p-4">Error al cargar el empleado</h4>
            
            </>
            }
        </Modal>
    )
}