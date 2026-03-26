import Modal from "../../../shared/components/modal";

export interface props {
  open: boolean;
  setOpen: (value: boolean) => void;
  employee: any;
}

export default function EmployeeInfoModal({open, setOpen, employee} : props){
    return(
        <Modal open={open} setOpen={setOpen} >
            {employee}
        </Modal> 
    )
}