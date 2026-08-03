import { Alert } from "../../../shared/components/alert";
import { Button } from "../../../shared/components/button";
import Form from "../../../shared/components/form";
import Modal from "../../../shared/components/modal";
import { Step, Wizard } from "../../../shared/components/wizard";
import useEditModal from "../hooks/useEditModal";
import { 
  EditEmployeeContact, 
  EditEmployeeFormAdminWork, 
  EditEmployeeFormPersonal, 
  EditEmployeeFormWorkerWork, 
  EditEmployeeHistory 
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
    <Modal open={open} setOpen={setOpen}>
      <Alert type={alertType} show={alertOpen} onClose={() => {setAlertOpen(false)}} >
          {message}
      </Alert>
      <div
        className="
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
        "
      >

        {employee && open ? (
          <Form
            key={`${employee.id}-${open}`} /* <-- Esto fuerza la reinicialización completa */
            url="/rrhh/employees"
            method="PATCH"
            onError={onError}
            onSuccess={onSuccess}
            validate={isCuilValid}
          >
            <Wizard>
              {/* Paso 1: Información Personal */}
              <Step name="Información Personal">
                <span className="text-primary text-2xl font-bold text-center">
                  {employee.type}
                </span>
                <EditEmployeeFormPersonal
                  employee={employee}
                  setIsCuilValid={setIsCuilValid}
                />
                <input type="hidden" name="emp_id" defaultValue={employee.id} />
              </Step>

              {/* Paso 2: Información Laboral */}
              <Step name="Información Laboral">
                <span className="text-primary text-2xl font-bold text-center">
                  {employee.type}
                </span>
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
                <input type="hidden" name="emp_id" defaultValue={employee.id} />
              </Step>

              {/* Paso 3: Historial de Bajas */}
              <Step name="Historial de bajas">
                <EditEmployeeHistory
                  title={employee.type}
                  history={employee.history ?? []}
                />
                <input type="hidden" name="emp_id" defaultValue={employee.id} />
              </Step>

              {/* Paso 4: Información de Contacto */}
              <Step name="Información de Contacto">
                <span className="text-primary text-2xl font-bold text-center">
                  {employee.type}
                </span>
                <EditEmployeeContact employee={employee} />
                <input type="hidden" name="emp_id" defaultValue={employee.id} />
                
              </Step>
            </Wizard>
            <Button type="submit" rounded wide>
              {isSending ? "Guardando..." : "Guardar"}
            </Button>
          </Form>
        ) : null}
      </div>
    </Modal>
  );
}