import type { ReactNode } from "react";

export interface ModalTypes {
  open: boolean;
  setOpen: (value: boolean) => void;
  children?: ReactNode;
  styles?: string;
  width?: string;
}
