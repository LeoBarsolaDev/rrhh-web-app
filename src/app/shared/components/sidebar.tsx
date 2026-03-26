import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faUserTie,
  faTicket,
  faGear,
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, type ReactNode } from "react";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { useBreakpoint } from "../hooks/responsiveHook";
import { useNavigate } from "react-router-dom";
import Logo from "./logo";
import Frame from "./frame";

interface ItemProps {
  children?: ReactNode;
  icon?: IconDefinition;
  link?: string;
  onClick?: () => void;
}

function NavItem({ children, icon, link = "#", onClick }: ItemProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link);
    onClick?.();
  };

  return (
    <li
      onClick={handleClick}
      className="
        flex items-center gap-3
        text-lg cursor-pointer
        hover:text-primary transition-all
      "
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {children}
    </li>
  );
}

function Sidebar() {
  const isMdUp = useBreakpoint("(min-width: 768px)");
  const navigate = useNavigate();
  const [openNavbar, setOpenNavbar] = useState(false);

  const handle_click_logo = () => {
    if (!isMdUp) {
      setOpenNavbar(true);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    if (isMdUp) {
      setOpenNavbar(false);
    }
  }, [isMdUp]);

  return (
    <>
      {/* Sidebar desktop */}
      <Frame
        styles="
          fixed top-0 left-0 p-4 z-10
          xl:h-full xl:w-52 lg:h-full lg:w-48 md:h-full md:w-40
          h-24 w-full
          flex flex-col justify-start items-center gap-16
          shadow-shadow/25
        "
      >
        <Logo onClick={handle_click_logo} />

        {/* Desktop nav */}
        <nav className="hidden md:flex md:justify-center flex-col gap-4 w-full h-full">
          <NavItem icon={faUserTie} link="/employees">Empleados</NavItem>
          <NavItem icon={faTicket} link="/requests">Solicitudes</NavItem>
          <NavItem icon={faGear} link="/settings">Ajustes</NavItem>

          <div className="mt-auto">
            <NavItem icon={faRightFromBracket} link="/login">Cerrar sesión</NavItem>
          </div>
        </nav>
      </Frame>

      {/* Overlay */}
      {!isMdUp && openNavbar && (
        <div
          onClick={() => setOpenNavbar(false)}
          className="fixed inset-0 bg-black/40 z-20"
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`
          fixed top-0 left-0 h-full w-full z-30
          bg-frame text-foreground
          p-6 pt-20
          flex flex-col gap-6
          transition-transform duration-300

          ${openNavbar ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Botón cerrar */}
        <button
          onClick={() => setOpenNavbar(false)}
          className="absolute top-6 right-6 text-2xl"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        {/* Logo */}
        <Logo onClick={() => setOpenNavbar(false)} />

        {/* Nav */}
        <ul className="flex flex-col gap-6 text-xl font-bold">
          <NavItem icon={faUserTie} link="/employees" onClick={() => setOpenNavbar(false)}>
            Empleados
          </NavItem>

          <NavItem icon={faTicket} link="/requests" onClick={() => setOpenNavbar(false)}>
            Solicitudes
          </NavItem>

          <NavItem icon={faGear} link="/settings" onClick={() => setOpenNavbar(false)}>
            Ajustes
          </NavItem>

          <div className="mt-auto">
            <NavItem icon={faRightFromBracket} link="/login" onClick={() => setOpenNavbar(false)}>
              Cerrar sesión
            </NavItem>
          </div>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;