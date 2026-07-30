import { faAlignJustify, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface props {
  employee: any;
  handleInfo?: (employee: any) => void;
  handleEdit?: (employee: any) => void;
  onEditSuccess?: () => void;
}

export default function EmployeeCard({ employee, handleEdit, handleInfo, onEditSuccess }: props) {
  return (
    <div className="
        w-full flex px-4 py-2 items-center
        bg-secondary rounded-xl font-bold
        hover:bg-surface group
    ">
        {employee.file_number} - {employee.full_name}
        <div className="ml-auto flex gap-4">
            <button className="
                p-1 bg-surface rounded 
                group-hover:border-placeholder 
                border border-secondary 
                hover:cursor-pointer hover:bg-primary hover:text-foreground"
                onClick={() => handleInfo && handleInfo(employee)}
            >
                <FontAwesomeIcon icon={faAlignJustify} />                
            </button>
            
            <button className="
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
}