import { faBirthdayCake, faChurch, faCodeBranch, faEnvelope, faHouse, faIdCard, faMobile, faPhone, faSitemap, faTags, faVenusMars } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "../../../shared/components/dropdown";
import Input from "../../../shared/components/input";
import { useEffect, useState } from "react";
import { validateCuil } from "../services/validateCuilService";

export function CreateEmployeeWorkerFormPersonal({setIsCuilValid} : {setIsCuilValid: (value: "" | "not valid" | "valid") => void}){
    const [isCuilValid, setIsCuilValidVar] = useState<"" | "not valid" | "valid">("");
    const [cuil, setCuil] = useState<string | number | null>("")
    
    useEffect(() => {
        const cuilRaw = cuil;
        const cuilClean = typeof cuilRaw === "string" ? cuilRaw.replace(/[-_\s]/g, "") : "";

        if (cuilClean.length === 0) {
            setIsCuilValid("");
            setIsCuilValidVar("");
            return;
        }

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
        <div className="w-full flex flex-col justify-center">
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
                placeholder="80-88.888.888-9" 
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
                label="Estado civil  (opcional)"
                icon={faChurch}
                name="marital_status"
                placeholder="Seleccione el Estado civil"
                options={[
                    {name:'Soltero', id:'Soltero'}, 
                    {name:'Casado', id:'Casado'}, 
                    {name:'Divorciado', id:'Divorciado'}, 
                    {name:'Viudo', id:'Viudo'}, 
                ]}
            />

            <Input required label="Fecha de nacimiento" name="birthday" type="date" icon={faBirthdayCake} />
            <Input required placeholder="Calle falsa 123" label="Domicilio" name="address" type="text" icon={faHouse} />
        </div>
    )
}

export function CreateEmployeeWorkerFormWork({ categories }: { categories: any }) {
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

    const handleCategoryChange = (value: string) => {
        setSelectedCategoryId(value);
    };

    // 🛡️ Aseguramos que workerCategories sea siempre un array accesible
    const workerCategories = categories?.worker_categories || [];

    const selectedCategory = workerCategories.find(
        (cat: any) => cat?.id?.toString() === selectedCategoryId?.toString()
    );

    return (
        <div className="w-full flex flex-col justify-center">
            {/* 🛡️ Uso seguro de ?.map() */}
            <Dropdown
                label="Categoria"
                name="category"
                icon={faTags}
                options={workerCategories.map((cat: any) => ({
                    name: cat.name, 
                    id: cat.id
                }))}
                onChange={handleCategoryChange}
                required
            />

            {/* 🛡️ Validación segura de subcategorías */}
            <Dropdown
                label="Sub-categoria (opcional)"
                name="subcategory"
                icon={faCodeBranch}
                options={
                    selectedCategory?.subcategories && selectedCategory.subcategories.length > 0 
                        ? selectedCategory.subcategories.map((sub: any) => ({
                            name: `${selectedCategory.name} de ${sub.name}`, 
                            id: sub.id
                        }))
                        : [{ name: "Sin subcategorías", id: "0" }]
                }
            />

            {/* FK: ID numérico */}
            <Dropdown
                label="Rubro (opcional)"
                icon={faSitemap}
                name="field"
                placeholder="Seleccione el Rubro"
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
    );
}

export function CreateEmployeeWorkerFormContact(){
    return(
        <div className="w-full flex flex-col justify-center">
            <Input placeholder="user@example.com" label="E-Mail  (opcional)" name="email" type="email" icon={faEnvelope} />
            <Input placeholder="2646888888" label="Numero de celular  (opcional)" name="mobile_phone" type="number" icon={faMobile} />
            <Input placeholder="4918888" label="Teléfono fijo  (opcional)" name="landline_phone" type="number" icon={faPhone} />
        </div>
    )
}