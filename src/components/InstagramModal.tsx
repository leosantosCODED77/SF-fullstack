import { useState, useEffect } from 'react';
import { siteConfig, getWhatsAppUrl } from '../data/siteConfig';
import { X, Copy, CheckCheck, ExternalLink, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InstagramModalProps {
  isOpen: boolean;
  onClose: () => void;
  customText?: string;
}

export default function InstagramModal({ isOpen, onClose, customText }: InstagramModalProps) {
  const [copied, setCopied] = useState(false);
  const defaultText = `Olá, ${siteConfig.instagram.handle}! Conheci a SF Full Stack pelo site e gostaria de solicitar um orçamento para o meu projeto web.`;
  const [message, setMessage] = useState(customText || defaultText);

  useEffect(() => {
    if (customText) {
      setMessage(customText);
    }
  }, [customText]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg rounded-2xl bg-[#0E121B] border border-slate-700 p-6 sm:p-7 shadow-2xl z-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
            aria-label="Fechar modal do Instagram"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
              IG
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Atendimento no Instagram
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                {siteConfig.instagram.handle}
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            Para solicitar seu orçamento pelo Instagram Direct, siga os 3 passos simples abaixo:
          </p>

          {/* Step 1: Resumo do texto */}
          <div className="space-y-1.5 mb-4">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <span>1. Resumo da sua mensagem:</span>
              <span className="text-slate-500">Pronto para colar</span>
            </div>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 leading-relaxed font-sans focus:outline-none focus:border-slate-500"
            />
          </div>

          {/* Step 2: Copiar botão */}
          <div className="mb-4">
            <button
              onClick={handleCopy}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                copied
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
              }`}
            >
              {copied ? (
                <>
                  <CheckCheck className="w-4 h-4 text-emerald-400" />
                  <span>Copiado com Sucesso!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>2. Copiar Mensagem para a Área de Transferência</span>
                </>
              )}
            </button>
          </div>

          {/* Step 3: Links para abrir o Instagram */}
          <div className="space-y-2 mb-6">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              3. Abra o Instagram e cole a mensagem:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <a
                href={siteConfig.instagram.directUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="silver-button py-2.5 px-3 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5"
              >
                <span>Abrir Direct Direto</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={siteConfig.instagram.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white text-center flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Ver Perfil {siteConfig.instagram.handle}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>

          {/* WhatsApp immediate fallback */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Prefere atendimento mais rápido?</span>
            <a
              href={getWhatsAppUrl("Olá! Estava no Instagram da SF Full Stack e vim conversar diretamente no WhatsApp.")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 font-semibold hover:underline flex items-center gap-1"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chamar no WhatsApp</span>
            </a>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
