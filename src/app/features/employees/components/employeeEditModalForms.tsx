import { faBuilding, faCalendarPlus, faChurch, faEnvelope, faHouse, faIdCard, faLayerGroup, faMobile, faPhone, faSitemap, faUsers } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "../../../shared/components/dropdown";
import Input from "../../../shared/components/input";
import type { EmployeeType } from "../types/employeeType";

export function EditEmployeeFormPersonal({employee} : {employee:EmployeeType}){
    return(
        <div className="flex flex-col justify-center mb-2">
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
                type="number"
                placeholder={employee.cuil.toString()}
                icon={faIdCard}
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

export function EditEmployeeFormWorkerWork({employee} : {employee:EmployeeType}){
    return(
        <div className="flex flex-col justify-center mb-2">
            <Dropdown
                label="Categoria"
                icon={faLayerGroup}
                name="category"
                placeholder={employee.category_name?.toString()}
                options={[
                    {name:'Capataz', id:'1'}, 
                    {name:'Oficial Especialista', id:'2'}, 
                    {name:'Oficial', id:'3'}, 
                    {name:'Ayudante', id:'4'},
                ]}
            />

            <Dropdown
                label="Sub-categoria"
                icon={faSitemap}
                placeholder={employee.subcategory_name?.toString()}
                name="subcategory"
                options={[
                    {name:'...', id:'1'}, 
                ]}
            />

            <Dropdown
                label="Rubro"
                icon={faSitemap}
                name="field"
                placeholder={employee.field_name?.toString()}
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

            <Input 
                label="Fecha de ingreso Legal"
                name="legal_start_date"
                type="date"
                icon={faCalendarPlus}
            />
        </div>
    )
}

export function EditEmployeeFormAdminWork({employee} : {employee:EmployeeType}){
    return(
        <div className="flex flex-col justify-center mb-2">
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

export function EditEmployeeContact({employee} : {employee:EmployeeType}){
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