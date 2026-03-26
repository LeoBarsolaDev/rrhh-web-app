import React, { type ReactNode, type FormEvent } from 'react';
import { Button } from './button';
import { api } from '../services/apiClient';

interface Props {
    url: string;
    children?: ReactNode;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
    className?: string;
    isSending?: boolean;
}

export default function Form({ url, children, onSuccess, onError, className = "p-6", isSending }: Props) {
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // 1. Capturamos el FormData directamente del formulario.
    // Esto incluye automáticamente todos los inputs y archivos.
    const formData = new FormData(e.currentTarget);

    // Convertir a objeto plano
    const jsonData = Object.fromEntries(formData.entries());

    console.log(jsonData);

    try {
        // 2. Enviamos el FormData sin convertir a objeto.
        // Al no setear manualmente el 'Content-Type', el navegador
        // generará el 'multipart/form-data' correcto con el 'boundary' necesario.
        const response: any = await api.post(url, jsonData);

        // Si usas Axios, response.data es el resultado.
        // Si usas fetch nativo, aquí validarías la respuesta.
        if (onSuccess) onSuccess(response.data || response);
        
    } catch (error: any) {
        const serverError = error.response?.data || error;
        
        if (onError) onError(serverError);
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