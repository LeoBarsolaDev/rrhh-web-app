import { type ReactNode, type FormEvent } from 'react';
import { api } from '../services/apiClient';

interface Props {
    url: string;
    children?: ReactNode;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
    className?: string;
    isSending?: boolean;
    method?: string;
}

export default function Form({ url, children, onSuccess, onError, className = "p-6", method="POST" }: Props) {
  
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        console.log(Object.fromEntries(formData));

        try {
            let response: any;

            if(method.toLowerCase() == "post") response = await api.post(url, formData);
            if(method.toLowerCase() == "put") response = await api.put(url, formData);
            

            if (onSuccess) onSuccess(response);
            
        } catch (error: any) {
            console.error("Error en el formulario:", error.details || error.message);
            if (onError) onError(error);
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