import { faBirthdayCake, faBuilding, faCalendarPlus, faChurch, faEnvelope, faHouse, faIdCard, faLayerGroup, faMobile, faPhone, faSitemap, faUsers, faVenusMars } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "../../../shared/components/dropdown";
import Input from "../../../shared/components/input";

export function CreateEmployeeWorkerFormPersonal(){
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
            <Input required placeholder="80-88.888.888-8" label="CUIL" name="cuil" type="number" icon={faIdCard} />

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

export function CreateEmployeeWorkerFormWork(){
    return(
        <div className="p-2 flex flex-col justify-center">
            <span className="text-primary font-bold text-center"> Obrero </span>
            
            {/* FK: ID numérico */}
            <Dropdown
                label="Categoria"
                icon={faLayerGroup}
                name="category"
                placeholder="Seleccione la Categoria"
                required
                options={[
                    {name:'Capataz', id:'1'}, 
                    {name:'Oficial Especialista', id:'2'}, 
                    {name:'Oficial', id:'3'}, 
                    {name:'Ayudante', id:'4'},
                ]}
            />

            {/* FK: ID numérico */}
            <Dropdown
                label="Sub-categoria"
                icon={faSitemap}
                name="subcategory"
                placeholder="Seleccione la Sub-categoria"
                required
                options={[
                    {name:'UOCRA', id:'1'}, 
                ]}
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