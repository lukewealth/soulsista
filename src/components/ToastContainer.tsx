import React from 'react';
import { ToastMessage } from '../types';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-3 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto p-4 bg-[#2D3A2F] text-[#FDFCFB] rounded-2xl shadow-2xl border border-[#D4A39E]/30 flex items-start gap-3 transition-all animate-bounce-short"
        >
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#D4A39E] shrink-0 mt-0.5" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-[#D4A39E] shrink-0 mt-0.5" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />}

          <div className="flex-1">
            <h5 className="font-serif font-bold text-xs text-[#D4A39E]">{toast.title}</h5>
            <p className="text-[11px] text-[#D8E0DA] mt-0.5 leading-snug font-light">{toast.message}</p>
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            className="p-1 hover:bg-white/10 rounded-full text-white cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
