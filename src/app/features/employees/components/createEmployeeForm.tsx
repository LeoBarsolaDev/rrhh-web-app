import { useState } from "react";
import Form from "../../../shared/components/form";
import { Step, Wizard } from "../../../shared/components/wizard";
import Radio from "../../../shared/components/radio";
import { faBoxArchive, faUser} from "@fortawesome/free-solid-svg-icons";
import { CreateEmployeeAdminFormContact, CreateEmployeeAdminFormPersonal, CreateEmployeeAdminFormWork } from "./createEmployeeAdminForm";
import { Button } from "../../../shared/components/button";
import { CreateEmployeeWorkerFormContact, CreateEmployeeWorkerFormPersonal, CreateEmployeeWorkerFormWork } from "./createEmployeeWorkerForm";
import Input from "../../../shared/components/input";
import useCreateEmployeeForm from "../hooks/useCreateEmployeeForm";
import { Alert } from "../../../shared/components/alert";

export default function CreateEmployeeForm(){
    const [employee_type, setEmployeeType] = useState("");
    const {
        categories,
        isSending,
        alertOpen,
        message,
        alertType,
        isCuilValid,
        setIsCuilValid,
        setAlertOpen,
        onSuccess,
        onError,
    } = useCreateEmployeeForm();
    return(
        <Form url="/rrhh/employees" method="POST" onError={onError} onSuccess={onSuccess} validate={isCuilValid}>
            <Alert show={alertOpen} type={alertType === "success" ? "success" : "error"} onClose={() => {setAlertOpen(false)}}>
                {message}
            </Alert>
            <Wizard>
                <Step name="Información inicial">
                    <div className="p-2 flex flex-col gap-4 justify-center">
                        
                        <div className="w-full flex flex-col justify-center">
                            <Input 
                                label="Nombre completo"
                                name="full_name"
                                type="text"
                                placeholder="John Doe"
                                icon={faUser}
                                required
                            />

                            <Input 
                                label="Numero de legajo"
                                name="file_number"
                                type="number"
                                placeholder="00000000"
                                icon={faBoxArchive}
                                required
                            />
                        </div>
                        <span className="text-primary font-bold text-center">
                            Tipo de empleado
                        </span>
                        <div className="flex justify-center gap-4">
                            <Radio
                                value="Administrativo"
                                selected={employee_type}
                                onChange={setEmployeeType}
                                name="type"
                                required
                            >
                                <span>Administrativo/a</span>
                            </Radio>

                            <Radio
                                value="Obrero"
                                selected={employee_type}
                                onChange={setEmployeeType}
                                name="type"
                                required
                            >
                                <span>Obrero</span>
                            </Radio>
                        </div>
                    </div>
                </Step>

                <Step name="Información personal">
                    {employee_type === "Administrativo" && <CreateEmployeeAdminFormPersonal setIsCuilValid={setIsCuilValid} />}
                    {employee_type === "Obrero" && <CreateEmployeeWorkerFormPersonal setIsCuilValid={setIsCuilValid} />}
                </Step>

                <Step name="Información laboral">
                    {employee_type === "Administrativo" && <CreateEmployeeAdminFormWork categories={categories}/>}
                    {employee_type === "Obrero" && <CreateEmployeeWorkerFormWork categories={categories} />}
                </Step>

                <Step name="Información de contacto">
                    {employee_type === "Administrativo" && <CreateEmployeeAdminFormContact />}
                    {employee_type === "Obrero" && <CreateEmployeeWorkerFormContact />}

                    <Button type="submit" wide> {isSending ? "Guardando..." : "Guardar empleado"} </Button>
                </Step>
            </Wizard>
        </Form>
    )
}