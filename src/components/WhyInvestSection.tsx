import { getWhatsAppUrl } from '../data/siteConfig';
import { ArrowRight, MessageSquare, Sparkles, TrendingUp, ShieldCheck, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface WhyInvestSectionProps {
  onOpenBriefing?: () => void;
}

export default function WhyInvestSection({ onOpenBriefing }: WhyInvestSectionProps) {
  const whatsappUrl = getWhatsAppUrl("Olá! Gostaria de solicitar meu orçamento gratuito com a SF Full Stack para alavancar a presença digital da minha empresa.");

  return (
    <section id="por-que-investir" className="py-20 lg:py-28 relative bg-[#090B10] border-t border-b border-slate-800/80 overflow-hidden">
      {/* Subtle silver metallic ambient glow */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-slate-600/10 blur-[120px] rounded-full pointer-events-none" 
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Card with silver gradient border */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-[#0E121B] border border-slate-700/80 p-8 sm:p-12 lg:p-14 shadow-2xl relative silver-glow"
        >
          {/* Header Badge */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Presença Digital Estratégica</span>
            <span aria-hidden="true">·</span>
            <span>SF Full Stack</span>
          </div>

          {/* Heading 1 (Exact text) */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Por que investir na presença digital da sua empresa?
          </h2>

          {/* Paragraphs with exact wording & emphasis */}
          <div className="space-y-5 text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-8">
            <p>
              Hoje, estar presente na internet é essencial para quem deseja crescer e conquistar novos clientes. Um site profissional transmite <strong className="text-white font-semibold">credibilidade, fortalece sua marca e mantém seu negócio acessível 24 horas por dia.</strong>
            </p>

            <p>
              Na <strong className="text-white font-semibold">SF</strong>, transformamos suas ideias em experiências digitais modernas, rápidas e responsivas, desenvolvidas para destacar seu negócio da concorrência e gerar novas oportunidades.
            </p>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800/90 text-white font-bold text-base sm:text-lg">
              <span className="silver-gradient-text">
                Sua empresa merece mais do que estar online. Merece se destacar.
              </span>
            </div>
          </div>

          {/* 3 Value Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 pt-4 border-t border-slate-800/80">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Credibilidade Imediata</span>
                <span className="text-[11px] text-slate-400 leading-tight block mt-0.5">Autoridade máxima para fechar vendas</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Aberto 24 Horas</span>
                <span className="text-[11px] text-slate-400 leading-tight block mt-0.5">Receba contatos a qualquer momento</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 shrink-0">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Vantagem Competitiva</span>
                <span className="text-[11px] text-slate-400 leading-tight block mt-0.5">Destaque total sobre concorrentes</span>
              </div>
            </div>
          </div>

          {/* Subheading & CTA (Exact text) */}
          <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-1.5">
                Pronto para levar seu negócio ao próximo nível?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Entre em contato com a SF e descubra como podemos transformar sua presença digital em novas oportunidades de crescimento.
              </p>
            </div>

            {/* Functional Button "[Solicite seu orçamento gratuito]" */}
            <button
              type="button"
              onClick={() => {
                if (onOpenBriefing) onOpenBriefing();
                else window.open(whatsappUrl, '_blank');
              }}
              className="silver-button px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 shadow-lg whitespace-nowrap shrink-0 group transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-slate-900" />
              <span>Solicite seu orçamento gratuito</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
