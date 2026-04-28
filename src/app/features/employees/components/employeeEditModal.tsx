import { Alert } from "../../../shared/components/alert";
import { Button } from "../../../shared/components/button";
import Form from "../../../shared/components/form";
import Modal from "../../../shared/components/modal";
import { Step, Wizard } from "../../../shared/components/wizard";
import useEditModal from "../hooks/useEditModal";
import { EditEmployeeContact, EditEmployeeFormAdminWork, EditEmployeeFormPersonal, EditEmployeeFormWorkerWork } from "./employeeEditModalForms";

export interface props {
  open: boolean;
  setOpen: (value: boolean) => void;
  employee: any;
}

export default function EmployeeEditModal({open, setOpen, employee} : props){
    const {
        isSending,
        alertOpen,
        message,
        alertType,
        isCuilValid,
        setIsCuilValid,
        setAlertOpen,
        onSuccess,
        onError,
    } = useEditModal()

    return(
        <Modal open={open} setOpen={setOpen} >
            <div className="
                w-full py-2 px-0 flex flex-col gap-0 h-full
                /* Configuración de Scroll */
                overflow-y-visible overflow-x-hidden
                /* Estilización del Scrollbar (Chrome, Safari, Edge) */
                scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:bg-primary/20
                [&::-webkit-scrollbar-thumb]:rounded-full
                hover:[&::-webkit-scrollbar-thumb]:bg-primary/50
            ">
                <Alert show={alertOpen} type={alertType === "success" ? "success" : "error"} onClose={() => {setAlertOpen(false)}}>
                    {message}
                </Alert>
                {employee !== null ? (
                    <Form url="/rrhh/employees" method="PATCH" onError={onError} onSuccess={onSuccess} validate={isCuilValid}>
                        
                        <Wizard>
                            <Step name="Información Personal">
                                <span className="text-primary text-2xl font-bold text-center"> {employee.type} </span>
                                    <EditEmployeeFormPersonal employee={employee} setIsCuilValid={setIsCuilValid} />
                                    <input type="hidden" name="emp_id" defaultValue={employee.id} />
                                    <Button type="submit" rounded wide> { isSending ? "Guardando..." : "Guardar" } </Button>
                            </Step>

                            <Step name="Información Laboral">
                                <span className="text-primary text-2xl font-bold text-center"> {employee.type} </span>
                                    {employee.type === "Administrativo" && <EditEmployeeFormAdminWork />}
                                    {employee.type === "Obrero" && <EditEmployeeFormWorkerWork employee={employee} />}
                                    <input type="hidden" name="emp_id" defaultValue={employee.id} />
                                    <Button type="submit" rounded wide> { isSending ? "Guardando..." : "Guardar" } </Button>
                            </Step>

                            <Step name="Información de Contacto">
                                <span className="text-primary text-2xl font-bold text-center"> {employee.type} </span>
                                    <EditEmployeeContact />
                                    <input type="hidden" name="emp_id" defaultValue={employee.id} />
                                    <Button type="submit" rounded wide> { isSending ? "Guardando..." : "Guardar" } </Button>
                            </Step>
                        </Wizard>
                    </Form>
                ) : (
                    <>Fallo al cargar empleado</>
                )}
            </div>
        </Modal>
    )
}