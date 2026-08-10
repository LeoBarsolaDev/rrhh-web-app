import { faBoxArchive, faUser } from "@fortawesome/free-solid-svg-icons";
import Form from "../../../shared/components/form";
import Frame from "../../../shared/components/frame";
import Input from "../../../shared/components/input";
import Sidebar from "../../../shared/components/sidebar";
import Radio from "../../../shared/components/radio";
import { useState } from "react";
import { CreateEmployeeAdminFormContact, CreateEmployeeAdminFormPersonal, CreateEmployeeAdminFormWork, CreateEmployeeHistory } from "../components/createEmployeeAdminForm";
import { CreateEmployeeWorkerFormContact, CreateEmployeeWorkerFormPersonal, CreateEmployeeWorkerFormWork } from "../components/createEmployeeWorkerForm";
import useCreateEmployeeForm from "../hooks/useCreateEmployeeForm";
import { Button } from "../../../shared/components/button";
import { Alert } from "../../../shared/components/alert";

export default function CreateEmployeePage(){
    const [employee_type, setEmployeeType] = useState("Administrativo");
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
        <>
            <Sidebar />
            <Alert show={alertOpen} type={alertType === "success" ? "success" : "error"} onClose={() => {setAlertOpen(false)}}>
                {message}
            </Alert>
            <div 
                className="
                    xl:ml-52 lg:ml-48 md:ml-40 md:mt-0 ml-0 mt-24 p-2
                    md:h-screen min-h-[calc(100dvh-6rem)]  flex justify-center items-center
                "
            >
                <Frame styles="w-full h-full flex flex-col items-center p-4" rounded>
                    <h3 className="text-primary text-3xl uppercase">Registrar empleado</h3>
                    <Form 
                        url="/rrhh/employees" 
                        className="w-full overflow-y-auto flex flex-col items-center"
                        onSuccess={onSuccess}
                        onError={onError}
                        validate={isCuilValid}
                    >
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
                            placeholder="1234"
                            icon={faBoxArchive}
                            required
                        />
                        <span className="text-primary text-lg mb-2 font-bold">
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

                        <span className="text-primary text-xl font-bold text-center mt-4"> Información personal </span>
                        {employee_type === "Administrativo" && <CreateEmployeeAdminFormPersonal setIsCuilValid={setIsCuilValid} />}
                        {employee_type === "Obrero" && <CreateEmployeeWorkerFormPersonal setIsCuilValid={setIsCuilValid} />}

                        <span className="text-primary text-xl font-bold text-center mt-4"> Información laboral </span>
                        {employee_type === "Administrativo" && <CreateEmployeeAdminFormWork categories={categories}/>}
                        {employee_type === "Obrero" && <CreateEmployeeWorkerFormWork categories={categories} />}

                        <span className="text-primary text-xl font-bold text-center mt-4"> Historial de bajas </span>
                        <CreateEmployeeHistory title={employee_type} />

                        <span className="text-primary text-xl font-bold text-center mt-4"> Información de contacto </span>
                        {employee_type === "Administrativo" && <CreateEmployeeAdminFormContact />}
                        {employee_type === "Obrero" && <CreateEmployeeWorkerFormContact />}

                        <Button type="submit" wide> {isSending ? "Guardando..." : "Guardar empleado"} </Button>
                    </Form>
                </Frame>

            </div>
        </>
    )
}