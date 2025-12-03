import { ClipboardList, FileText } from "lucide-react";

export function SmartActions({ onDiagnose, onTips }: { onDiagnose: () => void; onTips: () => void }) {
  return (
    <div className="flex gap-2 justify-center mb-3">
      <button
        onClick={onDiagnose}
        className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 hover:border-green-300 hover:text-green-700 rounded-full text-xs font-medium transition-colors text-gray-600 shadow-sm"
      >
        <ClipboardList className="w-3 h-3" /> Diagnostico
      </button>

      <button
        onClick={onTips}
        className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 hover:border-green-300 hover:text-green-700 rounded-full text-xs font-medium transition-colors text-gray-600 shadow-sm"
      >
        <FileText className="w-3 h-3" /> Tips Rapidos
      </button>
    </div>
  );
}


