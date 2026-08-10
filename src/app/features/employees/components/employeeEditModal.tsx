import { Alert } from "../../../shared/components/alert";
import { Button } from "../../../shared/components/button";
import Form from "../../../shared/components/form";
import Modal from "../../../shared/components/modal";
import useEditModal from "../hooks/useEditModal";
import { 
    EditEmployeeContact,
  EditEmployeeFormAdminWork, 
  EditEmployeeFormPersonal, 
  EditEmployeeFormWorkerWork,
  EditEmployeeHistory, 
} from "./employeeEditModalForms";

export interface props {
  open: boolean;
  setOpen: (value: boolean) => void;
  employee: any;
  onSuccess: () => void;
  onError: (err: any) => void;
}

export default function EmployeeEditModal({ open, setOpen, employee, onSuccess, onError }: props) {
  const {
    categories,
    isSending,
    alertOpen,
    message,
    alertType,
    isCuilValid,
    setIsCuilValid,
    setAlertOpen,
  } = useEditModal();

  return (
    <Modal open={open} setOpen={setOpen} width="md:w-5/10 w-9/10 max-h-[85vh]">
      <Alert type={alertType} show={alertOpen} onClose={() => {setAlertOpen(false)}} >
          {message}
      </Alert>
      {employee && open ? (
        <Form 
            url="/rrhh/employees"
            method="PATCH"
            /* 1. Usamos max-h-full y flex-col en el form */
            className="w-full max-h-[75vh] flex flex-col items-center"
            onError={onError}
            onSuccess={onSuccess}
            validate={isCuilValid}
        >
            <input type="hidden" name="emp_id" defaultValue={employee.id} />
            
            {/* Títulos fijos arriba */}
            <div className="flex-none w-full mb-2">
              <h4 className="text-primary uppercase text-2xl text-center">Editar {employee.type}</h4>
            </div>

            {/* 2. CAMBIO CLAVE: flex-1 + min-h-0 + overflow-y-auto */}
            <div className="w-full flex-1 min-h-0 overflow-y-auto pr-2">
                <h4 className="text-primary uppercase text-lg text-center">Información personal</h4>
                <EditEmployeeFormPersonal
                  employee={employee}
                  setIsCuilValid={setIsCuilValid}
                />

                <h4 className="text-primary uppercase text-lg text-center">Información laboral</h4>
                {employee.type === "Administrativo" && (
                    <EditEmployeeFormAdminWork
                        categories={categories}
                        employee={employee}
                    />
                )}
                {employee.type === "Obrero" && (
                    <EditEmployeeFormWorkerWork
                        categories={categories}
                        employee={employee}
                    />
                )}
                
                <h4 className="text-primary uppercase text-lg text-center">Historial de baja</h4>
                <EditEmployeeHistory
                  title={employee.type}
                  history={employee.history ?? []}
                />

                <h4 className="text-primary uppercase text-lg text-center">Información de contacto</h4>
                <EditEmployeeContact employee={employee} />
            </div>

            {/* 3. Botón fijo abajo */}
            <div className="flex-none w-full pt-4">
              <Button type="submit" rounded wide>
                 {isSending ? "Guardando..." : "Guardar"}
              </Button>
            </div>
        </Form>
      ) : null}
    </Modal>
  );
}