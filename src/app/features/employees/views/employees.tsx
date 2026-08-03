import Sidebar from "../../../shared/components/sidebar";
import Frame from "../../../shared/components/frame";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useEmployeesPage from "../hooks/useEmployeesPage";
import SearchBar from "../../../shared/components/searchBar";
import EmployeeInfoModal from "../components/employeeInfoModal";
import EmployeeEditModal from "../components/employeeEditModal";
import { Alert } from "../../../shared/components/alert";
import { faListCheck, faTools, faUserPlus, faUserTie, faFilter } from "@fortawesome/free-solid-svg-icons";
import Tab from "../../../shared/components/Tab";
import { useMemo, useState, useEffect } from "react";
import { EmployeeCard } from "../components/employeeCard";

const ITEMS_PER_PAGE = 30;

export default function EmployeesPage(){
  const {
    alertOpen,
    alertMessage,
    alertType,
    setAlertOpen,

    employees,
    fetchEmployees,
    selectedEmployee,
    setSelectedEmployee,

    searchQuery,
    setSearchQuery,

    infoModalOpen,
    setInfoModalOpen,
    editModalOpen,
    setEditModalOpen,

    handleInfo,
    handleEdit,

    onEditSuccess,
    onError,

    selectedTab,
    setSelectedTab
  } = useEmployeesPage();

  // Filtro de estado: "all" | "active" | "inactive"
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

  // Controla cuántos elementos están montados en el DOM
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Optimización de la búsqueda, pestañas y estado con useMemo
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp: any) => {
      // 1. Filtrado por Pestaña (selectedTab)
      if (selectedTab === "admins") {
        const type = String(emp.type || emp.role || "").toLowerCase();
        if (!type.includes("admin") && !type.includes("administrativo")) return false;
      } else if (selectedTab === "workers") {
        const type = String(emp.type || emp.role || "").toLowerCase();
        if (!type.includes("obrero") && !type.includes("worker")) return false;
      }

      // 2. Filtrado por Estado (statusFilter)
      if (statusFilter !== "all") {
        const empStatus = String(emp.status || emp.state || "").toLowerCase();
        const isActiveBool = emp.is_active === true;

        if (statusFilter === "active") {
          const isActive = empStatus === "activo" || empStatus === "active" || isActiveBool;
          if (!isActive) return false;
        } else if (statusFilter === "inactive") {
          const isInactive = empStatus === "de baja" || empStatus === "inactivo" || empStatus === "inactive" || emp.is_active === false;
          if (!isInactive) return false;
        }
      }

      // 3. Filtrado por Búsqueda (searchQuery)
      const searchQueryLower = searchQuery.trim().toLowerCase();
      if (!searchQueryLower) return true;

      // Búsqueda directa prioritaria en los campos principales
      if (emp.full_name && String(emp.full_name).toLowerCase().includes(searchQueryLower)) return true;
      if (emp.file_number && String(emp.file_number).toLowerCase().includes(searchQueryLower)) return true;

      // Respaldo para otros campos
      for (const key in emp) {
        const val = emp[key];
        if (val !== null && val !== undefined && typeof val !== "object") {
          if (String(val).toLowerCase().includes(searchQueryLower)) return true;
        }
      }

      return false;
    });
  }, [employees, searchQuery, selectedTab, statusFilter]);

  // Reinicia la cantidad visible al cambiar cualquier filtro
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [searchQuery, selectedTab, statusFilter]);

  // Solo toma la porción visible para renderizar
  const visibleEmployees = useMemo(() => {
    return filteredEmployees.slice(0, visibleCount);
  }, [filteredEmployees, visibleCount]);

  // Carga más registros automáticamente al acercarse al final del contenedor con scroll
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 100) {
      if (visibleCount < filteredEmployees.length) {
        setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
      }
    }
  };

  return(
    <>
      <Alert
        show={alertOpen}
        type={alertType === "success" ? "success" : "error"}
        onClose={() => setAlertOpen(false)}
      >
        {alertMessage}
      </Alert>
      <Sidebar />
      <div 
        className="
          xl:ml-52 lg:ml-48 md:ml-40 md:mt-0 ml-0 mt-24 py-8
          md:h-screen h-[calc(100dvh-6rem)] flex justify-center items-center
        "
      >
        <Frame styles="w-19/20 h-[85vh] flex flex-col overflow-hidden" rounded>
          <ul className="flex border-b-4 border-separator">
            <Tab
              icon={faListCheck}
              value="all"
              active={selectedTab === "all"}
              onClick={() => setSelectedTab("all")}
            >
              Todas
            </Tab>

            <Tab
              icon={faUserTie}
              value="admins"
              active={selectedTab === "admins"}
              onClick={() => setSelectedTab("admins")}
            >
              Administrativos
            </Tab>

            <Tab
              icon={faTools}
              value="workers"
              active={selectedTab === "workers"}
              onClick={() => setSelectedTab("workers")}
            >
              Obreros
            </Tab>
          </ul>
          <div className="
            w-full shrink-0
            border-b-4 border-separator
            flex justify-start items-center p-4
          ">
            <span className="
              flex gap-2 items-center 
              text-2xl text-foreground font-bold 
            ">
              <FontAwesomeIcon icon={faUserTie} /> Colaboradores
            </span>

            <span className="group relative ml-auto mr-2 w-auto">
              <a href="/create-employee" className="
                text-2xl text-foreground
                group-hover:text-primary
                transition-all duration-150
              ">
                <FontAwesomeIcon icon={faUserPlus} /> 
              </a>
              <span className="
                absolute -top-11 -right-1/2 text-xs font-light text-center
                opacity-0 group-hover:opacity-100
                transition-all duration-150
                bg-black/50 p-1 rounded
              ">
                Crear Empleado
              </span>
            </span>
          </div>

          <div 
            onScroll={handleScroll}
            className="p-4 flex-1 min-h-0 overflow-y-auto"
          >
            {/* Contenedor de Búsqueda + Filtro de Estado */}
            <div className="mb-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="w-full flex-1">
                <SearchBar value={searchQuery} onChange={(val) => setSearchQuery(val)} />
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                <FontAwesomeIcon icon={faFilter} className="text-placeholder text-sm" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as "all" | "active" | "inactive")}
                  className="
                    bg-surface text-foreground font-semibold text-sm
                    border border-separator rounded-lg px-3 py-2 outline-none
                    hover:border-primary transition-colors cursor-pointer
                  "
                >
                  <option value="all">Todos los Estados</option>
                  <option value="active">Activos</option>
                  <option value="inactive">De baja</option>
                </select>
              </div>
            </div>                            

            {filteredEmployees.length > 0 ? (
              <div className="flex flex-wrap gap-2 w-full">
                {visibleEmployees.map((emp: any) => (
                  <EmployeeCard 
                    key={emp.id || emp.file_number} 
                    employee={emp} 
                    handleEdit={handleEdit} 
                    handleInfo={handleInfo}
                  />
                ))}
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-placeholder gap-2 py-8">
                <FontAwesomeIcon icon={faUserTie} className="text-4xl text-surface" />
                <p className="text-sm text-center">
                  {searchQuery || statusFilter !== "all"
                    ? "No se encontraron colaboradores que coincidan con los filtros" 
                    : "No hay colaboradores guardados todavía"}
                </p>
              </div>
            )}
          </div>
        </Frame>
        <EmployeeInfoModal open={infoModalOpen} setOpen={setInfoModalOpen} employee={selectedEmployee} />
        <EmployeeEditModal open={editModalOpen} setOpen={setEditModalOpen} employee={selectedEmployee} onSuccess={onEditSuccess} onError={onError} />
      </div>
    </>
  );
}