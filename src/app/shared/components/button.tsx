import type { ReactNode } from "react";

interface ButtonProps {
  children?: ReactNode;
  type?: "button" | "submit" | "reset";
  style?: string;
  color?: string;
  wide?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const COLOR_MAP: Record<string, string> = {
  primary: "bg-primary",
  done: "bg-success",
  info: "bg-info",
  edit: "bg-accent",
  delete: "bg-danger",
  clean: "bg-muted",
};

export function Button({
  children,
  type = "button",
  style = "",
  color = "primary",
  wide = false,
  rounded = false,
  disabled = false,
  onClick
}: ButtonProps) {

  const bg = COLOR_MAP[color] ?? "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-1 outline-none
        text-white font-bold
        flex justify-center items-center gap-2
        ${bg}
        ${style}
        ${wide ? "w-full" : ""}
        ${rounded ? "rounded-xl" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:brightness-150"}
        transition-all duration-150
        text-lg
      `}
    >
      {children}
    </button>
  );
}