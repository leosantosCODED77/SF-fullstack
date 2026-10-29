import { useState } from 'react';
import { siteConfig, getWhatsAppUrl } from '../data/siteConfig';
import { ChevronDown, MessageSquare, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 relative bg-[#090B10] border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>Tire Suas Dúvidas</span>
            <span aria-hidden="true">·</span>
            <span>Transparência Total</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
            Reunimos as principais respostas sobre prazos, etapas de desenvolvimento, pagamento e suporte para você contratar com total tranquilidade.
          </p>
        </div>

        {/* Accordions List */}
        <div className="space-y-3.5 mb-14">
          {siteConfig.faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-[#0E121B] border border-slate-800 transition-colors overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-white leading-snug">
                    {faq.question}
                  </span>
                  <div className={`p-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 text-white' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 mt-1">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Direct question CTA */}
        <div className="p-8 rounded-2xl bg-[#0E121B] border border-slate-800 text-center flex flex-col items-center">
          <h3 className="text-lg font-bold text-white mb-2">
            Ainda ficou com alguma dúvida sobre o seu projeto?
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mb-6">
            Mande uma mensagem agora no WhatsApp. Respondemos rápido e explicamos exatamente como transformar sua ideia em realidade.
          </p>
          <a
            href={getWhatsAppUrl("Olá! Estava olhando o FAQ da SF Full Stack e fiquei com uma dúvida sobre meu projeto.")}
            target="_blank"
            rel="noopener noreferrer"
            className="silver-button px-6 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm"
          >
            <MessageSquare className="w-4 h-4 text-slate-900" />
            <span>Tirar Dúvida no WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}
