import { useState } from 'react';
import { getWhatsAppUrl } from '../data/siteConfig';
import { MessageSquare, X } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end gap-3 group">
      {/* Tooltip */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/95 border border-slate-700/80 text-xs text-white shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-right-2 duration-300">
          <div className="flex flex-col">
            <span className="font-semibold text-slate-200">Falar com Léo</span>
            <span className="text-[11px] text-emerald-400">Online agora · Resposta rápida</span>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="p-1 text-slate-400 hover:text-white rounded-md transition-colors"
            aria-label="Fechar aviso flutuante"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={getWhatsAppUrl("Olá! Gostaria de conversar sobre um projeto com a SF Full Stack.")}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-500/20"
        aria-label="Iniciar conversa no WhatsApp oficial"
      >
        <MessageSquare className="w-7 h-7 fill-white stroke-none" />
      </a>
    </div>
  );
}
