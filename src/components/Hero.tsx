import { motion } from 'motion/react';
import { siteConfig, getWhatsAppUrl } from '../data/siteConfig';
import portfolioLandingTechImg from '../assets/images/portfolio_landing_tech_1793268769040.jpg';
import { MessageSquare, ArrowRight, ShieldCheck, Zap, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenSimulator: () => void;
  onOpenBriefing?: () => void;
}

export default function Hero({ onOpenSimulator, onOpenBriefing }: HeroProps) {
  return (
    <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
      {/* Ambient silver & cyan radial glow */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-slate-600/15 via-slate-400/10 to-cyan-500/10 blur-[130px] rounded-full pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Live Availability Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-xs font-medium text-slate-300">
                Disponível para novos projetos <span className="text-slate-500">·</span> Atendimento direto com desenvolvedor
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6">
              Sites modernos que{' '}
              <span className="silver-gradient-text block sm:inline">
                geram resultados reais
              </span>{' '}
              para o seu negócio.
            </h1>

            {/* Subtitle / Description */}
            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mb-8">
              Desenvolvimento full-stack de landing pages de alta conversão, sites institucionais, e-commerces e cardápios digitais. Código autoral, carregamento em menos de 1 segundo e foco comercial para atrair clientes.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <a
                href={getWhatsAppUrl("Olá! Gostaria de falar sobre um projeto de desenvolvimento de site com a SF Full Stack.")}
                target="_blank"
                rel="noopener noreferrer"
                className="silver-button px-7 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg group"
              >
                <MessageSquare className="w-4 h-4 text-slate-900" />
                <span>Iniciar Projeto no WhatsApp</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={onOpenSimulator}
                className="px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-500 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Simular Orçamento Instantâneo</span>
              </button>
            </div>

            {/* Quick check benefits */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-400 border-t border-slate-800/80 pt-6 w-full">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-300 shrink-0" />
                <span>Landing Pages a partir de R$ 790</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-300 shrink-0" />
                <span>100% Código Autoral & Rápido</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-300 shrink-0" />
                <span>Pronto para Celular & Google</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Visual Glass Frame */}
            <div className="relative rounded-2xl p-1 bg-gradient-to-b from-slate-400/30 via-slate-700/20 to-slate-900/50 silver-glow shadow-2xl">
              <div className="rounded-[15px] bg-[#0E121B] border border-slate-800/90 overflow-hidden p-6 sm:p-8">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-5 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 flex items-center justify-center p-0.5">
                      <img 
                        src={siteConfig.logoPath} 
                        alt="SF Full Stack Logo" 
                        className="w-full h-full object-cover scale-150"
                      />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white tracking-tight">SF FULL STACK</h2>
                      <p className="text-xs text-slate-400">Desenvolvimento Web de Alta Performance</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800/80 text-cyan-300 border border-slate-700">
                    Full-Stack
                  </span>
                </div>

                {/* Showcase Image: Tech Mockup */}
                <div className="relative rounded-xl overflow-hidden border border-slate-800 mb-6 bg-slate-950 aspect-video group">
                  <img 
                    src={portfolioLandingTechImg} 
                    alt="Exemplo de Landing Page Profissional" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D13] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                    <span className="text-white font-medium bg-black/60 px-2.5 py-1 rounded backdrop-blur-sm border border-white/10">
                      Nexus SaaS Platform
                    </span>
                    <span className="text-slate-300 font-mono text-[11px] bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                      Carga: 0.8s
                    </span>
                  </div>
                </div>

                {/* Deliverables snippet */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Especialidade Principal</span>
                    <span className="text-slate-200 font-medium">Landing Pages & Sites Comerciais</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Canal de Atendimento</span>
                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
                      WhatsApp (+55 91 99153-2935)
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Instagram Oficial</span>
                    <a 
                      href={siteConfig.instagram.profileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 font-medium underline"
                    >
                      @leo_offensive77
                    </a>
                  </div>
                </div>

                {/* Direct action CTA in card */}
                <div className="mt-6 pt-5 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenBriefing) onOpenBriefing();
                      else window.open(getWhatsAppUrl("Olá! Gostaria de solicitar um orçamento para o meu projeto com a SF Full Stack."), '_blank');
                    }}
                    className="w-full py-2.5 px-4 rounded-lg bg-slate-800/90 hover:bg-slate-700 border border-slate-700 hover:border-slate-500 text-xs font-semibold text-white text-center flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Solicitar Orçamento Gratuito</span>
                  </button>
                </div>

              </div>
            </div>
          </motion.div>

        </div>

        {/* 4-Item Proof / Stat Strip below the Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 pt-10 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {siteConfig.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                {stat.value}
              </span>
              <span className="text-sm font-semibold text-slate-200 mt-1">
                {stat.label}
              </span>
              <span className="text-xs text-slate-400 mt-0.5">
                {stat.caption}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
