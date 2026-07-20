import { faBirthdayCake, faBriefcase, faBuilding, faCalendarPlus, faChurch, faCodeBranch, faComments, faEnvelope, faHouse, faIdCard, faMobile, faPhone, faPlus, faTags, faVenusMars } from "@fortawesome/free-solid-svg-icons";
import Input from "../../../shared/components/input";
import Dropdown from "../../../shared/components/dropdown";
import { useEffect, useState } from "react";
import { validateCuil } from "../services/validateCuilService";
import { Button } from "../../../shared/components/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../../../shared/components/modal";
import Textarea from "../../../shared/components/textarea";
import HistoryCard, { type RegisterProps } from "./historyComponent";

export function CreateEmployeeAdminFormPersonal({setIsCuilValid} : {setIsCuilValid: (value: "" | "not valid" | "valid") => void}){
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
        <div className="p-2 flex flex-col justify-center">
            <span className="text-primary font-bold text-center"> Administrativo </span>
            
            {/* FK: Mantiene IDs numéricos */}
            <Dropdown
                label="Tipo de documento"
                icon={faIdCard}
                name="document_type"
                placeholder="Seleccione el Tipo de documento"
                required
                options={[
                    {name:'D.N.I - Documento Nacional de Identidad', id:'1'}, 
                    {name:'L.E - Libreta de Enrolamiento', id:'2'}, 
                    {name:'L.C - Libreta Civica', id:'3'}, 
                    {name:'P.A.S - Pasaporte', id:'4'},
                ]}
            />

            <Input required label="Numero de documento" placeholder="88.888.888" name="document_number" type="number" icon={faIdCard} />
            <Input 
                required 
                label="CUIL" 
                placeholder="80-88.888.888-8" 
                name="cuil" 
                type="text" 
                icon={faIdCard}
                isValid={isCuilValid}
                onChange={(value) => handleChange(value)}
                invalidMessage="No es un CUIL valido"
            />

            {/* ENUM: ID igual al Nombre */}
            <Dropdown
                label="Genero"
                icon={faVenusMars}
                name="gender"
                placeholder="Seleccione el Genero"
                required
                options={[
                    {name:'Masculino', id:'Masculino'}, 
                    {name:'Femenino', id:'Femenino'}, 
                    {name:'No binario', id:'No binario'}, 
                ]}
            />

            {/* ENUM: ID igual al Nombre */}
            <Dropdown
                label="Estado civil"
                icon={faChurch}
                name="marital_status"
                required
                placeholder="Seleccione el Estado civil"
                options={[
                    {name:'Soltero', id:'Soltero'}, 
                    {name:'Casado', id:'Casado'}, 
                    {name:'Divorciado', id:'Divorciado'}, 
                    {name:'Viudo', id:'Viudo'}, 
                ]}
            />

            <Input required label="Fecha de nacimiento" name="birthday" type="date" icon={faBirthdayCake} />
            <Input required label="Domicilio" placeholder="Calle falsa 123" name="address" type="text" icon={faHouse} />
        </div>
    )
}

export function CreateEmployeeAdminFormWork({categories} : {categories: any}){
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

    const handleCategoryChange = (value: string) => {
        setSelectedCategoryId(value);
    };

    const selectedCategory = categories?.admin_categories?.find(
        (cat: any) => cat.id.toString() === selectedCategoryId.toString()
    );

    return(
        <div className="p-2 flex flex-col justify-center">
            <span className="text-primary font-bold text-center"> Administrativo </span>
            
            {/* FKs: Mantienen IDs numéricos para relacionar con las tablas */}
            <Dropdown
                label="Categoria"
                name="category"
                icon={faTags}
                options={categories.admin_categories.map((cat: any) => ({
                    name: cat.name, 
                    id: cat.id
                }))}
                onChange={handleCategoryChange} // Ahora recibirá el ID correcto
                required
            />

            <Dropdown
                label="Sub-categoria"
                name="subcategory"
                icon={faCodeBranch}
                required
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
                name="area" // Corregido el name
                icon={faBuilding}
                required
                options={[
                    {name:'EMPRENDEDORA', id:'1'}, 
                    {name:'CONSTRUCTORA', id:'2'}, 
                    {name:'INMOBILIARIA', id:'3'},
                    {name:'ADM SERVICIOS', id:'4'},
                    {name:'OBRA', id:'5'},
                    {name:'DEPOSITO', id:'6'},
                    {name:'SUBCONTRATISTA', id:'7'},
                    {name:'PROYECTO', id:'8'},
                ]}
            />

            <Dropdown
                label="Departamento"
                name="department"
                icon={faBriefcase}
                required
                options={[
                    { name: 'OFICINA CENTRAL', id: "1" },
                    { name: 'FINANZAS', id: "2" },
                    { name: 'RRHH', id: "3" },
                    { name: 'COMUNICACIÓN', id: "4" },
                    { name: 'INFORMATICA', id: "5" },
                    { name: 'COMPRAS', id: "6" },
                    { name: 'TÉCNICA', id: "7" },
                    { name: 'VENDEDOR', id: "8" },
                    { name: 'ADMIN INMOBILIARIA', id: "9" },
                    { name: 'ADMIN SERVICIOS', id: "10" },
                    { name: 'MANTENIMIENTO', id: "11" },
                ]}
            />
        </div>
    )
}

export function CreateEmployeeHistory({title} : {title:string}) {
    const [openModalStart, setOpenModalStart] = useState<boolean>(false);
    const [openModalSeparation, setOpenModalSeparation] = useState<boolean>(false);
    const [registers, setRegisters] = useState<RegisterProps[]>([]);

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

export function CreateEmployeeAdminFormContact(){
    return(
        <div className="p-2 flex flex-col justify-center">
            <span className="text-primary font-bold text-center"> Administrativo </span>
            <Input 
                label="E-Mail"
                name="email"
                type="email"
                placeholder="user@example.com"
                icon={faEnvelope}
                required
            />

            <Input 
                label="Numero de celular"
                name="mobile_phone"
                type="text"
                placeholder="2648-888-888"
                icon={faMobile}
                required
            />

            <Input 
                label="Teléfono fijo"
                name="landline_phone"
                type="number"
                placeholder="4918888"
                icon={faPhone}
            />
        </div>
    )
}