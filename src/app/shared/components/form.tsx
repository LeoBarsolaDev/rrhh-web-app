import { type ReactNode, type FormEvent } from 'react';
import { api } from '../services/apiClient';

interface Props {
  url: string;
  children?: ReactNode;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  className?: string;
  isSending?: boolean;
  method?: 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'GET' | string;
  validate?: ((data: any) => boolean | string) | "not valid" | "valid" | "" | boolean;
  transformData?: (data: any) => any;
}

export default function Form({ 
  url, 
  children, 
  onSuccess, 
  onError, 
  className = "p-6", 
  method = "POST", 
  validate,
  transformData 
}: Props) {

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const formData = new FormData(e.currentTarget);

      // Detecta si el formulario incluye archivos para enviar FormData u Objeto plano
      const hasFiles = Array.from(formData.values()).some(
        (value) => value instanceof File && value.name !== "" && value.size > 0
      );

      let dataToSend: any = hasFiles ? formData : Object.fromEntries(formData.entries());

      // 🛠️ Transformación previa del payload si existe la prop transformData
      if (transformData) {
        dataToSend = transformData(dataToSend);
      }

      // 🛡️ Validación previa
      if (validate !== undefined && validate !== "") {
        let isValid = true;
        let errorMsg = "La validación ha fallado";

        if (typeof validate === "function") {
          const result = validate(dataToSend);
          if (result !== true) {
            isValid = false;
            if (typeof result === "string") errorMsg = result;
          }
        } else {
          isValid = validate === "valid" || validate === true;
        }

        if (!isValid) {
          if (onError) {
            onError({
              message: errorMsg,
              response: { data: { error: errorMsg } }
            });
          }
          return;
        }
      }

      // 🚀 Petición HTTP según el método elegido
      let response: any;
      const httpMethod = method.toLowerCase();

      switch (httpMethod) {
        case 'post':
          response = await api.post(url, dataToSend);
          break;
        case 'patch':
          response = await api.patch(url, dataToSend);
          break;
        case 'put':
          response = await api.put(url, dataToSend);
          break;
        case 'delete':
          response = await api.delete(url);
          break;
        case 'get':
          response = await api.get(url);
          break;
        default:
          if (typeof (api as any)[httpMethod] === 'function') {
            response = await (api as any)[httpMethod](url, dataToSend);
          } else {
            throw new Error(`Método HTTP '${method}' no soportado.`);
          }
      }

      if (onSuccess) onSuccess(response);

    } catch (error: any) {
      console.error("💥 Error capturado en Form.tsx:", error);
      
      if (onError) {
        onError({
          message: error?.message || "Error de red o del servidor",
          response: error?.response || { data: { error: error?.message } }
        });
      }
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={className}
      encType="multipart/form-data" 
    >
      {children}
    </form>
  );
}