// import { api } from "../../../shared/services/apiClient";

// export default function  useEmployeesPage(){
//     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         const formData = new FormData(e.currentTarget);

//         // Comprobamos si hay algún archivo real en el FormData
//         const hasFiles = Array.from(formData.values()).some(
//             (value) => value instanceof File && value.name !== "" && value.size > 0
//         );

//         // Si NO hay archivos, convertimos a objeto plano para que Axios envíe JSON
//         // Si HAY archivos, enviamos el formData tal cual (Multipart)
//         const dataToSend = hasFiles ? formData : Object.fromEntries(formData.entries());

//         try {
//             let response: any;
//             const config = hasFiles ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
//             response = await api.patch("/rrhh/employees", dataToSend, config);
            
            
//         } catch (error: any) {
//             console.error("Error en el formulario:", error);
//         }
//     };
// }