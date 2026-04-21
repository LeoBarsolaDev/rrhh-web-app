import { faBuilding, faCalendarPlus, faChurch, faCodeBranch, faEnvelope, faHouse, faIdCard, faMobile, faPhone, faSitemap, faTags, faUsers } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "../../../shared/components/dropdown";
import Input from "../../../shared/components/input";
import type { EmployeeType } from "../types/employeeType";
import { useState } from "react";

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
                type="text"
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
                required
            />

            <Dropdown
                label="Sub-categoria"
                name="subcategory"
                placeholder={employee.subcategory_name?.toString()}
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
                required
            />

            <Dropdown
                label="Sub-categoria"
                name="subcategory"
                placeholder={`${employee.category_name} de ${employee.subcategory_name}`}
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

            <Input 
                label="Fecha de ingreso"
                name="start_date"
                type="date"
                placeholder={employee.start_date?.toString()}
                icon={faCalendarPlus}
                // required
                // onChange={(value) => handleChange("full_name", value)}
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