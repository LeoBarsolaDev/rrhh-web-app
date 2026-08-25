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
      {/* Contenedor principal con altura máxima y flex columna estricto */}
      <div className="flex flex-col max-h-[75vh] h-full w-full overflow-hidden">
        
        <Alert type={alertType} show={alertOpen} onClose={() => {setAlertOpen(false)}} >
            {message}
        </Alert>

        {employee && open ? (
          <Form 
              url="/rrhh/employees"
              method="PATCH"
              /* Garantiza que el formulario tome todo el espacio vertical disponible */
              className="flex flex-col flex-1 min-h-0 w-full"
              onError={onError}
              onSuccess={onSuccess}
              validate={isCuilValid}
          >
              <input type="hidden" name="emp_id" defaultValue={employee.id} />
              
              {/* 1. CABECERA FIJA (flex-shrink-0) */}
              <div className="shrink w-full pb-3 border-b border-gray-100">
                <h4 className="text-primary uppercase text-2xl text-center font-bold">
                  Editar {employee.type}
                </h4>
              </div>

              {/* 2. ÁREA DE CONTENIDO CON SCROLL AUTO (flex-1 + overflow-y-auto + min-h-0) */}
              <div className="flex-1 overflow-y-auto min-h-0 py-4 pr-2 space-y-4">
                  <h4 className="text-primary uppercase text-lg text-center font-semibold">
                    Información personal
                  </h4>
                  <EditEmployeeFormPersonal
                    employee={employee}
                    setIsCuilValid={setIsCuilValid}
                  />

                  <h4 className="text-primary uppercase text-lg text-center font-semibold">
                    Información laboral
                  </h4>
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
                  
                  <h4 className="text-primary uppercase text-lg text-center font-semibold">
                    Historial de baja
                  </h4>
                  <EditEmployeeHistory
                    history={employee.history ?? []}
                  />

                  <h4 className="text-primary uppercase text-lg text-center font-semibold">
                    Información de contacto
                  </h4>
                  <EditEmployeeContact employee={employee} />
              </div>

              {/* 3. BOTÓN Y PIE FIJO (flex-shrink-0) */}
              <div className="shrink w-full pt-3 border-t border-gray-100 bg-white">
                <Button type="submit" rounded wide>
                   {isSending ? "Guardando..." : "Guardar"}
                </Button>
              </div>
          </Form>
        ) : null}
      </div>
    </Modal>
  );
}