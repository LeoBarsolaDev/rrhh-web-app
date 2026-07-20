import { faBuilding, faCalendarPlus, faChurch, faCodeBranch, faEnvelope, faHouse, faIdCard, faMobile, faPhone, faPlus, faSitemap, faTags, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "../../../shared/components/dropdown";
import Input from "../../../shared/components/input";
import type { EmployeeType } from "../types/employeeType";
import { useEffect, useState } from "react";
import { validateCuil } from "../services/validateCuilService";

export function EditEmployeeFormPersonal({ 
    employee, 
    setIsCuilValid 
}: { 
    employee: EmployeeType; 
    setIsCuilValid: (value: "" | "not valid" | "valid") => void; 
}) {
    const [isCuilValid, setIsCuilValidVar] = useState<"" | "not valid" | "valid">("");
    const [cuil, setCuil] = useState<string | number | null>("")
    useEffect(() => {
        // Si es null o undefined, tratamos como vacío
        const cuilRaw = cuil;
        const cuilClean = typeof cuilRaw === "string" ? cuilRaw.replace(/[-_\s]/g, "") : "";

        if (cuilClean.length === 0) {
            setIsCuilValid("");
            setIsCuilValidVar("");
            return;
        }

        // Mientras no llegue a 11, lo marcamos como "no válido" 
        // (o puedes poner "" si no quieres que sea rojo mientras escribe)
        if (cuilClean.length < 11) {
            setIsCuilValid("not valid");
            setIsCuilValidVar("not valid");
            return;
        }

        if (cuilClean.length === 11) {
            const isValid = validateCuil(cuilClean);
            const status = isValid ? "valid" : "not valid";
            setIsCuilValid(status);
            setIsCuilValidVar(status);
        }
    }, [cuil]);

    const handleChange = (value: string | number | null) => {
        setCuil(value);
    };

    return(
        <div className="flex flex-col justify-center mb-2">
            <Input 
                label="Nombre completo"
                name="full_name"
                type="text"
                placeholder={employee.full_name.toString()}
                icon={faUser}
                // required
                // onChange={(value) => handleChange("full_name", value)}
            />

            <Dropdown
                label="Tipo de documento"
                icon={faIdCard}
                name="document_type"
                // onChange={(value) => handleChange("job_type", value)}
                placeholder={`${employee.document_type_acronym} - ${employee.document_type_name}`}
                options={[
                    {name:'D.N.I - Documento Nacional de Identidad', id:'1'}, 
                    {name:'L.E - Libreta de Enrolamiento', id:'2'}, 
                    {name:'L.C - Libreta Civica', id:'3'}, 
                    {name:'P.A.S - Pasaporte', id:'4'},
                ]}
            />

            <Input 
                label="Numero de documento"
                name="document_number"
                type="number"
                placeholder={employee.document_number.toString()}
                icon={faIdCard}
                // required
                // onChange={(value) => handleChange("full_name", value)}
            />

            <Input 
                label="CUIL"
                name="cuil"
                type="text"
                isValid={isCuilValid}
                placeholder={employee.cuil.toString()}
                icon={faIdCard}
                onChange={(value) => handleChange(value)}
                invalidMessage="No es un CUIL valido"
                // required
                // onChange={(value) => handleChange("full_name", value)}
            />

            <Dropdown
                label="Estado civil"
                icon={faChurch}
                name="marital_status"
                // onChange={(value) => handleChange("job_type", value)}
                placeholder={employee.marital_status.toString()}
                // required
                options={[
                    {name:'Soltero', id:'1'}, 
                    {name:'Casado', id:'2'}, 
                    {name:'Divorciado', id:'3'}, 
                    {name:'Viudo', id:'4'}, 
                ]}
            />

            <Input 
                label="Domicilio"
                name="address"
                type="text"
                placeholder={employee.address.toString()}
                icon={faHouse}
            />
        </div>
    )
}

export function EditEmployeeFormWorkerWork({categories, employee} : {categories: any, employee:EmployeeType}){
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
    
    const handleCategoryChange = (value: string) => {
        setSelectedCategoryId(value);
    };

    const selectedCategory = categories?.worker_categories?.find(
        (cat: any) => cat.id.toString() === selectedCategoryId.toString()
    );
    return(
        <div className="flex flex-col justify-center mb-2">
            <Dropdown
                label="Categoria"
                name="category"
                icon={faTags}
                placeholder={employee.category_name?.toString()}
                options={categories.worker_categories.map((cat: any) => ({
                    name: cat.name, 
                    id: cat.id
                }))}
                onChange={handleCategoryChange} // Ahora recibirá el ID correcto
            />

            <Dropdown
                label="Sub-categoria"
                name="subcategory"
                placeholder={employee.subcategory_name?.toString()}
                icon={faCodeBranch}
                options={
                    selectedCategory?.subcategories?.length > 0 
                        ? selectedCategory.subcategories.map((sub: any) => ({
                            name: `${selectedCategory.name} de ${sub.name}`, 
                            id: sub.id
                        }))
                        : [{ name: "Sin subcategorías", id: "0" }]
                }
            />

            <Dropdown
                label="Rubro"
                icon={faSitemap}
                name="field"
                placeholder={employee.field_name?.toString()}
                options={[
                    { name: 'Obrero', id: '7' },
                    { name: 'Yesero', id: '1' },
                    { name: 'Pintor', id: '2' },
                    { name: 'Ceramista', id: '3' },
                    { name: 'Carpintero', id: '4' },
                    { name: 'Subcontratista', id: '5' },
                    { name: 'Electricista', id: '6' },
                    { name: 'Fierrero', id: '8' },
                    { name: 'Plomero', id: '9' },
                    { name: 'Encofrador', id: '10' }
                ]}
            />
        </div>
    )
}

export function EditEmployeeFormAdminWork({categories, employee} : {categories: any, employee:EmployeeType}){
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
    
    const handleCategoryChange = (value: string) => {
        setSelectedCategoryId(value);
    };

    const selectedCategory = categories?.admin_categories?.find(
        (cat: any) => cat.id.toString() === selectedCategoryId.toString()
    );
    return(
        <div className="flex flex-col justify-center mb-2">
            <Dropdown
                label="Categoria"
                name="category"
                icon={faTags}
                placeholder={employee.category_name?.toString()}
                options={categories.admin_categories.map((cat: any) => ({
                    name: cat.name, 
                    id: cat.id
                }))}
                onChange={handleCategoryChange} // Ahora recibirá el ID correcto
            />

            <Dropdown
                label="Sub-categoria"
                name="subcategory"
                placeholder={`${employee.category_name} de ${employee.subcategory_name}`}
                icon={faCodeBranch}
                options={
                    selectedCategory?.subcategories?.length > 0 
                        ? selectedCategory.subcategories.map((sub: any) => ({
                            name: `${selectedCategory.name} de ${sub.name}`, 
                            id: sub.id
                        }))
                        : [{ name: "Sin subcategorías", id: "0" }]
                }
            />

            <Dropdown
                label="Area"
                icon={faBuilding}
                name="area"
                placeholder={employee.area_name?.toString()}
                options={[
                    {name:'Emprendedora', id:'1'}, 
                    {name:'Constructora', id:'2'}, 
                    {name:'Obra', id:'3'}, 
                    {name:'Deposito', id:'4'}, 
                    {name:'Subcontratista', id:'5'}, 
                    {name:'Inmobiliaria', id:'6'}, 
                    {name:'Adm. Servicios', id:'7'}, 
                    {name:'Proyecto', id:'8'}, 
                ]}
            />

            <Dropdown
                label="Departamento"
                icon={faUsers}
                name="department"
                placeholder={employee.department_name?.toString()}
                options={[
                    {name:'Finanzas', id:'1'}, 
                    {name:'Recursos Humanos', id:'2'}, 
                    {name:'Comunicación', id:'3'}, 
                    {name:'Informática', id:'4'}, 
                ]}
            />
        </div>
    )
}

export function EditEmployeeContact(){
    return(
        <div className="flex flex-col justify-center mb-2">
            <Input 
                label="E-Mail"
                name="email"
                type="email"
                placeholder="user@example.com"
                icon={faEnvelope}
                // required
                // onChange={(value) => handleChange("full_name", value)}
            />

            <Input 
                label="Numero de celular"
                name="mobile_phone"
                type="text"
                placeholder="2648-888-888"
                icon={faMobile}
                // required
                // onChange={(value) => handleChange("full_name", value)}
            />

            <Input 
                label="Teléfono fijo"
                name="landline_phone"
                type="number"
                placeholder="491-88-88"
                icon={faPhone}
                // required
                // onChange={(value) => handleChange("full_name", value)}
            />
        </div>
    )
}

import HistoryCard, { type RegisterProps } from "./historyComponent";
import Modal from "../../../shared/components/modal";
import { Button } from "../../../shared/components/button";
import Textarea from "../../../shared/components/textarea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function EditEmployeeHistory({title, history} : {title:string, history: RegisterProps[]}) {
    const [openModalStart, setOpenModalStart] = useState<boolean>(false);
    const [openModalSeparation, setOpenModalSeparation] = useState<boolean>(false);
    const [registers, setRegisters] = useState<RegisterProps[]>(history);

    interface FormModalData {
        id: string,
        type: string | null;
        cause: string | null;
        reason: string | null;
        real_date: string | null;
        legal_date: string | null;
    }

    const addNewRegister = (data: FormModalData) => {
        const newRegister: RegisterProps = {
            id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            type: data.type,
            cause: data.cause,
            reason: data.reason,
            real_date: data.real_date,
            legal_date: data.legal_date,
        };

        // Insertamos el nuevo registro al principio de la lista
        setRegisters((prev) => [newRegister, ...prev]);

        // Cerramos ambos modales de forma segura
        setOpenModalStart(false);
        setOpenModalSeparation(false);
    };

    const deleteRegister = (idToDelete?: string) => {
        if (!idToDelete) return;
        setRegisters((prev) => prev.filter((reg) => reg.id !== idToDelete));
    };
            
    function StartModal(){
        const [formData, setFormData] = useState<FormModalData>({
            id: "",
            type: "Alta",
            cause: "",
            reason: "",
            real_date: "",
            legal_date: "",
        });
        const handleFieldChange = (fieldName: keyof FormModalData, value: string | number | null) => {
            setFormData((prev) => ({
                ...prev,
                [fieldName]: value,
            }));
        };

        const handleRegister = () => {
            console.log("Datos listos para enviar:", formData);
            addNewRegister(formData);
            setFormData({ id:"", type: "Alta", cause: "", reason: "", real_date: "", legal_date: "" });
        };

        return (
            <Modal styles="" width="md:w-5/10 w-9/10" open={openModalStart} setOpen={setOpenModalStart}>
                <div className=" flex flex-col items-center p-4">
                    <input 
                        type="hidden" 
                        name="history_records" 
                        value={JSON.stringify(registers)}
                        required
                    />
                    <span className="text-primary font-bold text-center uppercase"> Registrar Alta </span>
                    <Input
                        label="Fecha de ingreso (REAL)"
                        name="real_date" 
                        type="date"
                        onChange={(val) => handleFieldChange("real_date", val)}
                    />
                    <Input
                        label="Fecha de ingreso (LEGAL)"
                        name="legal_date" 
                        type="date" 
                        onChange={(val) => handleFieldChange("legal_date", val)}
                    />
                    <Button 
                        color="success" 
                        style="uppercase" 
                        wide 
                        rounded
                        onClick={handleRegister}
                    >
                        Registrar 
                    </Button>
                </div>
            </Modal>
        )
    }
    
    function SeparationModal(){
        const [formData, setFormData] = useState<FormModalData >({
            id: "",
            type: "Baja",
            cause: "",
            reason: "",
            real_date: "",
            legal_date: "",
        });
        const handleFieldChange = (fieldName: keyof FormModalData , value: string | number | null) => {
            setFormData((prev) => ({
                ...prev,
                [fieldName]: value,
            }));
        };

        const handleRegister = () => {
            console.log("Datos listos para enviar:", formData);
            addNewRegister(formData);
            setFormData({ id:"", type: "Baja", cause: "", reason: "", real_date: "", legal_date: "" });
        };

        return (
            <Modal styles="" width="md:w-5/10 w-9/10 h-auto" open={openModalSeparation} setOpen={setOpenModalSeparation}>
                <div className=" flex flex-col items-center p-4">
                    <span className="text-primary font-bold text-center uppercase"> Registrar Baja </span>
                    <Dropdown
                        label="Motivo de la baja"
                        name="reason"
                        options={[
                            {id: "1", name: "Jubilación"},
                            {id: "2", name: "Liquidación"},
                            {id: "3", name: "Parcial"},
                            {id: "4", name: "Renuncia"},
                        ]}
                        onChange={(val) => handleFieldChange("reason", val)}
                        returnName
                    />
                    <Input
                        label="Fecha de salida (REAL)"
                        name="real_date" 
                        type="date"
                        onChange={(val) => handleFieldChange("real_date", val)}
                    />
                    <Input
                        label="Fecha de salida (LEGAL)"
                        name="legal_date" 
                        type="date" 
                        onChange={(val) => handleFieldChange("legal_date", val)}
                    />
                    <Textarea
                        label="Causa de la baja"
                        name="cause"
                        placeholder="Detallanos la causa de la baja."
                        maxLength={256}
                        rows={4}
                        onChange={(val) => handleFieldChange("cause", val)}
                    />
                    
                    <Button 
                        color="success" 
                        style="uppercase" 
                        wide 
                        rounded
                        onClick={handleRegister}
                    >
                        Registrar 
                    </Button>
                </div>
            </Modal>
        )
    }

    return (
        <div className="p-2 flex flex-col justify-center">
            <StartModal />
            <SeparationModal />
            <span className="text-primary font-bold text-center"> {title} </span>
            <div className="border border-secondary p-4 rounded-lg flex flex-col gap-2">
                <div className="w-full flex flex-col sm:flex-row gap-2">
                    <div className="flex-1">
                        <Button color="primary" wide rounded onClick={() => { setOpenModalStart(true); setOpenModalSeparation(false); }}> 
                            <FontAwesomeIcon icon={faPlus} /> Registrar alta 
                        </Button>
                    </div>
                    <div className="flex-1">
                        <Button color="primary" wide rounded onClick={() => { setOpenModalSeparation(true); setOpenModalStart(false); }}> 
                            <FontAwesomeIcon icon={faPlus} /> Registrar baja 
                        </Button>
                    </div>
                </div>

                {/* Renderizado de las HistoryCard optimizadas con una Key única */}
                <div className="flex flex-col items-center gap-3 mt-2">
                    {registers.length > 0 ? 
                        registers.map((reg, index) => (
                            <div key={`register-${index}`} className="w-full flex justify-center">
                                <HistoryCard onDelete={() => deleteRegister(reg.id)}  index={index} register={reg} />
                            </div>
                        ))
                        :
                        <span className="text-placeholder font-light"> No hay registros aun... </span>
                    }
                </div>
            </div>
        </div>
    );
}