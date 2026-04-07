import { faBirthdayCake, faBuilding, faCalendarPlus, faChurch, faEnvelope, faHouse, faIdCard, faLayerGroup, faMobile, faPhone, faSitemap, faUsers, faVenusMars } from "@fortawesome/free-solid-svg-icons";
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
                options={[
                    {name:'D.N.I - Documento Nacional de Identidad', id:'1'}, 
                    {name:'L.E - Libreta de Enrolamiento', id:'2'}, 
                    {name:'L.C - Libreta Civica', id:'3'}, 
                    {name:'P.A.S - Pasaporte', id:'4'},
                ]}
            />

            <Input label="Numero de documento" name="document_number" type="number" icon={faIdCard} />
            <Input label="CUIL" name="cuil" type="number" icon={faIdCard} />

            {/* ENUM: ID igual al Nombre */}
            <Dropdown
                label="Genero"
                icon={faVenusMars}
                name="gender"
                placeholder="Seleccione el Genero"
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
                options={[
                    {name:'Soltero', id:'Soltero'}, 
                    {name:'Casado', id:'Casado'}, 
                    {name:'Divorciado', id:'Divorciado'}, 
                    {name:'Viudo', id:'Viudo'}, 
                ]}
            />

            <Input label="Fecha de nacimiento" name="birthday" type="date" icon={faBirthdayCake} />
            <Input label="Domicilio" name="address" type="text" icon={faHouse} />
        </div>
    )
}

export function CreateEmployeeAdminFormWork(){
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
            />

            <Dropdown
                label="Sub-categoria"
                name="subcategory"
                options={[
                    {name:'Efectivo', id:'1'}, 
                    {name:'Contratado', id:'2'}, 
                ]}
            />

            <Dropdown
                label="Area"
                name="area" // Corregido el name
                options={[
                    {name:'Emprendedora', id:'1'}, 
                    {name:'Constructora', id:'2'}, 
                    {name:'Obra', id:'3'},
                    // ... etc
                ]}
            />

            <Dropdown
                label="Departamento"
                name="department"
                options={[
                    {name:'Finanzas', id:'1'}, 
                    {name:'Recursos Humanos', id:'2'}, 
                    {name:'Comunicación', id:'3'}, 
                    {name:'Informática', id:'4'}, 
                ]}
            />

            <Input label="Fecha de ingreso" name="start_date" type="date" icon={faCalendarPlus} />
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
                // required
                // onChange={(value) => handleChange("full_name", value)}
            />

            <Input 
                label="Numero de celular"
                name="mobile_phone"
                type="number"
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