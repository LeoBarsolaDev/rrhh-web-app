import { faBirthdayCake, faBuilding, faCalendarPlus, faChurch, faEnvelope, faHouse, faIdCard, faLayerGroup, faMobile, faPhone, faSitemap, faUsers, faVenusMars } from "@fortawesome/free-solid-svg-icons";
import Input from "../../../shared/components/input";
import Dropdown from "../../../shared/components/dropdown";

export function CreateemployeeAdminFormPersonal(){
    return(
        <div className="p-2 flex flex-col justify-center">
            <span className="text-primary font-bold text-center"> Administrativo </span>
            <Dropdown
                label="Tipo de documento"
                icon={faIdCard}
                name="document_type"
                // onChange={(value) => handleChange("job_type", value)}
                placeholder="Seleccione el Tipo de documento"
                // required
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
                placeholder="88.888.888"
                icon={faIdCard}
                // required
                // onChange={(value) => handleChange("full_name", value)}
            />

            <Input 
                label="CUIL"
                name="cuil"
                type="number"
                placeholder="80-88.888.888-8"
                icon={faIdCard}
                // required
                // onChange={(value) => handleChange("full_name", value)}
            />

            <Dropdown
                label="Genero"
                icon={faVenusMars}
                name="gender"
                // onChange={(value) => handleChange("job_type", value)}
                placeholder="Seleccione el Genero"
                // required
                options={[
                    {name:'Masculino', id:'1'}, 
                    {name:'Femenino', id:'2'}, 
                    {name:'No binario', id:'3'}, 
                ]}
            />

            <Dropdown
                label="Estado civil"
                icon={faChurch}
                name="marital_status"
                // onChange={(value) => handleChange("job_type", value)}
                placeholder="Seleccione el Estado civil"
                // required
                options={[
                    {name:'Soltero', id:'1'}, 
                    {name:'Casado', id:'2'}, 
                    {name:'Divorciado', id:'3'}, 
                    {name:'Viudo', id:'4'}, 
                ]}
            />

            <Input 
                label="Fecha de nacimiento"
                name="birthday"
                type="date"
                placeholder="88.888.888"
                icon={faBirthdayCake}
                // required
                // onChange={(value) => handleChange("full_name", value)}
            />

            <Input 
                label="Domicilio"
                name="address"
                type="date"
                placeholder="88.888.888"
                icon={faHouse}
                // required
                // onChange={(value) => handleChange("full_name", value)}
            />
        </div>
    )
}

export function CreateemployeeAdminFormWork(){
    return(
        <div className="p-2 flex flex-col justify-center">
            <span className="text-primary font-bold text-center"> Administrativo </span>
            <Dropdown
                label="Categoria"
                icon={faLayerGroup}
                name="category"
                // onChange={(value) => handleChange("job_type", value)}
                placeholder="Seleccione la Categoria"
                // required
                options={[
                    {name:'Administrativo', id:'1'}, 
                    {name:'Tecnico', id:'2'}, 
                    {name:'Vendedor', id:'3'}, 
                    {name:'Maestranza', id:'4'},
                ]}
            />

            <Dropdown
                label="Sub-categoria"
                icon={faSitemap}
                name="subcategory"
                // onChange={(value) => handleChange("job_type", value)}
                placeholder="Seleccione la Sub-categoria"
                // required
                options={[
                    {name:'...', id:'1'}, 
                ]}
            />

            <Dropdown
                label="Area"
                icon={faBuilding}
                name="subcategory"
                // onChange={(value) => handleChange("job_type", value)}
                placeholder="Seleccione la Area"
                // required
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
                // onChange={(value) => handleChange("job_type", value)}
                placeholder="Seleccione el Departamento"
                // required
                options={[
                    {name:'Finanzas', id:'1'}, 
                    {name:'Recursos Humanos', id:'2'}, 
                    {name:'Comunicación', id:'3'}, 
                    {name:'Informática', id:'4'}, 
                ]}
            />

            <Input 
                label="Fecha de ingreso"
                name="start_date"
                type="date"
                placeholder=""
                icon={faCalendarPlus}
                // required
                // onChange={(value) => handleChange("full_name", value)}
            />
        </div>
    )
}

export function CreateemployeeAdminFormContact(){
    return(
        <div className="p-2 flex flex-col justify-center">
            <span className="text-primary font-bold text-center"> Administrativo </span>
            <Input 
                label="E-Mail"
                name="email"
                type="number"
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
                label="Numero de celular"
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