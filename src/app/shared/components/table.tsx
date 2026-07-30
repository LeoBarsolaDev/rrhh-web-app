import type { ReactNode } from "react";

export type RowData = { [key: string]: any };

interface SearchCriteria {
    query: string;
    columns?: string[];
}

interface DataTableProps {
    data?: RowData[] | null;
    onRowClick?: (row: RowData, index: number) => void;
    selectedEmployeeId?: string | number | null;
    idKey?: string;
    renderCell?: (key: string, value: any, row: RowData) => ReactNode;
    excludeColumns?: string[];
    search?: SearchCriteria;
}

export default function Table({
    data = [],
    onRowClick,
    selectedEmployeeId = null,
    idKey = "id",
    renderCell,
    excludeColumns = [],
    search
}: DataTableProps) {

    if (!data || data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-10 bg-dark-01 rounded-xl border border-dashed border-secondary">
                <p className="text-foreground opacity-50 font-medium">No se encontraron registros</p>
            </div>
        );
    }

    const columns = Object.keys(data[0]).filter(col => !excludeColumns.includes(col));

    const filteredData = data.filter((row) => {
        if (!search?.query) return true;

        const term = search.query.toLowerCase();
        const targets = search.columns || columns;

        return targets.some(key => {
            const val = row[key];
            return val != null && String(val).toLowerCase().includes(term);
        });
    });

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
                                {col.replace(/_/g, ' ')}
                            </h4>
                        ))}
                    </div>

                    {/* ROWS */}
                    <div className="flex flex-col gap-1 p-2">
                        {filteredData.map((row, rowIndex) => {
                            const rowId = row[idKey] ?? row["id"] ?? row["# N° LEGAJO"] ?? row.legajo ?? rowIndex;
                            
                            const isSelected = selectedEmployeeId !== null && 
                                               selectedEmployeeId !== undefined && 
                                               String(selectedEmployeeId) === String(rowId);

                            return (
                                <div
                                    key={`row-${rowId}-${rowIndex}`}
                                    onClick={() => onRowClick?.(row, rowIndex)}
                                    className={`
                                        grid gap-4 p-4 cursor-pointer transition-all duration-200 rounded-lg
                                        ${isSelected ? "bg-primary text-white shadow-lg scale-[1.01]" : "hover:bg-secondary/50 text-foreground"}
                                    `}
                                    style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
                                >
                                    {columns.map((key, colIndex) => (
                                        <span key={colIndex} className="text-sm font-medium truncate">
                                            {renderCell ? renderCell(key, row[key], row) : String(row[key] ?? "")}
                                        </span>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* MOBILE CARDS */}
            <div className="md:hidden flex flex-col gap-3 p-3">
                {filteredData.map((row, rowIndex) => {
                    const rowId = row[idKey] ?? row["id"] ?? row["# N° LEGAJO"] ?? row.legajo ?? rowIndex;
                    const isSelected = selectedEmployeeId !== null && 
                                       selectedEmployeeId !== undefined && 
                                       String(selectedEmployeeId) === String(rowId);

                    const titleKey = columns[0];
                    const subtitleKey = columns[1];
                    const detailColumns = columns.slice(2);

                    return (
                        <div
                            key={`mobile-row-${rowId}-${rowIndex}`}
                            onClick={() => onRowClick?.(row, rowIndex)}
                            className={`
                                flex flex-col gap-4 p-5 rounded-2xl border transition-all duration-300 ease-out cursor-pointer
                                ${isSelected 
                                    ? "bg-primary border-primary text-white shadow-2xl scale-[1.02] -translate-y-1" 
                                    : "bg-dark-02 border-secondary text-foreground hover:border-primary/50"}
                            `}
                        >
                            <div className="flex flex-col gap-1 border-b border-secondary pb-3">
                                <div className="flex items-center justify-between gap-2">
                                    <h3 className={`text-base font-extrabold tracking-tight truncate ${isSelected ? 'text-white' : 'text-foreground'}`}>
                                        {renderCell ? renderCell(titleKey, row[titleKey], row) : String(row[titleKey] ?? "-")}
                                    </h3>
                                    {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />}
                                </div>
                                {subtitleKey && (
                                    <p className={`text-xs font-medium ${isSelected ? 'text-white/80' : 'text-foreground/70'}`}>
                                        {renderCell ? renderCell(subtitleKey, row[subtitleKey], row) : String(row[subtitleKey] ?? "-")}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                                {detailColumns.map((key) => (
                                    <div key={key} className="flex flex-col gap-0.5 min-w-0">
                                        <span className={`text-[10px] uppercase font-bold tracking-widest ${isSelected ? 'text-white/60' : 'text-foreground/50'}`}>
                                            {key.replace(/_/g, ' ')}
                                        </span>
                                        <span className={`text-sm font-semibold truncate ${isSelected ? 'text-white' : 'text-foreground'}`}>
                                            {renderCell ? renderCell(key, row[key], row) : String(row[key] ?? "-")}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}