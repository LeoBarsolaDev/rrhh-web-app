import { faBirthdayCake, faCalendarPlus, faChurch, faEnvelope, faHouse, faIdCard, faMobile, faPhone, faVenusMars } from "@fortawesome/free-solid-svg-icons";
import Input from "../../../shared/components/input";
import Dropdown from "../../../shared/components/dropdown";

export function CreateEmployeeAdminFormPersonal(){
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
            <Input required label="CUIL" placeholder="80-88.888.888-8" name="cuil" type="number" icon={faIdCard} />

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

export function CreateEmployeeAdminFormWork(){
    // TODO: AGREGAR CATEGORIAS Y SUBCATEGORIAS
    return(
        <div className="p-2 flex flex-col justify-center">
            <span className="text-primary font-bold text-center"> Administrativo </span>
            
            {/* FKs: Mantienen IDs numéricos para relacionar con las tablas */}
            <Dropdown
                label="Categoria"
                name="category"
                options={[
                    {name:'Administrativo', id:'1'}, 
                    {name:'Tecnico', id:'2'}, 
                    {name:'Vendedor', id:'3'}, 
                    {name:'Maestranza', id:'4'},
                ]}
                required
            />

            <Dropdown
                label="Sub-categoria"
                name="subcategory"
                required
                options={[
                    {name:'...', id:'1'}, 
                ]}
            />

            <Dropdown
                label="Area"
                name="area" // Corregido el name
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

            <Input required label="Fecha de ingreso" name="start_date" type="date" icon={faCalendarPlus} />
            <Input required label="Fecha de ingreso (Legal)" name="legal_start_date" type="date" icon={faCalendarPlus} />
        </div>
    )
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
                type="number"
                placeholder="2648-888-888"
                icon={faMobile}
                required
            />

            <Input 
                label="Teléfono fijo"
                name="landline_phone"
                type="number"
                placeholder="491-88-88"
                icon={faPhone}
            />
        </div>
    )
}