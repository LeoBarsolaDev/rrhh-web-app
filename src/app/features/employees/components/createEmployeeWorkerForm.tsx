import { faBirthdayCake, faCalendarPlus, faChurch, faCodeBranch, faEnvelope, faHouse, faIdCard, faMobile, faPhone, faSitemap, faTags, faVenusMars } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "../../../shared/components/dropdown";
import Input from "../../../shared/components/input";
import { useEffect, useState } from "react";
import { validateCuil } from "../services/validateCuilService";

export function CreateEmployeeWorkerFormPersonal({setIsCuilValid} : {setIsCuilValid: (value: "" | "not valid" | "valid") => void}){
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
            <span className="text-primary font-bold text-center"> Obrero </span>
            
            {/* FK: ID numérico */}
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

            <Input required placeholder="88.888.888" label="Numero de documento" name="document_number" type="number" icon={faIdCard} />
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
                placeholder="Seleccione el Estado civil"
                required
                options={[
                    {name:'Soltero', id:'Soltero'}, 
                    {name:'Casado', id:'Casado'}, 
                    {name:'Divorciado', id:'Divorciado'}, 
                    {name:'Viudo', id:'Viudo'}, 
                ]}
            />

            <Input required label="Fecha de nacimiento" name="birthday" type="date" icon={faBirthdayCake} />
            <Input required placeholder="..." label="Domicilio" name="address" type="text" icon={faHouse} />
        </div>
    )
}

export function CreateEmployeeWorkerFormWork({categories} : {categories: any}){
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

    const handleCategoryChange = (value: string) => {
        setSelectedCategoryId(value);
    };

    const selectedCategory = categories?.worker_categories?.find(
        (cat: any) => cat.id.toString() === selectedCategoryId.toString()
    );

    return(
        <div className="p-2 flex flex-col justify-center">
            <span className="text-primary font-bold text-center"> Obrero </span>
            
            <Dropdown
                label="Categoria"
                name="category"
                icon={faTags}
                options={categories.worker_categories.map((cat: any) => ({
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

            {/* FK: ID numérico (Mapeado al campo 'field' de la DB) */}
            <Dropdown
                label="Rubro"
                icon={faSitemap}
                name="field"
                placeholder="Seleccione el Rubro"
                required
                options={[
                    {name:'Yesero', id:'1'}, 
                    {name:'Ceramista', id:'2'}, 
                    {name:'Pintor', id:'3'}, 
                    {name:'Fierrero', id:'4'}, 
                    {name:'Electricista', id:'5'}, 
                    {name:'Plomero', id:'6'}, 
                    {name:'Encofrador', id:'7'}, 
                ]}
            />

            <Input required label="Fecha de ingreso" name="start_date" type="date" icon={faCalendarPlus} />
            <Input required label="Fecha de ingreso Legal" name="legal_start_date" type="date" icon={faCalendarPlus} />
        </div>
    )
}

export function CreateEmployeeWorkerFormContact(){
    return(
        <div className="p-2 flex flex-col justify-center">
            <span className="text-primary font-bold text-center"> Obrero </span>
            <Input placeholder="user@example.com" label="E-Mail" name="email" type="email" icon={faEnvelope} />
            <Input placeholder="2646888888" required label="Numero de celular" name="mobile_phone" type="number" icon={faMobile} />
            <Input placeholder="4918888" label="Teléfono fijo" name="landline_phone" type="number" icon={faPhone} />
        </div>
    )
}