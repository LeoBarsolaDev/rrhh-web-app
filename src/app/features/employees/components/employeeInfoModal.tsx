import Modal from "../../../shared/components/modal";
import { Step, Wizard } from "../../../shared/components/wizard";

export interface props {
  open: boolean;
  setOpen: (value: boolean) => void;
  employee: any;
}

export default function EmployeeInfoModal({open, setOpen, employee} : props){
    function InfoItem({ title, info }: { title: string; info: any }){
        return(
            <span className="flex flex-col justify-center">
                <p className="text-center text-foreground font-extrabold lg:text-md md:text-sm text-sx"> {title} </p>
                <p className="text-center text-placeholder font-extralight lg:text-md md:text-sm text-xs"> {info} </p>
            </span>
        )
    }

    return(
        <Modal open={open} setOpen={setOpen} >
            <div className="
                w-full py-2 px-0 flex flex-col gap-0 h-full
                /* Configuración de Scroll */
                overflow-y-auto overflow-x-hidden
                /* Estilización del Scrollbar (Chrome, Safari, Edge) */
                scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:bg-primary/20
                [&::-webkit-scrollbar-thumb]:rounded-full
                hover:[&::-webkit-scrollbar-thumb]:bg-primary/50
            ">
                
                {employee !== null ?
                    (
                        <div className="flex flex-col w-full gap-2">
                            <div className="flex gap-2 md:flex-row flex-col">
                                <div className="
                                    bg-secondary py-2 px-4 md:w-11/20 w-full rounded-2xl 
                                    grid gap-x-1 gap-y-3 justify-between
                                    lg:grid-cols-3 sm:grid-cols-2 grid-cols-1
                                ">
                                    <h4 className="col-span-full text-center text-primary font-black text-lg"> Información Personal </h4>
                                    <div className="col-span-full bg-separator w-full h-0.5"></div>
                                    <InfoItem title="# N° Legajo" info={employee.file_number} />
                                    <InfoItem title="Nombre completo" info={employee.full_name} />
                                    <InfoItem title="Documento" info={`${employee.document_type_acronym} - ${employee.document_number}`} />
                                    <InfoItem title="Fecha de nacimiento" info={employee.birthday} />
                                    <InfoItem title="Genero" info={employee.gender} />
                                    <InfoItem title="Cuil" info={employee.gender} />
                                </div>
                                <div className="
                                    bg-secondary py-2 px-4 md:w-9/20 w-full rounded-2xl 
                                    grid gap-x-1 gap-y-3 justify-between
                                    sm:grid-cols-2 grid-cols-1
                                ">
                                    <h4 className="col-span-full text-center text-primary font-black text-lg"> Información de Contácto </h4>
                                    <div className="col-span-full bg-separator w-full h-0.5"></div>
                                    <InfoItem title="Estado Civil" info={employee.marital_status} />
                                    <InfoItem title="E-Mail" info={employee.email !== null ? employee.email : "No registrado"} />
                                    <InfoItem title="Celular" info={employee.mobile_phone} />
                                    <InfoItem title="Teléfono fijo" info={employee.landline_phone !== null ? employee.landline_phone : "No registrado"} />
                                </div>
                            </div>

                            <div className="
                                bg-secondary py-2 px-4 w-full rounded-2xl 
                                flex justify-center items-center gap-2 
                            ">
                                <span className="text-center text-foreground font-extrabold md:text-xl text-md leading-none">Direccion: </span>
                                <span className="text-center text-placeholder font-extralight md:text-lg text-md leading-none"> {employee.address.trim()} </span>
                            </div>
                                
                            <div className="
                                bg-secondary py-2 px-4 w-full rounded-2xl 
                                grid gap-x-1 gap-y-3 justify-between
                                lg:grid-cols-4 sm:grid-cols-2 grid-cols-1
                            ">
                                <h4 className="col-span-full text-center text-primary font-black text-lg"> Información Laboral </h4>
                                <div className="col-span-full bg-separator w-full h-0.5"></div>
                                <InfoItem title="Tipo de empleado" info={employee.type} />
                                <InfoItem title="Categoria" info={`${employee.category_name} - ${employee.subcategory_rank}°`} />
                                <InfoItem title="Área" info={employee.area_name} />
                                <InfoItem title="Departamento" info={employee.department_name} />
                                <InfoItem title="Rubro" info={employee.field !== null ? employee.field : "No registrada"} />
                                <InfoItem title="Fecha de ingreso" info={employee.start_date} />
                                <InfoItem title="Fecha de ingresos (Legal)" info={employee.legal_start_date !== null ? employee.legal_start_date : "No registrada"} />
                                <InfoItem title="Fecha de salida" info={employee.separation_date !== null ? employee.separation_date : "No registrada"} />
                            </div>
                        </div>
                    ) : (<></>)
                }
            </div>
        </Modal> 
    )
}