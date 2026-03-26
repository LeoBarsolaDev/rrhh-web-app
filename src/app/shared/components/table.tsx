import type { ReactNode } from "react";

export type RowData = { [key: string]: any };

interface DataTableProps {
    data?: RowData[] | null; 
    onRowClick?: (row: RowData, index: number) => void;
    selectedRow?: number | null;
    renderCell?: (key: string, value: any, row: RowData) => ReactNode;
    // Agregamos una prop para excluir columnas técnicas (como IDs o timestamps)
    excludeColumns?: string[];
}

export default function Table({
    data = [],
    onRowClick,
    selectedRow = null,
    renderCell,
    excludeColumns = []
}: DataTableProps) {

    // 1. Manejo de estado de carga o vacío
    if (!data || data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-10 bg-dark-01 rounded-xl border border-dashed border-secondary">
                <p className="text-foreground opacity-50 font-medium">No se encontraron registros</p>
            </div>
        );
    }

    // 2. Filtramos las columnas para no mostrar IDs o datos internos si no es necesario
    const columns = Object.keys(data[0]).filter(col => !excludeColumns.includes(col));

    return (
        <div className="w-full h-auto overflow-y-auto custom-scrollbar">
            {/* DESKTOP TABLE */}
            <div className="hidden md:block overflow-x-auto">
                <div style={{ minWidth: columns.length * 150 }}>
                    {/* HEADER */}
                    <div
                        className="grid gap-4 p-4 sticky top-0 bg-dark-02 border-b border-secondary z-10"
                        style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
                    >
                        {columns.map((col) => (
                            <h4 key={col} className="text-foreground text-xs font-black uppercase tracking-wider">
                                {col}
                            </h4>
                        ))}
                    </div>

                    {/* ROWS */}
                    <div className="flex flex-col gap-1 p-2">
                        {data.map((row, rowIndex) => {
                            const isSelected = selectedRow === rowIndex;
                            return (
                                <div
                                    key={rowIndex}
                                    onClick={() => onRowClick?.(row, rowIndex)}
                                    className={`
                                        grid gap-4 p-4 cursor-pointer transition-all duration-200 rounded-lg
                                        ${isSelected ? "bg-primary text-white shadow-lg scale-[1.01]" : "hover:bg-secondary/50 text-foreground"}
                                    `}
                                    style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
                                >
                                    {columns.map((key, colIndex) => {
                                        const value = row[key];
                                        return (
                                            <span key={colIndex} className="text-sm font-medium truncate">
                                                {renderCell ? renderCell(key, value, row) : String(value ?? "")}
                                            </span>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* MOBILE CARDS (Se mantiene igual, solo ajustamos el espaciado) */}
            <div className="md:hidden flex flex-col gap-4 p-4">
                {/* ... tu código de Mobile Cards ... */}
            </div>
        </div>
    );
}