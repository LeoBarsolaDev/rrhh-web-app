import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../../../shared/components/button";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export interface RegisterProps {
    id?: string; // Agregamos un identificador único
    type: string | null;
    cause: string | null;
    reason: string | null;
    real_date: string | null;
    legal_date: string | null;
}

interface HistoryCardProps {
    register: RegisterProps;
    index: number;
    onDelete: () => void | null; // Prop para notificar al padre la eliminación
}

export default function HistoryCard({ register, index, onDelete }: HistoryCardProps) {
    const isAlta = register.type === "Alta";

    return (
        <div className="flex flex-col bg-secondary p-4 rounded-xl border border-white/5 shadow-md w-full transition-all hover:border-white/10">
            {/* ... Fila Principal: Estado y Fechas (Tu código visual permanece idéntico) ... */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
                <div>
                    <span className={`inline-flex px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md ${
                        isAlta ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}>
                        {isAlta ? "ALTA" : "BAJA"}
                    </span>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-2 bg-surface/60 px-3 py-1.5 rounded-lg border border-white/5 text-xs md:text-sm text-slate-300">
                        <span className="text-slate-500 font-medium">REAL:</span>
                        <span className="font-semibold">{register.real_date}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-surface/60 px-3 py-1.5 rounded-lg border border-white/5 text-xs md:text-sm text-slate-300">
                        <span className="text-slate-500 font-medium">LEGAL:</span>
                        <span className="font-semibold">{register.legal_date}</span>
                    </div>
                </div>
            </div>

            {/* ... Detalles específicos (Tu código visual) ... */}
            {!isAlta && (register.reason || register.cause) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/5 text-xs md:text-sm">
                    {register.reason && (
                        <div className="bg-surface/40 p-2.5 rounded-lg border border-white/5">
                            <span className="text-slate-500 block text-[11px] uppercase tracking-wider font-medium mb-0.5">Motivo</span>
                            <p className="text-slate-200 font-medium">{register.reason}</p>
                        </div>
                    )}
                    {register.cause && (
                        <div className="bg-surface/40 p-2.5 rounded-lg border border-white/5">
                            <span className="text-slate-500 block text-[11px] uppercase tracking-wider font-medium mb-0.5">Causa / Explicación</span>
                            <p className="text-slate-300 italic">"{register.cause}"</p>
                        </div>
                    )}
                </div>
            )}

            {/* Asignamos la función onDelete al botón */}
            { onDelete == null ? 
                <></> : 
                <Button color="danger" style="text-sm mt-2" rounded onClick={onDelete}> 
                    <FontAwesomeIcon icon={faTrash} /> Eliminar 
                </Button>
            }
        </div>
    );
}