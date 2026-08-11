import { faAlignJustify, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";
import Badge from "../../../shared/components/badge";

interface EmployeeCardProps {
  employee: any;
  handleInfo?: (employee: any) => void;
  handleEdit?: (employee: any) => void;
  onEditSuccess?: () => void;
}

// Memoizamos el componente de la tarjeta para evitar re-renders masivos
export const EmployeeCard = memo(function EmployeeCard({ employee, handleEdit, handleInfo }: EmployeeCardProps) {
  
    const statusBadgeMapping: Record<string, string> = {
        "Activo": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        "De baja": "bg-rose-500/10 text-rose-400 border-rose-500/20",
    };
    return (
    <div className="
        w-full md:grid md:grid-cols-[64px_2fr_2fr_150px_150px] px-4 py-2 items-center
        flex flex-col gap-2
        bg-secondary rounded-xl font-bold
        hover:bg-surface group
    ">
        <span className=""> # {employee.file_number.toString().padStart(4, '0')} </span>
        <span className=""> {employee.full_name} </span>
        <span className=""> {employee.type == "Administrativo" ? employee?.area_name || "Area no registrada" : employee?.field_name || "Obras" } </span>
        <span className="">
            <Badge 
                value={employee.status} // "Activo" o "De baja"
                mapping={statusBadgeMapping} 
                fallback="bg-gray-500/10 text-gray-400 border-gray-500/20"
            />
        </span>
        <div className="justify-self-end flex gap-4">
            <button 
            className="
                p-1 bg-surface rounded 
                group-hover:border-placeholder 
                border border-secondary 
                hover:cursor-pointer hover:bg-primary hover:text-foreground"
            onClick={() => handleInfo && handleInfo(employee)}
            >
            <FontAwesomeIcon icon={faAlignJustify} />                 
            </button>
            
            <button 
            className="
                p-1 bg-surface rounded 
                group-hover:border-placeholder 
                border border-secondary 
                hover:cursor-pointer hover:bg-primary hover:text-foreground"
            onClick={() => handleEdit && handleEdit(employee)}
            >
            <FontAwesomeIcon icon={faPencil} />
            </button>
        </div>
    </div>
  );
});